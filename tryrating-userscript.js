(function(){"use strict";const wn={context:void 0,registry:void 0},Tn=(t,e)=>t===e,Z=Symbol("solid-proxy"),pe=Symbol("solid-track"),Mt={equals:Tn};let me=Se;const rt=1,At=2,be={owned:null,cleanups:null,context:null,owner:null};var M=null;let Gt=null,Sn=null,L=null,q=null,X=null,Et=0;function ye(t,e){const n=L,r=M,o=t.length===0,s=e===void 0?r:e,a=o?be:{owned:null,cleanups:null,context:s?s.context:null,owner:s},i=o?t:()=>t(()=>j(()=>Lt(a)));M=a,L=null;try{return it(i,!0)}finally{L=n,M=r}}function V(t,e){e=e?Object.assign({},Mt,e):Mt;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},r=o=>(typeof o=="function"&&(o=o(n.value)),Te(n,o));return[we.bind(n),r]}function J(t,e,n){const r=Kt(t,e,!1,rt);mt(r)}function Q(t,e,n){me=En;const r=Kt(t,e,!1,rt);(!n||!n.render)&&(r.user=!0),X?X.push(r):mt(r)}function K(t,e,n){n=n?Object.assign({},Mt,n):Mt;const r=Kt(t,e,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,mt(r),we.bind(r)}function tt(t){return it(t,!1)}function j(t){if(L===null)return t();const e=L;L=null;try{return t()}finally{L=e}}function ve(t){Q(()=>j(t))}function pt(t){return M===null||(M.cleanups===null?M.cleanups=[t]:M.cleanups.push(t)),t}function Vt(){return L}function xn(){return M}function kn(t,e){const n=M,r=L;M=t,L=null;try{return it(e,!0)}catch(o){Zt(o)}finally{M=n,L=r}}function $n(t,e){const n=Symbol("context");return{id:n,Provider:_n(n),defaultValue:t}}function Dn(t){return M&&M.context&&M.context[t.id]!==void 0?M.context[t.id]:t.defaultValue}function On(t){const e=K(t),n=K(()=>Xt(e()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}function we(){if(this.sources&&this.state)if(this.state===rt)mt(this);else{const t=q;q=null,it(()=>_t(this),!1),q=t}if(L){const t=this.observers?this.observers.length:0;L.sources?(L.sources.push(this),L.sourceSlots.push(t)):(L.sources=[this],L.sourceSlots=[t]),this.observers?(this.observers.push(L),this.observerSlots.push(L.sources.length-1)):(this.observers=[L],this.observerSlots=[L.sources.length-1])}return this.value}function Te(t,e,n){let r=t.value;return(!t.comparator||!t.comparator(r,e))&&(t.value=e,t.observers&&t.observers.length&&it(()=>{for(let o=0;o<t.observers.length;o+=1){const s=t.observers[o],a=Gt&&Gt.running;a&&Gt.disposed.has(s),(a?!s.tState:!s.state)&&(s.pure?q.push(s):X.push(s),s.observers&&xe(s)),a||(s.state=rt)}if(q.length>1e6)throw q=[],new Error},!1)),e}function mt(t){if(!t.fn)return;Lt(t);const e=Et;Mn(t,t.value,e)}function Mn(t,e,n){let r;const o=M,s=L;L=M=t;try{r=t.fn(e)}catch(a){return t.pure&&(t.state=rt,t.owned&&t.owned.forEach(Lt),t.owned=null),t.updatedAt=n+1,Zt(a)}finally{L=s,M=o}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?Te(t,r):t.value=r,t.updatedAt=n)}function Kt(t,e,n,r=rt,o){const s={fn:t,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:M,context:M?M.context:null,pure:n};return M===null||M!==be&&(M.owned?M.owned.push(s):M.owned=[s]),s}function Ct(t){if(t.state===0)return;if(t.state===At)return _t(t);if(t.suspense&&j(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<Et);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===rt)mt(t);else if(t.state===At){const r=q;q=null,it(()=>_t(t,e[0]),!1),q=r}}function it(t,e){if(q)return t();let n=!1;e||(q=[]),X?n=!0:X=[],Et++;try{const r=t();return An(n),r}catch(r){n||(X=null),q=null,Zt(r)}}function An(t){if(q&&(Se(q),q=null),t)return;const e=X;X=null,e.length&&it(()=>me(e),!1)}function Se(t){for(let e=0;e<t.length;e++)Ct(t[e])}function En(t){let e,n=0;for(e=0;e<t.length;e++){const r=t[e];r.user?t[n++]=r:Ct(r)}for(e=0;e<n;e++)Ct(t[e])}function _t(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const r=t.sources[n];if(r.sources){const o=r.state;o===rt?r!==e&&(!r.updatedAt||r.updatedAt<Et)&&Ct(r):o===At&&_t(r,e)}}}function xe(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=At,n.pure?q.push(n):X.push(n),n.observers&&xe(n))}}function Lt(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),r=t.sourceSlots.pop(),o=n.observers;if(o&&o.length){const s=o.pop(),a=n.observerSlots.pop();r<o.length&&(s.sourceSlots[a]=r,o[r]=s,n.observerSlots[r]=a)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)Lt(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0}function Cn(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function Zt(t,e=M){throw Cn(t)}function Xt(t){if(typeof t=="function"&&!t.length)return Xt(t());if(Array.isArray(t)){const e=[];for(let n=0;n<t.length;n++){const r=Xt(t[n]);Array.isArray(r)?e.push.apply(e,r):e.push(r)}return e}return t}function _n(t,e){return function(r){let o;return J(()=>o=j(()=>(M.context={...M.context,[t]:r.value},On(()=>r.children))),void 0),o}}function B(t,e){return j(()=>t(e||{}))}function It(){return!0}const Ln={get(t,e,n){return e===Z?n:t.get(e)},has(t,e){return e===Z?!0:t.has(e)},set:It,deleteProperty:It,getOwnPropertyDescriptor(t,e){return{configurable:!0,enumerable:!0,get(){return t.get(e)},set:It,deleteProperty:It}},ownKeys(t){return t.keys()}};function Jt(t){return(t=typeof t=="function"?t():t)?t:{}}function In(){for(let t=0,e=this.length;t<e;++t){const n=this[t]();if(n!==void 0)return n}}function Nt(...t){let e=!1;for(let a=0;a<t.length;a++){const i=t[a];e=e||!!i&&Z in i,t[a]=typeof i=="function"?(e=!0,K(i)):i}if(e)return new Proxy({get(a){for(let i=t.length-1;i>=0;i--){const c=Jt(t[i])[a];if(c!==void 0)return c}},has(a){for(let i=t.length-1;i>=0;i--)if(a in Jt(t[i]))return!0;return!1},keys(){const a=[];for(let i=0;i<t.length;i++)a.push(...Object.keys(Jt(t[i])));return[...new Set(a)]}},Ln);const n={},r=Object.create(null);for(let a=t.length-1;a>=0;a--){const i=t[a];if(!i)continue;const c=Object.getOwnPropertyNames(i);for(let p=c.length-1;p>=0;p--){const g=c[p];if(g==="__proto__"||g==="constructor")continue;const h=Object.getOwnPropertyDescriptor(i,g);if(!r[g])r[g]=h.get?{enumerable:!0,configurable:!0,get:In.bind(n[g]=[h.get.bind(i)])}:h.value!==void 0?h:void 0;else{const v=n[g];v&&(h.get?v.push(h.get.bind(i)):h.value!==void 0&&v.push(()=>h.value))}}}const o={},s=Object.keys(r);for(let a=s.length-1;a>=0;a--){const i=s[a],c=r[i];c&&c.get?Object.defineProperty(o,i,c):o[i]=c?c.value:void 0}return o}const Nn=t=>`Stale read from <${t}>.`;function ke(t){const e=t.keyed,n=K(()=>t.when,void 0,{equals:(r,o)=>e?r===o:!r==!o});return K(()=>{const r=n();if(r){const o=t.children;return typeof o=="function"&&o.length>0?j(()=>o(e?r:()=>{if(!j(n))throw Nn("Show");return t.when})):o}return t.fallback},void 0,void 0)}const Pn=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],jn=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Pn]),Fn=new Set(["innerHTML","textContent","innerText","children"]),Rn=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Un=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Bn(t,e){const n=Un[t];return typeof n=="object"?n[e]?n.$:void 0:n}const zn=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),qn={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Yn(t,e,n){let r=n.length,o=e.length,s=r,a=0,i=0,c=e[o-1].nextSibling,p=null;for(;a<o||i<s;){if(e[a]===n[i]){a++,i++;continue}for(;e[o-1]===n[s-1];)o--,s--;if(o===a){const g=s<r?i?n[i-1].nextSibling:n[s-i]:c;for(;i<s;)t.insertBefore(n[i++],g)}else if(s===i)for(;a<o;)(!p||!p.has(e[a]))&&e[a].remove(),a++;else if(e[a]===n[s-1]&&n[i]===e[o-1]){const g=e[--o].nextSibling;t.insertBefore(n[i++],e[a++].nextSibling),t.insertBefore(n[--s],g),e[o]=n[s]}else{if(!p){p=new Map;let h=i;for(;h<s;)p.set(n[h],h++)}const g=p.get(e[a]);if(g!=null)if(i<g&&g<s){let h=a,v=1,T;for(;++h<o&&h<s&&!((T=p.get(e[h]))==null||T!==g+v);)v++;if(v>g-i){const x=e[a];for(;i<g;)t.insertBefore(n[i++],x)}else t.replaceChild(n[i++],e[a++])}else a++;else e[a++].remove()}}}const $e="_$DX_DELEGATE";function Hn(t,e,n,r={}){let o;return ye(s=>{o=s,e===document?t():ot(e,t(),e.firstChild?null:void 0,n)},r.owner),()=>{o(),e.textContent=""}}function et(t,e,n){let r;const o=()=>{const a=document.createElement("template");return a.innerHTML=t,n?a.content.firstChild.firstChild:a.content.firstChild},s=e?()=>j(()=>document.importNode(r||(r=o()),!0)):()=>(r||(r=o())).cloneNode(!0);return s.cloneNode=s,s}function De(t,e=window.document){const n=e[$e]||(e[$e]=new Set);for(let r=0,o=t.length;r<o;r++){const s=t[r];n.has(s)||(n.add(s),e.addEventListener(s,Xn))}}function Qt(t,e,n){n==null?t.removeAttribute(e):t.setAttribute(e,n)}function Wn(t,e,n,r){r==null?t.removeAttributeNS(e,n):t.setAttributeNS(e,n,r)}function Oe(t,e){e==null?t.removeAttribute("class"):t.className=e}function Gn(t,e,n,r){if(r)Array.isArray(n)?(t[`$$${e}`]=n[0],t[`$$${e}Data`]=n[1]):t[`$$${e}`]=n;else if(Array.isArray(n)){const o=n[0];t.addEventListener(e,n[0]=s=>o.call(t,n[1],s))}else t.addEventListener(e,n)}function Vn(t,e,n={}){const r=Object.keys(e||{}),o=Object.keys(n);let s,a;for(s=0,a=o.length;s<a;s++){const i=o[s];!i||i==="undefined"||e[i]||(Ee(t,i,!1),delete n[i])}for(s=0,a=r.length;s<a;s++){const i=r[s],c=!!e[i];!i||i==="undefined"||n[i]===c||!c||(Ee(t,i,!0),n[i]=c)}return n}function Me(t,e,n){if(!e)return n?Qt(t,"style"):e;const r=t.style;if(typeof e=="string")return r.cssText=e;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),e||(e={});let o,s;for(s in n)e[s]==null&&r.removeProperty(s),delete n[s];for(s in e)o=e[s],o!==n[s]&&(r.setProperty(s,o),n[s]=o);return n}function te(t,e={},n,r){const o={};return r||J(()=>o.children=ct(t,e.children,o.children)),J(()=>e.ref&&e.ref(t)),J(()=>Kn(t,e,n,!0,o,!0)),o}function Ae(t,e,n){return j(()=>t(e,n))}function ot(t,e,n,r){if(n!==void 0&&!r&&(r=[]),typeof e!="function")return ct(t,e,r,n);J(o=>ct(t,e(),o,n),r)}function Kn(t,e,n,r,o={},s=!1){e||(e={});for(const a in o)if(!(a in e)){if(a==="children")continue;o[a]=Ce(t,a,null,o[a],n,s)}for(const a in e){if(a==="children"){r||ct(t,e.children);continue}const i=e[a];o[a]=Ce(t,a,i,o[a],n,s)}}function Zn(t){return t.toLowerCase().replace(/-([a-z])/g,(e,n)=>n.toUpperCase())}function Ee(t,e,n){const r=e.trim().split(/\s+/);for(let o=0,s=r.length;o<s;o++)t.classList.toggle(r[o],n)}function Ce(t,e,n,r,o,s){let a,i,c,p,g;if(e==="style")return Me(t,n,r);if(e==="classList")return Vn(t,n,r);if(n===r)return r;if(e==="ref")s||n(t);else if(e.slice(0,3)==="on:"){const h=e.slice(3);r&&t.removeEventListener(h,r),n&&t.addEventListener(h,n)}else if(e.slice(0,10)==="oncapture:"){const h=e.slice(10);r&&t.removeEventListener(h,r,!0),n&&t.addEventListener(h,n,!0)}else if(e.slice(0,2)==="on"){const h=e.slice(2).toLowerCase(),v=zn.has(h);if(!v&&r){const T=Array.isArray(r)?r[0]:r;t.removeEventListener(h,T)}(v||n)&&(Gn(t,h,n,v),v&&De([h]))}else if(e.slice(0,5)==="attr:")Qt(t,e.slice(5),n);else if((g=e.slice(0,5)==="prop:")||(c=Fn.has(e))||!o&&((p=Bn(e,t.tagName))||(i=jn.has(e)))||(a=t.nodeName.includes("-")))g&&(e=e.slice(5),i=!0),e==="class"||e==="className"?Oe(t,n):a&&!i&&!c?t[Zn(e)]=n:t[p||e]=n;else{const h=o&&e.indexOf(":")>-1&&qn[e.split(":")[0]];h?Wn(t,h,e,n):Qt(t,Rn[e]||e,n)}return n}function Xn(t){const e=`$$${t.type}`;let n=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==n&&Object.defineProperty(t,"target",{configurable:!0,value:n}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[e];if(r&&!n.disabled){const o=n[`${e}Data`];if(o!==void 0?r.call(n,o,t):r.call(n,t),t.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function ct(t,e,n,r,o){for(;typeof n=="function";)n=n();if(e===n)return n;const s=typeof e,a=r!==void 0;if(t=a&&n[0]&&n[0].parentNode||t,s==="string"||s==="number")if(s==="number"&&(e=e.toString()),a){let i=n[0];i&&i.nodeType===3?i.data!==e&&(i.data=e):i=document.createTextNode(e),n=ut(t,n,r,i)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e;else if(e==null||s==="boolean")n=ut(t,n,r);else{if(s==="function")return J(()=>{let i=e();for(;typeof i=="function";)i=i();n=ct(t,i,n,r)}),()=>n;if(Array.isArray(e)){const i=[],c=n&&Array.isArray(n);if(ee(i,e,n,o))return J(()=>n=ct(t,i,n,r,!0)),()=>n;if(i.length===0){if(n=ut(t,n,r),a)return n}else c?n.length===0?_e(t,i,r):Yn(t,n,i):(n&&ut(t),_e(t,i));n=i}else if(e.nodeType){if(Array.isArray(n)){if(a)return n=ut(t,n,r,e);ut(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}}return n}function ee(t,e,n,r){let o=!1;for(let s=0,a=e.length;s<a;s++){let i=e[s],c=n&&n[s],p;if(!(i==null||i===!0||i===!1))if((p=typeof i)=="object"&&i.nodeType)t.push(i);else if(Array.isArray(i))o=ee(t,i,c)||o;else if(p==="function")if(r){for(;typeof i=="function";)i=i();o=ee(t,Array.isArray(i)?i:[i],Array.isArray(c)?c:[c])||o}else t.push(i),o=!0;else{const g=String(i);c&&c.nodeType===3&&c.data===g?t.push(c):t.push(document.createTextNode(g))}}return o}function _e(t,e,n=null){for(let r=0,o=e.length;r<o;r++)t.insertBefore(e[r],n)}function ut(t,e,n,r){if(n===void 0)return t.textContent="";const o=r||document.createTextNode("");if(e.length){let s=!1;for(let a=e.length-1;a>=0;a--){const i=e[a];if(o!==i){const c=i.parentNode===t;!s&&!a?c?t.replaceChild(o,i):t.insertBefore(o,n):c&&i.remove()}else s=!0}}else t.insertBefore(o,n);return[o]}const Jn="http://www.w3.org/2000/svg";function Qn(t,e=!1){return e?document.createElementNS(Jn,t):document.createElement(t)}function tr(t){const{useShadow:e}=t,n=document.createTextNode(""),r=()=>t.mount||document.body,o=xn();let s,a=!!wn.context;return Q(()=>{s||(s=kn(o,()=>K(()=>t.children)));const i=r();if(i instanceof HTMLHeadElement){const[c,p]=V(!1),g=()=>p(!0);ye(h=>ot(i,()=>c()?h():s(),null)),pt(g)}else{const c=Qn(t.isSVG?"g":"div",t.isSVG),p=e&&c.attachShadow?c.attachShadow({mode:"open"}):c;Object.defineProperty(c,"_$host",{get(){return n.parentNode},configurable:!0}),ot(p,s),i.appendChild(c),t.ref&&t.ref(c),pt(()=>i.removeChild(c))}},void 0,{render:!a}),n}const ne="https://crashmax-dev.github.io/tryrating-userscript",er=`${ne}/tryrating-userscript.meta.js`,nr=`${ne}/tryrating-userscript.user.js`,rr=`${ne}/notify.ogg`,bt={openTasks:t=>t.altKey&&t.key==="1",resetTasks:t=>t.altKey&&t.key==="2",resetWidgetPosition:t=>t.altKey&&t.key==="3",toggleAutoSubmit:t=>t.ctrlKey&&t.code==="KeyO",toggleWidgetVisibility:t=>t.ctrlKey&&t.code==="KeyX"},or=`
Alt + 1 - \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u0434\u0430\u0447
Alt + 2 - \u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007
Alt + 3 - \u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E \u0432\u0438\u0434\u0436\u0435\u0442\u0430\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007
Ctrl + O - \u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C/\u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007\u2007
Ctrl + X - \u0421\u043A\u0440\u044B\u0442\u044C/\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0438\u0434\u0436\u0435\u0442
`;var re=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Pt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Le={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(re,function(){var n=1e3,r=6e4,o=36e5,s="millisecond",a="second",i="minute",c="hour",p="day",g="week",h="month",v="quarter",T="year",x="date",b="Invalid Date",k=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,N=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,E={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(l){var u=["th","st","nd","rd"],d=l%100;return"["+l+(u[(d-20)%10]||u[d]||u[0])+"]"}},C=function(l,u,d){var y=String(l);return!y||y.length>=u?l:""+Array(u+1-y.length).join(d)+l},P={s:C,z:function(l){var u=-l.utcOffset(),d=Math.abs(u),y=Math.floor(d/60),f=d%60;return(u<=0?"+":"-")+C(y,2,"0")+":"+C(f,2,"0")},m:function l(u,d){if(u.date()<d.date())return-l(d,u);var y=12*(d.year()-u.year())+(d.month()-u.month()),f=u.clone().add(y,h),m=d-f<0,w=u.clone().add(y+(m?-1:1),h);return+(-(y+(d-f)/(m?f-w:w-f))||0)},a:function(l){return l<0?Math.ceil(l)||0:Math.floor(l)},p:function(l){return{M:h,y:T,w:g,d:p,D:x,h:c,m:i,s:a,ms:s,Q:v}[l]||String(l||"").toLowerCase().replace(/s$/,"")},u:function(l){return l===void 0}},D="en",I={};I[D]=E;var U="$isDayjsObject",W=function(l){return l instanceof $t||!(!l||!l[U])},z=function l(u,d,y){var f;if(!u)return D;if(typeof u=="string"){var m=u.toLowerCase();I[m]&&(f=m),d&&(I[m]=d,f=m);var w=u.split("-");if(!f&&w.length>1)return l(w[0])}else{var S=u.name;I[S]=u,f=S}return!y&&f&&(D=f),f||!y&&D},A=function(l,u){if(W(l))return l.clone();var d=typeof u=="object"?u:{};return d.date=l,d.args=arguments,new $t(d)},$=P;$.l=z,$.i=W,$.w=function(l,u){return A(l,{locale:u.$L,utc:u.$u,x:u.$x,$offset:u.$offset})};var $t=function(){function l(d){this.$L=z(d.locale,null,!0),this.parse(d),this.$x=this.$x||d.x||{},this[U]=!0}var u=l.prototype;return u.parse=function(d){this.$d=function(y){var f=y.date,m=y.utc;if(f===null)return new Date(NaN);if($.u(f))return new Date;if(f instanceof Date)return new Date(f);if(typeof f=="string"&&!/Z$/i.test(f)){var w=f.match(k);if(w){var S=w[2]-1||0,O=(w[7]||"0").substring(0,3);return m?new Date(Date.UTC(w[1],S,w[3]||1,w[4]||0,w[5]||0,w[6]||0,O)):new Date(w[1],S,w[3]||1,w[4]||0,w[5]||0,w[6]||0,O)}}return new Date(f)}(d),this.init()},u.init=function(){var d=this.$d;this.$y=d.getFullYear(),this.$M=d.getMonth(),this.$D=d.getDate(),this.$W=d.getDay(),this.$H=d.getHours(),this.$m=d.getMinutes(),this.$s=d.getSeconds(),this.$ms=d.getMilliseconds()},u.$utils=function(){return $},u.isValid=function(){return this.$d.toString()!==b},u.isSame=function(d,y){var f=A(d);return this.startOf(y)<=f&&f<=this.endOf(y)},u.isAfter=function(d,y){return A(d)<this.startOf(y)},u.isBefore=function(d,y){return this.endOf(y)<A(d)},u.$g=function(d,y,f){return $.u(d)?this[y]:this.set(f,d)},u.unix=function(){return Math.floor(this.valueOf()/1e3)},u.valueOf=function(){return this.$d.getTime()},u.startOf=function(d,y){var f=this,m=!!$.u(y)||y,w=$.p(d),S=function(lt,G){var st=$.w(f.$u?Date.UTC(f.$y,G,lt):new Date(f.$y,G,lt),f);return m?st:st.endOf(p)},O=function(lt,G){return $.w(f.toDate()[lt].apply(f.toDate("s"),(m?[0,0,0,0]:[23,59,59,999]).slice(G)),f)},_=this.$W,R=this.$M,H=this.$D,ht="set"+(this.$u?"UTC":"");switch(w){case T:return m?S(1,0):S(31,11);case h:return m?S(1,R):S(0,R+1);case g:var at=this.$locale().weekStart||0,Dt=(_<at?_+7:_)-at;return S(m?H-Dt:H+(6-Dt),R);case p:case x:return O(ht+"Hours",0);case c:return O(ht+"Minutes",1);case i:return O(ht+"Seconds",2);case a:return O(ht+"Milliseconds",3);default:return this.clone()}},u.endOf=function(d){return this.startOf(d,!1)},u.$set=function(d,y){var f,m=$.p(d),w="set"+(this.$u?"UTC":""),S=(f={},f[p]=w+"Date",f[x]=w+"Date",f[h]=w+"Month",f[T]=w+"FullYear",f[c]=w+"Hours",f[i]=w+"Minutes",f[a]=w+"Seconds",f[s]=w+"Milliseconds",f)[m],O=m===p?this.$D+(y-this.$W):y;if(m===h||m===T){var _=this.clone().set(x,1);_.$d[S](O),_.init(),this.$d=_.set(x,Math.min(this.$D,_.daysInMonth())).$d}else S&&this.$d[S](O);return this.init(),this},u.set=function(d,y){return this.clone().$set(d,y)},u.get=function(d){return this[$.p(d)]()},u.add=function(d,y){var f,m=this;d=Number(d);var w=$.p(y),S=function(R){var H=A(m);return $.w(H.date(H.date()+Math.round(R*d)),m)};if(w===h)return this.set(h,this.$M+d);if(w===T)return this.set(T,this.$y+d);if(w===p)return S(1);if(w===g)return S(7);var O=(f={},f[i]=r,f[c]=o,f[a]=n,f)[w]||1,_=this.$d.getTime()+d*O;return $.w(_,this)},u.subtract=function(d,y){return this.add(-1*d,y)},u.format=function(d){var y=this,f=this.$locale();if(!this.isValid())return f.invalidDate||b;var m=d||"YYYY-MM-DDTHH:mm:ssZ",w=$.z(this),S=this.$H,O=this.$m,_=this.$M,R=f.weekdays,H=f.months,ht=f.meridiem,at=function(G,st,Ot,Wt){return G&&(G[st]||G(y,m))||Ot[st].slice(0,Wt)},Dt=function(G){return $.s(S%12||12,G,"0")},lt=ht||function(G,st,Ot){var Wt=G<12?"AM":"PM";return Ot?Wt.toLowerCase():Wt};return m.replace(N,function(G,st){return st||function(Ot){switch(Ot){case"YY":return String(y.$y).slice(-2);case"YYYY":return $.s(y.$y,4,"0");case"M":return _+1;case"MM":return $.s(_+1,2,"0");case"MMM":return at(f.monthsShort,_,H,3);case"MMMM":return at(H,_);case"D":return y.$D;case"DD":return $.s(y.$D,2,"0");case"d":return String(y.$W);case"dd":return at(f.weekdaysMin,y.$W,R,2);case"ddd":return at(f.weekdaysShort,y.$W,R,3);case"dddd":return R[y.$W];case"H":return String(S);case"HH":return $.s(S,2,"0");case"h":return Dt(1);case"hh":return Dt(2);case"a":return lt(S,O,!0);case"A":return lt(S,O,!1);case"m":return String(O);case"mm":return $.s(O,2,"0");case"s":return String(y.$s);case"ss":return $.s(y.$s,2,"0");case"SSS":return $.s(y.$ms,3,"0");case"Z":return w}return null}(G)||w.replace(":","")})},u.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},u.diff=function(d,y,f){var m,w=this,S=$.p(y),O=A(d),_=(O.utcOffset()-this.utcOffset())*r,R=this-O,H=function(){return $.m(w,O)};switch(S){case T:m=H()/12;break;case h:m=H();break;case v:m=H()/3;break;case g:m=(R-_)/6048e5;break;case p:m=(R-_)/864e5;break;case c:m=R/o;break;case i:m=R/r;break;case a:m=R/n;break;default:m=R}return f?m:$.a(m)},u.daysInMonth=function(){return this.endOf(h).$D},u.$locale=function(){return I[this.$L]},u.locale=function(d,y){if(!d)return this.$L;var f=this.clone(),m=z(d,y,!0);return m&&(f.$L=m),f},u.clone=function(){return $.w(this.$d,this)},u.toDate=function(){return new Date(this.valueOf())},u.toJSON=function(){return this.isValid()?this.toISOString():null},u.toISOString=function(){return this.$d.toISOString()},u.toString=function(){return this.$d.toUTCString()},l}(),Ht=$t.prototype;return A.prototype=Ht,[["$ms",s],["$s",a],["$m",i],["$H",c],["$W",p],["$M",h],["$y",T],["$D",x]].forEach(function(l){Ht[l[1]]=function(u){return this.$g(u,l[0],l[1])}}),A.extend=function(l,u){return l.$i||(l(u,$t,A),l.$i=!0),A},A.locale=z,A.isDayjs=W,A.unix=function(l){return A(1e3*l)},A.en=I[D],A.Ls=I,A.p={},A})})(Le);var sr=Le.exports;const oe=Pt(sr);var Ie={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(re,function(){var n={year:0,month:1,day:2,hour:3,minute:4,second:5},r={};return function(o,s,a){var i,c=function(v,T,x){x===void 0&&(x={});var b=new Date(v),k=function(N,E){E===void 0&&(E={});var C=E.timeZoneName||"short",P=N+"|"+C,D=r[P];return D||(D=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:N,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:C}),r[P]=D),D}(T,x);return k.formatToParts(b)},p=function(v,T){for(var x=c(v,T),b=[],k=0;k<x.length;k+=1){var N=x[k],E=N.type,C=N.value,P=n[E];P>=0&&(b[P]=parseInt(C,10))}var D=b[3],I=D===24?0:D,U=b[0]+"-"+b[1]+"-"+b[2]+" "+I+":"+b[4]+":"+b[5]+":000",W=+v;return(a.utc(U).valueOf()-(W-=W%1e3))/6e4},g=s.prototype;g.tz=function(v,T){v===void 0&&(v=i);var x=this.utcOffset(),b=this.toDate(),k=b.toLocaleString("en-US",{timeZone:v}),N=Math.round((b-new Date(k))/1e3/60),E=a(k,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(15*-Math.round(b.getTimezoneOffset()/15)-N,!0);if(T){var C=E.utcOffset();E=E.add(x-C,"minute")}return E.$x.$timezone=v,E},g.offsetName=function(v){var T=this.$x.$timezone||a.tz.guess(),x=c(this.valueOf(),T,{timeZoneName:v}).find(function(b){return b.type.toLowerCase()==="timezonename"});return x&&x.value};var h=g.startOf;g.startOf=function(v,T){if(!this.$x||!this.$x.$timezone)return h.call(this,v,T);var x=a(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return h.call(x,v,T).tz(this.$x.$timezone,!0)},a.tz=function(v,T,x){var b=x&&T,k=x||T||i,N=p(+a(),k);if(typeof v!="string")return a(v).tz(k);var E=function(I,U,W){var z=I-60*U*1e3,A=p(z,W);if(U===A)return[z,U];var $=p(z-=60*(A-U)*1e3,W);return A===$?[z,A]:[I-60*Math.min(A,$)*1e3,Math.max(A,$)]}(a.utc(v,b).valueOf(),N,k),C=E[0],P=E[1],D=a(C).utcOffset(P);return D.$x.$timezone=k,D},a.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},a.tz.setDefault=function(v){i=v}}})})(Ie);var ir=Ie.exports;const ar=Pt(ir);var Ne={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(re,function(){var n="minute",r=/[+-]\d\d(?::?\d\d)?/g,o=/([+-]|\d\d)/g;return function(s,a,i){var c=a.prototype;i.utc=function(b){var k={date:b,utc:!0,args:arguments};return new a(k)},c.utc=function(b){var k=i(this.toDate(),{locale:this.$L,utc:!0});return b?k.add(this.utcOffset(),n):k},c.local=function(){return i(this.toDate(),{locale:this.$L,utc:!1})};var p=c.parse;c.parse=function(b){b.utc&&(this.$u=!0),this.$utils().u(b.$offset)||(this.$offset=b.$offset),p.call(this,b)};var g=c.init;c.init=function(){if(this.$u){var b=this.$d;this.$y=b.getUTCFullYear(),this.$M=b.getUTCMonth(),this.$D=b.getUTCDate(),this.$W=b.getUTCDay(),this.$H=b.getUTCHours(),this.$m=b.getUTCMinutes(),this.$s=b.getUTCSeconds(),this.$ms=b.getUTCMilliseconds()}else g.call(this)};var h=c.utcOffset;c.utcOffset=function(b,k){var N=this.$utils().u;if(N(b))return this.$u?0:N(this.$offset)?h.call(this):this.$offset;if(typeof b=="string"&&(b=function(D){D===void 0&&(D="");var I=D.match(r);if(!I)return null;var U=(""+I[0]).match(o)||["-",0,0],W=U[0],z=60*+U[1]+ +U[2];return z===0?0:W==="+"?z:-z}(b),b===null))return this;var E=Math.abs(b)<=16?60*b:b,C=this;if(k)return C.$offset=E,C.$u=b===0,C;if(b!==0){var P=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(C=this.local().add(E+P,n)).$offset=E,C.$x.$localOffset=P}else C=this.utc();return C};var v=c.format;c.format=function(b){var k=b||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return v.call(this,k)},c.valueOf=function(){var b=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*b},c.isUTC=function(){return!!this.$u},c.toISOString=function(){return this.toDate().toISOString()},c.toString=function(){return this.toDate().toUTCString()};var T=c.toDate;c.toDate=function(b){return b==="s"&&this.$offset?i(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():T.call(this)};var x=c.diff;c.diff=function(b,k,N){if(b&&this.$u===b.$u)return x.call(this,b,k,N);var E=this.local(),C=i(b).local();return x.call(E,C,k,N)}}})})(Ne);var lr=Ne.exports;const cr=Pt(lr);oe.extend(cr),oe.extend(ar);const Pe={offset:180,region:"Asia",location:"Kuwait"};function jt(){return oe.tz(new Date,`${Pe.region}/${Pe.location}`).format("DD.MM.YYYY")}async function je(t=1e3){return new Promise(e=>setTimeout(e,t))}function ur(t){return Object.entries(t)}function Fe(t){return t=Math.abs(t),t>9?`${t}`:`0${t}`}function Re(t=0,e=Number.MAX_SAFE_INTEGER-1){return Math.floor(Math.random()*(e-t+1))+t}var dr=function(e){try{var n=/\B(\/\/ ==UserScript==\r?\n([\S\s]*?)\r?\n\/\/ ==\/UserScript==)([\S\s]*)/,r=e.match(n);if(!r)return null;var o=r[1],s=r[2],a=r[3],i={},c=s.split(`
`);return c.forEach(function(p){var g=p.match(/@([\w-]+)\s+(.+)/);g&&(i[g[1]]=i[g[1]]||[],i[g[1]].push(g[2]))}),{meta:i,metablock:o,content:a}}catch(p){return console&&console.error(p),null}};const fr=Pt(dr),[gr,hr]=V(!1);class pr{get currentVersion(){return GM_info.script.version}checkUpdates(){gr()||(F.info("Check updates..."),GM_xmlhttpRequest({url:er,onload:({response:e})=>{const n=fr(e);if(!n){F.error("Failed to parse metadata");return}this.checkMetadata(n.meta)},onerror:e=>{F.error(e)}}))}checkMetadata(e){if(e.version[0]===this.currentVersion)return;if(F.info("Founded new version",e.version),!confirm(`\u041D\u0430\u0439\u0434\u0435\u043D\u0430 \u043D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F ${e.version}.
\u0416\u0435\u043B\u0430\u0435\u0442\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C?`)){hr(!0);return}GM_openInTab(nr,{active:!0}).onclose=()=>{location.reload()}}}const Ue=new pr,Be={info:"#2ecc71",debug:"#7f8c8d",warn:"#f39c12",error:"#c0392b"};function mr(t){return[`background: ${Be[t]}`,"border-radius: 0.5em","color: white","font-weight: bold","padding: 2px 0.5em","font-family: cursive"].join(";")}function br(t){return ur(Be).reduce((e,[n])=>(e[n]=(...r)=>{console[n](`%c${t}`,mr(n),...r)},e),{})}const F=br(`tryrating-userscript ${Ue.currentVersion}`),se=()=>[{date:jt(),total:0,estimated:0,list:[]}],[yt,ie]=V([]);class yr{STORAGE_KEY="tryrating-storage-v3";constructor(){this.read()}get taskList(){return yt()}read(){const e=GM_getValue(this.STORAGE_KEY,se());F.info("Loaded tasks",e),ie(e)}reset(){ie(se()),GM_setValue(this.STORAGE_KEY,yt())}write(e){const n=this.getTaskList();n.total+=1,n.estimated+=e.estimated;const r=n.list.find(s=>s.type===e.type);r?(r.count+=1,r.estimated+=e.estimated):n.list.push({count:1,type:e.type,estimated:e.estimated});const o=[n,...yt().filter(s=>s.date!==n.date)];ie(o),GM_setValue(this.STORAGE_KEY,yt())}getTaskList(){const e=jt();F.info("Current date",e);const n=yt().find(r=>r.date===e);return F.info("Task list",n),n||se()[0]}}const Ft=new yr;function Y(t,e,...n){const r=document.createElement(t);return e instanceof Node?r.append(e):typeof e=="string"?r.append(vr(e)):Array.isArray(e)?r.append(...e):(Object.assign(r,e),Object.assign(r.style,e?.style)),r.append(...n),r}function vr(t){return document.createTextNode(t)}function ze(t,e,n){const r=new MutationObserver((o,s)=>{for(const a of o)e(a,s)});return r.observe(t,{childList:!0,subtree:!0,...n}),()=>r.disconnect()}function qe({selector:t,target:e=document.body,rejectTimeoutMs:n,signal:r}){return new Promise((o,s)=>{const a=ze(e,(p,g)=>{const h=e.querySelector(t);h&&(g.disconnect(),o(h))}),i={timeout:null,abort:null},c=p=>{i.timeout&&clearTimeout(i.timeout),i.abort&&r.removeEventListener("abort",i.abort),a(),s(p)};n>0&&(i.timeout=setTimeout(()=>c(`${qe.name} rejected (${n}ms)`),n)),r&&!r.aborted&&(i.abort=()=>c(r.reason),r.addEventListener("abort",i.abort))})}const wr=`const root = document.querySelector('#root')
const sortButton = document.querySelector('#sort-button')
const toggleTablesButton = document.querySelector('#toggle-tables-button')
const daySortButton = document.querySelector('#day-sort-button')
const weekSortButton = document.querySelector('#week-sort-button')
const monthSortButton = document.querySelector('#month-sort-button')
const downloadButton = document.querySelector('#download-button')

const SortType = {
  // \u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E
  Asc: 'asc',
  // \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E
  Desc: 'desc',
  Day: 'day',
  Week: 'week',
  Month: 'month'
}

const PageState = {
  tablesOpen: false
}

sortButton.addEventListener('click', () => sortTable(SortType.Desc))
toggleTablesButton.addEventListener('click', () => toggleTables())
daySortButton.addEventListener('click', () => sortTable(SortType.Day))
weekSortButton.addEventListener('click', () => sortTable(SortType.Week))
monthSortButton.addEventListener('click', () => sortTable(SortType.Month))
document.addEventListener('DOMContentLoaded', () => createTable(SortType.Day))

// https://github.com/zero-dependency/dom/blob/17c3739f94515d14283d3a3377a80147aaa8378f/src/html.ts
function el(tag, props, ...children) {
  const el = document.createElement(tag)

  if (props instanceof Node) {
    el.append(props)
  } else if (typeof props === 'string') {
    el.append(text(props))
  } else if (Array.isArray(props)) {
    el.append(...props)
  } else {
    Object.assign(el, props)
    Object.assign(el.style, props?.style)
  }

  el.append(...children)

  return el
}

function text(text) {
  return document.createTextNode(text)
}

function addZero(i) {
  if (i < 10) i = \`0\${i}\`
  return i
}

function msToSeconds(ms) {
  return addZero(Number(((ms % 60000) / 1000).toFixed(0)))
}

function msToTime(ms) {
  const minutes = addZero(Math.floor(ms / 60000))
  const seconds = msToSeconds(ms)
  return \`\${minutes}:\${seconds}\`
}

function msToTimeFull(ms) {
  const hours = addZero(Math.floor(ms / 3600000))
  const minutes = addZero(Math.floor((ms % 3600000) / 60000))
  const seconds = msToSeconds(ms)
  return \`\${hours}:\${minutes}:\${seconds}\`
}

function sortTable(type) {
  // asc / desc
  if (type === SortType.Desc) {
    root.classList.toggle(SortType.Desc)

    if (root.classList.contains(SortType.Desc)) {
      sortButton.textContent = '\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E'
    } else {
      sortButton.textContent = '\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E'
    }

    return
  }

  // day / week / month
  createTable(type)
}

function createTableHead() {
  return el('tr', el('th', '\u0422\u0438\u043F'), el('th', '\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E'), el('th', '\u0412\u0440\u0435\u043C\u044F'))
}

function createTableCaption(task) {
  return el(
    'caption',
    el('p', \`\u0414\u0430\u0442\u0430: \${task.date}\`),
    el('p', \`\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: \${task.total}\`),
    el('p', \`\u0412\u0440\u0435\u043C\u044F: \${msToTimeFull(task.estimated)}\`)
  )
}

function createTableTr(task) {
  return el(
    'tr',
    el('td', task.type),
    el('td', \`\${task.count}\`),
    el('td', msToTimeFull(task.estimated))
  )
}

function toggleTables() {
  const details = root.querySelectorAll('details')
  PageState.tablesOpen = !PageState.tablesOpen
  toggleTablesButton.textContent = \`\${
    PageState.tablesOpen ? '\u0421\u043A\u0440\u044B\u0442\u044C' : '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C'
  } \u0442\u0430\u0431\u043B\u0438\u0446\u044B\`
  for (const detail of details) {
    detail.open = PageState.tablesOpen
  }
}

class TableState {
  constructor() {
    this.initState()
  }

  initState() {
    this.data = {
      table: el('table'),
      days: 0,
      date: '',
      total: 0,
      estimated: 0,
      list: []
    }
  }

  pushTable(latestData) {
    const caption = createTableCaption({
      date: \`\${this.data.date} - \${latestData} (\${this.data.days - 1} days)\`,
      total: this.data.total,
      estimated: this.data.estimated
    })
    const details = el('details', el('summary', caption))
    this.data.table.append(createTableHead(), ...this.data.list)
    details.append(this.data.table)
    root.prepend(details)
    this.initState()
  }
}

function createTable(sortingType) {
  root.innerHTML = ''

  const tableState = new TableState()
  const isDaysSort = sortingType === SortType.Day
  const isWeeksSort = sortingType === SortType.Week
  const countDaysBySort = isWeeksSort ? 7 : 30
  const isNotDaysSort = [SortType.Week, SortType.Month].includes(sortingType)

  for (const { date, list, total, estimated } of tasks) {
    if (isDaysSort) {
      createTableAllGroup({ date, list, total, estimated })
      continue
    }

    if (isNotDaysSort) {
      tableState.data.days++
      if (tableState.data.days > countDaysBySort) {
        tableState.pushTable(date)
        tableState.data.days = 1
      }

      tableState.data.date ||= date
      tableState.data.total += total
      tableState.data.estimated += estimated

      for (const task of list) {
        const tr = createTableTr(task)
        tableState.data.list.push(tr)
      }
    }
  }

  if (isNotDaysSort && tableState.data.list.length) {
    tableState.pushTable(tasks.at(-1).date)
  }
}

function createTableAllGroup(task) {
  const table = el('table')
  const details = el('details', el('summary', createTableCaption(task)))

  const thead = createTableHead()
  table.append(thead)

  for (const currentTask of task.list) {
    const tr = createTableTr(currentTask)
    table.append(tr)
  }

  details.append(table)
  root.prepend(details)
}

downloadButton.addEventListener('click', () => {
  const body = document.body.cloneNode(true)
  body.querySelector('button')?.remove()
  body.querySelector('script')?.remove()

  const blob = new Blob([body.outerHTML], {
    type: 'text/html'
  })

  const link = document.createElement('a')
  Object.assign(link, {
    target: '_blank',
    href: URL.createObjectURL(blob),
    download: 'tryrating-__CURRENT_DATE__.html'
  })

  link.click()
})
`,Tr=`* {
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #9999;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

caption {
  display: contents;
}

caption, details {
  color: #333;
  font-weight: bold;
  font-size: 18px;
  padding: 10px;
  text-align: center;
}

details {
  cursor: pointer;
  background: linear-gradient(to top, #e6e6e6, #f2f2f2);
  padding: 0px;
  margin-bottom: 2rem;
}

details > summary {
  list-style: none;
}

details > summary::marker, /* Latest Chrome, Edge, Firefox */
details > summary::-webkit-details-marker /* Safari */ {
  display: none;
}

summary {
  padding: 8px;
}

p {
  text-align: start;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

tr:nth-child(odd) {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #e6e6e6;
}

td:hover {
  background-color: #e6e6e6;
}

th:first-child,
td:first-child {
  width: 80%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 10%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 10%;
}

.buttons {
  position: fixed;
  right: 9rem;
  top: 1rem;
  display: flex;
  gap: 1rem;
}

button {
  font-family: inherit;
  font-weight: 600;
  display: inline-block;
  border: none;
  padding: 10px 20px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
}

button:hover {
  background-color: #e0e0e0;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #999;
}

#root {
  display: flex;
  /* asc */
  flex-direction: column-reverse;
  margin-top: 5rem;
  margin-left: 8rem;
  margin-right: 8rem;
}

.desc {
  flex-direction: column !important;
}
`;class Sr{createTasksPage(){const e=Y("html"),n=Y("body"),r=Y("head");e.append(r,n);const o=Y("meta");o.setAttribute("charset","utf-8"),r.append(o);const s=Y("div",{id:"root",className:"desc"}),a=Y("style",Tr),i=Y("script",wr.replace("__CURRENT_DATE__",jt())),c=Y("div",{className:"buttons"}),p=Y("button",{id:"sort-button"},"\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E"),g=Y("button",{id:"toggle-tables-button"},"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u0430\u0431\u043B\u0438\u0446\u044B"),h=Y("button",{id:"day-sort-button"},"\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0434\u043D\u044F\u043C"),v=Y("button",{id:"week-sort-button"},"\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u043D\u0435\u0434\u0435\u043B\u044F\u043C"),T=Y("button",{id:"month-sort-button"},"\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u043C\u0435\u0441\u044F\u0446\u0430\u043C"),x=Y("button",{id:"download-button"},"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0432 HTML");c.append(p,g,h,v,T,x);const b=Y("script",`const tasks = ${JSON.stringify(Ft.taskList)}`);return r.append(a,b),n.append(c,s,i),e}savePage(e){const n=new Blob([e.outerHTML],{type:"text/html"});Y("a",{target:"_blank",href:URL.createObjectURL(n)}).click()}}class xr{taskTableGenerator=new Sr;generate(){const e=this.taskTableGenerator.createTasksPage();this.taskTableGenerator.savePage(e)}}const Ye=new xr;function ae({label:t,position:e="bottom",size:n="large"}){return{"aria-label":t,"data-microtip-size":n,"data-microtip-position":e,role:"tooltip"}}var kr=et("<button>A");const[le,$r]=V(!0);class Dr{get isAutoSubmit(){return le()}toggle(){$r(!le())}}const vt=new Dr,Or=()=>(()=>{var t=kr();return te(t,Nt(()=>ae({label:"Auto submit",position:"left",size:"medium"}),{get classList(){return{enabled:le()}},onClick:()=>vt.toggle()}),!1,!0),t})(),ce=Symbol("store-raw"),dt=Symbol("store-node"),nt=Symbol("store-has"),He=Symbol("store-self");function We(t){let e=t[Z];if(!e&&(Object.defineProperty(t,Z,{value:e=new Proxy(t,Er)}),!Array.isArray(t))){const n=Object.keys(t),r=Object.getOwnPropertyDescriptors(t);for(let o=0,s=n.length;o<s;o++){const a=n[o];r[a].get&&Object.defineProperty(t,a,{enumerable:r[a].enumerable,get:r[a].get.bind(e)})}}return e}function Rt(t){let e;return t!=null&&typeof t=="object"&&(t[Z]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function wt(t,e=new Set){let n,r,o,s;if(n=t!=null&&t[ce])return n;if(!Rt(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let a=0,i=t.length;a<i;a++)o=t[a],(r=wt(o,e))!==o&&(t[a]=r)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const a=Object.keys(t),i=Object.getOwnPropertyDescriptors(t);for(let c=0,p=a.length;c<p;c++)s=a[c],!i[s].get&&(o=t[s],(r=wt(o,e))!==o&&(t[s]=r))}return t}function Ut(t,e){let n=t[e];return n||Object.defineProperty(t,e,{value:n=Object.create(null)}),n}function Tt(t,e,n){if(t[e])return t[e];const[r,o]=V(n,{equals:!1,internal:!0});return r.$=o,t[e]=r}function Mr(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);return!n||n.get||!n.configurable||e===Z||e===dt||(delete n.value,delete n.writable,n.get=()=>t[Z][e]),n}function Ge(t){Vt()&&Tt(Ut(t,dt),He)()}function Ar(t){return Ge(t),Reflect.ownKeys(t)}const Er={get(t,e,n){if(e===ce)return t;if(e===Z)return n;if(e===pe)return Ge(t),n;const r=Ut(t,dt),o=r[e];let s=o?o():t[e];if(e===dt||e===nt||e==="__proto__")return s;if(!o){const a=Object.getOwnPropertyDescriptor(t,e);Vt()&&(typeof s!="function"||t.hasOwnProperty(e))&&!(a&&a.get)&&(s=Tt(r,e,s)())}return Rt(s)?We(s):s},has(t,e){return e===ce||e===Z||e===pe||e===dt||e===nt||e==="__proto__"?!0:(Vt()&&Tt(Ut(t,nt),e)(),e in t)},set(){return!0},deleteProperty(){return!0},ownKeys:Ar,getOwnPropertyDescriptor:Mr};function Bt(t,e,n,r=!1){if(!r&&t[e]===n)return;const o=t[e],s=t.length;n===void 0?(delete t[e],t[nt]&&t[nt][e]&&o!==void 0&&t[nt][e].$()):(t[e]=n,t[nt]&&t[nt][e]&&o===void 0&&t[nt][e].$());let a=Ut(t,dt),i;if((i=Tt(a,e,o))&&i.$(()=>n),Array.isArray(t)&&t.length!==s){for(let c=t.length;c<s;c++)(i=a[c])&&i.$();(i=Tt(a,"length",s))&&i.$(t.length)}(i=a[He])&&i.$()}function Ve(t,e){const n=Object.keys(e);for(let r=0;r<n.length;r+=1){const o=n[r];Bt(t,o,e[o])}}function Cr(t,e){if(typeof e=="function"&&(e=e(t)),e=wt(e),Array.isArray(e)){if(t===e)return;let n=0,r=e.length;for(;n<r;n++){const o=e[n];t[n]!==o&&Bt(t,n,o)}Bt(t,"length",r)}else Ve(t,e)}function St(t,e,n=[]){let r,o=t;if(e.length>1){r=e.shift();const a=typeof r,i=Array.isArray(t);if(Array.isArray(r)){for(let c=0;c<r.length;c++)St(t,[r[c]].concat(e),n);return}else if(i&&a==="function"){for(let c=0;c<t.length;c++)r(t[c],c)&&St(t,[c].concat(e),n);return}else if(i&&a==="object"){const{from:c=0,to:p=t.length-1,by:g=1}=r;for(let h=c;h<=p;h+=g)St(t,[h].concat(e),n);return}else if(e.length>1){St(t[r],e,[r].concat(n));return}o=t[r],n=[r].concat(n)}let s=e[0];typeof s=="function"&&(s=s(o,n),s===o)||r===void 0&&s==null||(s=wt(s),r===void 0||Rt(o)&&Rt(s)&&!Array.isArray(s)?Ve(o,s):Bt(t,r,s))}function Ke(...[t,e]){const n=wt(t||{}),r=Array.isArray(n),o=We(n);function s(...a){tt(()=>{r&&a.length===1?Cr(n,a[0]):St(n,a)})}return[o,s]}var _r=et("<div>"),zt=class{x;y;width;height;constructor(t){this.x=Math.floor(t.x),this.y=Math.floor(t.y),this.width=Math.floor(t.width),this.height=Math.floor(t.height)}get rect(){return{x:this.x,y:this.y,width:this.width,height:this.height}}get left(){return this.x}get top(){return this.y}get right(){return this.x+this.width}get bottom(){return this.y+this.height}get center(){return{x:this.x+this.width*.5,y:this.y+this.height*.5}}get corners(){return{topLeft:{x:this.left,y:this.top},topRight:{x:this.right,y:this.top},bottomRight:{x:this.left,y:this.bottom},bottomLeft:{x:this.right,y:this.bottom}}}},xt=t=>{let e=new zt(t.getBoundingClientRect());const{transform:n}=getComputedStyle(t);return n&&(e=Lr(e,n)),e},Lr=(t,e)=>{let n,r;if(e.startsWith("matrix3d(")){const o=e.slice(9,-1).split(/, /);n=+o[12],r=+o[13]}else if(e.startsWith("matrix(")){const o=e.slice(7,-1).split(/, /);n=+o[4],r=+o[5]}else n=0,r=0;return new zt({...t,x:t.x-n,y:t.y-r})},ft=()=>({x:0,y:0}),Ir=(t,e)=>t.x===e.x&&t.y===e.y,ue=(t,e)=>new zt({...t,x:t.x+e.x,y:t.y+e.y}),Nr=(t,e)=>{const n=Math.max(t.top,e.top),r=Math.max(t.left,e.left),o=Math.min(t.right,e.right),s=Math.min(t.bottom,e.bottom),a=o-r,i=s-n;if(r<o&&n<s){const c=t.width*t.height,p=e.width*e.height,g=a*i;return g/(c+p-g)}return 0},de=(t,e)=>t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height,Pr=(t,e,n)=>{const r=t.transformed,o={ratio:0,droppable:null};for(const s of e){const a=Nr(r,s.layout);a>o.ratio?(o.ratio=a,o.droppable=s):a>0&&a===o.ratio&&s.id===n.activeDroppableId&&(o.droppable=s)}return o.droppable},Ze=$n(),jr=t=>{const e=Nt({collisionDetector:Pr},t),[n,r]=Ke({draggables:{},droppables:{},sensors:{},active:{draggableId:null,get draggable(){return n.active.draggableId!==null?n.draggables[n.active.draggableId]:null},droppableId:null,get droppable(){return n.active.droppableId!==null?n.droppables[n.active.droppableId]:null},sensorId:null,get sensor(){return n.active.sensorId!==null?n.sensors[n.active.sensorId]:null},overlay:null}}),o=(l,u,d)=>{l.substring(0,l.length-1),j(()=>n[l][u])&&r(l,u,"transformers",d.id,d)},s=(l,u,d)=>{l.substring(0,l.length-1),j(()=>n[l][u])&&j(()=>n[l][u].transformers[d])&&r(l,u,"transformers",d,void 0)},a=({id:l,node:u,layout:d,data:y})=>{const f=n.draggables[l],m={id:l,node:u,layout:d,data:y,_pendingCleanup:!1};let w;if(!f)Object.defineProperties(m,{transformers:{enumerable:!0,configurable:!0,writable:!0,value:{}},transform:{enumerable:!0,configurable:!0,get:()=>{if(n.active.overlay)return ft();const S=Object.values(n.draggables[l].transformers);return S.sort((O,_)=>O.order-_.order),S.reduce((O,_)=>_.callback(O),ft())}},transformed:{enumerable:!0,configurable:!0,get:()=>ue(n.draggables[l].layout,n.draggables[l].transform)}});else if(n.active.draggableId===l&&!n.active.overlay){const S={x:f.layout.x-d.x,y:f.layout.y-d.y},O="addDraggable-existing-offset",_=f.transformers[O],R=_?_.callback(S):S;w={id:O,order:100,callback:H=>({x:H.x+R.x,y:H.y+R.y})},$(()=>s("draggables",l,O))}tt(()=>{r("draggables",l,m),w&&o("draggables",l,w)}),n.active.draggable&&P()},i=l=>{j(()=>n.draggables[l])&&(r("draggables",l,"_pendingCleanup",!0),queueMicrotask(()=>c(l)))},c=l=>{if(n.draggables[l]?._pendingCleanup){const u=n.active.draggableId===l;tt(()=>{u&&r("active","draggableId",null),r("draggables",l,void 0)})}},p=({id:l,node:u,layout:d,data:y})=>{const f=n.droppables[l],m={id:l,node:u,layout:d,data:y,_pendingCleanup:!1};f||Object.defineProperties(m,{transformers:{enumerable:!0,configurable:!0,writable:!0,value:{}},transform:{enumerable:!0,configurable:!0,get:()=>{const w=Object.values(n.droppables[l].transformers);return w.sort((S,O)=>S.order-O.order),w.reduce((S,O)=>O.callback(S),ft())}},transformed:{enumerable:!0,configurable:!0,get:()=>ue(n.droppables[l].layout,n.droppables[l].transform)}}),r("droppables",l,m),n.active.draggable&&P()},g=l=>{j(()=>n.droppables[l])&&(r("droppables",l,"_pendingCleanup",!0),queueMicrotask(()=>h(l)))},h=l=>{if(n.droppables[l]?._pendingCleanup){const u=n.active.droppableId===l;tt(()=>{u&&r("active","droppableId",null),r("droppables",l,void 0)})}},v=({id:l,activators:u})=>{r("sensors",l,{id:l,activators:u,coordinates:{origin:{x:0,y:0},current:{x:0,y:0},get delta(){return{x:n.sensors[l].coordinates.current.x-n.sensors[l].coordinates.origin.x,y:n.sensors[l].coordinates.current.y-n.sensors[l].coordinates.origin.y}}}})},T=l=>{if(!j(()=>n.sensors[l]))return;const u=n.active.sensorId===l;tt(()=>{u&&r("active","sensorId",null),r("sensors",l,void 0)})},x=({node:l,layout:u})=>{const d=n.active.overlay,y={node:l,layout:u};d||Object.defineProperties(y,{id:{enumerable:!0,configurable:!0,get:()=>n.active.draggable?.id},data:{enumerable:!0,configurable:!0,get:()=>n.active.draggable?.data},transformers:{enumerable:!0,configurable:!0,get:()=>Object.fromEntries(Object.entries(n.active.draggable?n.active.draggable.transformers:{}).filter(([f])=>f!=="addDraggable-existing-offset"))},transform:{enumerable:!0,configurable:!0,get:()=>{const f=Object.values(n.active.overlay?n.active.overlay.transformers:[]);return f.sort((m,w)=>m.order-w.order),f.reduce((m,w)=>w.callback(m),ft())}},transformed:{enumerable:!0,configurable:!0,get:()=>n.active.overlay?ue(n.active.overlay.layout,n.active.overlay.transform):new zt({x:0,y:0,width:0,height:0})}}),r("active","overlay",y)},b=()=>r("active","overlay",null),k=(l,u)=>{tt(()=>{r("sensors",l,"coordinates",{origin:{...u},current:{...u}}),r("active","sensorId",l)})},N=l=>{const u=n.active.sensorId;u&&r("sensors",u,"coordinates","current",{...l})},E=()=>r("active","sensorId",null),C=(l,u)=>{const d={};for(const f of Object.values(n.sensors))if(f)for(const[m,w]of Object.entries(f.activators))d[m]??=[],d[m].push({sensor:f,activator:w});const y={};for(const f in d){let m=f;u&&(m=`on${f}`),y[m]=w=>{for(const{activator:S}of d[f]){if(n.active.sensor)break;S(w,l)}}}return y},P=()=>{let l=!1;const u=Object.values(n.draggables),d=Object.values(n.droppables),y=n.active.overlay;return tt(()=>{const f=new WeakMap;for(const m of u)if(m){const w=m.layout;f.has(m.node)||f.set(m.node,xt(m.node));const S=f.get(m.node);de(w,S)||(r("draggables",m.id,"layout",S),l=!0)}for(const m of d)if(m){const w=m.layout;f.has(m.node)||f.set(m.node,xt(m.node));const S=f.get(m.node);de(w,S)||(r("droppables",m.id,"layout",S),l=!0)}if(y){const m=y.layout,w=xt(y.node);de(m,w)||(r("active","overlay","layout",w),l=!0)}}),l},D=()=>{const l=n.active.overlay??n.active.draggable;if(l){const u=e.collisionDetector(l,Object.values(n.droppables),{activeDroppableId:n.active.droppableId}),d=u?u.id:null;n.active.droppableId!==d&&r("active","droppableId",d)}},I=l=>{const u={id:"sensorMove",order:0,callback:d=>n.active.sensor?{x:d.x+n.active.sensor.coordinates.delta.x,y:d.y+n.active.sensor.coordinates.delta.y}:d};P(),tt(()=>{r("active","draggableId",l),o("draggables",l,u)}),D()},U=()=>{const l=j(()=>n.active.draggableId);tt(()=>{l!==null&&s("draggables",l,"sensorMove"),r("active",["draggableId","droppableId"],null)}),P()},W=l=>{Q(()=>{const u=n.active.draggable;u&&j(()=>l({draggable:u}))})},z=l=>{Q(()=>{const u=n.active.draggable;if(u){const d=j(()=>n.active.overlay);Object.values(d?d.transform:u.transform),j(()=>l({draggable:u,overlay:d}))}})},A=l=>{Q(()=>{const u=n.active.draggable,d=n.active.droppable;u&&j(()=>l({draggable:u,droppable:d,overlay:n.active.overlay}))})},$=l=>{Q(({previousDraggable:u,previousDroppable:d,previousOverlay:y})=>{const f=n.active.draggable,m=f?n.active.droppable:null,w=f?n.active.overlay:null;return!f&&u&&j(()=>l({draggable:u,droppable:d,overlay:y})),{previousDraggable:f,previousDroppable:m,previousOverlay:w}},{previousDraggable:null,previousDroppable:null,previousOverlay:null})};z(()=>D()),e.onDragStart&&W(e.onDragStart),e.onDragMove&&z(e.onDragMove),e.onDragOver&&A(e.onDragOver),e.onDragEnd&&$(e.onDragEnd);const Ht=[n,{addTransformer:o,removeTransformer:s,addDraggable:a,removeDraggable:i,addDroppable:p,removeDroppable:g,addSensor:v,removeSensor:T,setOverlay:x,clearOverlay:b,recomputeLayouts:P,detectCollisions:D,draggableActivators:C,sensorStart:k,sensorMove:N,sensorEnd:E,dragStart:I,dragEnd:U,onDragStart:W,onDragMove:z,onDragOver:A,onDragEnd:$}];return B(Ze.Provider,{value:Ht,get children(){return e.children}})},fe=()=>Dn(Ze)||null,Fr=(t="pointer-sensor")=>{const[e,{addSensor:n,removeSensor:r,sensorStart:o,sensorMove:s,sensorEnd:a,dragStart:i,dragEnd:c}]=fe(),p=250,g=10;ve(()=>{n({id:t,activators:{pointerdown:b}})}),pt(()=>{r(t)});const h=()=>e.active.sensorId===t,v={x:0,y:0};let T=null,x=null;const b=(D,I)=>{D.button===0&&(document.addEventListener("pointermove",E),document.addEventListener("pointerup",C),x=I,v.x=D.clientX,v.y=D.clientY,T=window.setTimeout(N,p))},k=()=>{T&&(clearTimeout(T),T=null),document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",C),document.removeEventListener("selectionchange",P)},N=()=>{e.active.sensor?h()||k():(o(t,v),i(x),P(),document.addEventListener("selectionchange",P))},E=D=>{const I={x:D.clientX,y:D.clientY};if(!e.active.sensor){const U={x:I.x-v.x,y:I.y-v.y};Math.sqrt(U.x**2+U.y**2)>g&&N()}h()&&(D.preventDefault(),s(I))},C=D=>{k(),h()&&(D.preventDefault(),c(),a())},P=()=>{window.getSelection()?.removeAllRanges()}},Rr=t=>(Fr(),K(()=>t.children)),Xe=t=>({transform:`translate3d(${t.x}px, ${t.y}px, 0)`}),Ur=(t,e={})=>{const[n,{addDraggable:r,removeDraggable:o,draggableActivators:s}]=fe(),[a,i]=V(null);ve(()=>{const h=a();h&&r({id:t,node:h,layout:xt(h),data:e})}),pt(()=>o(t));const c=()=>n.active.draggableId===t,p=()=>n.draggables[t]?.transform||ft();return Object.defineProperties((h,v)=>{const T=v?v():{};Q(()=>{const x=a(),b=s(t);if(x)for(const k in b)x.addEventListener(k,b[k]);pt(()=>{if(x)for(const k in b)x.removeEventListener(k,b[k])})}),i(h),T.skipTransform||Q(()=>{const x=p();if(Ir(x,ft()))h.style.removeProperty("transform");else{const b=Xe(p());h.style.setProperty("transform",b.transform??null)}})},{ref:{enumerable:!0,value:i},isActiveDraggable:{enumerable:!0,get:c},dragActivators:{enumerable:!0,get:()=>s(t,!0)},transform:{enumerable:!0,get:p}})},Br=t=>{const[e,{onDragStart:n,onDragEnd:r,setOverlay:o,clearOverlay:s}]=fe();let a;n(({draggable:c})=>{o({node:c.node,layout:c.layout}),queueMicrotask(()=>{if(a){const p=xt(a),g={x:(c.layout.width-p.width)/2,y:(c.layout.height-p.height)/2};p.x+=g.x,p.y+=g.y,o({node:a,layout:p})}})}),r(()=>queueMicrotask(s));const i=()=>{const c=e.active.overlay,p=e.active.draggable;return!c||!p?{}:{position:"fixed",transition:"transform 0s",top:`${c.layout.top}px`,left:`${c.layout.left}px`,"min-width":`${p.layout.width}px`,"min-height":`${p.layout.height}px`,...Xe(c.transform),...t.style}};return B(tr,{get mount(){return document.body},get children(){return B(ke,{get when(){return e.active.draggable},get children(){var c=_r(),p=a;return typeof p=="function"?Ae(p,c):a=c,ot(c,(()=>{var g=K(()=>typeof t.children=="function");return()=>g()?t.children(e.active.draggable):t.children})()),J(g=>{var h=t.class,v=i();return h!==g.e&&Oe(c,g.e=h),g.t=Me(c,v,g.t),g},{e:void 0,t:void 0}),c}})}})};function ge(t,e){const n=GM_getValue(t,e),[r,o]=Ke(n);return Q(()=>GM_setValue(t,r)),[r,o]}var zr=et('<div class="tryrating-widget draggable absolute">'),qr=et("<div class=widget-drag-overlay><span class=text>alt+3 reset position");const[Je,Qe]=ge("widget-position",{top:"0px",left:"0px"});function Yr(){Qe({top:"0px",left:"0px"})}const Hr=t=>{const e=Ur(t.id);return(()=>{var n=zr();return Ae(e,n,()=>!0),ot(n,()=>t.children),J(r=>{var o=!!e.isActiveDraggable,s=Je.top,a=Je.left;return o!==r.e&&n.classList.toggle("opacity-25",r.e=o),s!==r.t&&((r.t=s)!=null?n.style.setProperty("top",s):n.style.removeProperty("top")),a!==r.a&&((r.a=a)!=null?n.style.setProperty("left",a):n.style.removeProperty("left")),r},{e:void 0,t:void 0,a:void 0}),n})()},Wr=t=>{let e={x:0,y:0};return B(jr,{onDragMove:({overlay:o})=>{o&&(e={...o.transform})},onDragEnd:({draggable:o})=>{const s=o.node,a=`${s.offsetTop+e.y}px`,i=`${s.offsetLeft+e.x}px`;Qe({top:a,left:i})},get children(){return[B(Rr,{}),B(Hr,{id:1,get children(){return t.children}}),B(Br,{children:o=>[qr(),o]})]}})},[tn,Gr]=V(!0);function Vr(){Gr(!tn())}const Kr=t=>B(ke,{get when(){return tn()},get children(){return t.children}});function Zr(){window.addEventListener("keydown",t=>{bt.openTasks(t)&&(t.preventDefault(),Ye.generate()),bt.resetTasks(t)&&(t.preventDefault(),confirm(`Reset data.
Are you sure?`)&&Ft.reset()),bt.resetWidgetPosition(t)&&(t.preventDefault(),Yr()),bt.toggleAutoSubmit(t)&&(t.preventDefault(),vt.toggle()),bt.toggleWidgetVisibility(t)&&(t.preventDefault(),Vr())})}const Xr=t=>(e,n)=>(t.set(e,n),n),en=Number.MAX_SAFE_INTEGER===void 0?9007199254740991:Number.MAX_SAFE_INTEGER,nn=536870912,rn=nn*2,Jr=(t,e)=>n=>{const r=e.get(n);let o=r===void 0?n.size:r<rn?r+1:0;if(!n.has(o))return t(n,o);if(n.size<nn){for(;n.has(o);)o=Math.floor(Math.random()*rn);return t(n,o)}if(n.size>en)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;n.has(o);)o=Math.floor(Math.random()*en);return t(n,o)},on=new WeakMap,Qr=Xr(on),qt=Jr(Qr,on),to=t=>t.method!==void 0&&t.method==="call",eo=t=>t.error===null&&typeof t.id=="number",sn=((t,e)=>{let n=null;return()=>{if(n!==null)return n;const r=new Blob([e],{type:"application/javascript; charset=utf-8"}),o=URL.createObjectURL(r);return n=t(o),setTimeout(()=>URL.revokeObjectURL(o)),n}})(t=>{const e=new Map([[0,()=>{}]]),n=new Map([[0,()=>{}]]),r=new Map,o=new Worker(t);return o.addEventListener("message",({data:p})=>{if(to(p)){const{params:{timerId:g,timerType:h}}=p;if(h==="interval"){const v=e.get(g);if(typeof v=="number"){const T=r.get(v);if(T===void 0||T.timerId!==g||T.timerType!==h)throw new Error("The timer is in an undefined state.")}else if(typeof v<"u")v();else throw new Error("The timer is in an undefined state.")}else if(h==="timeout"){const v=n.get(g);if(typeof v=="number"){const T=r.get(v);if(T===void 0||T.timerId!==g||T.timerType!==h)throw new Error("The timer is in an undefined state.")}else if(typeof v<"u")v(),n.delete(g);else throw new Error("The timer is in an undefined state.")}}else if(eo(p)){const{id:g}=p,h=r.get(g);if(h===void 0)throw new Error("The timer is in an undefined state.");const{timerId:v,timerType:T}=h;r.delete(g),T==="interval"?e.delete(v):n.delete(v)}else{const{error:{message:g}}=p;throw new Error(g)}}),{clearInterval:p=>{const g=qt(r);r.set(g,{timerId:p,timerType:"interval"}),e.set(p,g),o.postMessage({id:g,method:"clear",params:{timerId:p,timerType:"interval"}})},clearTimeout:p=>{const g=qt(r);r.set(g,{timerId:p,timerType:"timeout"}),n.set(p,g),o.postMessage({id:g,method:"clear",params:{timerId:p,timerType:"timeout"}})},setInterval:(p,g=0)=>{const h=qt(e);return e.set(h,()=>{p(),typeof e.get(h)=="function"&&o.postMessage({id:null,method:"set",params:{delay:g,now:performance.now(),timerId:h,timerType:"interval"}})}),o.postMessage({id:null,method:"set",params:{delay:g,now:performance.now(),timerId:h,timerType:"interval"}}),h},setTimeout:(p,g=0)=>{const h=qt(n);return n.set(h,p),o.postMessage({id:null,method:"set",params:{delay:g,now:performance.now(),timerId:h,timerType:"timeout"}}),h}}},`(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error('The given type "'.concat(i,'" is not supported'));(e=>{const r=t.get(e);if(void 0===r)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error('The given method "'.concat(s.method,'" is not supported'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error('The given type "'.concat(d,'" is not supported'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();`),an=t=>sn().clearInterval(t),he=(...t)=>sn().setInterval(...t),no=".modal-container.visible",ro="div[modalwrapref] > div",ln="Validation failed!",[cn,oo]=ge("auto-close-modal",{value:!0});class so{get autoClose(){return cn.value}toggleAutoClose(){oo({value:!cn.value})}closeValidationFailed(){const e=document.querySelector(no);if(!e)return;const n=e.querySelector(ro);if(n&&n.textContent===ln){GM_notification({title:document.title,text:ln,highlight:!0,silent:!1,timeout:1e3});const r=e.querySelector("button");r&&(F.info("Modal closed"),r.click())}}}const Yt=new so,[un,dn]=ge("check-survey",{value:!1}),[io,ao]=V(!1);class lo{checkSurvey(){if(io())return;const e=document.querySelector(".no-survey-view");if(!e)return;const n=e.querySelector("button");if(!n){F.info("Check Now button is not defined");return}un.value||(F.info("Survey is not found. Please, wait..."),dn({value:!0})),ao(!0),je(1e4).then(()=>n.click()).finally(()=>this.reloadPage())}tryNotification(){if(!un.value)return;dn({value:!1}),GM_notification({title:"Survey found!",text:"Go to the survey",highlight:!0,timeout:3e3});const e=new Audio(rr);e.volume=.3,e.play()}reloadPage(){const e=Re(3e4,6e4);je(e).then(()=>location.reload())}}const fn=new lo;function co(t){const e=t.split(/\s(?=\d)/);let n=0;for(const r of e){const[o,s]=r.split(" ");switch(s){case"hours":n+=Number(o)*36e5;break;case"minute":case"minutes":n+=Number(o)*6e4;break;case"second":case"seconds":n+=Number(o)*1e3;break;default:F.warn(`Unknown time type: ${s}`)}}return n}function gn(t){const e=Re(-5,15);return t+e*1e3}const[uo,hn]=V(0);let fo=class{intervalId;get time(){return uo()}tick(){hn(e=>e+1e3)}start(){this.intervalId&&(an(this.intervalId),hn(0)),this.intervalId=he(()=>this.tick(),1e3)}};const pn=new fo,go=".btn-success",ho="Submit Rating",[mn,po]=V(!0);class mo{get isAutoSubmit(){return mn()}toggleAutoSubmit(){po(!mn())}getSubmitButtons(){const e=[],n=Array.from(document.querySelectorAll(go));for(const r of n)r instanceof HTMLButtonElement&&r.textContent===ho&&e.push(r);return e}clickSubmit(){if(!vt.isAutoSubmit)return;const e=this.getSubmitButtons();if(!e.length){F.error("Submit button is not defined");return}e[0].click()}}const bo=new mo,[bn,yn]=V(0);let yo=class{intervalId;onTimerTickCallback;onEndCallback;tick(){const e=bn()-1e3;yn(e),this.onTimerTickCallback(),e===0&&(this.onEndCallback(),this.stop())}get time(){return bn()}onTimerEnd(e){this.onEndCallback=e}onTimerTick(e){this.onTimerTickCallback=e}start(e){this.stop(),yn(e),this.intervalId=he(()=>this.tick(),1e3)}stop(){this.intervalId&&(an(this.intervalId),this.intervalId=null)}};const kt=new yo;kt.onTimerEnd(()=>bo.clickSubmit()),kt.onTimerTick(()=>{const t=gt.getTaskFields,e=gt.currentTaskFields;if(!(!t||!e)&&e.requestId===t.requestId&&e.estimated!==t.estimated){F.info("Task estimated changed",{oldTaskFields:e,newTaskFields:t});const n=gn(t.estimated);kt.start(n),gt.currentTaskFields=t}});class vo{taskFields=null;onChangeTaskCallback=null;get currentTaskFields(){return this.taskFields}set currentTaskFields(e){this.taskFields=e}get getTaskFields(){const e=document.querySelector(this.targetSelector);if(!e){F.error("Task fields not found");return}const[n,r,o]=Array.from(e.querySelectorAll(".labeled-attribute__attribute"));if(!n||!r||!o){F.error("Task fields attributes not found");return}return{taskType:n.textContent,requestId:r.textContent,estimated:co(o.textContent.trim())}}get targetSelector(){return".survey-meta-fields"}onChangeTask(e){this.onChangeTaskCallback=e}observe(){const e=this.getTaskFields;if(e&&e.requestId!==this.taskFields?.requestId){const n=gn(e.estimated);F.info("Task fields changed",e),this.onChangeTaskCallback({...e,estimated:n}),vt.isAutoSubmit||vt.toggle(),this.taskFields&&(F.info("Task is submitted",this.taskFields),Ft.write({type:this.taskFields.taskType,estimated:this.taskFields.estimated})),this.currentTaskFields=e}}}const gt=new vo;gt.onChangeTask(t=>{kt.start(t.estimated),pn.start(),Ue.checkUpdates(),fn.tryNotification()});async function wo(){const t=document.querySelector("#app-root");if(!t){F.error("App root not found");return}ze(t,()=>{Yt.autoClose&&Yt.closeValidationFailed(),fn.checkSurvey()}),qe({selector:gt.targetSelector}).then(()=>{he(()=>gt.observe(),7*1e3)}).finally(()=>F.info("Initialized task fields observer"))}var To=et("<button>M");const So=()=>(()=>{var t=To();return te(t,Nt(()=>ae({label:"Auto close",position:"left",size:"medium"}),{get classList(){return{enabled:Yt.autoClose}},onClick:()=>Yt.toggleAutoClose()}),!1,!0),t})();var xo=et("<button class=task-counter>");const ko=()=>{const t=K(()=>{const e=jt();return Ft.taskList.find(r=>r.date===e)?.total??"0"});return(()=>{var e=xo();return e.$$click=()=>Ye.generate(),ot(e,t),e})()};De(["click"]);var $o=et("<div>?");const Do=()=>(()=>{var t=$o();return te(t,Nt(()=>ae({label:or,position:"left",size:"large"})),!1,!0),t})();function Oo(t){return Fe(Number((t%6e4/1e3).toFixed(0)))}function vn(t){const e=Fe(Math.floor(t/6e4)),n=Oo(t);return`${e}:${n}`}var Mo=et("<div>Stopwatch: ");const Ao=()=>{const t=K(()=>vn(pn.time));return(()=>{var e=Mo();return e.firstChild,ot(e,t,null),e})()};var Eo=et("<div>Timer: ");const Co=()=>{const t=K(()=>vn(kt.time));return(()=>{var e=Eo();return e.firstChild,ot(e,t,null),e})()},_o=()=>B(Kr,{get children(){return B(Wr,{get children(){return[B(Co,{}),B(Ao,{}),B(ko,{}),B(Or,{}),B(So,{}),B(Do,{})]}})}});wo(),Zr(),Hn(()=>B(_o,{}),document.body),GM_addStyle('[aria-label][role~=tooltip]{position:relative}[aria-label][role~=tooltip]:before,[aria-label][role~=tooltip]:after{transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;opacity:0;pointer-events:none;transition:all var(--microtip-transition-duration, .18s) var(--microtip-transition-easing, ease-in-out) var(--microtip-transition-delay, 0s);position:absolute;box-sizing:border-box;z-index:10;transform-origin:top}[aria-label][role~=tooltip]:before{background-size:100% auto!important;content:""}[aria-label][role~=tooltip]:after{background:#111111e6;border-radius:4px;color:#fff;content:attr(aria-label);font-size:var(--microtip-font-size, 13px);font-weight:var(--microtip-font-weight, normal);text-transform:var(--microtip-text-transform, none);padding:.5em 1em;white-space:nowrap;box-sizing:content-box}[aria-label][role~=tooltip]:hover:before,[aria-label][role~=tooltip]:hover:after,[aria-label][role~=tooltip]:focus:before,[aria-label][role~=tooltip]:focus:after{opacity:1;pointer-events:auto}[role~=tooltip][data-microtip-position|=top]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%280%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:6px;width:18px;margin-bottom:5px}[role~=tooltip][data-microtip-position|=top]:after{margin-bottom:11px}[role~=tooltip][data-microtip-position|=top]:before{transform:translate3d(-50%,0,0);bottom:100%;left:50%}[role~=tooltip][data-microtip-position|=top]:hover:before{transform:translate3d(-50%,-5px,0)}[role~=tooltip][data-microtip-position|=top]:after{transform:translate3d(-50%,0,0);bottom:100%;left:50%}[role~=tooltip][data-microtip-position=top]:hover:after{transform:translate3d(-50%,-5px,0)}[role~=tooltip][data-microtip-position=top-left]:after{transform:translate3d(calc(-100% + 16px),0,0);bottom:100%}[role~=tooltip][data-microtip-position=top-left]:hover:after{transform:translate3d(calc(-100% + 16px),-5px,0)}[role~=tooltip][data-microtip-position=top-right]:after{transform:translate3d(calc(0% - 16px),0,0);bottom:100%}[role~=tooltip][data-microtip-position=top-right]:hover:after{transform:translate3d(calc(0% - 16px),-5px,0)}[role~=tooltip][data-microtip-position|=bottom]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28180%2018%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:6px;width:18px;margin-top:5px;margin-bottom:0}[role~=tooltip][data-microtip-position|=bottom]:after{margin-top:11px}[role~=tooltip][data-microtip-position|=bottom]:before{transform:translate3d(-50%,-10px,0);bottom:auto;left:50%;top:100%}[role~=tooltip][data-microtip-position|=bottom]:hover:before{transform:translate3d(-50%,0,0)}[role~=tooltip][data-microtip-position|=bottom]:after{transform:translate3d(-50%,-10px,0);top:100%;left:50%}[role~=tooltip][data-microtip-position=bottom]:hover:after{transform:translate3d(-50%,0,0)}[role~=tooltip][data-microtip-position=bottom-left]:after{transform:translate3d(calc(-100% + 16px),-10px,0);top:100%}[role~=tooltip][data-microtip-position=bottom-left]:hover:after{transform:translate3d(calc(-100% + 16px),0,0)}[role~=tooltip][data-microtip-position=bottom-right]:after{transform:translate3d(calc(0% - 16px),-10px,0);top:100%}[role~=tooltip][data-microtip-position=bottom-right]:hover:after{transform:translate3d(calc(0% - 16px),0,0)}[role~=tooltip][data-microtip-position=left]:before,[role~=tooltip][data-microtip-position=left]:after{inset:50% 100% auto auto;transform:translate3d(10px,-50%,0)}[role~=tooltip][data-microtip-position=left]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%28-90%2018%2018%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:18px;width:6px;margin-right:5px;margin-bottom:0}[role~=tooltip][data-microtip-position=left]:after{margin-right:11px}[role~=tooltip][data-microtip-position=left]:hover:before,[role~=tooltip][data-microtip-position=left]:hover:after{transform:translate3d(0,-50%,0)}[role~=tooltip][data-microtip-position=right]:before,[role~=tooltip][data-microtip-position=right]:after{bottom:auto;left:100%;top:50%;transform:translate3d(-10px,-50%,0)}[role~=tooltip][data-microtip-position=right]:before{background:url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba%2817,%2017,%2017,%200.9%29%22%20transform%3D%22rotate%2890%206%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E) no-repeat;height:18px;width:6px;margin-bottom:0;margin-left:5px}[role~=tooltip][data-microtip-position=right]:after{margin-left:11px}[role~=tooltip][data-microtip-position=right]:hover:before,[role~=tooltip][data-microtip-position=right]:hover:after{transform:translate3d(0,-50%,0)}[role~=tooltip][data-microtip-size=small]:after{white-space:initial;width:80px}[role~=tooltip][data-microtip-size=medium]:after{white-space:initial;width:150px}[role~=tooltip][data-microtip-size=large]:after{white-space:initial;width:260px}:root{--try-font-family: monospace}.tryrating-widget{user-select:none;display:flex;color:#fff;padding-left:4px;background:#2e2c2f;font-size:1rem;font-weight:600;align-items:center;height:40px;justify-content:center;text-transform:uppercase;font-family:var(--try-font-family)}.tryrating-widget.draggable{cursor:pointer}.tryrating-widget.absolute{z-index:999999;position:absolute}.tryrating-widget.opacity-25{opacity:.25}.tryrating-widget>.task-counter{background:gray}.tryrating-widget>div{margin-left:6px;margin-right:6px}.tryrating-widget>button{text-transform:inherit;height:inherit;border:none;font-size:inherit;font-weight:inherit;color:#fff;padding-left:12px;padding-right:12px;background:#f44336}.tryrating-widget>button.enabled{background:#4caf50}.widget-drag-overlay{font-size:20px;font-weight:700;color:#3b99fc;width:100%;height:100%;position:absolute;text-align:center;align-self:center;text-transform:uppercase;background:#000000e6}.widget-drag-overlay>.text{font-family:var(--try-font-family);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%}')})();
