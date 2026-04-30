type Lang = 'en' | 'nl' | 'fr' | 'de' | 'es'

const T: Record<Lang, {
  subject: (firm: string) => string
  preheader: string
  headerTitle: string
  hi: (name: string) => string
  intro: (adviser: string, firm: string) => string
  credsTitle: string
  portalUrlLabel: string
  emailLabel: string
  passwordLabel: string
  cta: string
  warning: string
  footer: string
}> = {
  en: {
    subject: (f) => 'Welcome to ' + f + ' client portal',
    preheader: 'Your client portal is ready. Sign in to access your documents.',
    headerTitle: 'Client portal access',
    hi: (n) => 'Hello ' + n + ',',
    intro: (a, f) => '<strong>' + a + '</strong> at <strong>' + f + '</strong> has set up your client portal. You can now access your documents and sign requests online.',
    credsTitle: 'Your login credentials',
    portalUrlLabel: 'Portal URL',
    emailLabel: 'Email',
    passwordLabel: 'Temporary password',
    cta: 'Access your portal',
    warning: 'Please change your password after your first login. Keep these credentials safe and do not share them.',
    footer: 'Powered by FirmFlow',
  },
  nl: {
    subject: (f) => 'Welkom bij het klantenportaal van ' + f,
    preheader: 'Je klantenportaal staat klaar. Log in om je documenten te bekijken.',
    headerTitle: 'Toegang tot klantenportaal',
    hi: (n) => 'Hallo ' + n + ',',
    intro: (a, f) => '<strong>' + a + '</strong> van <strong>' + f + '</strong> heeft je klantenportaal ingericht. Je kunt nu online je documenten bekijken en verzoeken ondertekenen.',
    credsTitle: 'Je inloggegevens',
    portalUrlLabel: 'Portaal URL',
    emailLabel: 'E-mail',
    passwordLabel: 'Tijdelijk wachtwoord',
    cta: 'Open mijn portaal',
    warning: 'Wijzig je wachtwoord na de eerste keer inloggen. Bewaar deze gegevens veilig en deel ze niet.',
    footer: 'Mogelijk gemaakt door FirmFlow',
  },
  fr: {
    subject: (f) => 'Bienvenue sur le portail client de ' + f,
    preheader: 'Votre portail client est pret. Connectez-vous pour acceder a vos documents.',
    headerTitle: 'Acces au portail client',
    hi: (n) => 'Bonjour ' + n + ',',
    intro: (a, f) => '<strong>' + a + '</strong> de <strong>' + f + '</strong> a configure votre portail client. Vous pouvez desormais consulter vos documents et signer des demandes en ligne.',
    credsTitle: 'Vos identifiants de connexion',
    portalUrlLabel: 'URL du portail',
    emailLabel: 'E-mail',
    passwordLabel: 'Mot de passe temporaire',
    cta: 'Acceder a mon portail',
    warning: 'Veuillez changer votre mot de passe apres votre premiere connexion. Gardez ces identifiants en securite et ne les partagez pas.',
    footer: 'Propulse par FirmFlow',
  },
  de: {
    subject: (f) => 'Willkommen im Kundenportal von ' + f,
    preheader: 'Ihr Kundenportal ist bereit. Melden Sie sich an, um Ihre Dokumente abzurufen.',
    headerTitle: 'Zugang zum Kundenportal',
    hi: (n) => 'Hallo ' + n + ',',
    intro: (a, f) => '<strong>' + a + '</strong> von <strong>' + f + '</strong> hat Ihr Kundenportal eingerichtet. Sie koennen nun online Ihre Dokumente einsehen und Anfragen unterzeichnen.',
    credsTitle: 'Ihre Anmeldedaten',
    portalUrlLabel: 'Portal-URL',
    emailLabel: 'E-Mail',
    passwordLabel: 'Temporaeres Passwort',
    cta: 'Portal oeffnen',
    warning: 'Bitte aendern Sie Ihr Passwort nach der ersten Anmeldung. Bewahren Sie diese Daten sicher auf und teilen Sie sie nicht.',
    footer: 'Bereitgestellt von FirmFlow',
  },
  es: {
    subject: (f) => 'Bienvenido al portal de clientes de ' + f,
    preheader: 'Tu portal de clientes esta listo. Inicia sesion para acceder a tus documentos.',
    headerTitle: 'Acceso al portal de clientes',
    hi: (n) => 'Hola ' + n + ',',
    intro: (a, f) => '<strong>' + a + '</strong> de <strong>' + f + '</strong> ha configurado tu portal de clientes. Ahora puedes acceder a tus documentos y firmar solicitudes en linea.',
    credsTitle: 'Tus credenciales de acceso',
    portalUrlLabel: 'URL del portal',
    emailLabel: 'Correo',
    passwordLabel: 'Contrasena temporal',
    cta: 'Acceder a mi portal',
    warning: 'Por favor cambia tu contrasena despues del primer inicio de sesion. Guarda estas credenciales y no las compartas.',
    footer: 'Con la tecnologia de FirmFlow',
  },
}

