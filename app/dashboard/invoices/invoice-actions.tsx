'use client'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InvoiceActions({
  invoiceId,
  clientId,
  status,
  invoiceNumber,
  amount,
}: {
  invoiceId: string
  clientId: string
  status: string
  invoiceNumber: string
  amount: number
}) {
  const [loading, setLoading] = useState<string | null>(null)
  const { t } = useI18n()
  const router = useRouter()

  async function markAsPaid() {
    setLoading('paid')
    const res = await fetch('/api/invoices/mark-paid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId, clientId, invoiceNumber, amount })
    })
    const data = await res.json()
    if (res.ok) {
      router.refresh()
    } else {
      alert(data.error || t('error.somethingWrong'))
    }
    setLoading(null)
  }

  async function sendReminder() {
    setLoading('reminder')
    const res = await fetch('/api/invoices/reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId, clientId, invoiceNumber, amount })
    })
    const data = await res.json()
    if (res.ok) {
      alert('Payment reminder sent to client!')
    } else {
      alert(data.error || t('error.somethingWrong'))
    }
    setLoading(null)
  }

  async function markAsOverdue() {
    setLoading('overdue')
    await fetch('/api/invoices/mark-paid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId, clientId, invoiceNumber, amount, overdue: true })
    })
    router.refresh()
    setLoading(null)
  }

  return (
    <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
      {/* Download PDF */}
      <a href={'/api/invoices/pdf?id=' + invoiceId} style={{padding:'5px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',fontSize:'11px',fontWeight:'600',textDecoration:'none'}}>
        {t('inv.downloadPdf') || '⬇ PDF'}
      </a>

      {/* Mark as paid */}
      {status !== 'paid' && (
        <button onClick={markAsPaid} disabled={loading === 'paid'} style={{padding:'5px 10px',background:'#F0FDF4',color:'#15803D',borderRadius:'6px',border:'none',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
          {loading === 'paid' ? '...' : 'Mark paid'}
        </button>
      )}

      {/* Send reminder */}
      {status !== 'paid' && (
        <button onClick={sendReminder} disabled={loading === 'reminder'} style={{padding:'5px 10px',background:'#FEF3C7',color:'#92400E',borderRadius:'6px',border:'none',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
          {loading === 'reminder' ? '...' : 'Remind'}
        </button>
      )}

      {/* Mark as overdue */}
      {status === 'pending' && (
        <button onClick={markAsOverdue} disabled={loading === 'overdue'} style={{padding:'5px 10px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',border:'none',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
          {loading === 'overdue' ? '...' : 'Overdue'}
        </button>
      )}
    </div>
  )
}