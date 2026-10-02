The Auralius — Plans & Specifications (static build)

Open index.html via any web server (it renders the Plans page).
Quick local test:  python3 -m http.server 8000   then visit http://localhost:8000

Works from any folder (relative paths).
Hosting with clean URLs (e.g. /plans) needs an SPA fallback to index.html:
 - Netlify: _redirects ->  /*  /index.html  200
 - Vercel: rewrites all routes to /index.html
 - Apache: FallbackResource /index.html
 - Nginx: try_files $uri /index.html;

Replace floor plans: images/plans/site-plan.png, ground-floor.png, first-floor.png, attic-floor.png (same filenames).
The shared ../assets/plans-layout.js places the site plan in the hero and shows floor plans before the villa collections.
Enquiry form opens the visitor's email app (mailto: info@suryarealty.co.in).
