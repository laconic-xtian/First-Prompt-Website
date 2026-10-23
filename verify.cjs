const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.runInNewContext(fs.readFileSync('dist/js/data.js','utf8'),context);const data=context.window.CK_DATA,create=require('./dist/js/state.js');let saved=null;const storage={getItem:()=>saved,setItem:(_,v)=>{saved=v}};const store=create(data,storage);
assert.equal(store.get().balance,1000);assert.equal(store.get().theme,'dark');assert.equal(store.get().sound,false);
assert.equal(store.unlock('bad').ok,false);assert.equal(store.get().balance,1000);
for(const id of ['projects','skills','about','contact']){assert.equal(store.unlock(id).charged,data.sections[id].price);for(let i=0;i<30;i++)assert.equal(store.unlock(id).charged,0);}
assert.equal(store.get().balance,250);assert.equal(create(data,storage).get().balance,250);
store.set('theme','light');store.set('sound',true);assert.equal(create(data,storage).get().theme,'light');assert.equal(create(data,storage).get().sound,true);
store.reset();assert.equal(store.get().balance,1000);assert.equal(store.get().unlocked.length,0);assert.equal(store.get().theme,'light');assert.equal(store.get().sound,true);
saved=JSON.stringify({version:1,theme:'dark',sound:false,tutorial:false,unlocked:['projects','projects','bad'],balance:-999});assert.equal(create(data,storage).get().balance,700);assert.equal(create(data,storage).get().unlocked.length,1);
saved='{bad';assert.equal(create(data,storage).get().balance,1000);
saved=JSON.stringify({version:1,theme:'nope',sound:false,tutorial:false,unlocked:[]});assert.equal(create(data,storage).get().theme,'dark');
let warnings=0;const broken=create(data,{getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}},()=>warnings++);assert.equal(broken.unlock('projects').ok,true);assert.equal(broken.get().balance,700);assert.ok(warnings);
saved=null;const a=create(data,storage),b=create(data,storage);a.unlock('projects');assert.equal(b.unlock('projects').charged,0);b.unlock('skills');assert.equal(a.unlock('about').ok,true);assert.equal(a.get().balance,400);
const expensive={...data,sections:{projects:{price:1100}}},poor=create(expensive,{getItem:()=>null,setItem:()=>{}});assert.equal(poor.unlock('projects').reason,'insufficient');assert.equal(poor.get().balance,1000);
const html=fs.readFileSync('dist/index.html','utf8');for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const path=m[1];if(!path.includes(':'))assert.ok(fs.existsSync('dist/'+path),path);}
for(const theme of Object.values(data.themes)){assert.ok(fs.existsSync('dist/'+theme.background));for(const target of Object.values(theme.targets))assert.ok(fs.existsSync('dist/assets/'+target.asset+'.svg'));}
console.log('PASS: initial state, invalid ID, all prices, 120 repeated unlocks, reload, theme/sound preference, reset, corrupt state, duplicate/unknown IDs, blocked storage, cross-tab recheck, insufficient funds fixture, required local paths.');
