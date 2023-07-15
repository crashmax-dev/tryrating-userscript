(function(){"use strict";const dt={equals:(t,e)=>t===e};let be=qt;const V=1,ht=2,Yt={owned:null,cleanups:null,context:null,owner:null};var B=null;let Et=null,C=null,N=null,G=null,mt=0;function ve(t,e){const n=C,s=B,r=t.length===0,i=r?Yt:{owned:null,cleanups:null,context:null,owner:e===void 0?s:e},u=r?t:()=>t(()=>Q(()=>$t(i)));B=i,C=null;try{return ut(u,!0)}finally{C=n,B=s}}function J(t,e){e=e?Object.assign({},dt,e):dt;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},s=r=>(typeof r=="function"&&(r=r(n.value)),zt(n,r));return[Bt.bind(n),s]}function pt(t,e,n){const s=Ht(t,e,!1,V);gt(s)}function ot(t,e,n){n=n?Object.assign({},dt,n):dt;const s=Ht(t,e,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,gt(s),Bt.bind(s)}function Q(t){if(C===null)return t();const e=C;C=null;try{return t()}finally{C=e}}function Bt(){if(this.sources&&this.state)if(this.state===V)gt(this);else{const t=N;N=null,ut(()=>yt(this),!1),N=t}if(C){const t=this.observers?this.observers.length:0;C.sources?(C.sources.push(this),C.sourceSlots.push(t)):(C.sources=[this],C.sourceSlots=[t]),this.observers?(this.observers.push(C),this.observerSlots.push(C.sources.length-1)):(this.observers=[C],this.observerSlots=[C.sources.length-1])}return this.value}function zt(t,e,n){let s=t.value;return(!t.comparator||!t.comparator(s,e))&&(t.value=e,t.observers&&t.observers.length&&ut(()=>{for(let r=0;r<t.observers.length;r+=1){const i=t.observers[r],u=Et&&Et.running;u&&Et.disposed.has(i),(u?!i.tState:!i.state)&&(i.pure?N.push(i):G.push(i),i.observers&&Wt(i)),u||(i.state=V)}if(N.length>1e6)throw N=[],new Error},!1)),e}function gt(t){if(!t.fn)return;$t(t);const e=B,n=C,s=mt;C=B=t,Se(t,t.value,s),C=n,B=e}function Se(t,e,n){let s;try{s=t.fn(e)}catch(r){return t.pure&&(t.state=V,t.owned&&t.owned.forEach($t),t.owned=null),t.updatedAt=n+1,Pt(r)}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?zt(t,s):t.value=s,t.updatedAt=n)}function Ht(t,e,n,s=V,r){const i={fn:t,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:B,context:null,pure:n};return B===null||B!==Yt&&(B.owned?B.owned.push(i):B.owned=[i]),i}function jt(t){if(t.state===0)return;if(t.state===ht)return yt(t);if(t.suspense&&Q(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<mt);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===V)gt(t);else if(t.state===ht){const s=N;N=null,ut(()=>yt(t,e[0]),!1),N=s}}function ut(t,e){if(N)return t();let n=!1;e||(N=[]),G?n=!0:G=[],mt++;try{const s=t();return Me(n),s}catch(s){n||(G=null),N=null,Pt(s)}}function Me(t){if(N&&(qt(N),N=null),t)return;const e=G;G=null,e.length&&ut(()=>be(e),!1)}function qt(t){for(let e=0;e<t.length;e++)jt(t[e])}function yt(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const s=t.sources[n];if(s.sources){const r=s.state;r===V?s!==e&&(!s.updatedAt||s.updatedAt<mt)&&jt(s):r===ht&&yt(s,e)}}}function Wt(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=ht,n.pure?N.push(n):G.push(n),n.observers&&Wt(n))}}function $t(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),s=t.sourceSlots.pop(),r=n.observers;if(r&&r.length){const i=r.pop(),u=n.observerSlots.pop();s<r.length&&(i.sourceSlots[u]=s,r[s]=i,n.observerSlots[s]=u)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)$t(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0,t.context=null}function ke(t){return t instanceof Error?t:new Error(typeof t=="string"?t:"Unknown error",{cause:t})}function Pt(t,e=B){throw ke(t)}function at(t,e){return Q(()=>t(e||{}))}const Ee=t=>`Stale read from <${t}>.`;function Oe(t){const e=t.keyed,n=ot(()=>t.when,void 0,{equals:(s,r)=>e?s===r:!s==!r});return ot(()=>{const s=n();if(s){const r=t.children;return typeof r=="function"&&r.length>0?Q(()=>r(e?s:()=>{if(!Q(n))throw Ee("Show");return t.when})):r}return t.fallback},void 0,void 0)}function De(t,e,n){let s=n.length,r=e.length,i=s,u=0,o=0,m=e[r-1].nextSibling,p=null;for(;u<r||o<i;){if(e[u]===n[o]){u++,o++;continue}for(;e[r-1]===n[i-1];)r--,i--;if(r===u){const h=i<s?o?n[o-1].nextSibling:n[i-o]:m;for(;o<i;)t.insertBefore(n[o++],h)}else if(i===o)for(;u<r;)(!p||!p.has(e[u]))&&e[u].remove(),u++;else if(e[u]===n[i-1]&&n[o]===e[r-1]){const h=e[--r].nextSibling;t.insertBefore(n[o++],e[u++].nextSibling),t.insertBefore(n[--i],h),e[r]=n[i]}else{if(!p){p=new Map;let g=o;for(;g<i;)p.set(n[g],g++)}const h=p.get(e[u]);if(h!=null)if(o<h&&h<i){let g=u,y=1,b;for(;++g<r&&g<i&&!((b=p.get(e[g]))==null||b!==h+y);)y++;if(y>h-o){const S=e[u];for(;o<h;)t.insertBefore(n[o++],S)}else t.replaceChild(n[o++],e[u++])}else u++;else e[u++].remove()}}}const Vt="_$DX_DELEGATE";function Ae(t,e,n,s={}){let r;return ve(i=>{r=i,e===document?t():tt(e,t(),e.firstChild?null:void 0,n)},s.owner),()=>{r(),e.textContent=""}}function Ot(t,e,n){let s;const r=()=>{const u=document.createElement("template");return u.innerHTML=t,n?u.content.firstChild.firstChild:u.content.firstChild},i=e?()=>Q(()=>document.importNode(s||(s=r()),!0)):()=>(s||(s=r())).cloneNode(!0);return i.cloneNode=i,i}function Gt(t,e=window.document){const n=e[Vt]||(e[Vt]=new Set);for(let s=0,r=t.length;s<r;s++){const i=t[s];n.has(i)||(n.add(i),e.addEventListener(i,Ce))}}function tt(t,e,n,s){if(n!==void 0&&!s&&(s=[]),typeof e!="function")return wt(t,e,s,n);pt(r=>wt(t,e(),r,n),s)}function Ce(t){const e=`$$${t.type}`;let n=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==n&&Object.defineProperty(t,"target",{configurable:!0,value:n}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}});n;){const s=n[e];if(s&&!n.disabled){const r=n[`${e}Data`];if(r!==void 0?s.call(n,r,t):s.call(n,t),t.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function wt(t,e,n,s,r){for(;typeof n=="function";)n=n();if(e===n)return n;const i=typeof e,u=s!==void 0;if(t=u&&n[0]&&n[0].parentNode||t,i==="string"||i==="number")if(i==="number"&&(e=e.toString()),u){let o=n[0];o&&o.nodeType===3?o.data=e:o=document.createTextNode(e),n=et(t,n,s,o)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e;else if(e==null||i==="boolean")n=et(t,n,s);else{if(i==="function")return pt(()=>{let o=e();for(;typeof o=="function";)o=o();n=wt(t,o,n,s)}),()=>n;if(Array.isArray(e)){const o=[],m=n&&Array.isArray(n);if(Dt(o,e,n,r))return pt(()=>n=wt(t,o,n,s,!0)),()=>n;if(o.length===0){if(n=et(t,n,s),u)return n}else m?n.length===0?Kt(t,o,s):De(t,n,o):(n&&et(t),Kt(t,o));n=o}else if(e.nodeType){if(Array.isArray(n)){if(u)return n=et(t,n,s,e);et(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}else console.warn("Unrecognized value. Skipped inserting",e)}return n}function Dt(t,e,n,s){let r=!1;for(let i=0,u=e.length;i<u;i++){let o=e[i],m=n&&n[i],p;if(!(o==null||o===!0||o===!1))if((p=typeof o)=="object"&&o.nodeType)t.push(o);else if(Array.isArray(o))r=Dt(t,o,m)||r;else if(p==="function")if(s){for(;typeof o=="function";)o=o();r=Dt(t,Array.isArray(o)?o:[o],Array.isArray(m)?m:[m])||r}else t.push(o),r=!0;else{const h=String(o);m&&m.nodeType===3&&m.data===h?t.push(m):t.push(document.createTextNode(h))}}return r}function Kt(t,e,n=null){for(let s=0,r=e.length;s<r;s++)t.insertBefore(e[s],n)}function et(t,e,n,s){if(n===void 0)return t.textContent="";const r=s||document.createTextNode("");if(e.length){let i=!1;for(let u=e.length-1;u>=0;u--){const o=e[u];if(r!==o){const m=o.parentNode===t;!i&&!u?m?t.replaceChild(r,o):t.insertBefore(r,n):m&&o.remove()}else i=!0}}else t.insertBefore(r,n);return[r]}var At=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ct(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Zt={exports:{}};(function(t,e){(function(n,s){t.exports=s()})(At,function(){var n=1e3,s=6e4,r=36e5,i="millisecond",u="second",o="minute",m="hour",p="day",h="week",g="month",y="quarter",b="year",S="date",f="Invalid Date",M=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,I=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,O={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function($){var l=["th","st","nd","rd"],a=$%100;return"["+$+(l[(a-20)%10]||l[a]||l[0])+"]"}},D=function($,l,a){var d=String($);return!d||d.length>=l?$:""+Array(l+1-d.length).join(a)+$},z={s:D,z:function($){var l=-$.utcOffset(),a=Math.abs(l),d=Math.floor(a/60),c=a%60;return(l<=0?"+":"-")+D(d,2,"0")+":"+D(c,2,"0")},m:function $(l,a){if(l.date()<a.date())return-$(a,l);var d=12*(a.year()-l.year())+(a.month()-l.month()),c=l.clone().add(d,g),w=a-c<0,T=l.clone().add(d+(w?-1:1),g);return+(-(d+(a-c)/(w?c-T:T-c))||0)},a:function($){return $<0?Math.ceil($)||0:Math.floor($)},p:function($){return{M:g,y:b,w:h,d:p,D:S,h:m,m:o,s:u,ms:i,Q:y}[$]||String($||"").toLowerCase().replace(/s$/,"")},u:function($){return $===void 0}},_="en",F={};F[_]=O;var U=function($){return $ instanceof W},H=function $(l,a,d){var c;if(!l)return _;if(typeof l=="string"){var w=l.toLowerCase();F[w]&&(c=w),a&&(F[w]=a,c=w);var T=l.split("-");if(!c&&T.length>1)return $(T[0])}else{var E=l.name;F[E]=l,c=E}return!d&&c&&(_=c),c||!d&&_},k=function($,l){if(U($))return $.clone();var a=typeof l=="object"?l:{};return a.date=$,a.args=arguments,new W(a)},v=z;v.l=H,v.i=U,v.w=function($,l){return k($,{locale:l.$L,utc:l.$u,x:l.$x,$offset:l.$offset})};var W=function(){function $(a){this.$L=H(a.locale,null,!0),this.parse(a)}var l=$.prototype;return l.parse=function(a){this.$d=function(d){var c=d.date,w=d.utc;if(c===null)return new Date(NaN);if(v.u(c))return new Date;if(c instanceof Date)return new Date(c);if(typeof c=="string"&&!/Z$/i.test(c)){var T=c.match(M);if(T){var E=T[2]-1||0,A=(T[7]||"0").substring(0,3);return w?new Date(Date.UTC(T[1],E,T[3]||1,T[4]||0,T[5]||0,T[6]||0,A)):new Date(T[1],E,T[3]||1,T[4]||0,T[5]||0,T[6]||0,A)}}return new Date(c)}(a),this.$x=a.x||{},this.init()},l.init=function(){var a=this.$d;this.$y=a.getFullYear(),this.$M=a.getMonth(),this.$D=a.getDate(),this.$W=a.getDay(),this.$H=a.getHours(),this.$m=a.getMinutes(),this.$s=a.getSeconds(),this.$ms=a.getMilliseconds()},l.$utils=function(){return v},l.isValid=function(){return this.$d.toString()!==f},l.isSame=function(a,d){var c=k(a);return this.startOf(d)<=c&&c<=this.endOf(d)},l.isAfter=function(a,d){return k(a)<this.startOf(d)},l.isBefore=function(a,d){return this.endOf(d)<k(a)},l.$g=function(a,d,c){return v.u(a)?this[d]:this.set(c,a)},l.unix=function(){return Math.floor(this.valueOf()/1e3)},l.valueOf=function(){return this.$d.getTime()},l.startOf=function(a,d){var c=this,w=!!v.u(d)||d,T=v.p(a),E=function(X,Y){var P=v.w(c.$u?Date.UTC(c.$y,Y,X):new Date(c.$y,Y,X),c);return w?P:P.endOf(p)},A=function(X,Y){return v.w(c.toDate()[X].apply(c.toDate("s"),(w?[0,0,0,0]:[23,59,59,999]).slice(Y)),c)},x=this.$W,R=this.$M,j=this.$D,it="set"+(this.$u?"UTC":"");switch(T){case b:return w?E(1,0):E(31,11);case g:return w?E(1,R):E(0,R+1);case h:var Z=this.$locale().weekStart||0,lt=(x<Z?x+7:x)-Z;return E(w?j-lt:j+(6-lt),R);case p:case S:return A(it+"Hours",0);case m:return A(it+"Minutes",1);case o:return A(it+"Seconds",2);case u:return A(it+"Milliseconds",3);default:return this.clone()}},l.endOf=function(a){return this.startOf(a,!1)},l.$set=function(a,d){var c,w=v.p(a),T="set"+(this.$u?"UTC":""),E=(c={},c[p]=T+"Date",c[S]=T+"Date",c[g]=T+"Month",c[b]=T+"FullYear",c[m]=T+"Hours",c[o]=T+"Minutes",c[u]=T+"Seconds",c[i]=T+"Milliseconds",c)[w],A=w===p?this.$D+(d-this.$W):d;if(w===g||w===b){var x=this.clone().set(S,1);x.$d[E](A),x.init(),this.$d=x.set(S,Math.min(this.$D,x.daysInMonth())).$d}else E&&this.$d[E](A);return this.init(),this},l.set=function(a,d){return this.clone().$set(a,d)},l.get=function(a){return this[v.p(a)]()},l.add=function(a,d){var c,w=this;a=Number(a);var T=v.p(d),E=function(R){var j=k(w);return v.w(j.date(j.date()+Math.round(R*a)),w)};if(T===g)return this.set(g,this.$M+a);if(T===b)return this.set(b,this.$y+a);if(T===p)return E(1);if(T===h)return E(7);var A=(c={},c[o]=s,c[m]=r,c[u]=n,c)[T]||1,x=this.$d.getTime()+a*A;return v.w(x,this)},l.subtract=function(a,d){return this.add(-1*a,d)},l.format=function(a){var d=this,c=this.$locale();if(!this.isValid())return c.invalidDate||f;var w=a||"YYYY-MM-DDTHH:mm:ssZ",T=v.z(this),E=this.$H,A=this.$m,x=this.$M,R=c.weekdays,j=c.months,it=c.meridiem,Z=function(Y,P,ft,kt){return Y&&(Y[P]||Y(d,w))||ft[P].slice(0,kt)},lt=function(Y){return v.s(E%12||12,Y,"0")},X=it||function(Y,P,ft){var kt=Y<12?"AM":"PM";return ft?kt.toLowerCase():kt};return w.replace(I,function(Y,P){return P||function(ft){switch(ft){case"YY":return String(d.$y).slice(-2);case"YYYY":return v.s(d.$y,4,"0");case"M":return x+1;case"MM":return v.s(x+1,2,"0");case"MMM":return Z(c.monthsShort,x,j,3);case"MMMM":return Z(j,x);case"D":return d.$D;case"DD":return v.s(d.$D,2,"0");case"d":return String(d.$W);case"dd":return Z(c.weekdaysMin,d.$W,R,2);case"ddd":return Z(c.weekdaysShort,d.$W,R,3);case"dddd":return R[d.$W];case"H":return String(E);case"HH":return v.s(E,2,"0");case"h":return lt(1);case"hh":return lt(2);case"a":return X(E,A,!0);case"A":return X(E,A,!1);case"m":return String(A);case"mm":return v.s(A,2,"0");case"s":return String(d.$s);case"ss":return v.s(d.$s,2,"0");case"SSS":return v.s(d.$ms,3,"0");case"Z":return T}return null}(Y)||T.replace(":","")})},l.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},l.diff=function(a,d,c){var w,T=this,E=v.p(d),A=k(a),x=(A.utcOffset()-this.utcOffset())*s,R=this-A,j=function(){return v.m(T,A)};switch(E){case b:w=j()/12;break;case g:w=j();break;case y:w=j()/3;break;case h:w=(R-x)/6048e5;break;case p:w=(R-x)/864e5;break;case m:w=R/r;break;case o:w=R/s;break;case u:w=R/n;break;default:w=R}return c?w:v.a(w)},l.daysInMonth=function(){return this.endOf(g).$D},l.$locale=function(){return F[this.$L]},l.locale=function(a,d){if(!a)return this.$L;var c=this.clone(),w=H(a,d,!0);return w&&(c.$L=w),c},l.clone=function(){return v.w(this.$d,this)},l.toDate=function(){return new Date(this.valueOf())},l.toJSON=function(){return this.isValid()?this.toISOString():null},l.toISOString=function(){return this.$d.toISOString()},l.toString=function(){return this.$d.toUTCString()},$}(),Te=W.prototype;return k.prototype=Te,[["$ms",i],["$s",u],["$m",o],["$H",m],["$W",p],["$M",g],["$y",b],["$D",S]].forEach(function($){Te[$[1]]=function(l){return this.$g(l,$[0],$[1])}}),k.extend=function($,l){return $.$i||($(l,W,k),$.$i=!0),k},k.locale=H,k.isDayjs=U,k.unix=function($){return k(1e3*$)},k.en=F[_],k.Ls=F,k.p={},k})})(Zt);var _e=Zt.exports;const _t=Ct(_e);var Xt={exports:{}};(function(t,e){(function(n,s){t.exports=s()})(At,function(){var n={year:0,month:1,day:2,hour:3,minute:4,second:5},s={};return function(r,i,u){var o,m=function(y,b,S){S===void 0&&(S={});var f=new Date(y),M=function(I,O){O===void 0&&(O={});var D=O.timeZoneName||"short",z=I+"|"+D,_=s[z];return _||(_=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:I,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:D}),s[z]=_),_}(b,S);return M.formatToParts(f)},p=function(y,b){for(var S=m(y,b),f=[],M=0;M<S.length;M+=1){var I=S[M],O=I.type,D=I.value,z=n[O];z>=0&&(f[z]=parseInt(D,10))}var _=f[3],F=_===24?0:_,U=f[0]+"-"+f[1]+"-"+f[2]+" "+F+":"+f[4]+":"+f[5]+":000",H=+y;return(u.utc(U).valueOf()-(H-=H%1e3))/6e4},h=i.prototype;h.tz=function(y,b){y===void 0&&(y=o);var S=this.utcOffset(),f=this.toDate(),M=f.toLocaleString("en-US",{timeZone:y}),I=Math.round((f-new Date(M))/1e3/60),O=u(M).$set("millisecond",this.$ms).utcOffset(15*-Math.round(f.getTimezoneOffset()/15)-I,!0);if(b){var D=O.utcOffset();O=O.add(S-D,"minute")}return O.$x.$timezone=y,O},h.offsetName=function(y){var b=this.$x.$timezone||u.tz.guess(),S=m(this.valueOf(),b,{timeZoneName:y}).find(function(f){return f.type.toLowerCase()==="timezonename"});return S&&S.value};var g=h.startOf;h.startOf=function(y,b){if(!this.$x||!this.$x.$timezone)return g.call(this,y,b);var S=u(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return g.call(S,y,b).tz(this.$x.$timezone,!0)},u.tz=function(y,b,S){var f=S&&b,M=S||b||o,I=p(+u(),M);if(typeof y!="string")return u(y).tz(M);var O=function(F,U,H){var k=F-60*U*1e3,v=p(k,H);if(U===v)return[k,U];var W=p(k-=60*(v-U)*1e3,H);return v===W?[k,v]:[F-60*Math.min(v,W)*1e3,Math.max(v,W)]}(u.utc(y,f).valueOf(),I,M),D=O[0],z=O[1],_=u(D).utcOffset(z);return _.$x.$timezone=M,_},u.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},u.tz.setDefault=function(y){o=y}}})})(Xt);var xe=Xt.exports;const Le=Ct(xe);var Jt={exports:{}};(function(t,e){(function(n,s){t.exports=s()})(At,function(){var n="minute",s=/[+-]\d\d(?::?\d\d)?/g,r=/([+-]|\d\d)/g;return function(i,u,o){var m=u.prototype;o.utc=function(f){var M={date:f,utc:!0,args:arguments};return new u(M)},m.utc=function(f){var M=o(this.toDate(),{locale:this.$L,utc:!0});return f?M.add(this.utcOffset(),n):M},m.local=function(){return o(this.toDate(),{locale:this.$L,utc:!1})};var p=m.parse;m.parse=function(f){f.utc&&(this.$u=!0),this.$utils().u(f.$offset)||(this.$offset=f.$offset),p.call(this,f)};var h=m.init;m.init=function(){if(this.$u){var f=this.$d;this.$y=f.getUTCFullYear(),this.$M=f.getUTCMonth(),this.$D=f.getUTCDate(),this.$W=f.getUTCDay(),this.$H=f.getUTCHours(),this.$m=f.getUTCMinutes(),this.$s=f.getUTCSeconds(),this.$ms=f.getUTCMilliseconds()}else h.call(this)};var g=m.utcOffset;m.utcOffset=function(f,M){var I=this.$utils().u;if(I(f))return this.$u?0:I(this.$offset)?g.call(this):this.$offset;if(typeof f=="string"&&(f=function(_){_===void 0&&(_="");var F=_.match(s);if(!F)return null;var U=(""+F[0]).match(r)||["-",0,0],H=U[0],k=60*+U[1]+ +U[2];return k===0?0:H==="+"?k:-k}(f),f===null))return this;var O=Math.abs(f)<=16?60*f:f,D=this;if(M)return D.$offset=O,D.$u=f===0,D;if(f!==0){var z=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(D=this.local().add(O+z,n)).$offset=O,D.$x.$localOffset=z}else D=this.utc();return D};var y=m.format;m.format=function(f){var M=f||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return y.call(this,M)},m.valueOf=function(){var f=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*f},m.isUTC=function(){return!!this.$u},m.toISOString=function(){return this.toDate().toISOString()},m.toString=function(){return this.toDate().toUTCString()};var b=m.toDate;m.toDate=function(f){return f==="s"&&this.$offset?o(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():b.call(this)};var S=m.diff;m.diff=function(f,M,I){if(f&&this.$u===f.$u)return S.call(this,f,M,I);var O=this.local(),D=o(f).local();return S.call(O,D,M,I)}}})})(Jt);var Ie=Jt.exports;const Ne=Ct(Ie);_t.extend(Ne),_t.extend(Le);const Qt={offset:180,region:"Asia",location:"Kuwait"};function xt(){return _t.tz(new Date,`${Qt.region}/${Qt.location}`).format("DD.MM.YYYY")}function Re(t){return Object.entries(t)}function te(t){return t=Math.abs(t),t>9?`${t}`:`0${t}`}const ee={info:"#2ecc71",debug:"#7f8c8d",warn:"#f39c12",error:"#c0392b"};function Fe(t){return[`background: ${ee[t]}`,"border-radius: 0.5em","color: white","font-weight: bold","padding: 2px 0.5em","font-family: cursive"].join(";")}const q=Object.freeze(Re(ee).reduce((t,[e])=>(t[e]=(...n)=>{console[e]("%ctryrating-userscript",Fe(e),...n)},t),{})),Lt=()=>[{date:xt(),total:0,list:[]}],[ct,It]=J([]);class Ue{STORAGE_KEY="tryrating-storage-v2";constructor(){this.read()}get taskList(){return ct()}read(){const e=GM_getValue(this.STORAGE_KEY,Lt());q.info("Readed tasks",e),It(e)}reset(){It(Lt()),GM_setValue(this.STORAGE_KEY,ct())}write(e){const n=this.getTaskList();n.total+=1;const s=n.list.find(i=>i.type===e.type);s?(s.count+=1,s.estimated+=e.estimated):n.list.push({count:1,type:e.type,estimated:e.estimated});const r=[n,...ct().filter(i=>i.date!==n.date)];It(r),GM_setValue(this.STORAGE_KEY,ct())}getTaskList(){const e=xt();q.info("Current date",e);const n=ct().find(s=>s.date===e);return q.info("Task list",n),n||Lt()[0]}}const Tt=new Ue;function L(t,e,...n){const s=document.createElement(t);return e instanceof Node?s.append(e):typeof e=="string"?s.append(Ye(e)):Array.isArray(e)?s.append(...e):(Object.assign(s,e),Object.assign(s.style,e?.style)),s.append(...n),s}function Ye(t){return document.createTextNode(t)}function Nt(t,e,n){const s=new MutationObserver((r,i)=>{for(const u of r)e(u,i)});return s.observe(t,{childList:!0,subtree:!0,...n}),()=>s.disconnect()}function Be(t,e=document.body){return new Promise(n=>{Nt(e,(s,r)=>{const i=e.querySelector(t);i&&(r.disconnect(),n(i))})})}const nt=1e3,st=nt*60,rt=st*60,K=rt*24,ze=K*7,He=K*365.25;function Rt(t,e){try{if(typeof t=="string"&&t.length>0)return je(t);if(typeof t=="number"&&isFinite(t))return e?.long?We(t):qe(t);throw new Error("Value is not a string or number.")}catch(n){const s=Pe(n)?`${n.message}. value=${JSON.stringify(t)}`:"An unknown error has occured.";throw new Error(s)}}function je(t){if(t=String(t),t.length>100)throw new Error("Value exceeds the maximum length of 100 characters.");const e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(!e)return NaN;const n=parseFloat(e[1]),s=(e[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return n*He;case"weeks":case"week":case"w":return n*ze;case"days":case"day":case"d":return n*K;case"hours":case"hour":case"hrs":case"hr":case"h":return n*rt;case"minutes":case"minute":case"mins":case"min":case"m":return n*st;case"seconds":case"second":case"secs":case"sec":case"s":return n*nt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:throw new Error(`The unit ${s} was matched, but no matching case exists.`)}}function qe(t){const e=Math.abs(t);return e>=K?`${Math.round(t/K)}d`:e>=rt?`${Math.round(t/rt)}h`:e>=st?`${Math.round(t/st)}m`:e>=nt?`${Math.round(t/nt)}s`:`${t}ms`}function We(t){const e=Math.abs(t);return e>=K?bt(t,e,K,"day"):e>=rt?bt(t,e,rt,"hour"):e>=st?bt(t,e,st,"minute"):e>=nt?bt(t,e,nt,"second"):`${t} ms`}function bt(t,e,n,s){const r=e>=n*1.5;return`${Math.round(t/n)} ${s}${r?"s":""}`}function Pe(t){return typeof t=="object"&&t!==null&&"message"in t}const Ve=Ot("<button>Tasks: ");class Ge{open(){const e=Tt.taskList;if(!e.length){alert("\u041D\u0435\u0442\u0443 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430.");return}const n=L("div");for(const{date:i,list:u,total:o}of e){let m=0;const p=L("table",{border:"1"}),h=L("div",{style:{display:"flex",gap:"4px",flexDirection:"column"}}),g=L("tr",L("th","Task Type"),L("th","Count"),L("th","Estimated Rating Time"));p.append(h,g);for(const{count:y,estimated:b,type:S}of u){m+=b;const f=L("tr",L("td",S),L("td",`${y}`),L("td",Rt(b,{long:!0})));p.append(f)}h.append(L("span",`Date: ${i}`),L("span",`Tasks ${o}`),L("span",`Estimated time: ${Rt(m,{long:!0})}`)),n.append(L("div",p,L("hr")))}const s=new Blob([n.outerHTML],{type:"text/html"});L("a",{target:"_blank",href:URL.createObjectURL(s)}).click()}}const ne=new Ge,Ke=()=>{const t=ot(()=>{const e=xt();return Tt.taskList.find(s=>s.date===e)?.total??"0"});return(()=>{const e=Ve();return e.firstChild,e.$$click=()=>ne.open(),e.style.setProperty("background","gray"),tt(e,t,null),e})()};Gt(["click"]);const Ze=Ot("<button>Autosubmit"),[vt,Xe]=J(!0);function se(){Xe(!vt())}function Ft(){return{get autosubmit(){return vt()},toggleAutosubmit:se}}const Je=()=>(()=>{const t=Ze();return t.$$click=()=>se(),pt(()=>(vt()?"#4CAF50":"#f44336")!=null?t.style.setProperty("background",vt()?"#4CAF50":"#f44336"):t.style.removeProperty("background")),t})();Gt(["click"]);const[re,Qe]=J(!0);function tn(){Qe(!re())}const en=t=>at(Oe,{get when(){return re()},get children(){return t.children}}),{toggleAutosubmit:nn}=Ft();function sn(){window.addEventListener("keydown",t=>{t.altKey&&t.key==="1"&&(t.preventDefault(),ne.open()),t.altKey&&t.key==="2"&&(t.preventDefault(),confirm(`Reset data.
Are you sure?`)&&Tt.reset()),t.ctrlKey&&t.code==="KeyO"&&(t.preventDefault(),nn()),t.ctrlKey&&t.code==="KeyX"&&(t.preventDefault(),tn())})}const rn=".modal-container.visible",on="div[modalwrapref] > div",ie="Validation failed!";function un(){const t=document.querySelector(rn);if(!t)return;const e=t.querySelector(on);if(e&&e.textContent===ie){GM_notification({title:document.title,text:ie,highlight:!0,silent:!1,timeout:1e3});const n=t.querySelector("button");n&&(q.info("Modal closed"),n.click())}}function oe(t){return t.split(/\s(?=\d)/).reduce((n,s)=>(n+=Rt(s),n),0)}const{autosubmit:an,toggleAutosubmit:cn}=Ft();class ln{taskFields=null;onChangeTaskCallback=null;get targetSelector(){return".survey-meta-fields"}onChangeTask(e){this.onChangeTaskCallback=e}observe(){const e=document.querySelector(this.targetSelector);if(!e){q.error("Task fields not found");return}const n=Array.from(e.querySelectorAll(".labeled-attribute__attribute"));if(!n.length){q.error("Task fields attributes not found");return}const[s,r,i]=n,u={taskType:s.textContent,requestId:r.textContent,estimatedRatingTime:i.textContent.trim()};u.requestId!==this.taskFields?.requestId&&(q.info("Task fields changed",u),this.onChangeTaskCallback(u),an||cn(),this.taskFields&&(q.info("Task is submitted",this.taskFields),Tt.write({type:this.taskFields.taskType,estimated:oe(this.taskFields.estimatedRatingTime)})),this.taskFields=u)}}const St=new ln;async function fn(){const t=document.querySelector("#app-root");if(!t){q.error("App root not found");return}Nt(t,()=>un()),Be(St.targetSelector).then(e=>{St.observe(),Nt(e,()=>St.observe())}).finally(()=>q.info("Initialized task fields observer"))}const dn=t=>(e,n)=>(t.set(e,n),n),ue=Number.MAX_SAFE_INTEGER===void 0?9007199254740991:Number.MAX_SAFE_INTEGER,ae=536870912,ce=ae*2,hn=(t,e)=>n=>{const s=e.get(n);let r=s===void 0?n.size:s<ce?s+1:0;if(!n.has(r))return t(n,r);if(n.size<ae){for(;n.has(r);)r=Math.floor(Math.random()*ce);return t(n,r)}if(n.size>ue)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;n.has(r);)r=Math.floor(Math.random()*ue);return t(n,r)},le=new WeakMap,mn=dn(le),Mt=hn(mn,le),pn=t=>t.method!==void 0&&t.method==="call",gn=t=>t.error===null&&typeof t.id=="number",fe=((t,e)=>{let n=null;return()=>{if(n!==null)return n;const s=new Blob([e],{type:"application/javascript; charset=utf-8"}),r=URL.createObjectURL(s);return n=t(r),setTimeout(()=>URL.revokeObjectURL(r)),n}})(t=>{const e=new Map([[0,()=>{}]]),n=new Map([[0,()=>{}]]),s=new Map,r=new Worker(t);return r.addEventListener("message",({data:p})=>{if(pn(p)){const{params:{timerId:h,timerType:g}}=p;if(g==="interval"){const y=e.get(h);if(typeof y=="number"){const b=s.get(y);if(b===void 0||b.timerId!==h||b.timerType!==g)throw new Error("The timer is in an undefined state.")}else if(typeof y<"u")y();else throw new Error("The timer is in an undefined state.")}else if(g==="timeout"){const y=n.get(h);if(typeof y=="number"){const b=s.get(y);if(b===void 0||b.timerId!==h||b.timerType!==g)throw new Error("The timer is in an undefined state.")}else if(typeof y<"u")y(),n.delete(h);else throw new Error("The timer is in an undefined state.")}}else if(gn(p)){const{id:h}=p,g=s.get(h);if(g===void 0)throw new Error("The timer is in an undefined state.");const{timerId:y,timerType:b}=g;s.delete(h),b==="interval"?e.delete(y):n.delete(y)}else{const{error:{message:h}}=p;throw new Error(h)}}),{clearInterval:p=>{const h=Mt(s);s.set(h,{timerId:p,timerType:"interval"}),e.set(p,h),r.postMessage({id:h,method:"clear",params:{timerId:p,timerType:"interval"}})},clearTimeout:p=>{const h=Mt(s);s.set(h,{timerId:p,timerType:"timeout"}),n.set(p,h),r.postMessage({id:h,method:"clear",params:{timerId:p,timerType:"timeout"}})},setInterval:(p,h)=>{const g=Mt(e);return e.set(g,()=>{p(),typeof e.get(g)=="function"&&r.postMessage({id:null,method:"set",params:{delay:h,now:performance.now(),timerId:g,timerType:"interval"}})}),r.postMessage({id:null,method:"set",params:{delay:h,now:performance.now(),timerId:g,timerType:"interval"}}),g},setTimeout:(p,h)=>{const g=Mt(n);return n.set(g,p),r.postMessage({id:null,method:"set",params:{delay:h,now:performance.now(),timerId:g,timerType:"timeout"}}),g}}},`(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error('The given type "'.concat(i,'" is not supported'));(e=>{const r=t.get(e);if(void 0===r)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error('The given method "'.concat(s.method,'" is not supported'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error('The given type "'.concat(d,'" is not supported'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();`),de=t=>fe().clearInterval(t),he=(t,e)=>fe().setInterval(t,e),[yn,me]=J(0);class $n{intervalId;get time(){return yn()}tick(){me(e=>e+1e3)}start(){this.intervalId&&(de(this.intervalId),me(0)),this.intervalId=he(()=>this.tick(),1e3)}}const pe=new $n,wn=".btn-success",Tn="Submit Rating",[bn,vn]=J([]);function Sn(){const t=[],e=Array.from(document.querySelectorAll(wn));for(const n of e)n instanceof HTMLButtonElement&&n.textContent===Tn&&t.push(n);return vn(t),t}function Mn(){return{findSubmitButtons:Sn,get submitButtons(){return bn()}}}const[ge,ye]=J(0);class kn{intervalId;onEndCallback;onTickTimer(){const e=ge()-1e3;ye(e),e===0&&(this.onEndCallback(),this.stop())}get time(){return ge()}onTimerEnd(e){this.onEndCallback=e}start(e){this.stop(),ye(e),this.intervalId=he(()=>this.onTickTimer(),1e3)}stop(){this.intervalId&&(de(this.intervalId),this.intervalId=null)}}const Ut=new kn;function $e(t){const e=te(Math.floor(t/6e4)),n=te(Number((t%6e4/1e3).toFixed(0)));return`${e}:${n}`}const Ln="",En=Ot('<div class="tryrating-widget"><div>Timer: </div><div>Stopwatch: '),{autosubmit:On}=Ft(),{findSubmitButtons:we}=Mn();Ut.onTimerEnd(()=>{if(!On)return;const t=we();if(!t.length){q.error("Submit button is not defined");return}t[0].click()}),St.onChangeTask(t=>{we();const e=oe(t.estimatedRatingTime);Ut.start(e),pe.start()});const Dn=()=>{const t=ot(()=>$e(Ut.time)),e=ot(()=>$e(pe.time));return at(en,{get children(){const n=En(),s=n.firstChild;s.firstChild;const r=s.nextSibling;return r.firstChild,tt(s,t,null),tt(r,e,null),tt(n,at(Ke,{}),null),tt(n,at(Je,{}),null),n}})};fn(),sn(),Ae(()=>at(Dn,{}),document.body),GM_addStyle(".tryrating-widget{display:flex;color:#fff;padding-left:4px;position:absolute;z-index:9999999;background:#2e2c2f;font-size:1rem;font-weight:600;align-items:center;left:0;bottom:0;height:40px;justify-content:center}.tryrating-widget>div{padding:10px}.tryrating-widget>button{height:inherit;border:none;font-size:inherit;font-weight:inherit;background:#2e2c2f;color:#fff}")})();
