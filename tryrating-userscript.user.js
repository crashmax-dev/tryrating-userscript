// ==UserScript==
// @name        tryrating-userscript
// @version     1.0.1
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

var __defProp=Object.defineProperty,__defNormalProp=(d,o,m)=>o in d?__defProp(d,o,{enumerable:!0,configurable:!0,writable:!0,value:m}):d[o]=m,__publicField=(d,o,m)=>(__defNormalProp(d,typeof o!="symbol"?o+"":o,m),m);(function(){"use strict";async function d(e=1e3){return new Promise(t=>setTimeout(t,e))}function o(e,t,...s){const r=document.createElement(e);return typeof t=="string"?r.append(m(t)):Array.isArray(t)?s.unshift(...t):(Object.assign(r,t),Object.assign(r.style,t?.style)),s.length&&r.append(...s),r}function m(e){return document.createTextNode(e)}const p=1e3,T=p*60,g=T*60,h=g*24,O=h*7,L=h*365.25;function k(e,t){try{if(typeof e=="string"&&e.length>0)return N(e);if(typeof e=="number"&&isFinite(e))return t?.long?$(e):B(e);throw new Error("Value is not a string or number.")}catch(s){const r=U(s)?`${s.message}. value=${JSON.stringify(e)}`:"An unknown error has occured.";throw new Error(r)}}function N(e){if(e=String(e),e.length>100)throw new Error("Value exceeds the maximum length of 100 characters.");const t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!t)return NaN;const s=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return s*L;case"weeks":case"week":case"w":return s*O;case"days":case"day":case"d":return s*h;case"hours":case"hour":case"hrs":case"hr":case"h":return s*g;case"minutes":case"minute":case"mins":case"min":case"m":return s*T;case"seconds":case"second":case"secs":case"sec":case"s":return s*p;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return s;default:throw new Error(`The unit ${r} was matched, but no matching case exists.`)}}function B(e){const t=Math.abs(e);return t>=h?`${Math.round(e/h)}d`:t>=g?`${Math.round(e/g)}h`:t>=T?`${Math.round(e/T)}m`:t>=p?`${Math.round(e/p)}s`:`${e}ms`}function $(e){const t=Math.abs(e);return t>=h?b(e,t,h,"day"):t>=g?b(e,t,g,"hour"):t>=T?b(e,t,T,"minute"):t>=p?b(e,t,p,"second"):`${e} ms`}function b(e,t,s,r){const n=t>=s*1.5;return`${Math.round(e/s)} ${r}${n?"s":""}`}function U(e){return typeof e=="object"&&e!==null&&"message"in e}class W{constructor(t){this.storage=t}download(){const t=this.storage.read();if(!t.length){alert("\u041D\u0435\u0442\u0443 \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0430.");return}const s=new Date,r=new Intl.DateTimeFormat("ru-RU",{timeZone:"UTC",timeZoneName:"short"}),n=o("table",{border:"1"}),w=o("caption"),E=o("tr",[o("th","Task Type"),o("th","Estimated Rating Time")]);n.append(w,E);let f=0;for(const{type:i,estimated:a}of t){f+=a;const u=o("tr",[o("td",i),o("td",k(a,{long:!0}))]);n.append(u)}w.textContent=`Tasks ${r.format(s)} (${k(f,{long:!0})})`;const x=new Blob([n.outerHTML],{type:"text/html"});o("a",{href:URL.createObjectURL(x),download:`tryrating-com-${s.toISOString()}.html`}).click()}}const q=".survey-meta-fields",D=".labeled-attribute__attribute",M={selector:".btn-success",text:"Submit Rating"},G=".modal-container.visible",v="tryrating-storage";function P(){const e=[],t=Array.from(document.querySelectorAll(M.selector));for(const s of t)s instanceof HTMLButtonElement&&s.textContent===M.text&&e.push(s);return e}function V(){return document.querySelector(G)}function _(e){return e.split(/\s(?=\d)/).reduce((s,r)=>(s+=k(r),s),0)}class j{constructor(){__publicField(this,"tasks",[]),this.read(),console.log("storage",this.tasks)}get values(){return this.tasks}reset(){this.tasks=[],GM_setValue(v,this.tasks)}read(){return this.tasks=GM_getValue(v,[]),this.tasks}write(t){this.tasks.push(t),GM_setValue(v,this.tasks)}}const z=e=>(t,s)=>(e.set(t,s),s),I=Number.MAX_SAFE_INTEGER===void 0?9007199254740991:Number.MAX_SAFE_INTEGER,C=536870912,F=C*2,H=(e,t)=>s=>{const r=t.get(s);let n=r===void 0?s.size:r<F?r+1:0;if(!s.has(n))return e(s,n);if(s.size<C){for(;s.has(n);)n=Math.floor(Math.random()*F);return e(s,n)}if(s.size>I)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;s.has(n);)n=Math.floor(Math.random()*I);return e(s,n)},S=new WeakMap,Y=z(S),y=H(Y,S),K=e=>e.method!==void 0&&e.method==="call",X=e=>e.error===null&&typeof e.id=="number",R=((e,t)=>{let s=null;return()=>{if(s!==null)return s;const r=new Blob([t],{type:"application/javascript; charset=utf-8"}),n=URL.createObjectURL(r);return s=e(n),setTimeout(()=>URL.revokeObjectURL(n)),s}})(e=>{const t=new Map([[0,()=>{}]]),s=new Map([[0,()=>{}]]),r=new Map,n=new Worker(e);return n.addEventListener("message",({data:c})=>{if(K(c)){const{params:{timerId:i,timerType:a}}=c;if(a==="interval"){const u=t.get(i);if(typeof u=="number"){const l=r.get(u);if(l===void 0||l.timerId!==i||l.timerType!==a)throw new Error("The timer is in an undefined state.")}else if(typeof u<"u")u();else throw new Error("The timer is in an undefined state.")}else if(a==="timeout"){const u=s.get(i);if(typeof u=="number"){const l=r.get(u);if(l===void 0||l.timerId!==i||l.timerType!==a)throw new Error("The timer is in an undefined state.")}else if(typeof u<"u")u(),s.delete(i);else throw new Error("The timer is in an undefined state.")}}else if(X(c)){const{id:i}=c,a=r.get(i);if(a===void 0)throw new Error("The timer is in an undefined state.");const{timerId:u,timerType:l}=a;r.delete(i),l==="interval"?t.delete(u):s.delete(u)}else{const{error:{message:i}}=c;throw new Error(i)}}),{clearInterval:c=>{const i=y(r);r.set(i,{timerId:c,timerType:"interval"}),t.set(c,i),n.postMessage({id:i,method:"clear",params:{timerId:c,timerType:"interval"}})},clearTimeout:c=>{const i=y(r);r.set(i,{timerId:c,timerType:"timeout"}),s.set(c,i),n.postMessage({id:i,method:"clear",params:{timerId:c,timerType:"timeout"}})},setInterval:(c,i)=>{const a=y(t);return t.set(a,()=>{c(),typeof t.get(a)=="function"&&n.postMessage({id:null,method:"set",params:{delay:i,now:performance.now(),timerId:a,timerType:"interval"}})}),n.postMessage({id:null,method:"set",params:{delay:i,now:performance.now(),timerId:a,timerType:"interval"}}),a},setTimeout:(c,i)=>{const a=y(s);return s.set(a,c),n.postMessage({id:null,method:"set",params:{delay:i,now:performance.now(),timerId:a,timerType:"timeout"}}),a}}},`(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error('There is no interval scheduled with the given id "'.concat(t,'".'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error('The given type "'.concat(i,'" is not supported'));(e=>{const r=t.get(e);if(void 0===r)throw new Error('There is no timeout scheduled with the given id "'.concat(e,'".'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error('The given method "'.concat(s.method,'" is not supported'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error('The given type "'.concat(d,'" is not supported'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();`),Z=e=>R().clearInterval(e),A=(e,t)=>R().setInterval(e,t);class J{constructor(){__publicField(this,"taskFields",null),__publicField(this,"onChangeTaskCallback",null)}get values(){return this.taskFields}init(){A(()=>this.getTaskFields(),5e3)}onChangeTask(t){this.onChangeTaskCallback=t}getTaskFields(){var t;const s=document.querySelector(q);if(!s)return;const r=Array.from(s.querySelectorAll(D));if(!r.length)return;const[n,w,E]=r,f={taskType:n.textContent,requestId:w.textContent,estimatedRatingTime:E.textContent.trim()};f.requestId!==((t=this.taskFields)==null?void 0:t.requestId)&&this.onChangeTaskCallback(f),this.taskFields=f}}class Q{constructor(){__publicField(this,"intervalId"),__publicField(this,"ms",0),__publicField(this,"onTickCallback"),__publicField(this,"onEndCallback")}onTimerTick(t){this.onTickCallback=t}onTimerEnd(t){this.onEndCallback=t}onTickTimer(){this.ms-=1e3;const t=k(this.ms,{long:!0});this.onTickCallback(t),this.ms===0&&(this.onEndCallback(),this.stop())}start(t){this.stop(),this.ms=t,this.intervalId=A(()=>this.onTickTimer(),1e3)}stop(){this.intervalId&&(Z(this.intervalId),this.intervalId=null)}}class tt{constructor(t){__publicField(this,"timer"),__publicField(this,"taskCounter"),this.storage=t}init(){const t=o("div",{className:"tryrating-container"});this.taskCounter=o("span"),this.timer=o("span"),t.append(this.timer,this.taskCounter),document.body.appendChild(t),this.renderTaskCounter()}renderTime(t){this.timer.textContent=`Time: ${t}`}renderTaskCounter(){this.taskCounter.textContent=`Tasks: ${this.storage.values.length}`}}const ot="";class et{constructor(t){__publicField(this,"backuper"),__publicField(this,"ui"),__publicField(this,"timer"),__publicField(this,"taskFieldsWatcher"),__publicField(this,"submitted",!1),__publicField(this,"submitButtons",[]),__publicField(this,"taskFields",null),__publicField(this,"onSubmitEvent"),this.storage=t,this.onSubmitEvent=this.writeSubmittedTask.bind(this)}init(){this.backuper=new W(this.storage),this.ui=new tt(this.storage),this.ui.init(),this.timer=new Q,this.timer.onTimerTick(t=>this.ui.renderTime(t)),this.timer.onTimerEnd(async()=>{if(!this.submitButtons.length){console.error("submitButton is not defined");return}if(this.submitButtons[0].click(),await d(1e3),V()){GM_notification({title:"\u041E\u0442\u043A\u0440\u044B\u043B\u043E\u0441\u044C \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E",highlight:!0,silent:!1,timeout:0}),this.addSubmitListeners();return}this.writeSubmittedTask()}),this.taskFieldsWatcher=new J,this.taskFieldsWatcher.init(),this.taskFieldsWatcher.onChangeTask(t=>{this.removeSubmitListeners(),this.submitted=!1,this.taskFields=t,this.submitButtons=P();const s=_(this.taskFields.estimatedRatingTime);this.timer.start(s)}),window.addEventListener("keydown",t=>{t.altKey&&t.key==="1"&&(t.preventDefault(),this.backuper.download()),t.altKey&&t.key==="2"&&(t.preventDefault(),confirm(`Reset data.
Are you sure?`)&&this.storage.reset())})}writeSubmittedTask(){if(!this.taskFields){console.error("taskFields is not defined");return}if(this.submitted){console.info("current task is submitted",this.taskFields);return}this.submitted=!0,this.storage.write({type:this.taskFields.taskType,estimated:_(this.taskFields.estimatedRatingTime)}),this.ui.renderTaskCounter()}addSubmitListeners(){for(const t of this.submitButtons)t.addEventListener("click",this.onSubmitEvent)}removeSubmitListeners(){for(const t of this.submitButtons)t.removeEventListener("click",this.onSubmitEvent)}}const st=new j;new et(st).init(),GM_addStyle(".tryrating-container{display:flex;align-items:center;flex-direction:column;gap:1rem;text-align:center;position:absolute;z-index:9999999;background:#2e2c2f;font-size:1rem;font-weight:600;color:#fff;width:75px;bottom:12%;padding:4px}")})();
