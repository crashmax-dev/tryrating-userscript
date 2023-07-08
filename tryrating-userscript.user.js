// ==UserScript==
// @name        tryrating-userscript
// @version     1.2.7
// @author      crashmax <userscript@crashmax.ru>
// @license     MIT
// @homepage    https://crashmax-dev.github.io/tryrating-userscript/
// @match       https://www.tryrating.com/app/survey/*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       GM_notification
// @updateURL   https://crashmax-dev.github.io/tryrating-userscript/tryrating-userscript.meta.js
// @downloadURL https://crashmax-dev.github.io/tryrating-userscript/tryrating-userscript.user.js
// ==/UserScript==

(function(){"use strict";const ut={equals:(t,e)=>t===e};let me=Bt;const P=1,ct=2,Ut={owned:null,cleanups:null,context:null,owner:null};var z=null;let bt=null,C=null,N=null,V=null,lt=0;function pe(t,e){const n=C,s=z,r=t.length===0,i=r?Ut:{owned:null,cleanups:null,context:null,owner:e===void 0?s:e},a=r?t:()=>t(()=>dt(()=>pt(i)));z=i,C=null;try{return st(a,!0)}finally{C=n,z=s}}function J(t,e){e=e?Object.assign({},ut,e):ut;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},s=r=>(typeof r=="function"&&(r=r(n.value)),Yt(n,r));return[Ft.bind(n),s]}function ft(t,e,n){const s=Rt(t,e,!1,P);ht(s)}function Mt(t,e,n){n=n?Object.assign({},ut,n):ut;const s=Rt(t,e,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,ht(s),Ft.bind(s)}function dt(t){if(C===null)return t();const e=C;C=null;try{return t()}finally{C=e}}function Ft(){if(this.sources&&this.state)if(this.state===P)ht(this);else{const t=N;N=null,st(()=>mt(this),!1),N=t}if(C){const t=this.observers?this.observers.length:0;C.sources?(C.sources.push(this),C.sourceSlots.push(t)):(C.sources=[this],C.sourceSlots=[t]),this.observers?(this.observers.push(C),this.observerSlots.push(C.sources.length-1)):(this.observers=[C],this.observerSlots=[C.sources.length-1])}return this.value}function Yt(t,e,n){let s=t.value;return(!t.comparator||!t.comparator(s,e))&&(t.value=e,t.observers&&t.observers.length&&st(()=>{for(let r=0;r<t.observers.length;r+=1){const i=t.observers[r],a=bt&&bt.running;a&&bt.disposed.has(i),(a?!i.tState:!i.state)&&(i.pure?N.push(i):V.push(i),i.observers&&Ht(i)),a||(i.state=P)}if(N.length>1e6)throw N=[],new Error},!1)),e}function ht(t){if(!t.fn)return;pt(t);const e=z,n=C,s=lt;C=z=t,ge(t,t.value,s),C=n,z=e}function ge(t,e,n){let s;try{s=t.fn(e)}catch(r){return t.pure&&(t.state=P,t.owned&&t.owned.forEach(pt),t.owned=null),t.updatedAt=n+1,qt(r)}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?Yt(t,s):t.value=s,t.updatedAt=n)}function Rt(t,e,n,s=P,r){const i={fn:t,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:z,context:null,pure:n};return z===null||z!==Ut&&(z.owned?z.owned.push(i):z.owned=[i]),i}function zt(t){if(t.state===0)return;if(t.state===ct)return mt(t);if(t.suspense&&dt(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<lt);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===P)ht(t);else if(t.state===ct){const s=N;N=null,st(()=>mt(t,e[0]),!1),N=s}}function st(t,e){if(N)return t();let n=!1;e||(N=[]),V?n=!0:V=[],lt++;try{const s=t();return ye(n),s}catch(s){n||(V=null),N=null,qt(s)}}function ye(t){if(N&&(Bt(N),N=null),t)return;const e=V;V=null,e.length&&st(()=>me(e),!1)}function Bt(t){for(let e=0;e<t.length;e++)zt(t[e])}function mt(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const s=t.sources[n];if(s.sources){const r=s.state;r===P?s!==e&&(!s.updatedAt||s.updatedAt<lt)&&zt(s):r===ct&&mt(s,e)}}}function Ht(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=ct,n.pure?N.push(n):V.push(n),n.observers&&Ht(n))}}function pt(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),s=t.sourceSlots.pop(),r=n.observers;if(r&&r.length){const i=r.pop(),a=n.observerSlots.pop();s<r.length&&(i.sourceSlots[a]=s,r[s]=i,n.observerSlots[s]=a)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)pt(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0,t.context=null}function $e(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function qt(t,e=z){throw $e(t)}function we(t,e){return dt(()=>t(e||{}))}function ve(t,e,n){let s=n.length,r=e.length,i=s,a=0,o=0,m=e[r-1].nextSibling,p=null;for(;a<r||o<i;){if(e[a]===n[o]){a++,o++;continue}for(;e[r-1]===n[i-1];)r--,i--;if(r===a){const h=i<s?o?n[o-1].nextSibling:n[i-o]:m;for(;o<i;)t.insertBefore(n[o++],h)}else if(i===o)for(;a<r;)(!p||!p.has(e[a]))&&e[a].remove(),a++;else if(e[a]===n[i-1]&&n[o]===e[r-1]){const h=e[--r].nextSibling;t.insertBefore(n[o++],e[a++].nextSibling),t.insertBefore(n[--i],h),e[r]=n[i]}else{if(!p){p=new Map;let g=o;for(;g<i;)p.set(n[g],g++)}const h=p.get(e[a]);if(h!=null)if(o<h&&h<i){let g=a,y=1,T;for(;++g<r&&g<i&&!((T=p.get(e[g]))==null||T!==h+y);)y++;if(y>h-o){const M=e[a];for(;o<h;)t.insertBefore(n[o++],M)}else t.replaceChild(n[o++],e[a++])}else a++;else e[a++].remove()}}}const jt="_$DX_DELEGATE";function Te(t,e,n,s={}){let r;return pe(i=>{r=i,e===document?t():gt(e,t(),e.firstChild?null:void 0,n)},s.owner),()=>{r(),e.textContent=""}}function be(t,e,n){let s;const r=()=>{const a=document.createElement("template");return a.innerHTML=t,n?a.content.firstChild.firstChild:a.content.firstChild},i=e?()=>dt(()=>document.importNode(s||(s=r()),!0)):()=>(s||(s=r())).cloneNode(!0);return i.cloneNode=i,i}function Me(t,e=window.document){const n=e[jt]||(e[jt]=new Set);for(let s=0,r=t.length;s<r;s++){const i=t[s];n.has(i)||(n.add(i),e.addEventListener(i,Se))}}function gt(t,e,n,s){if(n!==void 0&&!s&&(s=[]),typeof e!="function")return yt(t,e,s,n);ft(r=>yt(t,e(),r,n),s)}function Se(t){const e=`$$${t.type}`;let n=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==n&&Object.defineProperty(t,"target",{configurable:!0,value:n}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}});n;){const s=n[e];if(s&&!n.disabled){const r=n[`${e}Data`];if(r!==void 0?s.call(n,r,t):s.call(n,t),t.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function yt(t,e,n,s,r){for(;typeof n=="function";)n=n();if(e===n)return n;const i=typeof e,a=s!==void 0;if(t=a&&n[0]&&n[0].parentNode||t,i==="string"||i==="number")if(i==="number"&&(e=e.toString()),a){let o=n[0];o&&o.nodeType===3?o.data=e:o=document.createTextNode(e),n=X(t,n,s,o)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e;else if(e==null||i==="boolean")n=X(t,n,s);else{if(i==="function")return ft(()=>{let o=e();for(;typeof o=="function";)o=o();n=yt(t,o,n,s)}),()=>n;if(Array.isArray(e)){const o=[],m=n&&Array.isArray(n);if(St(o,e,n,r))return ft(()=>n=yt(t,o,n,s,!0)),()=>n;if(o.length===0){if(n=X(t,n,s),a)return n}else m?n.length===0?Wt(t,o,s):ve(t,n,o):(n&&X(t),Wt(t,o));n=o}else if(e.nodeType){if(Array.isArray(n)){if(a)return n=X(t,n,s,e);X(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}else console.warn("Unrecognized value. Skipped inserting",e)}return n}function St(t,e,n,s){let r=!1;for(let i=0,a=e.length;i<a;i++){let o=e[i],m=n&&n[i],p;if(!(o==null||o===!0||o===!1))if((p=typeof o)=="object"&&o.nodeType)t.push(o);else if(Array.isArray(o))r=St(t,o,m)||r;else if(p==="function")if(s){for(;typeof o=="function";)o=o();r=St(t,Array.isArray(o)?o:[o],Array.isArray(m)?m:[m])||r}else t.push(o),r=!0;else{const h=String(o);m&&m.nodeType===3&&m.data===h?t.push(m):t.push(document.createTextNode(h))}}return r}function Wt(t,e,n=null){for(let s=0,r=e.length;s<r;s++)t.insertBefore(e[s],n)}function X(t,e,n,s){if(n===void 0)return t.textContent="";const r=s||document.createTextNode("");if(e.length){let i=!1;for(let a=e.length-1;a>=0;a--){const o=e[a];if(r!==o){const m=o.parentNode===t;!i&&!a?m?t.replaceChild(r,o):t.insertBefore(r,n):m&&o.remove()}else i=!0}}else t.insertBefore(r,n);return[r]}function I(t,e,...n){const s=document.createElement(t);return e instanceof Node?s.append(e):typeof e=="string"?s.append(Ee(e)):Array.isArray(e)?s.append(...e):(Object.assign(s,e),Object.assign(s.style,e?.style)),s.append(...n),s}function Ee(t){return document.createTextNode(t)}function ke(t,e,n){const s=new MutationObserver((r,i)=>{for(const a of r)e(a,i)});return s.observe(t,{childList:!0,subtree:!0,...n}),()=>s.disconnect()}const De=t=>(e,n)=>(t.set(e,n),n),Pt=Number.MAX_SAFE_INTEGER===void 0?9007199254740991:Number.MAX_SAFE_INTEGER,Vt=536870912,Gt=Vt*2,Oe=(t,e)=>n=>{const s=e.get(n);let r=s===void 0?n.size:s<Gt?s+1:0;if(!n.has(r))return t(n,r);if(n.size<Vt){for(;n.has(r);)r=Math.floor(Math.random()*Gt);return t(n,r)}if(n.size>Pt)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;n.has(r);)r=Math.floor(Math.random()*Pt);return t(n,r)},Zt=new WeakMap,xe=De(Zt),$t=Oe(xe,Zt),Ce=t=>t.method!==void 0&&t.method==="call",Ae=t=>t.error===null&&typeof t.id=="number",Kt=((t,e)=>{let n=null;return()=>{if(n!==null)return n;const s=new Blob([e],{type:"application/javascript; charset=utf-8"}),r=URL.createObjectURL(s);return n=t(r),setTimeout(()=>URL.revokeObjectURL(r)),n}})(t=>{const e=new Map([[0,()=>{}]]),n=new Map([[0,()=>{}]]),s=new Map,r=new Worker(t);return r.addEventListener("message",({data:p})=>{if(Ce(p)){const{params:{timerId:h,timerType:g}}=p;if(g==="interval"){const y=e.get(h);if(typeof y=="number"){const T=s.get(y);if(T===void 0||T.timerId!==h||T.timerType!==g)throw new Error("The timer is in an undefined state.")}else if(typeof y<"u")y();else throw new Error("The timer is in an undefined state.")}else if(g==="timeout"){const y=n.get(h);if(typeof y=="number"){const T=s.get(y);if(T===void 0||T.timerId!==h||T.timerType!==g)throw new Error("The timer is in an undefined state.")}else if(typeof y<"u")y(),n.delete(h);else throw new Error("The timer is in an undefined state.")}}else if(Ae(p)){const{id:h}=p,g=s.get(h);if(g===void 0)throw new Error("The timer is in an undefined state.");const{timerId:y,timerType:T}=g;s.delete(h),T==="interval"?e.delete(y):n.delete(y)}else{const{error:{message:h}}=p;throw new Error(h)}}),{clearInterval:p=>{const h=$t(s);s.set(h,{timerId:p,timerType:"interval"}),e.set(p,h),r.postMessage({id:h,method:"clear",params:{timerId:p,timerType:"interval"}})},clearTimeout:p=>{const h=$t(s);s.set(h,{timerId:p,timerType:"timeout"}),n.set(p,h),r.postMessage({id:h,method:"clear",params:{timerId:p,timerType:"timeout"}})},setInterval:(p,h)=>{const g=$t(e);return e.set(g,()=>{p(),typeof e.get(g)=="function"&&r.postMessage({id:null,method:"set",params:{delay:h,now:performance.now(),timerId:g,timerType:"interval"}})}),r.postMessage({id:null,method:"set",params:{delay:h,now:performance.now(),timerId:g,timerType:"interval"}}),g},setTimeout:(p,h)=>{const g=$t(n);return n.set(g,p),r.postMessage({id:null,method:"set",params:{delay:h,now:performance.now(),timerId:g,timerType:"timeout"}}),g}}},`(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error('The given type "'.concat(i,'" is not supported'));(e=>{const r=t.get(e);if(void 0===r)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error('The given method "'.concat(s.method,'" is not supported'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error('The given type "'.concat(d,'" is not supported'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();`),Jt=t=>Kt().clearInterval(t),Et=(t,e)=>Kt().setInterval(t,e),Q=1e3,tt=Q*60,et=tt*60,G=et*24,_e=G*7,Ie=G*365.25;function kt(t,e){try{if(typeof t=="string"&&t.length>0)return Le(t);if(typeof t=="number"&&isFinite(t))return e?.long?Ue(t):Ne(t);throw new Error("Value is not a string or number.")}catch(n){const s=Fe(n)?`${n.message}. value=${JSON.stringify(t)}`:"An unknown error has occured.";throw new Error(s)}}function Le(t){if(t=String(t),t.length>100)throw new Error("Value exceeds the maximum length of 100 characters.");const e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(!e)return NaN;const n=parseFloat(e[1]),s=(e[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return n*Ie;case"weeks":case"week":case"w":return n*_e;case"days":case"day":case"d":return n*G;case"hours":case"hour":case"hrs":case"hr":case"h":return n*et;case"minutes":case"minute":case"mins":case"min":case"m":return n*tt;case"seconds":case"second":case"secs":case"sec":case"s":return n*Q;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:throw new Error(`The unit ${s} was matched, but no matching case exists.`)}}function Ne(t){const e=Math.abs(t);return e>=G?`${Math.round(t/G)}d`:e>=et?`${Math.round(t/et)}h`:e>=tt?`${Math.round(t/tt)}m`:e>=Q?`${Math.round(t/Q)}s`:`${t}ms`}function Ue(t){const e=Math.abs(t);return e>=G?wt(t,e,G,"day"):e>=et?wt(t,e,et,"hour"):e>=tt?wt(t,e,tt,"minute"):e>=Q?wt(t,e,Q,"second"):`${t} ms`}function wt(t,e,n,s){const r=e>=n*1.5;return`${Math.round(t/n)} ${s}${r?"s":""}`}function Fe(t){return typeof t=="object"&&t!==null&&"message"in t}class Ye{constructor(e){this.storage=e}download(){const e=this.storage.taskList;if(!e.length){alert("\u041D\u0435\u0442\u0443 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0430.");return}const n=I("div");for(const{date:i,list:a,total:o}of e){let m=0;const p=I("table",{border:"1"}),h=I("div",{style:{display:"flex",gap:"4px",flexDirection:"column"}}),g=I("tr",I("th","Task Type"),I("th","Count"),I("th","Estimated Rating Time"));p.append(h,g);for(const{count:y,estimated:T,type:M}of a){m+=T;const f=I("tr",I("td",M),I("td",`${y}`),I("td",kt(T,{long:!0})));p.append(f)}h.append(I("span",`Date: ${i}`),I("span",`Tasks ${o}`),I("span",`Estimated time: ${kt(m,{long:!0})}`)),n.append(I("div",p,I("hr")))}const s=new Blob([n.outerHTML],{type:"text/html"});I("a",{href:URL.createObjectURL(s),download:`tryrating-com-${new Date().toISOString()}.html`}).click()}}function Xt(t){return t=Math.abs(t),t>9?`${t}`:`0${t}`}const Re=".survey-meta-fields",ze=".labeled-attribute__attribute",Qt={selector:".btn-success",text:"Submit Rating"},Be=".modal-container.visible",He="div[modalwrapref] > div",Dt="tryrating-storage-v2",te="Validation failed!";function qe(){const t=document.querySelector(Be);if(!t)return;const e=t.querySelector(He);e&&e.textContent===te&&(GM_notification({title:document.title,text:te,highlight:!0,silent:!1,timeout:1e3}),t.querySelector("button")?.click())}function ee(t){return t.split(/\s(?=\d)/).reduce((n,s)=>(n+=kt(s),n),0)}function ne(t){const e=Xt(Math.floor(t/6e4)),n=Xt(Number((t%6e4/1e3).toFixed(0)));return`${e}:${n}`}const[je,se]=J(0);class We{intervalId;get time(){return je()}tick(){se(e=>e+1e3)}start(){this.intervalId&&(Jt(this.intervalId),se(0)),this.intervalId=Et(()=>this.tick(),1e3)}}var Ot=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function xt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var re={exports:{}};(function(t,e){(function(n,s){t.exports=s()})(Ot,function(){var n=1e3,s=6e4,r=36e5,i="millisecond",a="second",o="minute",m="hour",p="day",h="week",g="month",y="quarter",T="year",M="date",f="Invalid Date",S=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,L=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,D={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function($){var l=["th","st","nd","rd"],u=$%100;return"["+$+(l[(u-20)%10]||l[u]||l[0])+"]"}},O=function($,l,u){var d=String($);return!d||d.length>=l?$:""+Array(l+1-d.length).join(u)+$},B={s:O,z:function($){var l=-$.utcOffset(),u=Math.abs(l),d=Math.floor(u/60),c=u%60;return(l<=0?"+":"-")+O(d,2,"0")+":"+O(c,2,"0")},m:function $(l,u){if(l.date()<u.date())return-$(u,l);var d=12*(u.year()-l.year())+(u.month()-l.month()),c=l.clone().add(d,g),w=u-c<0,v=l.clone().add(d+(w?-1:1),g);return+(-(d+(u-c)/(w?c-v:v-c))||0)},a:function($){return $<0?Math.ceil($)||0:Math.floor($)},p:function($){return{M:g,y:T,w:h,d:p,D:M,h:m,m:o,s:a,ms:i,Q:y}[$]||String($||"").toLowerCase().replace(/s$/,"")},u:function($){return $===void 0}},A="en",F={};F[A]=D;var Y=function($){return $ instanceof j},H=function $(l,u,d){var c;if(!l)return A;if(typeof l=="string"){var w=l.toLowerCase();F[w]&&(c=w),u&&(F[w]=u,c=w);var v=l.split("-");if(!c&&v.length>1)return $(v[0])}else{var k=l.name;F[k]=l,c=k}return!d&&c&&(A=c),c||!d&&A},E=function($,l){if(Y($))return $.clone();var u=typeof l=="object"?l:{};return u.date=$,u.args=arguments,new j(u)},b=B;b.l=H,b.i=Y,b.w=function($,l){return E($,{locale:l.$L,utc:l.$u,x:l.$x,$offset:l.$offset})};var j=function(){function $(u){this.$L=H(u.locale,null,!0),this.parse(u)}var l=$.prototype;return l.parse=function(u){this.$d=function(d){var c=d.date,w=d.utc;if(c===null)return new Date(NaN);if(b.u(c))return new Date;if(c instanceof Date)return new Date(c);if(typeof c=="string"&&!/Z$/i.test(c)){var v=c.match(S);if(v){var k=v[2]-1||0,x=(v[7]||"0").substring(0,3);return w?new Date(Date.UTC(v[1],k,v[3]||1,v[4]||0,v[5]||0,v[6]||0,x)):new Date(v[1],k,v[3]||1,v[4]||0,v[5]||0,v[6]||0,x)}}return new Date(c)}(u),this.$x=u.x||{},this.init()},l.init=function(){var u=this.$d;this.$y=u.getFullYear(),this.$M=u.getMonth(),this.$D=u.getDate(),this.$W=u.getDay(),this.$H=u.getHours(),this.$m=u.getMinutes(),this.$s=u.getSeconds(),this.$ms=u.getMilliseconds()},l.$utils=function(){return b},l.isValid=function(){return this.$d.toString()!==f},l.isSame=function(u,d){var c=E(u);return this.startOf(d)<=c&&c<=this.endOf(d)},l.isAfter=function(u,d){return E(u)<this.startOf(d)},l.isBefore=function(u,d){return this.endOf(d)<E(u)},l.$g=function(u,d,c){return b.u(u)?this[d]:this.set(c,u)},l.unix=function(){return Math.floor(this.valueOf()/1e3)},l.valueOf=function(){return this.$d.getTime()},l.startOf=function(u,d){var c=this,w=!!b.u(d)||d,v=b.p(u),k=function(K,R){var W=b.w(c.$u?Date.UTC(c.$y,R,K):new Date(c.$y,R,K),c);return w?W:W.endOf(p)},x=function(K,R){return b.w(c.toDate()[K].apply(c.toDate("s"),(w?[0,0,0,0]:[23,59,59,999]).slice(R)),c)},_=this.$W,U=this.$M,q=this.$D,nt="set"+(this.$u?"UTC":"");switch(v){case T:return w?k(1,0):k(31,11);case g:return w?k(1,U):k(0,U+1);case h:var Z=this.$locale().weekStart||0,ot=(_<Z?_+7:_)-Z;return k(w?q-ot:q+(6-ot),U);case p:case M:return x(nt+"Hours",0);case m:return x(nt+"Minutes",1);case o:return x(nt+"Seconds",2);case a:return x(nt+"Milliseconds",3);default:return this.clone()}},l.endOf=function(u){return this.startOf(u,!1)},l.$set=function(u,d){var c,w=b.p(u),v="set"+(this.$u?"UTC":""),k=(c={},c[p]=v+"Date",c[M]=v+"Date",c[g]=v+"Month",c[T]=v+"FullYear",c[m]=v+"Hours",c[o]=v+"Minutes",c[a]=v+"Seconds",c[i]=v+"Milliseconds",c)[w],x=w===p?this.$D+(d-this.$W):d;if(w===g||w===T){var _=this.clone().set(M,1);_.$d[k](x),_.init(),this.$d=_.set(M,Math.min(this.$D,_.daysInMonth())).$d}else k&&this.$d[k](x);return this.init(),this},l.set=function(u,d){return this.clone().$set(u,d)},l.get=function(u){return this[b.p(u)]()},l.add=function(u,d){var c,w=this;u=Number(u);var v=b.p(d),k=function(U){var q=E(w);return b.w(q.date(q.date()+Math.round(U*u)),w)};if(v===g)return this.set(g,this.$M+u);if(v===T)return this.set(T,this.$y+u);if(v===p)return k(1);if(v===h)return k(7);var x=(c={},c[o]=s,c[m]=r,c[a]=n,c)[v]||1,_=this.$d.getTime()+u*x;return b.w(_,this)},l.subtract=function(u,d){return this.add(-1*u,d)},l.format=function(u){var d=this,c=this.$locale();if(!this.isValid())return c.invalidDate||f;var w=u||"YYYY-MM-DDTHH:mm:ssZ",v=b.z(this),k=this.$H,x=this.$m,_=this.$M,U=c.weekdays,q=c.months,nt=c.meridiem,Z=function(R,W,at,Tt){return R&&(R[W]||R(d,w))||at[W].slice(0,Tt)},ot=function(R){return b.s(k%12||12,R,"0")},K=nt||function(R,W,at){var Tt=R<12?"AM":"PM";return at?Tt.toLowerCase():Tt};return w.replace(L,function(R,W){return W||function(at){switch(at){case"YY":return String(d.$y).slice(-2);case"YYYY":return b.s(d.$y,4,"0");case"M":return _+1;case"MM":return b.s(_+1,2,"0");case"MMM":return Z(c.monthsShort,_,q,3);case"MMMM":return Z(q,_);case"D":return d.$D;case"DD":return b.s(d.$D,2,"0");case"d":return String(d.$W);case"dd":return Z(c.weekdaysMin,d.$W,U,2);case"ddd":return Z(c.weekdaysShort,d.$W,U,3);case"dddd":return U[d.$W];case"H":return String(k);case"HH":return b.s(k,2,"0");case"h":return ot(1);case"hh":return ot(2);case"a":return K(k,x,!0);case"A":return K(k,x,!1);case"m":return String(x);case"mm":return b.s(x,2,"0");case"s":return String(d.$s);case"ss":return b.s(d.$s,2,"0");case"SSS":return b.s(d.$ms,3,"0");case"Z":return v}return null}(R)||v.replace(":","")})},l.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},l.diff=function(u,d,c){var w,v=this,k=b.p(d),x=E(u),_=(x.utcOffset()-this.utcOffset())*s,U=this-x,q=function(){return b.m(v,x)};switch(k){case T:w=q()/12;break;case g:w=q();break;case y:w=q()/3;break;case h:w=(U-_)/6048e5;break;case p:w=(U-_)/864e5;break;case m:w=U/r;break;case o:w=U/s;break;case a:w=U/n;break;default:w=U}return c?w:b.a(w)},l.daysInMonth=function(){return this.endOf(g).$D},l.$locale=function(){return F[this.$L]},l.locale=function(u,d){if(!u)return this.$L;var c=this.clone(),w=H(u,d,!0);return w&&(c.$L=w),c},l.clone=function(){return b.w(this.$d,this)},l.toDate=function(){return new Date(this.valueOf())},l.toJSON=function(){return this.isValid()?this.toISOString():null},l.toISOString=function(){return this.$d.toISOString()},l.toString=function(){return this.$d.toUTCString()},$}(),he=j.prototype;return E.prototype=he,[["$ms",i],["$s",a],["$m",o],["$H",m],["$W",p],["$M",g],["$y",T],["$D",M]].forEach(function($){he[$[1]]=function(l){return this.$g(l,$[0],$[1])}}),E.extend=function($,l){return $.$i||($(l,j,E),$.$i=!0),E},E.locale=H,E.isDayjs=Y,E.unix=function($){return E(1e3*$)},E.en=F[A],E.Ls=F,E.p={},E})})(re);var Pe=re.exports;const Ct=xt(Pe);var ie={exports:{}};(function(t,e){(function(n,s){t.exports=s()})(Ot,function(){var n={year:0,month:1,day:2,hour:3,minute:4,second:5},s={};return function(r,i,a){var o,m=function(y,T,M){M===void 0&&(M={});var f=new Date(y),S=function(L,D){D===void 0&&(D={});var O=D.timeZoneName||"short",B=L+"|"+O,A=s[B];return A||(A=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:L,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:O}),s[B]=A),A}(T,M);return S.formatToParts(f)},p=function(y,T){for(var M=m(y,T),f=[],S=0;S<M.length;S+=1){var L=M[S],D=L.type,O=L.value,B=n[D];B>=0&&(f[B]=parseInt(O,10))}var A=f[3],F=A===24?0:A,Y=f[0]+"-"+f[1]+"-"+f[2]+" "+F+":"+f[4]+":"+f[5]+":000",H=+y;return(a.utc(Y).valueOf()-(H-=H%1e3))/6e4},h=i.prototype;h.tz=function(y,T){y===void 0&&(y=o);var M=this.utcOffset(),f=this.toDate(),S=f.toLocaleString("en-US",{timeZone:y}),L=Math.round((f-new Date(S))/1e3/60),D=a(S).$set("millisecond",this.$ms).utcOffset(15*-Math.round(f.getTimezoneOffset()/15)-L,!0);if(T){var O=D.utcOffset();D=D.add(M-O,"minute")}return D.$x.$timezone=y,D},h.offsetName=function(y){var T=this.$x.$timezone||a.tz.guess(),M=m(this.valueOf(),T,{timeZoneName:y}).find(function(f){return f.type.toLowerCase()==="timezonename"});return M&&M.value};var g=h.startOf;h.startOf=function(y,T){if(!this.$x||!this.$x.$timezone)return g.call(this,y,T);var M=a(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return g.call(M,y,T).tz(this.$x.$timezone,!0)},a.tz=function(y,T,M){var f=M&&T,S=M||T||o,L=p(+a(),S);if(typeof y!="string")return a(y).tz(S);var D=function(F,Y,H){var E=F-60*Y*1e3,b=p(E,H);if(Y===b)return[E,Y];var j=p(E-=60*(b-Y)*1e3,H);return b===j?[E,b]:[F-60*Math.min(b,j)*1e3,Math.max(b,j)]}(a.utc(y,f).valueOf(),L,S),O=D[0],B=D[1],A=a(O).utcOffset(B);return A.$x.$timezone=S,A},a.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},a.tz.setDefault=function(y){o=y}}})})(ie);var Ve=ie.exports;const Ge=xt(Ve);var oe={exports:{}};(function(t,e){(function(n,s){t.exports=s()})(Ot,function(){var n="minute",s=/[+-]\d\d(?::?\d\d)?/g,r=/([+-]|\d\d)/g;return function(i,a,o){var m=a.prototype;o.utc=function(f){var S={date:f,utc:!0,args:arguments};return new a(S)},m.utc=function(f){var S=o(this.toDate(),{locale:this.$L,utc:!0});return f?S.add(this.utcOffset(),n):S},m.local=function(){return o(this.toDate(),{locale:this.$L,utc:!1})};var p=m.parse;m.parse=function(f){f.utc&&(this.$u=!0),this.$utils().u(f.$offset)||(this.$offset=f.$offset),p.call(this,f)};var h=m.init;m.init=function(){if(this.$u){var f=this.$d;this.$y=f.getUTCFullYear(),this.$M=f.getUTCMonth(),this.$D=f.getUTCDate(),this.$W=f.getUTCDay(),this.$H=f.getUTCHours(),this.$m=f.getUTCMinutes(),this.$s=f.getUTCSeconds(),this.$ms=f.getUTCMilliseconds()}else h.call(this)};var g=m.utcOffset;m.utcOffset=function(f,S){var L=this.$utils().u;if(L(f))return this.$u?0:L(this.$offset)?g.call(this):this.$offset;if(typeof f=="string"&&(f=function(A){A===void 0&&(A="");var F=A.match(s);if(!F)return null;var Y=(""+F[0]).match(r)||["-",0,0],H=Y[0],E=60*+Y[1]+ +Y[2];return E===0?0:H==="+"?E:-E}(f),f===null))return this;var D=Math.abs(f)<=16?60*f:f,O=this;if(S)return O.$offset=D,O.$u=f===0,O;if(f!==0){var B=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(O=this.local().add(D+B,n)).$offset=D,O.$x.$localOffset=B}else O=this.utc();return O};var y=m.format;m.format=function(f){var S=f||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return y.call(this,S)},m.valueOf=function(){var f=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*f},m.isUTC=function(){return!!this.$u},m.toISOString=function(){return this.toDate().toISOString()},m.toString=function(){return this.toDate().toUTCString()};var T=m.toDate;m.toDate=function(f){return f==="s"&&this.$offset?o(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():T.call(this)};var M=m.diff;m.diff=function(f,S,L){if(f&&this.$u===f.$u)return M.call(this,f,S,L);var D=this.local(),O=o(f).local();return M.call(D,O,S,L)}}})})(oe);var Ze=oe.exports;const Ke=xt(Ze);Ct.extend(Ke),Ct.extend(Ge);const ae={offset:180,region:"Asia",location:"Kuwait"};function At(){return Ct.tz(new Date,`${ae.region}/${ae.location}`).format("DD.MM.YYYY")}const _t=()=>[{date:At(),total:0,list:[]}],[rt,It]=J([]);class Je{constructor(){this.read()}get taskList(){return rt()}read(){const e=GM_getValue(Dt,_t());It(e)}reset(){It(_t()),GM_setValue(Dt,rt())}write(e){const n=this.getTaskList();n.total+=1;const s=n.list.find(i=>i.type===e.type);s?(s.count+=1,s.estimated+=e.estimated):n.list.push({count:1,type:e.type,estimated:e.estimated});const r=[n,...rt().filter(i=>i.date!==n.date)];It(r),GM_setValue(Dt,rt())}getTaskList(){const e=At(),n=rt().find(s=>s.date===e);return n||_t()[0]}}function Xe(){const[t,e]=J([]);function n(){const s=[],r=Array.from(document.querySelectorAll(Qt.selector));for(const i of r)i instanceof HTMLButtonElement&&i.textContent===Qt.text&&s.push(i);return e(s),s}return{findSubmitButtons:n,get submitButtons(){return t()}}}class Qe{taskFields=null;onChangeTaskCallback=null;get values(){return this.taskFields}onChangeTask(e){this.onChangeTaskCallback=e}watch(){const e=document.querySelector(Re);if(!e)return;const n=Array.from(e.querySelectorAll(ze));if(!n.length)return;const[s,r,i]=n,a={taskType:s.textContent,requestId:r.textContent,estimatedRatingTime:i.textContent.trim()};a.requestId!==this.taskFields?.requestId&&this.onChangeTaskCallback(a),this.taskFields=a}}const[ue,ce]=J(0);class tn{intervalId;onEndCallback;onTickTimer(){const e=ue()-1e3;ce(e),e===0&&(this.onEndCallback(),this.stop())}get time(){return ue()}onTimerEnd(e){this.onEndCallback=e}start(e){this.stop(),ce(e),this.intervalId=Et(()=>this.onTickTimer(),1e3)}stop(){this.intervalId&&(Jt(this.intervalId),this.intervalId=null)}}const hn="",en=be('<div class="tryrating-container"><div>Timer: </div><div>Stopwatch: </div><div>Tasks: </div><button>Autosubmit'),[it,nn]=J(!0);function Lt(){nn(!it())}const{findSubmitButtons:le}=Xe(),[sn,rn]=J(null),vt=new Je,on=new Ye(vt),Nt=new tn;Nt.onTimerEnd(()=>{if(!it())return;const t=le();if(!t.length){console.error("submitButtons is not defined");return}t[0]?.click()});const fe=new We,de=new Qe;de.onChangeTask(t=>{const e=sn();e&&e.requestId!==t.requestId&&(it()||Lt(),console.info("Current task is submitted:",e),vt.write({type:e.taskType,estimated:ee(e.estimatedRatingTime)})),rn(t),le();const n=ee(t.estimatedRatingTime);Nt.start(n),fe.start()});const an=document.querySelector("#app-root");ke(an,t=>{qe()}),Et(()=>{de.watch()},5e3),window.addEventListener("keydown",t=>{t.altKey&&t.key==="1"&&(t.preventDefault(),on.download()),t.altKey&&t.key==="2"&&(t.preventDefault(),confirm(`Reset data.
Are you sure?`)&&vt.reset()),t.ctrlKey&&t.code==="KeyO"&&(t.preventDefault(),Lt())});const un=()=>{const t=Mt(()=>ne(Nt.time)),e=Mt(()=>ne(fe.time)),n=Mt(()=>{const s=At();return vt.taskList.find(i=>i.date===s)?.total??"0"});return(()=>{const s=en(),r=s.firstChild;r.firstChild;const i=r.nextSibling;i.firstChild;const a=i.nextSibling;a.firstChild;const o=a.nextSibling;return gt(r,t,null),gt(i,e,null),gt(a,n,null),o.$$click=()=>Lt(),ft(()=>(it()?"#4CAF50":"#f44336")!=null?o.style.setProperty("background",it()?"#4CAF50":"#f44336"):o.style.removeProperty("background")),s})()};Te(()=>we(un,{}),document.body),Me(["click"]),GM_addStyle(".tryrating-container{display:flex;color:#fff;padding-left:4px;gap:6px;position:absolute;z-index:9999999;background:#2e2c2f;font-size:12px;align-items:center;left:0;bottom:0;height:32px;justify-content:center}.tryrating-container>button{height:inherit;border:none;font-size:12px;background:#2e2c2f;color:#fff}")})();
