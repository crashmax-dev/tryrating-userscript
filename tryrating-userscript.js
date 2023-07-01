(function(){"use strict";const Z={equals:(e,n)=>e===n};let Ke=Oe;const N=1,Q=2,Ee={owned:null,cleanups:null,context:null,owner:null};var C=null;let pe=null,S=null,D=null,R=null,ee=0;function Xe(e,n){const t=S,s=C,r=e.length===0,i=r?Ee:{owned:null,cleanups:null,context:null,owner:n===void 0?s:n},c=r?e:()=>e(()=>ne(()=>ie(i)));C=i,S=null;try{return V(c,!0)}finally{S=t,C=s}}function te(e,n){n=n?Object.assign({},Z,n):Z;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=r=>(typeof r=="function"&&(r=r(t.value)),Ae(t,r));return[De.bind(t),s]}function ge(e,n,t){const s=xe(e,n,!1,N);se(s)}function _e(e,n,t){t=t?Object.assign({},Z,t):Z;const s=xe(e,n,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=t.equals||void 0,se(s),De.bind(s)}function ne(e){if(S===null)return e();const n=S;S=null;try{return e()}finally{S=n}}function De(){if(this.sources&&this.state)if(this.state===N)se(this);else{const e=D;D=null,V(()=>re(this),!1),D=e}if(S){const e=this.observers?this.observers.length:0;S.sources?(S.sources.push(this),S.sourceSlots.push(e)):(S.sources=[this],S.sourceSlots=[e]),this.observers?(this.observers.push(S),this.observerSlots.push(S.sources.length-1)):(this.observers=[S],this.observerSlots=[S.sources.length-1])}return this.value}function Ae(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&V(()=>{for(let r=0;r<e.observers.length;r+=1){const i=e.observers[r],c=pe&&pe.running;c&&pe.disposed.has(i),(c?!i.tState:!i.state)&&(i.pure?D.push(i):R.push(i),i.observers&&Le(i)),c||(i.state=N)}if(D.length>1e6)throw D=[],new Error},!1)),n}function se(e){if(!e.fn)return;ie(e);const n=C,t=S,s=ee;S=C=e,Ze(e,e.value,s),S=t,C=n}function Ze(e,n,t){let s;try{s=e.fn(n)}catch(r){return e.pure&&(e.state=N,e.owned&&e.owned.forEach(ie),e.owned=null),e.updatedAt=t+1,Ie(r)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?Ae(e,s):e.value=s,e.updatedAt=t)}function xe(e,n,t,s=N,r){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:C,context:null,pure:t};return C===null||C!==Ee&&(C.owned?C.owned.push(i):C.owned=[i]),i}function Ce(e){if(e.state===0)return;if(e.state===Q)return re(e);if(e.suspense&&ne(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ee);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===N)se(e);else if(e.state===Q){const s=D;D=null,V(()=>re(e,n[0]),!1),D=s}}function V(e,n){if(D)return e();let t=!1;n||(D=[]),R?t=!0:R=[],ee++;try{const s=e();return Qe(t),s}catch(s){t||(R=null),D=null,Ie(s)}}function Qe(e){if(D&&(Oe(D),D=null),e)return;const n=R;R=null,n.length&&V(()=>Ke(n),!1)}function Oe(e){for(let n=0;n<e.length;n++)Ce(e[n])}function re(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const s=e.sources[t];if(s.sources){const r=s.state;r===N?s!==n&&(!s.updatedAt||s.updatedAt<ee)&&Ce(s):r===Q&&re(s,n)}}}function Le(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=Q,t.pure?D.push(t):R.push(t),t.observers&&Le(t))}}function ie(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const i=r.pop(),c=t.observerSlots.pop();s<r.length&&(i.sourceSlots[c]=s,r[s]=i,t.observerSlots[s]=c)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)ie(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function et(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ie(e,n=C){throw et(e)}function tt(e,n){return ne(()=>e(n||{}))}function nt(e,n,t){let s=t.length,r=n.length,i=s,c=0,a=0,T=n[r-1].nextSibling,m=null;for(;c<r||a<i;){if(n[c]===t[a]){c++,a++;continue}for(;n[r-1]===t[i-1];)r--,i--;if(r===c){const d=i<s?a?t[a-1].nextSibling:t[i-a]:T;for(;a<i;)e.insertBefore(t[a++],d)}else if(i===a)for(;c<r;)(!m||!m.has(n[c]))&&n[c].remove(),c++;else if(n[c]===t[i-1]&&t[a]===n[r-1]){const d=n[--r].nextSibling;e.insertBefore(t[a++],n[c++].nextSibling),e.insertBefore(t[--i],d),n[r]=t[i]}else{if(!m){m=new Map;let y=a;for(;y<i;)m.set(t[y],y++)}const d=m.get(n[c]);if(d!=null)if(a<d&&d<i){let y=c,M=1,$;for(;++y<r&&y<i&&!(($=m.get(n[y]))==null||$!==d+M);)M++;if(M>d-a){const L=n[c];for(;a<d;)e.insertBefore(t[a++],L)}else e.replaceChild(t[a++],n[c++])}else c++;else n[c++].remove()}}}const Ne="_$DX_DELEGATE";function st(e,n,t,s={}){let r;return Xe(i=>{r=i,n===document?e():ye(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{r(),n.textContent=""}}function rt(e,n,t){let s;const r=()=>{const c=document.createElement("template");return c.innerHTML=e,t?c.content.firstChild.firstChild:c.content.firstChild},i=n?()=>ne(()=>document.importNode(s||(s=r()),!0)):()=>(s||(s=r())).cloneNode(!0);return i.cloneNode=i,i}function it(e,n=window.document){const t=n[Ne]||(n[Ne]=new Set);for(let s=0,r=e.length;s<r;s++){const i=e[s];t.has(i)||(t.add(i),n.addEventListener(i,ot))}}function ye(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return oe(e,n,s,t);ge(r=>oe(e,n(),r,t),s)}function ot(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const s=t[n];if(s&&!t.disabled){const r=t[`${n}Data`];if(r!==void 0?s.call(t,r,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function oe(e,n,t,s,r){for(;typeof t=="function";)t=t();if(n===t)return t;const i=typeof n,c=s!==void 0;if(e=c&&t[0]&&t[0].parentNode||e,i==="string"||i==="number")if(i==="number"&&(n=n.toString()),c){let a=t[0];a&&a.nodeType===3?a.data=n:a=document.createTextNode(n),t=q(e,t,s,a)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n;else if(n==null||i==="boolean")t=q(e,t,s);else{if(i==="function")return ge(()=>{let a=n();for(;typeof a=="function";)a=a();t=oe(e,a,t,s)}),()=>t;if(Array.isArray(n)){const a=[],T=t&&Array.isArray(t);if(we(a,n,t,r))return ge(()=>t=oe(e,a,t,s,!0)),()=>t;if(a.length===0){if(t=q(e,t,s),c)return t}else T?t.length===0?Re(e,a,s):nt(e,t,a):(t&&q(e),Re(e,a));t=a}else if(n.nodeType){if(Array.isArray(t)){if(c)return t=q(e,t,s,n);q(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}else console.warn("Unrecognized value. Skipped inserting",n)}return t}function we(e,n,t,s){let r=!1;for(let i=0,c=n.length;i<c;i++){let a=n[i],T=t&&t[i],m;if(!(a==null||a===!0||a===!1))if((m=typeof a)=="object"&&a.nodeType)e.push(a);else if(Array.isArray(a))r=we(e,a,T)||r;else if(m==="function")if(s){for(;typeof a=="function";)a=a();r=we(e,Array.isArray(a)?a:[a],Array.isArray(T)?T:[T])||r}else e.push(a),r=!0;else{const d=String(a);T&&T.nodeType===3&&T.data===d?e.push(T):e.push(document.createTextNode(d))}}return r}function Re(e,n,t=null){for(let s=0,r=n.length;s<r;s++)e.insertBefore(n[s],t)}function q(e,n,t,s){if(t===void 0)return e.textContent="";const r=s||document.createTextNode("");if(n.length){let i=!1;for(let c=n.length-1;c>=0;c--){const a=n[c];if(r!==a){const T=a.parentNode===e;!i&&!c?T?e.replaceChild(r,a):e.insertBefore(r,t):T&&a.remove()}else i=!0}}else e.insertBefore(r,t);return[r]}var at=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ut(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ye={exports:{}};(function(e,n){(function(t,s){e.exports=s()})(at,function(){var t=1e3,s=6e4,r=36e5,i="millisecond",c="second",a="minute",T="hour",m="day",d="week",y="month",M="quarter",$="year",L="date",fe="Invalid Date",Yt=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Ft=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,Bt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(h){var l=["th","st","nd","rd"],o=h%100;return"["+h+(l[(o-20)%10]||l[o]||l[0])+"]"}},Se=function(h,l,o){var f=String(h);return!f||f.length>=l?h:""+Array(l+1-f.length).join(o)+h},Ut={s:Se,z:function(h){var l=-h.utcOffset(),o=Math.abs(l),f=Math.floor(o/60),u=o%60;return(l<=0?"+":"-")+Se(f,2,"0")+":"+Se(u,2,"0")},m:function h(l,o){if(l.date()<o.date())return-h(o,l);var f=12*(o.year()-l.year())+(o.month()-l.month()),u=l.clone().add(f,y),p=o-u<0,g=l.clone().add(f+(p?-1:1),y);return+(-(f+(o-u)/(p?u-g:g-u))||0)},a:function(h){return h<0?Math.ceil(h)||0:Math.floor(h)},p:function(h){return{M:y,y:$,w:d,d:m,D:L,h:T,m:a,s:c,ms:i,Q:M}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(h){return h===void 0}},J="en",B={};B[J]=Bt;var ke=function(h){return h instanceof he},de=function h(l,o,f){var u;if(!l)return J;if(typeof l=="string"){var p=l.toLowerCase();B[p]&&(u=p),o&&(B[p]=o,u=p);var g=l.split("-");if(!u&&g.length>1)return h(g[0])}else{var b=l.name;B[b]=l,u=b}return!f&&u&&(J=u),u||!f&&J},k=function(h,l){if(ke(h))return h.clone();var o=typeof l=="object"?l:{};return o.date=h,o.args=arguments,new he(o)},w=Ut;w.l=de,w.i=ke,w.w=function(h,l){return k(h,{locale:l.$L,utc:l.$u,x:l.$x,$offset:l.$offset})};var he=function(){function h(o){this.$L=de(o.locale,null,!0),this.parse(o)}var l=h.prototype;return l.parse=function(o){this.$d=function(f){var u=f.date,p=f.utc;if(u===null)return new Date(NaN);if(w.u(u))return new Date;if(u instanceof Date)return new Date(u);if(typeof u=="string"&&!/Z$/i.test(u)){var g=u.match(Yt);if(g){var b=g[2]-1||0,v=(g[7]||"0").substring(0,3);return p?new Date(Date.UTC(g[1],b,g[3]||1,g[4]||0,g[5]||0,g[6]||0,v)):new Date(g[1],b,g[3]||1,g[4]||0,g[5]||0,g[6]||0,v)}}return new Date(u)}(o),this.$x=o.x||{},this.init()},l.init=function(){var o=this.$d;this.$y=o.getFullYear(),this.$M=o.getMonth(),this.$D=o.getDate(),this.$W=o.getDay(),this.$H=o.getHours(),this.$m=o.getMinutes(),this.$s=o.getSeconds(),this.$ms=o.getMilliseconds()},l.$utils=function(){return w},l.isValid=function(){return this.$d.toString()!==fe},l.isSame=function(o,f){var u=k(o);return this.startOf(f)<=u&&u<=this.endOf(f)},l.isAfter=function(o,f){return k(o)<this.startOf(f)},l.isBefore=function(o,f){return this.endOf(f)<k(o)},l.$g=function(o,f,u){return w.u(o)?this[f]:this.set(u,o)},l.unix=function(){return Math.floor(this.valueOf()/1e3)},l.valueOf=function(){return this.$d.getTime()},l.startOf=function(o,f){var u=this,p=!!w.u(f)||f,g=w.p(o),b=function(j,x){var I=w.w(u.$u?Date.UTC(u.$y,x,j):new Date(u.$y,x,j),u);return p?I:I.endOf(m)},v=function(j,x){return w.w(u.toDate()[j].apply(u.toDate("s"),(p?[0,0,0,0]:[23,59,59,999]).slice(x)),u)},E=this.$W,A=this.$M,O=this.$D,P="set"+(this.$u?"UTC":"");switch(g){case $:return p?b(1,0):b(31,11);case y:return p?b(1,A):b(0,A+1);case d:var U=this.$locale().weekStart||0,K=(E<U?E+7:E)-U;return b(p?O-K:O+(6-K),A);case m:case L:return v(P+"Hours",0);case T:return v(P+"Minutes",1);case a:return v(P+"Seconds",2);case c:return v(P+"Milliseconds",3);default:return this.clone()}},l.endOf=function(o){return this.startOf(o,!1)},l.$set=function(o,f){var u,p=w.p(o),g="set"+(this.$u?"UTC":""),b=(u={},u[m]=g+"Date",u[L]=g+"Date",u[y]=g+"Month",u[$]=g+"FullYear",u[T]=g+"Hours",u[a]=g+"Minutes",u[c]=g+"Seconds",u[i]=g+"Milliseconds",u)[p],v=p===m?this.$D+(f-this.$W):f;if(p===y||p===$){var E=this.clone().set(L,1);E.$d[b](v),E.init(),this.$d=E.set(L,Math.min(this.$D,E.daysInMonth())).$d}else b&&this.$d[b](v);return this.init(),this},l.set=function(o,f){return this.clone().$set(o,f)},l.get=function(o){return this[w.p(o)]()},l.add=function(o,f){var u,p=this;o=Number(o);var g=w.p(f),b=function(A){var O=k(p);return w.w(O.date(O.date()+Math.round(A*o)),p)};if(g===y)return this.set(y,this.$M+o);if(g===$)return this.set($,this.$y+o);if(g===m)return b(1);if(g===d)return b(7);var v=(u={},u[a]=s,u[T]=r,u[c]=t,u)[g]||1,E=this.$d.getTime()+o*v;return w.w(E,this)},l.subtract=function(o,f){return this.add(-1*o,f)},l.format=function(o){var f=this,u=this.$locale();if(!this.isValid())return u.invalidDate||fe;var p=o||"YYYY-MM-DDTHH:mm:ssZ",g=w.z(this),b=this.$H,v=this.$m,E=this.$M,A=u.weekdays,O=u.months,P=u.meridiem,U=function(x,I,X,me){return x&&(x[I]||x(f,p))||X[I].slice(0,me)},K=function(x){return w.s(b%12||12,x,"0")},j=P||function(x,I,X){var me=x<12?"AM":"PM";return X?me.toLowerCase():me};return p.replace(Ft,function(x,I){return I||function(X){switch(X){case"YY":return String(f.$y).slice(-2);case"YYYY":return w.s(f.$y,4,"0");case"M":return E+1;case"MM":return w.s(E+1,2,"0");case"MMM":return U(u.monthsShort,E,O,3);case"MMMM":return U(O,E);case"D":return f.$D;case"DD":return w.s(f.$D,2,"0");case"d":return String(f.$W);case"dd":return U(u.weekdaysMin,f.$W,A,2);case"ddd":return U(u.weekdaysShort,f.$W,A,3);case"dddd":return A[f.$W];case"H":return String(b);case"HH":return w.s(b,2,"0");case"h":return K(1);case"hh":return K(2);case"a":return j(b,v,!0);case"A":return j(b,v,!1);case"m":return String(v);case"mm":return w.s(v,2,"0");case"s":return String(f.$s);case"ss":return w.s(f.$s,2,"0");case"SSS":return w.s(f.$ms,3,"0");case"Z":return g}return null}(x)||g.replace(":","")})},l.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},l.diff=function(o,f,u){var p,g=this,b=w.p(f),v=k(o),E=(v.utcOffset()-this.utcOffset())*s,A=this-v,O=function(){return w.m(g,v)};switch(b){case $:p=O()/12;break;case y:p=O();break;case M:p=O()/3;break;case d:p=(A-E)/6048e5;break;case m:p=(A-E)/864e5;break;case T:p=A/r;break;case a:p=A/s;break;case c:p=A/t;break;default:p=A}return u?p:w.a(p)},l.daysInMonth=function(){return this.endOf(y).$D},l.$locale=function(){return B[this.$L]},l.locale=function(o,f){if(!o)return this.$L;var u=this.clone(),p=de(o,f,!0);return p&&(u.$L=p),u},l.clone=function(){return w.w(this.$d,this)},l.toDate=function(){return new Date(this.valueOf())},l.toJSON=function(){return this.isValid()?this.toISOString():null},l.toISOString=function(){return this.$d.toISOString()},l.toString=function(){return this.$d.toUTCString()},h}(),Je=he.prototype;return k.prototype=Je,[["$ms",i],["$s",c],["$m",a],["$H",T],["$W",m],["$M",y],["$y",$],["$D",L]].forEach(function(h){Je[h[1]]=function(l){return this.$g(l,h[0],h[1])}}),k.extend=function(h,l){return h.$i||(h(l,he,k),h.$i=!0),k},k.locale=de,k.isDayjs=ke,k.unix=function(h){return k(1e3*h)},k.en=B[J],k.Ls=B,k.p={},k})})(Ye);var lt=Ye.exports;const Te=ut(lt),W=1e3,H=W*60,G=H*60,Y=G*24,ct=Y*7,ft=Y*365.25;function ae(e,n){try{if(typeof e=="string"&&e.length>0)return dt(e);if(typeof e=="number"&&isFinite(e))return n?.long?mt(e):ht(e);throw new Error("Value is not a string or number.")}catch(t){const s=pt(t)?`${t.message}. value=${JSON.stringify(e)}`:"An unknown error has occured.";throw new Error(s)}}function dt(e){if(e=String(e),e.length>100)throw new Error("Value exceeds the maximum length of 100 characters.");const n=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!n)return NaN;const t=parseFloat(n[1]),s=(n[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return t*ft;case"weeks":case"week":case"w":return t*ct;case"days":case"day":case"d":return t*Y;case"hours":case"hour":case"hrs":case"hr":case"h":return t*G;case"minutes":case"minute":case"mins":case"min":case"m":return t*H;case"seconds":case"second":case"secs":case"sec":case"s":return t*W;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return t;default:throw new Error(`The unit ${s} was matched, but no matching case exists.`)}}function ht(e){const n=Math.abs(e);return n>=Y?`${Math.round(e/Y)}d`:n>=G?`${Math.round(e/G)}h`:n>=H?`${Math.round(e/H)}m`:n>=W?`${Math.round(e/W)}s`:`${e}ms`}function mt(e){const n=Math.abs(e);return n>=Y?ue(e,n,Y,"day"):n>=G?ue(e,n,G,"hour"):n>=H?ue(e,n,H,"minute"):n>=W?ue(e,n,W,"second"):`${e} ms`}function ue(e,n,t,s){const r=n>=t*1.5;return`${Math.round(e/t)} ${s}${r?"s":""}`}function pt(e){return typeof e=="object"&&e!==null&&"message"in e}const gt=e=>(n,t)=>(e.set(n,t),t),Fe=Number.MAX_SAFE_INTEGER===void 0?9007199254740991:Number.MAX_SAFE_INTEGER,Be=536870912,Ue=Be*2,yt=(e,n)=>t=>{const s=n.get(t);let r=s===void 0?t.size:s<Ue?s+1:0;if(!t.has(r))return e(t,r);if(t.size<Be){for(;t.has(r);)r=Math.floor(Math.random()*Ue);return e(t,r)}if(t.size>Fe)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;t.has(r);)r=Math.floor(Math.random()*Fe);return e(t,r)},je=new WeakMap,wt=gt(je),le=yt(wt,je),Tt=e=>e.method!==void 0&&e.method==="call",bt=e=>e.error===null&&typeof e.id=="number",qe=((e,n)=>{let t=null;return()=>{if(t!==null)return t;const s=new Blob([n],{type:"application/javascript; charset=utf-8"}),r=URL.createObjectURL(s);return t=e(r),setTimeout(()=>URL.revokeObjectURL(r)),t}})(e=>{const n=new Map([[0,()=>{}]]),t=new Map([[0,()=>{}]]),s=new Map,r=new Worker(e);return r.addEventListener("message",({data:m})=>{if(Tt(m)){const{params:{timerId:d,timerType:y}}=m;if(y==="interval"){const M=n.get(d);if(typeof M=="number"){const $=s.get(M);if($===void 0||$.timerId!==d||$.timerType!==y)throw new Error("The timer is in an undefined state.")}else if(typeof M<"u")M();else throw new Error("The timer is in an undefined state.")}else if(y==="timeout"){const M=t.get(d);if(typeof M=="number"){const $=s.get(M);if($===void 0||$.timerId!==d||$.timerType!==y)throw new Error("The timer is in an undefined state.")}else if(typeof M<"u")M(),t.delete(d);else throw new Error("The timer is in an undefined state.")}}else if(bt(m)){const{id:d}=m,y=s.get(d);if(y===void 0)throw new Error("The timer is in an undefined state.");const{timerId:M,timerType:$}=y;s.delete(d),$==="interval"?n.delete(M):t.delete(M)}else{const{error:{message:d}}=m;throw new Error(d)}}),{clearInterval:m=>{const d=le(s);s.set(d,{timerId:m,timerType:"interval"}),n.set(m,d),r.postMessage({id:d,method:"clear",params:{timerId:m,timerType:"interval"}})},clearTimeout:m=>{const d=le(s);s.set(d,{timerId:m,timerType:"timeout"}),t.set(m,d),r.postMessage({id:d,method:"clear",params:{timerId:m,timerType:"timeout"}})},setInterval:(m,d)=>{const y=le(n);return n.set(y,()=>{m(),typeof n.get(y)=="function"&&r.postMessage({id:null,method:"set",params:{delay:d,now:performance.now(),timerId:y,timerType:"interval"}})}),r.postMessage({id:null,method:"set",params:{delay:d,now:performance.now(),timerId:y,timerType:"interval"}}),y},setTimeout:(m,d)=>{const y=le(t);return t.set(y,m),r.postMessage({id:null,method:"set",params:{delay:d,now:performance.now(),timerId:y,timerType:"timeout"}}),y}}},`(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error('The given type "'.concat(i,'" is not supported'));(e=>{const r=t.get(e);if(void 0===r)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error('The given method "'.concat(s.method,'" is not supported'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error('The given type "'.concat(d,'" is not supported'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();`),$t=e=>qe().clearInterval(e),We=(e,n)=>qe().setInterval(e,n);function _(e,n,...t){const s=document.createElement(e);return n instanceof Node?s.append(n):typeof n=="string"?s.append(Mt(n)):Array.isArray(n)?s.append(...n):(Object.assign(s,n),Object.assign(s.style,n?.style)),s.append(...t),s}function Mt(e){return document.createTextNode(e)}class vt{constructor(n){this.storage=n}download(){const n=this.storage.taskList;if(!n.length){alert("\u041D\u0435\u0442\u0443 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0430.");return}const t=_("div");for(const{date:i,list:c,total:a}of n){let T=0;const m=_("table",{border:"1"}),d=_("div",{style:{display:"flex",gap:"4px",flexDirection:"column"}}),y=_("tr",_("th","Task Type"),_("th","Count"),_("th","Estimated Rating Time"));m.append(d,y);for(const{count:M,estimated:$,type:L}of c){T+=$;const fe=_("tr",_("td",L),_("td",`${M}`),_("td",ae($,{long:!0})));m.append(fe)}d.append(_("span",`Date: ${i}`),_("span",`Tasks ${a}`),_("span",`Estimated time: ${ae(T,{long:!0})}`)),t.append(_("div",m,_("hr")))}const s=new Blob([t.outerHTML],{type:"text/html"});_("a",{href:URL.createObjectURL(s),download:`tryrating-com-${new Date().toISOString()}.html`}).click()}}const St=".survey-meta-fields",kt=".labeled-attribute__attribute",He={selector:".btn-success",text:"Submit Rating"},Et=".modal-container.visible",be="tryrating-storage-v2";function _t(){return document.querySelector(Et)}function ce(e){return e.split(/\s(?=\d)/).reduce((t,s)=>(t+=ae(s),t),0)}const $e=()=>[{date:Te().format("DD.MM.YYYY"),total:0,list:[]}],[z,Me]=te([]);class Dt{constructor(){this.read()}get taskList(){return z()}read(){const n=GM_getValue(be,$e());Me(n)}reset(){Me($e()),GM_setValue(be,z())}write(n){const t=this.getTaskList();t.total+=1;const s=t.list.find(i=>i.type===n.type);s?(s.count+=1,s.estimated+=n.estimated):t.list.push({count:1,type:n.type,estimated:n.estimated});const r=[t,...z().filter(i=>i.date!==t.date)];Me(r),GM_setValue(be,z())}getTaskList(){const n=Te().format("DD.MM.YYYY"),t=z().find(s=>s.date===n);return t||$e()[0]}}function At(){const[e,n]=te([]);function t(){const s=[],r=Array.from(document.querySelectorAll(He.selector));for(const i of r)i instanceof HTMLButtonElement&&i.textContent===He.text&&s.push(i);return n(s),s}return{findSubmitButtons:t,get submitButtons(){return e()}}}class xt{taskFields=null;onChangeTaskCallback=null;get values(){return this.taskFields}onChangeTask(n){this.onChangeTaskCallback=n}watch(){const n=document.querySelector(St);if(!n)return;const t=Array.from(n.querySelectorAll(kt));if(!t.length)return;const[s,r,i]=t,c={taskType:s.textContent,requestId:r.textContent,estimatedRatingTime:i.textContent.trim()};c.requestId!==this.taskFields?.requestId&&this.onChangeTaskCallback(c),this.taskFields=c}}const[Ge,Pe]=te(0);class Ct{intervalId;onEndCallback;onTickTimer(){const n=Ge()-1e3;Pe(n),n===0&&(this.onEndCallback(),this.stop())}get time(){return Ge()}onTimerEnd(n){this.onEndCallback=n}start(n){this.stop(),Pe(n),this.intervalId=We(()=>this.onTickTimer(),1e3)}stop(){this.intervalId&&($t(this.intervalId),this.intervalId=null)}}const Gt="",Ot=rt('<div class="tryrating-container"><span class="counter">Time: </span><span class="timer">Tasks: </span><button>Reset</button><button>haha</button><button>hoho'),{findSubmitButtons:Ve}=At(),[Lt,It]=te(null),F=new Dt,Nt=new vt(F),ve=new Ct;ve.onTimerEnd(async()=>{const e=Ve();if(!e.length){console.error("submitButtons is not defined");return}e[0]?.click()});const ze=new xt;ze.onChangeTask(e=>{const n=Lt();n&&n.requestId!==e.requestId&&(console.info("Current task is submitted:",n),F.write({type:n.taskType,estimated:ce(n.estimatedRatingTime)})),It(e),Ve();const t=ce(e.estimatedRatingTime);ve.start(t)}),We(()=>{ze.watch(),_t()&&GM_notification({title:"\u041E\u0442\u043A\u0440\u044B\u043B\u043E\u0441\u044C \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E",highlight:!0,silent:!1,timeout:5e3})},5e3),window.addEventListener("keydown",e=>{e.altKey&&e.key==="1"&&(e.preventDefault(),Nt.download()),e.altKey&&e.key==="2"&&(e.preventDefault(),confirm(`Reset data.
Are you sure?`)&&F.reset())});const Rt=()=>{const e=_e(()=>ae(ve.time,{long:!0})),n=_e(()=>{const t=Te().format("DD.MM.YYYY");return F.taskList.find(r=>r.date===t)?.total??"0"});return(()=>{const t=Ot(),s=t.firstChild;s.firstChild;const r=s.nextSibling;r.firstChild;const i=r.nextSibling,c=i.nextSibling,a=c.nextSibling;return ye(s,e,null),ye(r,n,null),i.$$click=()=>F.reset(),c.$$click=()=>{F.write({type:"haha",estimated:ce("5 seconds")})},a.$$click=()=>{F.write({type:"hoho",estimated:ce("3 seconds")})},t})()};st(()=>tt(Rt,{}),document.body),it(["click"]),GM_addStyle(`.tryrating-container {  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  position: absolute;
  z-index: 9999999;
  background: #2e2c2f;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  width: 75px;
  bottom: 12%;
  padding: 4px;
}
`)})();
