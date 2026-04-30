type Lang = 'en' | 'nl' | 'fr' | 'de' | 'es'

const T: Record<Lang, {
  subject: string
  preheader: string
  badge: string
  hi: (name: string) => string
  congratsTitle: string
  congratsBody: string
  discountLabel: string
  discountValue: string
  durationLabel: string
  durationValue: string
  statusLabel: string
  statusValue: string
  whatsNext: string
  step1: string
  step2: string
  step3: string
  cta: string
  thanks: string
  footer: string
}> = {
  en: {
    subject: 'You are a FirmFlow founding member',
    preheader: 'Your 50% founding-member discount is reserved. Upgrade to activate it.',
    badge: 'FOUNDING MEMBER',
    hi: (n) => 'Hi ' + n + ',',
    congratsTitle: 'Welcome to the founding circle.',
    congratsBody: 'You are one of the first firms to believe in FirmFlow. As a founding member, your 50% discount is reserved — it will apply automatically the moment you upgrade.',
    discountLabel: 'Your discount',
    discountValue: '50% off',
    durationLabel: 'Valid for',
    durationValue: '6 months after upgrade',
    statusLabel: 'Status',
    statusValue: 'Reserved — upgrade to activate',
    whatsNext: 'How to activate it',
    step1: 'Log in to your FirmFlow dashboard.',
    step2: 'Open Subscription and choose your plan. The 50% discount will be pre-applied at checkout — you don\'t need a code.',
    step3: 'After 6 months, your plan continues at the standard price. As a founding member, you also get priority support.',
    cta: 'Activate my discount',
    thanks: 'Thank you for trusting us this early. Your feedback will shape what FirmFlow becomes.',
    footer: 'FirmFlow — Practice management for professional firms',
  },
  nl: {
    subject: 'Je bent een FirmFlow founding member',
    preheader: 'Je 50% korting staat voor je klaar. Upgrade om te activeren.',
    badge: 'FOUNDING MEMBER',
    hi: (n) => 'Hallo ' + n + ',',
    congratsTitle: 'Welkom bij de founding circle.',
    congratsBody: 'Je bent een van de eerste kantoren die in FirmFlow geloven. Als founding member staat je 50% korting klaar — hij wordt automatisch toegepast zodra je upgradet.',
    discountLabel: 'Je korting',
    discountValue: '50% korting',
    durationLabel: 'Geldig voor',
    durationValue: '6 maanden na upgrade',
    statusLabel: 'Status',
    statusValue: 'Gereserveerd — upgrade om te activeren',
    whatsNext: 'Zo activeer je hem',
    step1: 'Log in op je FirmFlow dashboard.',
    step2: 'Open Abonnement en kies je plan. De 50% korting wordt automatisch toegepast bij het afrekenen — geen code nodig.',
    step3: 'Na 6 maanden loopt je plan door tegen de standaardprijs. Als founding member krijg je ook voorrangssupport.',
    cta: 'Activeer mijn korting',
    thanks: 'Bedankt dat je ons zo vroeg vertrouwt. Jouw feedback bepaalt mee wat FirmFlow wordt.',
    footer: 'FirmFlow — Praktijkbeheer voor professionele kantoren',
  },
  fr: {
    subject: 'Vous etes membre fondateur de FirmFlow',
    preheader: 'Votre reduction de 50% est reservee. Passez a un plan payant pour l\'activer.',
    badge: 'MEMBRE FONDATEUR',
    hi: (n) => 'Bonjour ' + n + ',',
    congratsTitle: 'Bienvenue dans le cercle des fondateurs.',
    congratsBody: 'Vous faites partie des premiers cabinets a croire en FirmFlow. En tant que membre fondateur, votre reduction de 50% est reservee — elle s\'appliquera automatiquement des que vous passerez a un plan payant.',
    discountLabel: 'Votre reduction',
    discountValue: '50% de remise',
    durationLabel: 'Valable',
    durationValue: '6 mois apres upgrade',
    statusLabel: 'Statut',
    statusValue: 'Reservee — passez a un plan payant',
    whatsNext: 'Comment l\'activer',
    step1: 'Connectez-vous a votre tableau de bord FirmFlow.',
    step2: 'Ouvrez Abonnement et choisissez votre formule. La reduction de 50% sera pre-appliquee au paiement — pas de code necessaire.',
    step3: 'Apres 6 mois, votre formule continue au prix standard. En tant que membre fondateur, vous beneficiez aussi d\'un support prioritaire.',
    cta: 'Activer ma reduction',
    thanks: 'Merci de nous faire confiance si tot. Votre retour faconnera FirmFlow.',
    footer: 'FirmFlow — Gestion de cabinet pour les professionnels',
  },
  de: {
    subject: 'Sie sind ein FirmFlow Founding Member',
    preheader: 'Ihr 50% Rabatt ist reserviert. Upgraden Sie, um ihn zu aktivieren.',
    badge: 'FOUNDING MEMBER',
    hi: (n) => 'Hallo ' + n + ',',
    congratsTitle: 'Willkommen im Founding Circle.',
    congratsBody: 'Sie gehoren zu den ersten Kanzleien, die an FirmFlow glauben. Als Founding Member ist Ihr 50% Rabatt reserviert — er wird automatisch angewendet, sobald Sie upgraden.',
    discountLabel: 'Ihr Rabatt',
    discountValue: '50% Rabatt',
    durationLabel: 'Gultig fur',
    durationValue: '6 Monate nach Upgrade',
    statusLabel: 'Status',
    statusValue: 'Reserviert — upgraden zum Aktivieren',
    whatsNext: 'So aktivieren Sie ihn',
    step1: 'Melden Sie sich in Ihrem FirmFlow Dashboard an.',
    step2: 'Offnen Sie Abonnement und wahlen Sie Ihren Plan. Der 50% Rabatt wird automatisch an der Kasse angewendet — kein Code notig.',
    step3: 'Nach 6 Monaten lauft Ihr Plan zum Standardpreis weiter. Als Founding Member erhalten Sie auch Priority Support.',
    cta: 'Rabatt aktivieren',
    thanks: 'Danke fur Ihr fruhes Vertrauen. Ihr Feedback pragt, was FirmFlow wird.',
    footer: 'FirmFlow — Kanzleimanagement fur Profis',
  },
  es: {
    subject: 'Eres miembro fundador de FirmFlow',
    preheader: 'Tu descuento del 50% esta reservado. Actualiza para activarlo.',
    badge: 'MIEMBRO FUNDADOR',
    hi: (n) => 'Hola ' + n + ',',
    congratsTitle: 'Bienvenido al circulo fundador.',
    congratsBody: 'Eres una de las primeras firmas que creen en FirmFlow. Como miembro fundador, tu descuento del 50% esta reservado — se aplicara automaticamente en cuanto actualices.',
    discountLabel: 'Tu descuento',
    discountValue: '50% de descuento',
    durationLabel: 'Valido por',
    durationValue: '6 meses despues de actualizar',
    statusLabel: 'Estado',
    statusValue: 'Reservado — actualiza para activar',
    whatsNext: 'Como activarlo',
    step1: 'Accede a tu panel de FirmFlow.',
    step2: 'Abre Suscripcion y elige tu plan. El 50% de descuento se aplicara automaticamente en el pago — sin codigo.',
    step3: 'Despues de 6 meses, tu plan continua al precio estandar. Como miembro fundador, tambien tienes soporte prioritario.',
    cta: 'Activar mi descuento',
    thanks: 'Gracias por confiar tan pronto. Tus comentarios daran forma a FirmFlow.',
    footer: 'FirmFlow — Gestion de despacho para profesionales',
  },
}

