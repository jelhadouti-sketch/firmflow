const fs = require('fs');
const files = [
  'app/dashboard/engagements/page.tsx',
  'app/dashboard/documents/page.tsx',
  'app/dashboard/signatures/page.tsx',
  'app/dashboard/tasks/page.tsx',
  'app/dashboard/time/page.tsx',
  'app/dashboard/invoices/page.tsx',
  'app/dashboard/clients/page.tsx',
  'app/dashboard/calendar/page.tsx',
  'app/dashboard/analytics/page.tsx',
  'app/dashboard/team/page.tsx',
  'app/dashboard/notifications/page.tsx',
  'app/dashboard/recurring/page.tsx',
  'app/dashboard/settings/page.tsx',
  'app/dashboard/subscription/page.tsx',
  'app/portal/dashboard/page.tsx',
  'app/portal/documents/page.tsx',
  'app/portal/signatures/page.tsx',
  'app/portal/invoices/page.tsx',
];
const old = `<span style={{fontSize:'18px',fontWeight:'800',color:'#1C64F2'}}>⬡ FirmFlow</span>`;
const replacement = `{firm?.logo_url ? <img src={firm.logo_url} alt={firm?.name} style={{height:'36px',maxWidth:'140px',objectFit:'contain'}} /> : <span style={{fontSize:'18px',fontWeight:'800',color:firm?.brand_color||'#1C64F2'}}>⬡ FirmFlow</span>}`;
files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes(old)) {
      content = content.split(old).join(replacement);
      fs.writeFileSync(f, content);
      console.log('Updated: ' + f);
    } else {
      console.log('Skipped: ' + f);
    }
  } catch(e) {
    console.log('Error: ' + f + ' - ' + e.message);
  }
});
console.log('Done!');
EOFnode fix-logo.js
git add . && git commit -m "add logo to all pages" && git push && export PATH=~/.npm-global/bin:$PATH && vercel --prod

cat > fix-logo.js << 'EOF'
const fs = require('fs');
const files = [
  'app/dashboard/engagements/page.tsx',
  'app/dashboard/documents/page.tsx',
  'app/dashboard/signatures/page.tsx',
  'app/dashboard/tasks/page.tsx',
  'app/dashboard/time/page.tsx',
  'app/dashboard/invoices/page.tsx',
  'app/dashboard/clients/page.tsx',
  'app/dashboard/calendar/page.tsx',
  'app/dashboard/analytics/page.tsx',
  'app/dashboard/team/page.tsx',
  'app/dashboard/notifications/page.tsx',
  'app/dashboard/recurring/page.tsx',
  'app/dashboard/settings/page.tsx',
  'app/dashboard/subscription/page.tsx',
  'app/portal/dashboard/page.tsx',
  'app/portal/documents/page.tsx',
  'app/portal/signatures/page.tsx',
  'app/portal/invoices/page.tsx',
];
const old = `<span style={{fontSize:'18px',fontWeight:'800',color:'#1C64F2'}}>⬡ FirmFlow</span>`;
const replacement = `{firm?.logo_url ? <img src={firm.logo_url} alt={firm?.name} style={{height:'36px',maxWidth:'140px',objectFit:'contain'}} /> : <span style={{fontSize:'18px',fontWeight:'800',color:firm?.brand_color||'#1C64F2'}}>⬡ FirmFlow</span>}`;
files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes(old)) {
      content = content.split(old).join(replacement);
      fs.writeFileSync(f, content);
      console.log('Updated: ' + f);
    } else {
      console.log('Skipped: ' + f);
    }
  } catch(e) {
    console.log('Error: ' + f + ' - ' + e.message);
  }
});
console.log('Done!');
