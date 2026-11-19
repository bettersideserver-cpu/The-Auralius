from pathlib import Path
import re

shared=Path('assets/brochure-updates.js')
s=shared.read_text(encoding='utf-8')
start=s.index('    addSection("csr",')
end=s.index('\n  }\n\n  function mountVillas()',start)
s=s[:start]+s[end:]
anchor='<a class="developer-story-link" href="./developers/">Meet the developer <span aria-hidden="true">↗</span></a>'
assert s.count(anchor)==1
s=s.replace(anchor,anchor+'\n          <a class="developer-story-link developer-csr-link" href="./csr/">CSR initiatives <span aria-hidden="true">↗</span></a>')
shared.write_text(s,encoding='utf-8')

bundles={
 'villas/assets/index-44HmiY3s.js':'b',
 'amenities/assets/index-BO5lQLjI.js':'h',
 'plans/assets/index-CjmbpqUa.js':'f',
 'developers/assets/index-C87SnspF.js':'f',
 'location/auralius-location-static/assets/index-biYRCFml.js':'E',
}
for filename,jsx in bundles.items():
 p=Path(filename);s=p.read_text(encoding='utf-8')
 marker='fileName:"/home/user/auralius/packages/web/src/web/components/site-footer.tsx",lineNumber:27,columnNumber:11},this)'
 assert s.count(marker)==1,filename
 href='../../csr/' if filename.startswith('location/') else '../csr/'
 s=s.replace(marker,marker+f',{jsx}.jsxDEV("a",{{href:"{href}",className:"footer-csr-link",children:"CSR initiatives"}})')
 p.write_text(s,encoding='utf-8')

p=Path('assets/site.js');s=p.read_text(encoding='utf-8')
marker='D.jsxDEV("p", { className: "label text-paper/40"'
assert s.count(marker)==1
s=s.replace(marker,'D.jsxDEV("a", { href: "./csr/", className: "footer-csr-link", children: "CSR initiatives" }), '+marker)
p.write_text(s,encoding='utf-8')

for filename in ['index.html','villas/index.html','amenities/index.html','plans/index.html','developers/index.html','location/auralius-location-static/index.html']:
 p=Path(filename);s=p.read_text(encoding='utf-8')
 s=re.sub(r'((?:brochure-updates\.(?:css|js)|site\.js|index-(?:44HmiY3s|BO5lQLjI|CjmbpqUa|C87SnspF|biYRCFml)\.js)\?v=)[^"\s]+',r'\g<1>20261118-csr-page',s)
 if filename=='index.html':
  s=s.replace('<a href="./developers/">Developers</a>','<a href="./developers/">Developers</a>\n\t\t\t\t\t<a href="./csr/">CSR</a>')
 p.write_text(s,encoding='utf-8')
print('Moved CSR to its own page; homepage section removed; links added across all six existing pages.')
