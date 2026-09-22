THE AURALIUS — static site
==========================

Everything needed is in this folder. index.html is the entry point.

HOW TO PUT IT ONLINE
1. Upload the CONTENTS of this folder (not the folder itself) to the root of
   your web host / domain — e.g. public_html, www, or the root of an S3 bucket.
2. Open your domain. That's it. No build step, no server, no Node required.

Drag-and-drop hosts (easiest): netlify.com/drop or vercel.com — drop this
folder in and you get a live link in seconds.

IMPORTANT
- The site must be served from the ROOT of a domain or subdomain
  (example.com or auralius.example.com), NOT from a sub-folder like
  example.com/site/ — asset paths are absolute (/images/..., /assets/...).
- _redirects is for Netlify (single-page routing). Harmless elsewhere.
- Videos (hero-loop, mist-scrub) are the largest files; keep them, the hero
  and the scroll sequence need them.

LOCAL PREVIEW
Open a terminal in this folder and run:  python3 -m http.server 8080
then visit http://localhost:8080
(Opening index.html directly with file:// will not load the assets.)
