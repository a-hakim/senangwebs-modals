!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SWM=e():t.SWM=e()}(this,(()=>{return t={992:function(t,e){var n,o;"undefined"!=typeof self&&self,void 0===(o="function"==typeof(n=function(){function t(t){var e=document.createElement("div");e.className="swm-modal-overlay";var n=t.bgColor||"#000000",o=parseFloat(t.bgOpacity||"0.5");e.style.setProperty("--swm-bg-color",function(t,e){t=t.replace("#","");var n=parseInt(t.substring(0,2),16),o=parseInt(t.substring(2,4),16),a=parseInt(t.substring(4,6),16);return"rgba(".concat(n,", ").concat(o,", ").concat(a,", ").concat(e,")")}(n,o)),e.style.setProperty("--swm-bg-blur","".concat(t.bgBlur||0,"px")),e.style.setProperty("--swm-z-index",t.zIndex||"1000");var a=document.createElement("div");a.className="swm-modal",a.innerHTML='\n          <div class="swm-modal-header">\n              <h2 class="swm-modal-title">'.concat(t.title||"",'</h2>\n              <button class="swm-modal-close">&times;</button>\n          </div>\n          <div class="swm-modal-body">').concat(t.content||"","</div>\n          ").concat(t.footer?'<div class="swm-modal-footer">'.concat(t.footer,"</div>"):"","\n      ");var r={"top left":{alignItems:"flex-start",justifyContent:"flex-start",padding:"20px"},"top right":{alignItems:"flex-start",justifyContent:"flex-end",padding:"20px"},"bottom left":{alignItems:"flex-end",justifyContent:"flex-start",padding:"20px"},"bottom right":{alignItems:"flex-end",justifyContent:"flex-end",padding:"20px"},center:{alignItems:"center",justifyContent:"center"},top:{alignItems:"flex-start",justifyContent:"center",padding:"20px 0"},bottom:{alignItems:"flex-end",justifyContent:"center",padding:"20px 0"},left:{alignItems:"center",justifyContent:"flex-start",padding:"0 20px"},right:{alignItems:"center",justifyContent:"flex-end",padding:"0 20px"}},s=r[t.position]||r.center;function i(){e.classList.add("swm-closing"),a.classList.add("swm-closing");var t=function(){document.body.removeChild(e),e.removeEventListener("animationend",t)};e.addEventListener("animationend",t)}return Object.assign(e.style,s),e.appendChild(a),document.body.appendChild(e),a.querySelector(".swm-modal-close").addEventListener("click",i),e.addEventListener("click",(function(t){t.target===e&&i()})),{modalOverlay:e,modal:a,closeModal:i}}return document.addEventListener("click",(function(e){var n=e.target.closest("[data-swm-btn]");if(n){var o=n.closest("[data-swm]");t({title:n.getAttribute("data-swm-title")||"",content:o.querySelector("[data-swm-body]").innerHTML,footer:n.getAttribute("data-swm-footer")||"",position:n.getAttribute("data-swm-position")||"center",bgColor:n.getAttribute("data-swm-bg-color")||"#000000",bgOpacity:n.getAttribute("data-swm-bg-opacity")||"0.5",bgBlur:n.getAttribute("data-swm-bg-blur")||"0",zIndex:n.getAttribute("data-swm-z-index")||"1000"})}})),{openModal:function(t){var e=document.querySelector(t);if(e){var n=e.querySelector("[data-swm-btn]");n?n.click():console.error("No trigger button found in modal with selector: ".concat(t))}else console.error("No modal found with selector: ".concat(t))},createModal:function(e){return t(e)}}})?n.apply(e,[]):n)||(t.exports=o)}},e={},function n(o){var a=e[o];if(void 0!==a)return a.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,n),r.exports}(992);var t,e}));