export function buildClientInviteEmail(opts: {
  lang?: string
  clientName: string
  adviserName: string
  firmName: string
  clientEmail: string
  portalUrl: string
  tempPassword: string
}) {
  const raw = (opts.lang || 'en').toLowerCase()
  const lang: Lang = (['en','nl','fr','de','es'].includes(raw) ? raw : 'en') as Lang
  const t = T[lang]

  const html = [
    '<!DOCTYPE html>',
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>', t.subject(opts.firmName), '</title></head>',
    '<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">',
    '<div style="display:none;max-height:0;overflow:hidden;">', t.preheader, '</div>',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 16px;"><tr><td align="center">',
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(15,23,42,0.06);">',
    '<tr><td style="background:#0F172A;padding:32px 40px;"><div style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.02em;"><span style="color:#60A5FA;">Firm</span>Flow</div>',
    '<div style="color:rgba(255,255,255,0.7);font-size:13px;margin-top:6px;">', t.headerTitle, '</div></td></tr>',
    '<tr><td style="padding:40px 40px 8px;"><p style="margin:0 0 14px;font-size:15px;color:#0F172A;">', t.hi(opts.clientName), '</p>',
    '<p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#475569;">', t.intro(opts.adviserName, opts.firmName), '</p></td></tr>',
    '<tr><td style="padding:0 40px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;">',
    '<tr><td style="padding:18px 22px;border-bottom:1px solid #E2E8F0;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#64748B;font-weight:700;">', t.portalUrlLabel, '</div><div style="font-size:14px;font-weight:600;color:#1C64F2;margin-top:4px;word-break:break-all;">', opts.portalUrl, '</div></td></tr>',
    '<tr><td style="padding:18px 22px;border-bottom:1px solid #E2E8F0;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#64748B;font-weight:700;">', t.emailLabel, '</div><div style="font-size:14px;font-weight:600;color:#0F172A;margin-top:4px;">', opts.clientEmail, '</div></td></tr>',
    '<tr><td style="padding:18px 22px;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#64748B;font-weight:700;">', t.passwordLabel, '</div><div style="font-size:18px;font-weight:800;color:#1C64F2;margin-top:6px;letter-spacing:0.08em;font-family:monospace;">', opts.tempPassword, '</div></td></tr>',
    '</table></td></tr>',
    '<tr><td style="padding:0 40px 24px;" align="center"><a href="', opts.portalUrl, '" style="display:inline-block;background:#0F172A;color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">', t.cta, ' &rarr;</a></td></tr>',
    '<tr><td style="padding:0 40px 40px;"><div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:10px;padding:14px 16px;"><p style="margin:0;font-size:12px;color:#92400E;line-height:1.5;">', t.warning, '</p></div></td></tr>',
    '<tr><td style="padding:24px 40px;background:#F8FAFC;border-top:1px solid #E2E8F0;" align="center"><p style="margin:0;font-size:12px;color:#94A3B8;">', t.footer, '</p><p style="margin:6px 0 0;font-size:12px;color:#94A3B8;"><a href="https://firmflow.io" style="color:#1C64F2;text-decoration:none;">firmflow.io</a></p></td></tr>',
    '</table></td></tr></table></body></html>',
  ].join('')

  return { subject: t.subject(opts.firmName), html }
}
