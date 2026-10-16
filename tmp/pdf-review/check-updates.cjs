// Exercise the injected sections and viewer events without a browser dependency.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('assets/brochure-updates.js', 'utf8');
const captures = {};
function run(page) {
  const ids = new Map();
  let callback, moves = 0;
  class Element {
    constructor(id) { this.children = []; this.dataset = {}; this.style = {}; this.events = {}; this.queries = {}; this.innerHTML = ''; if (id) this.id = id; }
    set id(value) { this._id = value; ids.set(value, this); }
    get id() { return this._id; }
    get nextElementSibling() { return this.parentElement?.children[this.parentElement.children.indexOf(this) + 1]; }
    insert(node, index) { if (node.parentElement) { const prev = node.parentElement; const at = prev.children.indexOf(node); prev.children.splice(at, 1); if (prev === this && at < index) index--; } this.children.splice(index, 0, node); node.parentElement = this; moves++; }
    append(node) { this.insert(node, this.children.length); }
    before(node) { this.parentElement.insert(node, this.parentElement.children.indexOf(this)); }
    after(node) { this.parentElement.insert(node, this.parentElement.children.indexOf(this) + 1); }
    querySelector(selector) {
      if (selector.startsWith('header')) return null;
      if (selector.includes('#')) return ids.get(selector.split('#')[1]) || null;
      return this.queries[selector] ||= new Element();
    }
    querySelectorAll(selector) {
      if (selector === '[data-plan-zoom]') return ['out','in','reset'].map(key => { const b = this.querySelector(`[data-plan-zoom="${key}"]`); b.dataset.planZoom = key; return b; });
      return selector.split(', ').map(key => this.querySelector(key));
    }
    addEventListener(name, handler) { (this.events[name] ||= []).push(handler); }
    emit(name, event = {}) { for (const fn of this.events[name] || []) fn({ target: this, ...event }); }
    showModal() { this.open = true; }
    close() { this.open = false; this.emit('close'); }
    focus() { this.focused = true; }
  }
  const root = new Element('root');
  for (const id of ['top', 'estate', 'location', 'amenities', 'register']) root.append(new Element(id));
  const classes = new Set(page === 'home' ? [] : ['inner-page', `page-${page}`]);
  vm.runInNewContext(source, { document: { getElementById: id => ids.get(id), createElement: () => new Element(), body: { classList: { contains: key => classes.has(key) } } }, MutationObserver: class { constructor(fn) { callback = fn; } observe() {} } });
  const afterFirst = moves;
  callback(); callback();
  assert.equal(moves, afterFirst, `${page}: repeated mount must not move or duplicate sections`);
  for (const [id, node] of ids) if (node.innerHTML) captures[id] = node.innerHTML;
  if (page === 'home') {
    assert.equal(ids.get('top').nextElementSibling.id, 'home-address-facts');
    assert.equal(ids.get('estate').nextElementSibling.id, 'home-brochure-highlights');
    assert.equal(ids.get('register').nextElementSibling.id, 'home-group-companies');
    assert.equal(ids.get('home-project-status').parentElement.id, 'home-developer');
  }
  if (page === 'location') {
    const section = ids.get('nearby-conveniences');
    const dialog = section.querySelector('.location-plan-dialog');
    const open = section.querySelector('.location-plan-open');
    const zoomIn = dialog.querySelector('[data-plan-zoom="in"]');
    const zoomOut = dialog.querySelector('[data-plan-zoom="out"]');
    const img = dialog.querySelector('.location-plan-viewport').querySelector('img');
    open.emit('click'); assert.equal(dialog.open, true); assert.equal(img.style.width, '100%'); assert.equal(zoomOut.disabled, true);
    for (let i = 0; i < 7; i++) zoomIn.emit('click');
    assert.equal(img.style.width, '300%'); assert.equal(zoomIn.disabled, true);
    dialog.querySelector('[data-plan-zoom="reset"]').emit('click'); assert.equal(img.style.width, '100%');
    dialog.querySelector('[data-plan-close]').emit('click'); assert.equal(dialog.open, false); assert.equal(open.focused, true);
    assert.equal(open.events.click.length, 1, 'No duplicate viewer handlers');
  }
  if (page === 'plans') assert.equal([...ids.values()].filter(n => n.innerHTML).length, 0);
  console.log(`${page}: section lifecycle and relevant interaction checks passed`);
}
for (const page of ['home', 'location', 'amenities', 'plans']) run(page);
fs.writeFileSync('tmp/pdf-review/section-markup.json', JSON.stringify(captures, null, 2));
