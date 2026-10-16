from pathlib import Path
import json

bundle = Path('amenities/assets/index-BO5lQLjI.js')
source = bundle.read_text(encoding='utf-8')
labels = [
    'EV charging station',
    'State-of-the-art fire fighting system',
    'Video door phone',
    'CCTV monitoring of key common areas',
    'Gas detector in kitchen',
    'Home automation',
    'Emergency alarm in each residence',
    'Panic button in each residence',
    'Round-the-clock concierge service',
    'Butler on call',
    '24×7 laundry service',
    'Medical facility',
    'Elegant facade with striking elevation',
    'Designer lifts',
    'Water feature',
    'Club house',
    'All-weather swimming pool',
    'World-class luxury spa',
    'Yoga / meditation studio',
    'Common playground',
    'Well-equipped fitness centre',
    'Walking trail',
    'Senior citizen friendly zone',
    'Conference / meeting room',
]
start = source.index('const oR=')
end = source.index('function cR()', start)
replacement = '''const oR=LABELS;
function uR(){return h.jsxDEV("section",{id:"amenities",className:"amenities-catalogue",children:h.jsxDEV("div",{className:"amenities-catalogue-wrap",children:[
  h.jsxDEV("div",{className:"amenities-catalogue-heading",children:[
    h.jsxDEV("p",{className:"label",children:"On the estate"}),
    h.jsxDEV("h2",{children:"Amenities & services"}),
    h.jsxDEV("p",{className:"amenities-catalogue-count",children:"24 considered details for life at The Auralius."})
  ]}),
  h.jsxDEV("ol",{className:"amenities-catalogue-list","aria-label":"Estate amenities and services",children:oR.map((label,index)=>h.jsxDEV("li",{children:[
    h.jsxDEV("span",{className:"amenities-catalogue-number","aria-hidden":true,children:String(index+1).padStart(2,"0")}),
    h.jsxDEV("span",{className:"amenities-catalogue-name",children:label})
  ]},label))})
]})})}
'''.replace('LABELS', json.dumps(labels, ensure_ascii=False))
source = source[:start] + replacement + source[end:]
old = '{value:"Eight",label:"Shared amenities"}'
assert source.count(old) == 1
source = source.replace(old, '{value:"24",label:"Amenities & services"}')
bundle.write_text(source, encoding='utf-8')
index = Path('amenities/index.html')
markup = index.read_text(encoding='utf-8').replace('v=20261007-render-hero', 'v=20261014-amenities-order')
markup = markup.replace('</head>', '\t\t<link rel="stylesheet" href="./assets/amenities-catalogue.css?v=20261014-order">\n</head>')
index.write_text(markup, encoding='utf-8')
print('Updated all 24 amenities, two-column reading order and section count.')
