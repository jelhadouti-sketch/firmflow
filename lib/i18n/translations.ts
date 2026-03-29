import { Locale } from './detect'

const translations: Record<string, Record<Locale, string>> = {

  // ===== HEADER & NAV =====
  'nav.features': { en:'Features', nl:'Functies', fr:'Fonctionnalités', de:'Funktionen', es:'Funcionalidades' },
  'nav.howItWorks': { en:'How it works', nl:'Hoe het werkt', fr:'Comment ça marche', de:'So funktioniert es', es:'Cómo funciona' },
  'nav.pricing': { en:'Pricing', nl:'Prijzen', fr:'Tarifs', de:'Preise', es:'Precios' },
  'nav.faq': { en:'FAQ', nl:'Veelgestelde vragen', fr:'FAQ', de:'FAQ', es:'Preguntas frecuentes' },
  'nav.signIn': { en:'Sign in', nl:'Inloggen', fr:'Se connecter', de:'Anmelden', es:'Iniciar sesión' },
  'nav.startTrial': { en:'Start free trial', nl:'Gratis proberen', fr:'Essai gratuit', de:'Kostenlos testen', es:'Prueba gratis' },

  // ===== HERO =====
  'hero.badge': { en:'Free 14-day trial · No credit card required', nl:'14 dagen gratis · Geen creditcard nodig', fr:'Essai gratuit de 14 jours · Sans carte bancaire', de:'14 Tage kostenlos testen · Keine Kreditkarte erforderlich', es:'Prueba gratuita de 14 días · Sin tarjeta de crédito' },
  'hero.title1': { en:'The all-in-one platform built for', nl:'Het alles-in-één platform voor', fr:'La plateforme tout-en-un conçue pour les', de:'Die All-in-One-Plattform für', es:'La plataforma todo-en-uno para' },
  'hero.title2': { en:'professional firms', nl:'professionele kantoren', fr:'cabinets professionnels', de:'professionelle Kanzleien', es:'despachos profesionales' },
  'hero.subtitle': { en:'Documents, e-signatures, time tracking, invoicing, client portal, messaging, and AI assistant — all in one platform for a flat monthly price.', nl:'Documenten, e-handtekeningen, urenregistratie, facturatie, klantenportaal, berichten en AI-assistent — alles in één platform voor een vast maandbedrag.', fr:'Documents, signatures électroniques, suivi du temps, facturation, portail client, messagerie et assistant IA — tout en une seule plateforme pour un prix mensuel fixe.', de:'Dokumente, E-Signaturen, Zeiterfassung, Rechnungsstellung, Kundenportal, Messaging und KI-Assistent — alles in einer Plattform zum monatlichen Festpreis.', es:'Documentos, firmas electrónicas, control de tiempo, facturación, portal de clientes, mensajería y asistente IA — todo en una plataforma por un precio mensual fijo.' },
  'hero.save': { en:'Replace 4+ tools. Save {amount}+ per month.', nl:'Vervang 4+ tools. Bespaar {amount}+ per maand.', fr:'Remplacez 4+ outils. Économisez {amount}+ par mois.', de:'Ersetzen Sie 4+ Tools. Sparen Sie {amount}+ pro Monat.', es:'Reemplaza 4+ herramientas. Ahorra {amount}+ al mes.' },
  'hero.seeHow': { en:'See how it works', nl:'Bekijk hoe het werkt', fr:'Découvrez comment ça marche', de:'So funktioniert es', es:'Descubre cómo funciona' },
  'hero.afterTrial': { en:'{price}/month after trial · Cancel anytime · No setup fees · GDPR compliant', nl:'{price}/maand na proefperiode · Op elk moment opzegbaar · Geen installatiekosten · AVG-conform', fr:'{price}/mois après l\'essai · Résiliable à tout moment · Sans frais d\'installation · Conforme au RGPD', de:'{price}/Monat nach der Testphase · Jederzeit kündbar · Keine Einrichtungsgebühren · DSGVO-konform', es:'{price}/mes tras la prueba · Cancela cuando quieras · Sin costes de instalación · Cumple con el RGPD' },

  // ===== TRUST BAR =====
  'trust.encryption': { en:'Bank-grade encryption', nl:'Bankwaardige versleuteling', fr:'Chiffrement de niveau bancaire', de:'Bankenstandard-Verschlüsselung', es:'Cifrado de nivel bancario' },
  'trust.gdpr': { en:'GDPR compliant', nl:'AVG-conform', fr:'Conforme au RGPD', de:'DSGVO-konform', es:'Cumple con el RGPD' },
  'trust.uptime': { en:'99.9% uptime', nl:'99,9% uptime', fr:'99,9% de disponibilité', de:'99,9% Verfügbarkeit', es:'99,9% de disponibilidad' },
  'trust.countries': { en:'Used in 12+ countries', nl:'Gebruikt in 12+ landen', fr:'Utilisé dans plus de 12 pays', de:'In über 12 Ländern genutzt', es:'Usado en más de 12 países' },
  'trust.firms': { en:'Trusted by 500+ firms', nl:'Vertrouwd door 500+ kantoren', fr:'Plus de 500 cabinets nous font confiance', de:'Über 500 Kanzleien vertrauen uns', es:'Más de 500 despachos confían en nosotros' },

  // ===== BUILT FOR =====
  'builtFor.title': { en:'Built for professional firms', nl:'Gebouwd voor professionele kantoren', fr:'Conçu pour les cabinets professionnels', de:'Entwickelt für professionelle Kanzleien', es:'Diseñado para despachos profesionales' },
  'builtFor.subtitle': { en:'Whether you are a solo accountant or a 50-person firm, FirmFlow scales with you', nl:'Of u nu een zelfstandig accountant bent of een kantoor met 50 medewerkers, FirmFlow groeit met u mee', fr:'Que vous soyez un expert-comptable indépendant ou un cabinet de 50 personnes, FirmFlow s\'adapte à vos besoins', de:'Ob Einzelunternehmer oder 50-Personen-Kanzlei — FirmFlow wächst mit Ihnen', es:'Ya sea un profesional autónomo o un despacho de 50 personas, FirmFlow crece con usted' },
  'builtFor.accounting': { en:'Accounting firms', nl:'Accountantskantoren', fr:'Cabinets comptables', de:'Steuerkanzleien', es:'Despachos contables' },
  'builtFor.accountingDesc': { en:'Tax returns, bookkeeping, payroll — manage all client work in one place with automated invoicing.', nl:'Belastingaangiften, boekhouding, salarisadministratie — beheer al uw cliëntwerk op één plek met geautomatiseerde facturatie.', fr:'Déclarations fiscales, comptabilité, paie — gérez tout le travail client en un seul endroit avec la facturation automatisée.', de:'Steuererklärungen, Buchhaltung, Lohnabrechnung — verwalten Sie alle Mandantenarbeit an einem Ort mit automatisierter Rechnungsstellung.', es:'Declaraciones fiscales, contabilidad, nóminas — gestione todo el trabajo de clientes en un solo lugar con facturación automatizada.' },
  'builtFor.law': { en:'Law firms', nl:'Advocatenkantoren', fr:'Cabinets d\'avocats', de:'Rechtsanwaltskanzleien', es:'Despachos de abogados' },
  'builtFor.lawDesc': { en:'Contract management, e-signatures, time tracking per case. Bill clients accurately every time.', nl:'Contractbeheer, e-handtekeningen, urenregistratie per zaak. Factureer cliënten elke keer nauwkeurig.', fr:'Gestion des contrats, signatures électroniques, suivi du temps par dossier. Facturez vos clients avec précision.', de:'Vertragsverwaltung, E-Signaturen, Zeiterfassung pro Fall. Rechnen Sie Mandanten jedes Mal korrekt ab.', es:'Gestión de contratos, firmas electrónicas, control de tiempo por caso. Facture a sus clientes con precisión.' },
  'builtFor.consulting': { en:'Consulting firms', nl:'Adviesbureaus', fr:'Cabinets de conseil', de:'Beratungsunternehmen', es:'Consultoras' },
  'builtFor.consultingDesc': { en:'Project-based engagements, milestone tracking, and professional client communication.', nl:'Projectgerichte opdrachten, mijlpaalbewaking en professionele cliëntcommunicatie.', fr:'Missions basées sur des projets, suivi des jalons et communication professionnelle avec les clients.', de:'Projektbasierte Aufträge, Meilensteinverfolgung und professionelle Mandantenkommunikation.', es:'Encargos basados en proyectos, seguimiento de hitos y comunicación profesional con clientes.' },
  'builtFor.bookkeepers': { en:'Bookkeepers', nl:'Boekhouders', fr:'Comptables', de:'Buchhalter', es:'Contables' },
  'builtFor.bookkeepersDesc': { en:'Organise client documents, track billable hours, and get paid faster with online invoicing.', nl:'Organiseer cliëntdocumenten, registreer factureerbare uren en word sneller betaald met online facturatie.', fr:'Organisez les documents clients, suivez les heures facturables et soyez payé plus rapidement grâce à la facturation en ligne.', de:'Organisieren Sie Mandantendokumente, erfassen Sie abrechenbare Stunden und werden Sie schneller bezahlt mit Online-Rechnungsstellung.', es:'Organice documentos de clientes, registre horas facturables y cobre más rápido con facturación en línea.' },

  // ===== PAIN POINTS =====
  'pain.title': { en:'Sound familiar?', nl:'Herkenbaar?', fr:'Ça vous parle ?', de:'Kommt Ihnen das bekannt vor?', es:'¿Le resulta familiar?' },
  'pain.subtitle': { en:'Problems firms had before switching to FirmFlow', nl:'Problemen die kantoren hadden voordat ze overstapten naar FirmFlow', fr:'Les problèmes rencontrés par les cabinets avant de passer à FirmFlow', de:'Probleme, die Kanzleien vor dem Wechsel zu FirmFlow hatten', es:'Problemas que tenían los despachos antes de pasarse a FirmFlow' },
  'pain.1': { en:'Chasing clients for signatures over email and WhatsApp', nl:'Cliënten achternazitten voor handtekeningen via e-mail en WhatsApp', fr:'Courir après les clients pour des signatures par e-mail et WhatsApp', de:'Mandanten wegen Unterschriften per E-Mail und WhatsApp hinterherlaufen', es:'Perseguir a los clientes para firmas por correo electrónico y WhatsApp' },
  'pain.2': { en:'Documents lost in email chains — nobody knows the latest version', nl:'Documenten kwijt in e-mailketens — niemand weet de laatste versie', fr:'Documents perdus dans les chaînes d\'e-mails — personne ne connaît la dernière version', de:'Dokumente gehen in E-Mail-Ketten verloren — niemand kennt die aktuelle Version', es:'Documentos perdidos en cadenas de correo — nadie sabe cuál es la última versión' },
  'pain.3': { en:'Manually tracking billable hours in spreadsheets', nl:'Handmatig factureerbare uren bijhouden in spreadsheets', fr:'Suivre manuellement les heures facturables dans des tableurs', de:'Abrechenbare Stunden manuell in Tabellen erfassen', es:'Registrar manualmente las horas facturables en hojas de cálculo' },
  'pain.4': { en:'Clients calling to ask where is my invoice', nl:'Cliënten die bellen om te vragen waar hun factuur is', fr:'Des clients qui appellent pour savoir où est leur facture', de:'Mandanten rufen an und fragen, wo ihre Rechnung ist', es:'Clientes que llaman para preguntar dónde está su factura' },
  'pain.5': { en:'Emailing sensitive financial documents with no audit trail', nl:'Gevoelige financiële documenten e-mailen zonder controletraject', fr:'Envoyer des documents financiers sensibles par e-mail sans piste d\'audit', de:'Sensible Finanzdokumente per E-Mail ohne Prüfpfad versenden', es:'Enviar documentos financieros confidenciales por correo sin registro de auditoría' },
  'pain.solves': { en:'FirmFlow solves all of these — in one platform for {price}/month', nl:'FirmFlow lost dit allemaal op — in één platform voor {price}/maand', fr:'FirmFlow résout tous ces problèmes — en une seule plateforme pour {price}/mois', de:'FirmFlow löst all diese Probleme — in einer Plattform für {price}/Monat', es:'FirmFlow resuelve todo esto — en una sola plataforma por {price}/mes' },

  // ===== HOW IT WORKS =====
  'how.title': { en:'Up and running in 20 minutes', nl:'Binnen 20 minuten operationeel', fr:'Opérationnel en 20 minutes', de:'In 20 Minuten einsatzbereit', es:'En funcionamiento en 20 minutos' },
  'how.subtitle': { en:'No training needed. No IT department. Just sign up and go.', nl:'Geen training nodig. Geen IT-afdeling. Gewoon aanmelden en beginnen.', fr:'Aucune formation nécessaire. Pas de service informatique. Inscrivez-vous et c\'est parti.', de:'Keine Schulung nötig. Keine IT-Abteilung. Einfach anmelden und loslegen.', es:'Sin necesidad de formación. Sin departamento de TI. Regístrese y empiece.' },
  'how.step1.title': { en:'Create your firm', nl:'Maak uw kantoor aan', fr:'Créez votre cabinet', de:'Erstellen Sie Ihre Kanzlei', es:'Cree su despacho' },
  'how.step1.desc': { en:'Sign up and configure your workspace — name, logo, currency, branding — in under 2 minutes.', nl:'Meld u aan en configureer uw werkruimte — naam, logo, valuta, huisstijl — in minder dan 2 minuten.', fr:'Inscrivez-vous et configurez votre espace de travail — nom, logo, devise, identité visuelle — en moins de 2 minutes.', de:'Melden Sie sich an und konfigurieren Sie Ihren Arbeitsbereich — Name, Logo, Währung, Branding — in unter 2 Minuten.', es:'Regístrese y configure su espacio de trabajo — nombre, logotipo, moneda, marca — en menos de 2 minutos.' },
  'how.step2.title': { en:'Invite your clients', nl:'Nodig uw cliënten uit', fr:'Invitez vos clients', de:'Laden Sie Ihre Mandanten ein', es:'Invite a sus clientes' },
  'how.step2.desc': { en:'Add clients with one click. They get their own branded portal with login credentials by email.', nl:'Voeg cliënten toe met één klik. Ze krijgen hun eigen portaal met inloggegevens per e-mail.', fr:'Ajoutez des clients en un clic. Ils reçoivent leur propre portail avec leurs identifiants par e-mail.', de:'Fügen Sie Mandanten mit einem Klick hinzu. Sie erhalten ihr eigenes Portal mit Zugangsdaten per E-Mail.', es:'Añada clientes con un solo clic. Reciben su propio portal con credenciales de acceso por correo electrónico.' },
  'how.step3.title': { en:'Upload and sign', nl:'Upload en onderteken', fr:'Téléchargez et signez', de:'Hochladen und unterschreiben', es:'Suba y firme' },
  'how.step3.desc': { en:'Share documents, request e-signatures, assign tasks, and track everything in real-time.', nl:'Deel documenten, vraag e-handtekeningen aan, wijs taken toe en volg alles in realtime.', fr:'Partagez des documents, demandez des signatures électroniques, assignez des tâches et suivez tout en temps réel.', de:'Teilen Sie Dokumente, fordern Sie E-Signaturen an, weisen Sie Aufgaben zu und verfolgen Sie alles in Echtzeit.', es:'Comparta documentos, solicite firmas electrónicas, asigne tareas y haga seguimiento de todo en tiempo real.' },
  'how.step4.title': { en:'Get paid faster', nl:'Word sneller betaald', fr:'Soyez payé plus vite', de:'Schneller bezahlt werden', es:'Cobre más rápido' },
  'how.step4.desc': { en:'Generate invoices, accept online payments, set up recurring billing automatically.', nl:'Maak facturen, accepteer online betalingen en stel automatische terugkerende facturatie in.', fr:'Générez des factures, acceptez les paiements en ligne et automatisez la facturation récurrente.', de:'Erstellen Sie Rechnungen, akzeptieren Sie Online-Zahlungen und richten Sie wiederkehrende Abrechnung ein.', es:'Genere facturas, acepte pagos en línea y configure la facturación recurrente automáticamente.' },

  // ===== FEATURES =====
  'features.title': { en:'Everything your firm needs', nl:'Alles wat uw kantoor nodig heeft', fr:'Tout ce dont votre cabinet a besoin', de:'Alles, was Ihre Kanzlei braucht', es:'Todo lo que su despacho necesita' },
  'features.subtitle': { en:'One platform to replace your entire tool stack', nl:'Eén platform ter vervanging van al uw tools', fr:'Une plateforme pour remplacer tous vos outils', de:'Eine Plattform, die Ihren gesamten Tool-Stack ersetzt', es:'Una plataforma para reemplazar todas sus herramientas' },

  // ===== LOGIN =====
  'login.title': { en:'Sign in to FirmFlow', nl:'Inloggen bij FirmFlow', fr:'Se connecter à FirmFlow', de:'Bei FirmFlow anmelden', es:'Iniciar sesión en FirmFlow' },
  'login.email': { en:'Email address', nl:'E-mailadres', fr:'Adresse e-mail', de:'E-Mail-Adresse', es:'Dirección de correo electrónico' },
  'login.password': { en:'Password', nl:'Wachtwoord', fr:'Mot de passe', de:'Passwort', es:'Contraseña' },
  'login.forgotPassword': { en:'Forgot password?', nl:'Wachtwoord vergeten?', fr:'Mot de passe oublié ?', de:'Passwort vergessen?', es:'¿Olvidó su contraseña?' },
  'login.button': { en:'Sign in', nl:'Inloggen', fr:'Se connecter', de:'Anmelden', es:'Iniciar sesión' },
  'login.noAccount': { en:'Don\'t have an account?', nl:'Nog geen account?', fr:'Pas encore de compte ?', de:'Noch kein Konto?', es:'¿No tiene cuenta?' },
  'login.createAccount': { en:'Create one →', nl:'Maak er een aan →', fr:'Créez-en un →', de:'Konto erstellen →', es:'Cree una →' },

  // ===== SIGNUP =====
  'signup.title': { en:'Create your firm workspace', nl:'Maak uw kantoorwerkruimte aan', fr:'Créez l\'espace de travail de votre cabinet', de:'Erstellen Sie Ihren Kanzlei-Arbeitsbereich', es:'Cree el espacio de trabajo de su despacho' },
  'signup.trialBadge': { en:'Free 14-day trial — no credit card needed', nl:'14 dagen gratis proberen — geen creditcard nodig', fr:'Essai gratuit de 14 jours — sans carte bancaire', de:'14 Tage kostenlos testen — keine Kreditkarte nötig', es:'Prueba gratuita de 14 días — sin tarjeta de crédito' },
  'signup.replaceTools': { en:'Replace ShareFile + DocuSign + time tracking in one tool for', nl:'Vervang ShareFile + DocuSign + urenregistratie in één tool voor', fr:'Remplacez ShareFile + DocuSign + suivi du temps en un seul outil pour', de:'Ersetzen Sie ShareFile + DocuSign + Zeiterfassung in einem Tool für', es:'Reemplace ShareFile + DocuSign + control de tiempo en una herramienta por' },
  'signup.fullName': { en:'Your full name', nl:'Uw volledige naam', fr:'Votre nom complet', de:'Ihr vollständiger Name', es:'Su nombre completo' },
  'signup.firmName': { en:'Firm name', nl:'Kantoornaam', fr:'Nom du cabinet', de:'Kanzleiname', es:'Nombre del despacho' },
  'signup.passwordHint': { en:'Password (min 6 characters)', nl:'Wachtwoord (minimaal 6 tekens)', fr:'Mot de passe (6 caractères minimum)', de:'Passwort (mindestens 6 Zeichen)', es:'Contraseña (mínimo 6 caracteres)' },
  'signup.button': { en:'Start free trial →', nl:'Gratis proefperiode starten →', fr:'Commencer l\'essai gratuit →', de:'Kostenlose Testphase starten →', es:'Comenzar prueba gratuita →' },
  'signup.hasAccount': { en:'Already have an account?', nl:'Heeft u al een account?', fr:'Vous avez déjà un compte ?', de:'Bereits ein Konto?', es:'¿Ya tiene una cuenta?' },
  'signup.terms': { en:'By signing up, you agree to our', nl:'Door u aan te melden, gaat u akkoord met onze', fr:'En vous inscrivant, vous acceptez nos', de:'Mit Ihrer Anmeldung stimmen Sie unseren', es:'Al registrarse, acepta nuestros' },
  'signup.termsLink': { en:'Terms', nl:'Voorwaarden', fr:'Conditions', de:'Nutzungsbedingungen', es:'Términos' },
  'signup.privacyLink': { en:'Privacy Policy', nl:'Privacybeleid', fr:'Politique de confidentialité', de:'Datenschutzerklärung', es:'Política de privacidad' },
  'signup.creating': { en:'Creating your workspace...', nl:'Uw werkruimte wordt aangemaakt...', fr:'Création de votre espace de travail...', de:'Ihr Arbeitsbereich wird erstellt...', es:'Creando su espacio de trabajo...' },

  // ===== PRICING =====
  'pricing.title': { en:'Simple, transparent pricing', nl:'Eenvoudige, transparante prijzen', fr:'Des tarifs simples et transparents', de:'Einfache, transparente Preise', es:'Precios simples y transparentes' },
  'pricing.subtitle': { en:'No per-user fees. No hidden costs. No contracts. 14-day free trial.', nl:'Geen kosten per gebruiker. Geen verborgen kosten. Geen contracten. 14 dagen gratis.', fr:'Pas de frais par utilisateur. Pas de coûts cachés. Sans engagement. 14 jours d\'essai gratuit.', de:'Keine Kosten pro Nutzer. Keine versteckten Kosten. Keine Verträge. 14 Tage kostenlos.', es:'Sin tarifas por usuario. Sin costes ocultos. Sin contratos. 14 días de prueba gratis.' },
  'pricing.starter': { en:'Starter', nl:'Starter', fr:'Starter', de:'Starter', es:'Starter' },
  'pricing.starterDesc': { en:'Perfect for solo practitioners and small firms', nl:'Ideaal voor zelfstandigen en kleine kantoren', fr:'Parfait pour les indépendants et les petits cabinets', de:'Ideal für Einzelunternehmer und kleine Kanzleien', es:'Perfecto para profesionales independientes y pequeños despachos' },
  'pricing.pro': { en:'Pro', nl:'Pro', fr:'Pro', de:'Pro', es:'Pro' },
  'pricing.proDesc': { en:'For growing firms that want everything', nl:'Voor groeiende kantoren die alles willen', fr:'Pour les cabinets en croissance qui veulent tout', de:'Für wachsende Kanzleien, die alles wollen', es:'Para despachos en crecimiento que lo quieren todo' },
  'pricing.flatPrice': { en:'Flat price — not per user!', nl:'Vast tarief — niet per gebruiker!', fr:'Prix fixe — pas par utilisateur !', de:'Festpreis — nicht pro Nutzer!', es:'Precio fijo — ¡no por usuario!' },
  'pricing.mostPopular': { en:'MOST POPULAR', nl:'MEEST GEKOZEN', fr:'LE PLUS POPULAIRE', de:'BELIEBTESTE WAHL', es:'MÁS POPULAR' },
  'pricing.perMonth': { en:'/month', nl:'/maand', fr:'/mois', de:'/Monat', es:'/mes' },
  'pricing.trialInfo': { en:'14 days free · No card needed', nl:'14 dagen gratis · Geen kaart nodig', fr:'14 jours gratuits · Sans carte', de:'14 Tage gratis · Keine Karte nötig', es:'14 días gratis · Sin tarjeta' },
  'pricing.enterprise': { en:'Need more?', nl:'Meer nodig?', fr:'Besoin de plus ?', de:'Mehr benötigt?', es:'¿Necesita más?' },
  'pricing.contactUs': { en:'Contact us for Enterprise pricing →', nl:'Neem contact op voor Enterprise-prijzen →', fr:'Contactez-nous pour les tarifs Entreprise →', de:'Kontaktieren Sie uns für Enterprise-Preise →', es:'Contáctenos para precios Enterprise →' },

  // ===== CTA =====
  'cta.title': { en:'Ready to transform your firm?', nl:'Klaar om uw kantoor te transformeren?', fr:'Prêt à transformer votre cabinet ?', de:'Bereit, Ihre Kanzlei zu transformieren?', es:'¿Listo para transformar su despacho?' },
  'cta.subtitle': { en:'Join 500+ accounting, legal and consulting firms already using FirmFlow.', nl:'Sluit u aan bij 500+ accountants-, advocaten- en adviesbureaus die FirmFlow al gebruiken.', fr:'Rejoignez plus de 500 cabinets comptables, juridiques et de conseil qui utilisent déjà FirmFlow.', de:'Schließen Sie sich über 500 Steuer-, Rechtsanwalts- und Beratungskanzleien an, die FirmFlow bereits nutzen.', es:'Únase a más de 500 despachos contables, jurídicos y de consultoría que ya usan FirmFlow.' },
  'cta.setup': { en:'Set up in 20 minutes. No training needed. No contracts.', nl:'Binnen 20 minuten operationeel. Geen training nodig. Geen contracten.', fr:'Opérationnel en 20 minutes. Aucune formation nécessaire. Sans engagement.', de:'In 20 Minuten einsatzbereit. Keine Schulung nötig. Keine Verträge.', es:'Configuración en 20 minutos. Sin necesidad de formación. Sin contratos.' },
  'cta.button': { en:'Start your free 14-day trial →', nl:'Start uw gratis proefperiode van 14 dagen →', fr:'Commencez votre essai gratuit de 14 jours →', de:'Starten Sie Ihre kostenlose 14-Tage-Testphase →', es:'Comience su prueba gratuita de 14 días →' },
  'cta.noCreditCard': { en:'No credit card required', nl:'Geen creditcard vereist', fr:'Aucune carte bancaire requise', de:'Keine Kreditkarte erforderlich', es:'No se requiere tarjeta de crédito' },

  // ===== FOOTER =====
  'footer.description': { en:'The all-in-one client portal and practice management platform for professional firms worldwide.', nl:'Het alles-in-één klantenportaal en praktijkbeheerplatform voor professionele kantoren wereldwijd.', fr:'Le portail client et la plateforme de gestion de cabinet tout-en-un pour les cabinets professionnels du monde entier.', de:'Das All-in-One-Kundenportal und Kanzleimanagement-Plattform für professionelle Kanzleien weltweit.', es:'El portal de clientes todo-en-uno y plataforma de gestión para despachos profesionales en todo el mundo.' },
  'footer.product': { en:'Product', nl:'Product', fr:'Produit', de:'Produkt', es:'Producto' },
  'footer.forFirms': { en:'For firms', nl:'Voor kantoren', fr:'Pour les cabinets', de:'Für Kanzleien', es:'Para despachos' },
  'footer.contact': { en:'Contact', nl:'Contact', fr:'Contact', de:'Kontakt', es:'Contacto' },
  'footer.response': { en:'Response within 24 hours', nl:'Reactie binnen 24 uur', fr:'Réponse sous 24 heures', de:'Antwort innerhalb von 24 Stunden', es:'Respuesta en 24 horas' },
  'footer.rights': { en:'All rights reserved', nl:'Alle rechten voorbehouden', fr:'Tous droits réservés', de:'Alle Rechte vorbehalten', es:'Todos los derechos reservados' },
}

export function t(key: string, locale: Locale, vars?: Record<string, string>): string {
  const entry = translations[key]
  if (!entry) return key
  let text = entry[locale] || entry['en'] || key
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace('{' + k + '}', v)
    })
  }
  return text
}

export default translations
