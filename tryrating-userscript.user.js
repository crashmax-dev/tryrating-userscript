// ==UserScript==
// @name        tryrating-userscript
// @version     0.0.2
// @author      crashmax <userscript@crashmax.ru>
// @license     MIT
// @homepage    https://crashmax-dev.github.io/tryrating-userscript/
// @match       https://www.tryrating.com/app/survey/*
// @grant       GM_addStyle
// @updateURL   https://crashmax-dev.github.io/tryrating-userscript/tryrating-userscript.meta.js
// @downloadURL https://crashmax-dev.github.io/tryrating-userscript/tryrating-userscript.user.js
// ==/UserScript==

(function(){"use strict";function n(c,t,...r){const e=document.createElement(c);return typeof t=="string"?e.append(o(t)):Array.isArray(t)?r.unshift(...t):(Object.assign(e,t),Object.assign(e.style,t?.style)),r.length&&e.append(...r),e}function o(c){return document.createTextNode(c)}const s="",a=n("div",{className:"card"},n("h1",{className:"title"},"Hello World"),n("p","Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur, ipsa."),n("a",{href:"https://google.com",target:"_blank"},"Link"));document.body.appendChild(a),GM_addStyle(".card{color:#fff;background-color:#333}.card .title{text-decoration:underline}.card a{color:#637fff}")})();
