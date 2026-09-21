HUNARSTACK COMPLETE PACKAGE
===========================

LIVE PRODUCT (use this)
app/                    The full React academy: public site, login, student / instructor / admin.
                        Demo data is stored in the visitor’s browser (localStorage). It is not a
                        payment gateway and it does not place freelance clients.

  Demo logins
    student@hunarstack.com     / student123
    instructor@hunarstack.com  / teach123
    admin@hunarstack.com       / admin123

BACKUP STATIC SITE
website/                Older HTML-only copy. Keep as backup. Do not upload internal-not-public/.

brand/  presentations/  Logo and pitch files
internal-not-public/    PRIVATE. Never upload this folder.

HOW TO GO LIVE ON NETLIFY (free)
1. On your computer:  cd app && npm install && npm run build
2. Create a free account at https://app.netlify.com
3. Add new site → Deploy manually → drag the app/dist folder onto the page
4. You get a free address like https://random-name.netlify.app
5. Buy hunarstack.com (see domain steps below), then in Netlify:
   Domain management → Add custom domain → hunarstack.com
   Follow the DNS records it shows. HTTPS is automatic.

HOW TO GO LIVE ON VERCEL (free)
1. cd app && npm install && npm run build
2. Create a free account at https://vercel.com
3. Add New Project → upload the app folder, or run: npx vercel
4. Add hunarstack.com in Project → Settings → Domains

BUY THE DOMAIN (you pay the registrar; nobody else can buy it for you)
hunarstack.com was not registered in a public .com lookup (Sep 2026) — confirm on
the registrar before you pay. Typical first-year price is about US$8–13.

  Cheapest / cleanest:  https://porkbun.com   or  https://domains.cloudflare.com
  Also fine:            https://www.namecheap.com

  Steps
  1. Search hunarstack.com → Add to cart → pay with your card
  2. Turn on WHOIS privacy (usually free)
  3. Point DNS at Netlify or Vercel using the nameservers or A/CNAME records
     they give you (do not guess IPs)
  4. Optional email: Zoho Mail free / Cloudflare Email Routing / Google Workspace

FILL IN BEFORE YOU TREAT THIS AS A REAL ACADEMY
- Real WhatsApp, office hours and legal entity (Homepage → Academy contact, Privacy, Terms)
- Have a lawyer review Privacy and Terms
- This demo does not charge cards. Record fees in the admin Fees screen in person.
- We do not promise clients, jobs or income.

IMPORTANT
- Never upload internal-not-public/
- Check the Hunarstack name on Google and your local trademark registry
