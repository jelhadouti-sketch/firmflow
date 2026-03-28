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

const importLine = "import MobileNav from '@/components/mobile-nav'";
const sidebarPattern = "const sidebarItems = [";
const closingTag = "    </div>\n  )\n}";
const mobileNavTag = "      <MobileNav items={sidebarItems} />\n    </div>\n  )\n}";

files.forEach(f => {
  try {
    let c = fs.readFileSync(f, 'utf8');
    let changed = false;

    if (!c.includes(importLine)) {
      c = c.replace("import { redirect } from 'next/navigation'", "import { redirect } from 'next/navigation'\n" + importLine);
      changed = true;
    }

    if (!c.includes('<MobileNav')) {
      c = c.replace(closingTag, mobileNavTag);
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(f, c);
      console.log('Updated: ' + f);
    } else {
      console.log('Skipped: ' + f);
    }
  } catch(e) {
    console.log('Error: ' + f + ' - ' + e.message);
  }
});
console.log('Done!');
