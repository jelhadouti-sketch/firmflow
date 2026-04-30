type Lang = 'en' | 'nl' | 'fr' | 'de' | 'es'

const T: Record<Lang, {
  subject: string
  preheader: string
  headerTitle: string
  hi: (name: string) => string
  intro: (firm: string) => string
  body: string
  cta: string
  trialNote: string
  ignore: string
  footer: string
}> = {
  en: {
    subject: 'Welcome to FirmFlow — Verify your email',
    preheader: 'Confirm your email to activate your FirmFlow account.',
    headerTitle: 'Welcome to FirmFlow',
    hi: (n) => 'Hi ' + n + ',',
    intro: (f) => 'Thank you for creating your account at FirmFlow. Your firm <strong>' + f + '</strong> is ready.',
    body: 'Please click the button below to verify your email and get started.',
    cta: 'Verify Email & Get Started',
    trialNote: 'Your 14-day free trial starts after verification.',
    ignore: 'If you did not create this account, please ignore this email.',
    footer: 'FirmFlow — Practice management for professional firms',
  },
  nl: {
    subject: 'Welkom bij FirmFlow — Verifieer je e-mail',
    preheader: 'Bevestig je e-mail om je FirmFlow account te activeren.',
    headerTitle: 'Welkom bij FirmFlow',
    hi: (n) => 'Hallo ' + n + ',',
    intro: (f) => 'Bedankt voor het aanmaken van je FirmFlow account. Je kantoor <strong>' + f + '</strong> staat klaar.',
    body: 'Klik op de knop hieronder om je e-mail te verifieren en te beginnen.',
    cta: 'E-mail verifieren & starten',
    trialNote: 'Je proefperiode van 14 dagen start na verificatie.',
    ignore: 'Als je dit account niet hebt aangemaakt, negeer dan deze e-mail.',
    footer: 'FirmFlow — Praktijkbeheer voor professionele kantoren',
  },
  fr: {
    subject: 'Bienvenue chez FirmFlow — Verifiez votre e-mail',
    preheader: 'Confirmez votre e-mail pour activer votre compte FirmFlow.',
    headerTitle: 'Bienvenue chez FirmFlow',
    hi: (n) => 'Bonjour ' + n + ',',
    intro: (f) => 'Merci d\'avoir cree votre compte FirmFlow. Votre cabinet <strong>' + f + '</strong> est pret.',
    body: 'Cliquez sur le bouton ci-dessous pour verifier votre e-mail et commencer.',
    cta: 'Verifier l\'e-mail et commencer',
    trialNote: 'Votre essai gratuit de 14 jours commence apres la verification.',
    ignore: 'Si vous n\'avez pas cree ce compte, veuillez ignorer cet e-mail.',
    footer: 'FirmFlow — Gestion de cabinet pour les professionnels',
  },
  de: {
    subject: 'Willkommen bei FirmFlow — Bestatigen Sie Ihre E-Mail',
    preheader: 'Bestatigen Sie Ihre E-Mail, um Ihr FirmFlow-Konto zu aktivieren.',
    headerTitle: 'Willkommen bei FirmFlow',
    hi: (n) => 'Hallo ' + n + ',',
    intro: (f) => 'Danke, dass Sie Ihr FirmFlow-Konto erstellt haben. Ihre Kanzlei <strong>' + f + '</strong> ist bereit.',
    body: 'Bitte klicken Sie auf den Button unten, um Ihre E-Mail zu bestatigen und loszulegen.',
    cta: 'E-Mail bestatigen & loslegen',
    trialNote: 'Ihre 14-tagige kostenlose Testphase beginnt nach der Bestatigung.',
    ignore: 'Falls Sie dieses Konto nicht erstellt haben, ignorieren Sie diese E-Mail bitte.',
    footer: 'FirmFlow — Kanzleimanagement fur Profis',
  },
  es: {
    subject: 'Bienvenido a FirmFlow — Verifica tu correo',
    preheader: 'Confirma tu correo para activar tu cuenta de FirmFlow.',
    headerTitle: 'Bienvenido a FirmFlow',
    hi: (n) => 'Hola ' + n + ',',
    intro: (f) => 'Gracias por crear tu cuenta en FirmFlow. Tu firma <strong>' + f + '</strong> esta lista.',
    body: 'Haz clic en el boton de abajo para verificar tu correo y comenzar.',
    cta: 'Verificar correo y comenzar',
    trialNote: 'Tu prueba gratuita de 14 dias comienza despues de la verificacion.',
    ignore: 'Si no creaste esta cuenta, por favor ignora este correo.',
    footer: 'FirmFlow — Gestion de despacho para profesionales',
  },
}

export function buildWelcomeVerifyEmail(opts: {
  lang?: string
  firstName: string
  firmName: string
  confirmUrl: string
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
    '<div style="color:rgba(255,255,255,0.7);font-size:13px;margin-top:6px;">', t.headerTitle, '</div></td></tr>',
    '<tr><td style="padding:40px 40px 8px;"><p style="margin:0 0 16px;font-size:15px;color:#334155;">', t.hi(opts.firstName), '</p>',
    '<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">', t.intro(opts.firmName), '</p>',
    '<p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#475569;">', t.body, '</p></td></tr>',
    '<tr><td style="padding:0 40px 32px;" align="center"><a href="', opts.confirmUrl, '" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">', t.cta, ' &rarr;</a></td></tr>',
    '<tr><td style="padding:0 40px 32px;"><p style="margin:0 0 12px;font-size:13px;color:#64748B;">', t.trialNote, '</p>',
    '<p style="margin:0;font-size:13px;color:#94A3B8;">', t.ignore, '</p></td></tr>',
    '<tr><td style="padding:24px 40px;background:#F8FAFC;border-top:1px solid #E2E8F0;" align="center"><p style="margin:0;font-size:12px;color:#94A3B8;">', t.footer, '</p><p style="margin:6px 0 0;font-size:12px;color:#94A3B8;"><a href="https://www.firmflow.io" style="color:#1C64F2;text-decoration:none;">firmflow.io</a></p></td></tr>',
    '</table></td></tr></table></body></html>',
  ].join('')

  return { subject: t.subject, html }
}
