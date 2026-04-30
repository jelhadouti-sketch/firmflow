import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Firm Cost Calculator — See How Much You Can Save | FirmFlow',
  description: 'Calculate how much your firm spends on DocuSign, ShareFile, Clio, and other tools. See your potential savings with FirmFlow.',
  alternates: { canonical: 'https://www.firmflow.io/calculator' },
}

export default function CalculatorPage() {
  return (
    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif", color:'#0F172A'}}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        .ci { width:100%; padding:14px 16px; border:2px solid #E2E8F0; border-radius:12px; font-size:16px; font-family:inherit; outline:none; transition:border 0.2s; box-sizing:border-box; }
        .ci:focus { border-color:#1C64F2; }
        .cc { background:#fff; border-radius:20px; border:1px solid #E2E8F0; padding:32px; }
        @media(max-width:768px){.cg{grid-template-columns:1fr !important}}
      `}} />
      <nav style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',position:'sticky',top:0,zIndex:100}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
          <a style={{textDecoration:'none',display:'flex',alignItems:'center',gap:8}} href="/">
            <img src="/logo/firmflow-icon.svg" alt="FirmFlow" width={28} height={28}/>
            <span style={{fontSize:20,fontWeight:800,color:'#1C64F2',letterSpacing:'-0.03em'}}>Firm<span style={{fontWeight:400,color:'#0F172A'}}>Flow</span></span>
          </a>
          <a style={{padding:'10px 24px',background:'#1C64F2',color:'#fff',borderRadius:10,textDecoration:'none',fontSize:14,fontWeight:700}} href="/signup">Start free trial</a>
        </div>
      </nav>
      <section style={{padding:'60px 20px 40px',textAlign:'center'}}>
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:14,marginBottom:8,letterSpacing:'0.05em'}}>FREE TOOL</p>
          <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:16}}>
            How much is your firm <span style={{color:'#1C64F2'}}>overpaying</span> for tools?
          </h1>
          <p style={{fontSize:18,color:'#64748B',lineHeight:1.7}}>Enter what you currently pay. See the savings instantly.</p>
        </div>
      </section>
      <section style={{padding:'0 20px 80px'}}>
        <div className="cg" style={{maxWidth:900,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
          <div className="cc">
            <h3 style={{fontSize:18,fontWeight:800,marginBottom:4}}>Your current monthly costs</h3>
            <p style={{fontSize:13,color:'#64748B',marginBottom:24}}>Per user per month (€)</p>
            <div style={{marginBottom:16}}>
              <label style={{display:'flex',alignItems:'center',gap:8,fontSize:14,fontWeight:600,marginBottom:6}}>️ DocuSign / E-signatures</label>
              <input className="ci" type="number" id="c1" defaultValue={25} min={0} />
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:'flex',alignItems:'center',gap:8,fontSize:14,fontWeight:600,marginBottom:6}}> ShareFile / Cloud Storage</label>
              <input className="ci" type="number" id="c2" defaultValue={30} min={0} />
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:'flex',alignItems:'center',gap:8,fontSize:14,fontWeight:600,marginBottom:6}}> Clio / Practice Management</label>
              <input className="ci" type="number" id="c3" defaultValue={49} min={0} />
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:'flex',alignItems:'center',gap:8,fontSize:14,fontWeight:600,marginBottom:6}}> Invoicing / Payments</label>
              <input className="ci" type="number" id="c4" defaultValue={20} min={0} />
            </div>
            <div style={{marginBottom:16}}>
              <label style={{display:'flex',alignItems:'center',gap:8,fontSize:14,fontWeight:600,marginBottom:6}}> Slack / Messaging</label>
              <input className="ci" type="number" id="c5" defaultValue={8} min={0} />
            </div>
            <div>
              <label style={{fontSize:14,fontWeight:600,marginBottom:6,display:'block'}}> Number of users</label>
              <input className="ci" type="number" id="nu" defaultValue={5} min={1} max={100} />
            </div>
          </div>
          <div>
            <div className="cc" style={{background:'linear-gradient(135deg,#0F172A,#1E293B)',color:'#fff',marginBottom:20}}>
              <p style={{fontSize:13,color:'#60A5FA',fontWeight:700,marginBottom:4}}>YOU CURRENTLY PAY</p>
              <p id="ct" style={{fontSize:48,fontWeight:900,margin:'0 0 4px',letterSpacing:'-0.04em'}}>€660<span style={{fontSize:16,color:'#94A3B8',fontWeight:500}}>/mo</span></p>
              <p id="cy" style={{fontSize:13,color:'#94A3B8'}}>€7,920 per year</p>
            </div>
            <div className="cc" style={{border:'2px solid #1C64F2',marginBottom:20}}>
              <p style={{fontSize:13,color:'#1C64F2',fontWeight:700,marginBottom:4}}>WITH FIRMFLOW</p>
              <p style={{fontSize:48,fontWeight:900,margin:'0 0 4px',letterSpacing:'-0.04em'}}>€29<span style={{fontSize:16,color:'#64748B',fontWeight:500}}>/mo</span></p>
              <p style={{fontSize:13,color:'#64748B'}}>Flat price — all users included</p>
            </div>
            <div className="cc" style={{background:'#F0FDF4',border:'2px solid #86EFAC'}}>
              <p style={{fontSize:13,color:'#15803D',fontWeight:700,marginBottom:4}}>YOUR SAVINGS</p>
              <p id="sm" style={{fontSize:36,fontWeight:900,color:'#15803D',margin:'0 0 4px',letterSpacing:'-0.04em'}}>€631<span style={{fontSize:16,fontWeight:500}}>/mo</span></p>
              <p id="sy" style={{fontSize:15,color:'#15803D',fontWeight:700}}>€7,572 per year saved</p>
            </div>
            <div style={{marginTop:20}}>
              <a href="/signup" style={{display:'block',padding:16,background:'linear-gradient(135deg,#1C64F2,#1D4ED8)',color:'#fff',borderRadius:12,textDecoration:'none',fontWeight:700,fontSize:16,textAlign:'center',boxShadow:'0 8px 30px rgba(28,100,242,0.35)'}}>Start saving today — 14 days free →</a>
              <p style={{textAlign:'center',fontSize:12,color:'#94A3B8',marginTop:8}}>No credit card required</p>
            </div>
          </div>
        </div>
      </section>
      <CalcScript />
      <section style={{background:'#0F172A',padding:'60px 20px',textAlign:'center'}}>
        <h2 style={{color:'#fff',fontSize:28,fontWeight:800,marginBottom:16}}>Ready to stop overpaying?</h2>
        <p style={{color:'#94A3B8',fontSize:16,marginBottom:24}}>Start your 14-day free trial. No credit card needed.</p>
        <a href="/signup" style={{display:'inline-block',padding:'16px 40px',background:'#1C64F2',color:'#fff',borderRadius:12,textDecoration:'none',fontWeight:700,fontSize:17}}>Start free trial →</a>
      </section>
    </div>
  )
}

function CalcScript() {
  return (
    <script dangerouslySetInnerHTML={{__html: `
      function rc(){
        var ids=['c1','c2','c3','c4','c5'];
        var t=0;
        ids.forEach(function(id){t+=parseFloat(document.getElementById(id).value)||0});
        var u=parseInt(document.getElementById('nu').value)||1;
        var m=t*u, y=m*12, s=Math.max(0,m-29), sy=s*12;
        document.getElementById('ct').innerHTML='€'+m+'<span style="font-size:16px;color:#94A3B8;font-weight:500">/mo</span>';
        document.getElementById('cy').textContent='€'+y.toLocaleString()+' per year';
        document.getElementById('sm').innerHTML='€'+s+'<span style="font-size:16px;font-weight:500">/mo</span>';
        document.getElementById('sy').textContent='€'+sy.toLocaleString()+' per year saved';
      }
      document.addEventListener('DOMContentLoaded',function(){
        document.querySelectorAll('.ci').forEach(function(el){el.addEventListener('input',rc)});
      });
    `}} />
  )
}
