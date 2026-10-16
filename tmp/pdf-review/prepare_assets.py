from pathlib import Path
from pypdf import PdfReader
import hashlib, json, zipfile

root = Path('D:/auralis')
protected = list((root / 'plans').rglob('*')) + [root / 'assets/site.js', root / 'assets/plans-layout.js', root / 'assets/plans-brochure.js']
hashes = {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest() for p in protected if p.is_file()}
(root / 'tmp/pdf-review/protected-hashes.json').write_text(json.dumps(hashes, indent=2))
pdf = PdfReader(root / 'Surya Realty _ Profile (1).pdf')
for page, image_name, slug in [(18, 'Im2663.jpg', 'opus-one'), (21, 'Im2732.jpg', 'tangori-group-housing'), (22, 'Im2755.jp2', 'jujhar-it-building')]:
    source = next(i for i in pdf.pages[page-1].images if i.name == image_name)
    target = root / f'images/projects/{slug}.webp'
    source.image.convert('RGB').save(target, 'WEBP', lossless=True, method=6)
    print(slug, source.image.size, target.stat().st_size)
with zipfile.ZipFile(root / 'tmp/pdf-review/dominos-logos.zip') as archive:
    svg = archive.read('logos_svg/DPZ_2025_Logo_CombinationMark_Vertical_Blue_RGB.svg')
    (root / 'location/auralius-location-static/images/brands/dominos.svg').write_bytes(svg)
print('Saved official Domino logo and protected-file hashes.')
