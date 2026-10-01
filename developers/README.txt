The Auralius — The Developers (static build)

Open index.html via any web server (it renders the Developers page).
Quick local test:  python3 -m http.server 8000   then visit http://localhost:8000

Works from any folder (relative paths).
Hosting with clean URLs (e.g. /plans) needs an SPA fallback to index.html:
 - Netlify: _redirects ->  /*  /index.html  200
 - Vercel: rewrites all routes to /index.html
 - Apache: FallbackResource /index.html
 - Nginx: try_files $uri /index.html;

Enquiry form opens the visitor's email app (mailto: info@suryarealty.co.in).
