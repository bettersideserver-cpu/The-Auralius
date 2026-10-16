const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
class Element {
  constructor() { this.dataset = {}; this.style = {}; this.attrs = {}; this.queries = {}; this.events = {}; this.classList = {add(){},remove(){}}; this.clientWidth=1200; this.clientHeight=800; this.scrollLeft=0; this.scrollTop=0; }
  set id(id) { this._id=id; nodes.set(id,this); }
  get id() { return this._id; }
  querySelector(selector) { return this.queries[selector] ||= new Element(); }
  querySelectorAll(selector) {
    const options = {'[data-block]':['1','2','3','4','5'],'[data-unit]':['A','B','C'],'[data-floor]':['ground','first','attic'],'[data-zoom]':['out','in','fit','original']};
    const key=selector.slice(6,-1);
    return options[selector].map(value=>{const node=this.querySelector(`[data-${key}="${value}"]`);node.dataset[key]=value;return node;});
  }
  setAttribute(key,value) { this.attrs[key]=value; }
  before(node) { nodes.set(node.id,node); }
  addEventListener(event,handler) { (this.events[event] ||= []).push(handler); }
  emit(event,props={}) { for(const fn of this.events[event]||[])fn({target:this,preventDefault(){},...props}); }
  showModal() { this.open=true; }
  close() { this.open=false; this.emit('close'); }
  focus() { this.focused=true; }
  setPointerCapture() {}
}
const root = new Element(); root.id='root';
let mount;
vm.runInNewContext(fs.readFileSync('assets/plans-brochure.js','utf8'),{document:{getElementById:id=>nodes.get(id),createElement:()=>new Element(),body:new Element()},window:{addEventListener(){}},MutationObserver:class{constructor(callback){mount=callback;}observe(){}}});
const section=nodes.get('brochure-floor-plans');
assert(section);
fs.writeFileSync('tmp/floor-viewer-markup.html',section.innerHTML);
const blockButtons=section.querySelectorAll('[data-block]');
const unitButtons=section.querySelectorAll('[data-unit]');
const floors=section.querySelectorAll('[data-floor]');
const image=section.querySelector('.brochure-plan-image-button img');
const available={1:['A','B','C'],2:['A','B'],3:['A','B','C'],4:['A','B'],5:['A','B']};
let combinations=0;
for(const block of blockButtons){
  block.emit('click');
  for(const unit of unitButtons){
    assert.equal(unit.disabled,!available[block.dataset.block].includes(unit.dataset.unit));
    if(unit.disabled)continue;
    unit.emit('click');
    for(const floor of floors){
      floor.emit('click'); combinations++;
      assert.equal(image.src,`./images/floormaps/block-${block.dataset.block}-${floor.dataset.floor}-preview.webp`);
      assert(fs.existsSync('plans/'+image.src));
      const link=section.querySelector('.brochure-plan-download');
      assert(fs.existsSync('plans/'+link.href));
      assert(section.querySelector('.brochure-plan-caption').textContent.includes(`Unit ${unit.dataset.unit}`));
    }
  }
}
assert.equal(combinations,36);
const open=section.querySelector('.brochure-plan-image-button');
const dialog=section.querySelector('dialog');
const imageLarge=dialog.querySelector('img');
imageLarge.complete=true; imageLarge.naturalWidth=4500; imageLarge.naturalHeight=4400;
open.emit('click'); assert.equal(dialog.open,true);
const fitted=parseInt(imageLarge.style.width);
assert(fitted<1200);
dialog.querySelector('[data-zoom="in"]').emit('click'); assert(parseInt(imageLarge.style.width)>fitted);
dialog.querySelector('[data-zoom="original"]').emit('click'); assert.equal(imageLarge.style.width,'4500px');
dialog.querySelector('[data-zoom="fit"]').emit('click'); assert.equal(parseInt(imageLarge.style.width),fitted);
dialog.emit('keydown',{key:'+'}); assert(parseInt(imageLarge.style.width)>fitted);
dialog.querySelector('[data-viewer-close]').emit('click'); assert.equal(dialog.open,false); assert.equal(open.focused,true);
mount(); assert.equal(nodes.get('brochure-floor-plans'),section);
console.log('PASS: 36 block/unit/floor combinations, availability, assets, zoom, original size, fit, keyboard zoom, close/focus and idempotent mount.');
