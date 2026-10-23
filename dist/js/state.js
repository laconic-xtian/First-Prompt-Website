(function(root){'use strict';
function createStore(data,storage,onWarning=()=>{}){
 const ids=Object.keys(data.sections),fresh=()=>({version:1,theme:'dark',unlocked:[],sound:false,tutorial:false});let state=fresh();
 function normalize(raw){if(!raw||typeof raw!=='object'||raw.version!==1||!['dark','light'].includes(raw.theme)||!Array.isArray(raw.unlocked)||typeof raw.sound!=='boolean'||typeof raw.tutorial!=='boolean')return null;const unlocked=[...new Set(raw.unlocked.filter(id=>typeof id==='string'&&ids.includes(id)))];return{version:1,theme:raw.theme,unlocked,sound:raw.sound,tutorial:raw.tutorial};}
 function balance(s=state){return data.initialCredits-s.unlocked.reduce((n,id)=>n+data.sections[id].price,0);}
 function read(){try{const value=storage?.getItem(data.storageKey);if(!value)return null;const parsed=normalize(JSON.parse(value));if(!parsed)onWarning('Saved progress could not be restored. A fresh adventure is ready.');return parsed;}catch(e){onWarning('Progress is available for this visit, but saving is unavailable.');return null;}}
 function persist(){try{if(!storage)throw Error('Storage unavailable');storage.setItem(data.storageKey,JSON.stringify({...state,balance:balance()}));}catch(e){onWarning('Progress is available for this visit, but saving is unavailable.');}}
 state=read()||fresh();let committing=false;
 return{get:()=>({...state,unlocked:[...state.unlocked],balance:balance()}),unlock(id){if(committing||!ids.includes(id))return{ok:false,reason:'invalid'};committing=true;try{const latest=read();if(latest){state.unlocked=[...new Set([...state.unlocked,...latest.unlocked])];}if(state.unlocked.includes(id))return{ok:true,charged:0};const price=data.sections[id].price;if(balance()<price)return{ok:false,reason:'insufficient'};state.unlocked.push(id);persist();return{ok:true,charged:price};}finally{committing=false;}},set(key,value){if(key==='theme'&&['dark','light'].includes(value)||['sound','tutorial'].includes(key)&&typeof value==='boolean'){state[key]=value;persist();}},reset(){state.unlocked=[];persist();},sync(raw){const parsed=normalize(raw);if(parsed){state=parsed;return true;}return false;},normalize};
}
root.CKStore=createStore;if(typeof module!=='undefined')module.exports=createStore;
})(typeof window==='undefined'?globalThis:window);
