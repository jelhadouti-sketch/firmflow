import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import ExportButton from '@/components/export-button'
import NewInvoice from './new-invoice'
import InvoiceActions from './invoice-actions'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT, getServerDateLocale } from '@/lib/i18n/server'
import { getCurrency } from '@/lib/currencies'

export default async function Invoices() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('invoices')) redirect('/dashboard')

  const firm = profile.firms as any
  const t = await getServerT()
  const dateLocale = await getServerDateLocale()
  const defaultCurrency = firm?.currency || 'GBP'
  const defaultCur = getCurrency(defaultCurrency)

  const { data: clients } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')

  const clientsWithEmail = await Promise.all(
    (clients || []).map(async (client) => {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(client.id)
      return { ...client, email: authUser?.user?.email || '—' }
    })
  )

  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*, profiles!client_id(full_name)')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  const totalAmount = invoices?.reduce((a, i) => a + (i.amount || 0), 0) || 0
  const paidAmount = invoices?.filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0) || 0
  const pendingAmount = invoices?.filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0) || 0

  const invoiceItems = (invoices || []).map(inv => {
    const invCur = getCurrency(inv.currency || defaultCurrency)
    return {
      id: inv.id,
      label: inv.invoice_number || 'INV',
      sublabel: (inv.profiles as any)?.full_name || '—',
      amount: inv.amount || 0,
      status: inv.status,
    }
  })

  const clientItems = clientsWithEmail.map(c => ({
    id: c.id,
    label: c.full_name || '—',
    sublabel: c.email || '—',
  }))

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('inv.title')}</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{invoices?.length || 0} {t('inv.totalInvoices')} · {t('inv.defaultCurrency')}: {defaultCur.flag} {defaultCurrency}</p>
            </div>
            <div style={{display:'flex',gap:'8px'}}>
              <ExportButton type="invoices" items={invoiceItems} />
              <NewInvoice clients={clientsWithEmail} defaultCurrency={defaultCurrency} firmBankDetails={firm?.bank_details || ''} />
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:t('dash.totalInvoiced'), value: defaultCur.symbol + totalAmount.toLocaleString(), color:'#1D4ED8' },
              { label:t('dash.collected'), value: defaultCur.symbol + paidAmount.toLocaleString(), color:'#15803D' },
              { label:t('common.pending'), value: defaultCur.symbol + pendingAmount.toLocaleString(), color:'#92400E' },
              { label:t('common.overdue'), value: invoices?.filter(i=>i.status==='overdue').length || 0, color:'#DC2626' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'24px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A'}}>{t('inv.allInvoices')}</h2>
            </div>
            {!invoices?.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}></p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>{t('inv.noInvTitle')}</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('inv.noInvDesc')}</p>
                <NewInvoice clients={clientsWithEmail} defaultCurrency={defaultCurrency} firmBankDetails={firm?.bank_details || ''} />
              </div>
            ) : (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('inv.thInvoice')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('inv.thClient')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('inv.thAmount')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('inv.thCurrency')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('inv.thStatus')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('inv.thDueDate')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('inv.thActions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, i) => {
                    const invCur = getCurrency(inv.currency || defaultCurrency)
                    return (
                      <tr key={i} style={{borderTop:'1px solid #F1F5F9'}}>
                        <td style={{padding:'14px 20px',fontSize:'13px',fontWeight:'700',color:'#0F172A'}}>{inv.invoice_number || 'INV-' + (i+1)}</td>
                        <td style={{padding:'14px 20px',fontSize:'13px',color:'#475569'}}>{(inv.profiles as any)?.full_name || '—'}</td>
                        <td style={{padding:'14px 20px',fontSize:'13px',fontWeight:'700',color:'#1D4ED8'}}>{invCur.symbol}{(inv.amount || 0).toLocaleString()}</td>
                        <td style={{padding:'14px 20px'}}>
                          <span style={{fontSize:'12px',color:'#64748B',background:'#F1F5F9',padding:'2px 8px',borderRadius:'4px',fontWeight:'600'}}>{invCur.flag} {invCur.code}</span>
                        </td>
                        <td style={{padding:'14px 20px'}}>
                          <span style={{padding:'3px 8px',borderRadius:'5px',fontSize:'11px',fontWeight:'600',background:inv.status==='paid'?'#F0FDF4':inv.status==='overdue'?'#FEF2F2':'#FEF3C7',color:inv.status==='paid'?'#15803D':inv.status==='overdue'?'#DC2626':'#92400E'}}>
                            {inv.status === 'paid' ? t('common.paidStatus') : inv.status === 'overdue' ? t('common.overdueStatus') : t('common.pendingStatus')}
                          </span>
                        </td>
                        <td style={{padding:'14px 20px',fontSize:'13px',color:'#64748B'}}>{inv.due_at ? new Date(inv.due_at).toLocaleDateString(dateLocale) : '—'}</td>
                        <td style={{padding:'14px 20px'}}>
                          <InvoiceActions
                            invoiceId={inv.id}
                            clientId={inv.client_id || ''}
                            status={inv.status}
                            invoiceNumber={inv.invoice_number || 'INV'}
                            amount={inv.amount || 0}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
    </>
  )
}

