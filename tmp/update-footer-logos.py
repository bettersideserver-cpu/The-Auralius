from pathlib import Path
import re

pages = {
    'villas': ('index-44HmiY3s.js', 'b'),
    'amenities': ('index-BO5lQLjI.js', 'h'),
    'plans': ('index-CjmbpqUa.js', 'f'),
    'developers': ('index-C87SnspF.js', 'f'),
}
for page, (filename, jsx) in pages.items():
    path = Path(page) / 'assets' / filename
    source = path.read_text(encoding='utf-8')
    marker = f'{jsx}.jsxDEV("div",{{className:"flex items-center justify-center gap-3 md:justify-start"'
    assert source.count(marker) == 1, page
    start = source.index(marker)
    end = source.index(f',{jsx}.jsxDEV("a",{{href:"https://www.suryarealty.co.in"', start)
    replacement = f'{jsx}.jsxDEV("img",{{src:"../developers/images/surya-realty-logo.png",alt:"Surya Realty",className:"surya-realty-footer-logo",width:1400,height:555,loading:"lazy"}})'
    source = source[:start] + replacement + source[end:]
    path.write_text(source, encoding='utf-8')
    print('Updated footer:', page)

home = Path('assets/site.js')
source = home.read_text(encoding='utf-8')
old = 'D.jsxDEV("p", { className: "label text-paper/50", children: "www.suryarealty.co.in" }'
new = 'D.jsxDEV("a", { href: "https://www.suryarealty.co.in", target: "_blank", rel: "noreferrer", className: "home-surya-footer-brand", children: [D.jsxDEV("img", { src: "./developers/images/surya-realty-logo.png", alt: "Surya Realty", className: "surya-realty-footer-logo", width: 1400, height: 555, loading: "lazy" }), D.jsxDEV("span", { className: "label text-paper/50", children: "www.suryarealty.co.in" })] }'
assert source.count(old) == 1
home.write_text(source.replace(old, new), encoding='utf-8')

for filename in ['index.html', *[f'{page}/index.html' for page in pages], 'location/auralius-location-static/index.html']:
    path = Path(filename)
    source = path.read_text(encoding='utf-8')
    source = re.sub(r'(brochure-updates\.css\?v=)[^"\s]+',r'\g<1>20261118-all-footer-logos',source)
    if filename == 'index.html':
        source = re.sub(r'(\./assets/site\.js\?v=)[^"\s]+',r'\g<1>20261118-footer-logo',source)
    elif filename.split('/')[0] in pages:
        bundle = pages[filename.split('/')[0]][0]
        source = re.sub(r'(' + re.escape(bundle) + r'\?v=)[^"\s]+',r'\g<1>20261118-footer-logo',source)
    path.write_text(source, encoding='utf-8')
print('Homepage bottom branding and all six page cache references updated.')
