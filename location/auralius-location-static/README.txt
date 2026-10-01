THE AURALIUS — LOCATION PAGE
Static build. Drop-in ready.
================================================================

WHAT'S IN HERE

  index.html              the page — this is your entry point
  assets/                 compiled CSS + JS (hashed filenames)
  images/                 the four photographs used on the page
  favicon.ico
  og-image.png            social share image
  runable.js              unused legacy analytics shim


HOW TO USE IT

Upload the whole folder anywhere on your server and link to
index.html. Every path inside is RELATIVE, so it works from the
web root or from any sub-folder, no config needed:

  yoursite.com/location/            -> upload contents to /location/
  yoursite.com/pages/location.html  -> also fine

To link it from your home page nav:

  <a href="/location/">Location</a>


THE NAVIGATION BAR

The nav at the top currently points at in-page anchors. Change the
hrefs in your home page's nav to match, or edit them here. They live
in the compiled JS, so if you need them changed, ask and I'll
rebuild with your real URLs — don't hand-edit assets/*.js.


THE ENQUIRY FORM  (important)

This is a static file, so there is no server behind the form. On
submit it tries the API, fails, and then offers the visitor a
prefilled email to info@suryarealty.co.in instead. Nothing is lost,
but nothing is stored either.

To capture enquiries properly, pick one:
  - point the form at your existing backend endpoint
  - use a form service (Formspree, Basin, Web3Forms)
  - host the full app version, which has a real database

Ask and I'll wire up whichever you prefer.


IMAGES ARE PLACEHOLDERS

All four files in images/ are temporary stand-ins:

  hero-location.jpg       hero background      1920x1080 or larger
  dharampur-aerial.jpg    Dharampur town       1600x1200, 4:3
  toy-train.jpg           Kalka-Shimla train   1200x900,  4:3
  connect-interior.jpg    villa interior       1600x1000 or larger

Replace them keeping the SAME filenames and the page picks them up
with no other changes. Match the aspect ratios above or the crops
will shift.