export function buildFoundingMemberEmail(opts: {
  lang?: string
  firstName: string
  position: number
  dashboardUrl: string
}) {
  const raw = (opts.lang || 'en').toLowerCase()
  const lang: Lang = (['en','nl','fr','de','es'].includes(raw) ? raw : 'en') as Lang
  const t = T[lang]

  const html = [
    '<!DOCTYPE html>',
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>', t.subject, '</title></head>',
    '<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">',
    '<div style="display:none;max-height:0;overflow:hidden;">', t.preheader, '</div>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 16px;"><tr><td align="center">',
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(15,23,42,0.06);">',
    '<tr><td style="background:#0F172A;padding:32px 40px;"><div style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.02em;"><span style="color:#60A5FA;">Firm</span>Flow</div>',
    '<div style="color:rgba(255,255,255,0.7);font-size:13px;margin-top:6px;letter-spacing:0.04em;text-transform:uppercase;">', t.badge, '</div></td></tr>',
    '<tr><td style="padding:40px 40px 8px;"><p style="margin:0 0 20px;font-size:15px;color:#334155;">', t.hi(opts.firstName), '</p>',
    '<h1 style="margin:0 0 14px;font-size:24px;font-weight:800;color:#0F172A;letter-spacing:-0.02em;line-height:1.25;">', t.congratsTitle, '</h1>',
    '<p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#475569;">', t.congratsBody, '</p></td></tr>',
    '<tr><td style="padding:0 40px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;">',
    '<tr><td style="padding:18px 22px;border-bottom:1px solid #E2E8F0;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#64748B;font-weight:700;">', t.discountLabel, '</div><div style="font-size:18px;font-weight:800;color:#0F172A;margin-top:4px;">', t.discountValue, '</div></td></tr>',
    '<tr><td style="padding:18px 22px;border-bottom:1px solid #E2E8F0;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#64748B;font-weight:700;">', t.durationLabel, '</div><div style="font-size:15px;font-weight:600;color:#0F172A;margin-top:4px;">', t.durationValue, '</div></td></tr>',
    '<tr><td style="padding:18px 22px;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#64748B;font-weight:700;">', t.statusLabel, '</div><div style="font-size:15px;font-weight:600;color:#1C64F2;margin-top:4px;">', t.statusValue, '</div></td></tr>',
    '</table></td></tr>',
    '<tr><td style="padding:0 40px 32px;"><h2 style="margin:0 0 16px;font-size:14px;font-weight:800;color:#0F172A;text-transform:uppercase;letter-spacing:0.04em;">', t.whatsNext, '</h2>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">',
    '<tr><td style="padding:6px 0;font-size:14px;line-height:1.6;color:#475569;">1. ', t.step1, '</td></tr>',
    '<tr><td style="padding:6px 0;font-size:14px;line-height:1.6;color:#475569;">2. ', t.step2, '</td></tr>',
    '<tr><td style="padding:6px 0;font-size:14px;line-height:1.6;color:#475569;">3. ', t.step3, '</td></tr>',
    '</table></td></tr>',
    '<tr><td style="padding:0 40px 40px;" align="center"><a href="', opts.dashboardUrl, '" style="display:inline-block;background:#0F172A;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">', t.cta, ' &rarr;</a></td></tr>',
    '<tr><td style="padding:0 40px 40px;"><p style="margin:0;font-size:14px;line-height:1.6;color:#475569;">', t.thanks, '</p></td></tr>',
    '<tr><td style="padding:24px 40px;background:#F8FAFC;border-top:1px solid #E2E8F0;" align="center"><p style="margin:0;font-size:12px;color:#94A3B8;">', t.footer, '</p><p style="margin:6px 0 0;font-size:12px;color:#94A3B8;"><a href="https://www.firmflow.org" style="color:#1C64F2;text-decoration:none;">firmflow.org</a></p></td></tr>',
    '</table></td></tr></table></body></html>',
  ].join('')

  return { subject: t.subject, html }
}
