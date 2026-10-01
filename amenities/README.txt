THE AURALIUS — static site export
=================================

Open index.html in a browser, or upload the whole folder to any static host
(Netlify, Vercel, S3, cPanel, GitHub Pages, a plain /public_html folder).

WHAT LOADS
  index.html  →  the AMENITIES page

All asset paths are relative, so the folder works from the domain root or from
any sub-folder (example.com/auralius/) without editing anything.

OTHER PAGES
  The bundle also contains the Location page (/location) and The Villas page
  (/villas), which the top navigation links to. These are client-side routes,
  so they need the host to serve index.html for unknown paths (SPA fallback):

    Netlify   — add a _redirects file containing:   /*  /index.html  200
    Vercel    — add vercel.json with a rewrite of "/(.*)" to "/index.html"
    Apache    — add .htaccess with FallbackResource /index.html
    Nginx     — try_files $uri $uri/ /index.html;

  Without a fallback, index.html still renders the Amenities page correctly —
  only the Location and Villas nav links will 404.

THE ENQUIRY FORM
  There is no backend in this export. "SEND NOW" opens the visitor's mail
  client with the enquiry pre-filled, addressed to info@suryarealty.co.in.
  To collect submissions in a database instead, use the hosted version.

CONTENTS
  index.html      the page
  assets/         compiled CSS + JS
  images/         photography
  favicon.ico     browser tab icon
  og-image.png    social share preview image
  runable.js      unused legacy helper; the page does not load it

PHOTOGRAPHY
  Images are licensed stock placeholders standing in for the real property
  shoot. Swap the files in images/ (same filenames) to use your own.
