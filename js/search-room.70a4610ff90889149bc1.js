(()=>{"use strict";var t,e={938:(t,e,s)=>{function i(t,e){if(t>10&&t<20)return e[2];switch(t%10){case 1:return e[0];case 2:case 3:case 4:return e[1];default:return e[2]}}function n(t,e="",s="ru"){return`${t.toLocaleString(s)}${e}`}function o(t,e){return Number(t.toFixed(e))}function h(t,e,s,i=12){if(e<0)throw new Error("Step can't be less than zero");const n=t-s;if(n%e==0)return t;let h=Math.trunc(n/e)*e+s;h=o(h,i);const a=t-h;let r=(Math.trunc(n/e)+1)*e+s;return r=o(r,i),a<r-t?h:r}s.d(e,{nK:()=>i,R3:()=>n,V9:()=>h})},140:(t,e,s)=>{var i=s(755),n=s.n(i);const o=".js-menu__item",h="menu__item_active";class a{constructor(t){this.$component=t,this.$items=t.children(),this.items=Array.from(this.$items)}init(){this._handleItemMouseDown=this._handleItemMouseDown.bind(this),this._handleOutOfComponentMouseDown=this._handleOutOfComponentMouseDown.bind(this),this._attachEventHandlers()}_attachEventHandlers(){this.$items.each(((t,e)=>{n()(e).on("mousedown",this._handleItemMouseDown)})),n()(document).on("mousedown",this._handleOutOfComponentMouseDown)}_handleItemMouseDown({target:t}){const e=n()(t).closest(o),s=e.hasClass(h);this._isTopmostItem(e)&&this._setAllItemsInactive(),s?a.setItemInactive(e):e.addClass(h)}_handleOutOfComponentMouseDown({target:t}){const{$component:e}=this;0===e.has(t).length&&this._setAllItemsInactive()}_isTopmostItem(t){const[e]=t;return this.items.some((t=>t===e))}_setAllItemsInactive(){this.$items.each(((t,e)=>{const s=n()(e);a.setItemInactive(s)}))}static setItemInactive(t){t.removeClass(h),n()(o,t).removeClass(h)}}const r=a;n()((()=>{n()(".js-menu").each(((t,e)=>{const s=n()(e);new r(s).init()}))}));n()((()=>{n()(".js-header").each(((t,e)=>{const s=n()(e);new class{constructor(t){this.$component=t,this.$burgerButton=n()(".js-header__burger",t),this.$info=n()(".js-header__info",t)}init(){this._handleBurgerButtonClick=this._handleBurgerButtonClick.bind(this),this._attachEventHandlers()}_attachEventHandlers(){const{$burgerButton:t}=this;t.on("click",this._handleBurgerButtonClick)}_handleBurgerButtonClick(){const{$burgerButton:t,$info:e}=this;t.toggleClass("header__burger_active"),e.toggleClass("header__info_mobile-expanded")}}(s).init()}))})),s(729),s(177),s(623);var l=s(938);const u="range-slider__thumb_z-index_above";n()((()=>{n()(".js-range-slider").each(((t,e)=>{const s=n()(e);new class{constructor(t){this.$component=t,this.postfix=t.attr("data-postfix"),this.min=Number(t.attr("data-min")),this.max=Number(t.attr("data-max")),this.step=Number(t.attr("data-step")),this.percentStep=this.step/(this.max-this.min)*100,this.$output=n()(".js-range-slider__output",t),this.$progress=n()(".js-range-slider__progress",t),this.$track=n()(".js-range-slider__track",t)}init(){const{$component:t}=this,e=Array.from(n()(".js-range-slider__thumb",t));[this.$leftThumb,this.$rightThumb]=e.map((t=>n()(t)));const s=Number(t.attr("data-from")),i=Number(t.attr("data-to"));this._setPosition(this._valueToPosition(s),!0),this._setPosition(this._valueToPosition(i),!1),this._update(),this._handleThumbPointerDown=this._handleThumbPointerDown.bind(this),this._attachEventHandlers()}_attachEventHandlers(){this.$leftThumb.on("pointerdown",this._handleThumbPointerDown),this.$rightThumb.on("pointerdown",this._handleThumbPointerDown),this.$leftThumb[0].ondragstart=null,this.$rightThumb[0].ondragstart=null}_handleThumbPointerDown(t){const e=t.target,s=this._isLeftThumb(e);this._moveThumbTo(s,t);const i=t=>{this._moveThumbTo(s,t)},n=()=>{document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",n)};document.addEventListener("pointermove",i),document.addEventListener("pointerup",n)}_moveThumbTo(t,e){const s=this._getPosition(!0),i=this._getPosition(!1),n=t?s:i,o=t?i:s;let h=this._calcNearestPosition(e);const a=(t&&h>o||!t&&h<o)&&n!==o;a&&(h=o),(a||t?h<=o:h>=o)&&h!==n&&(this._setPosition(h,t),this._update())}_calcNearestPosition(t){const[e]=this.$track,s=e.getBoundingClientRect(),{clientX:i}=t,{left:n,width:o}=s;let h=(i-n)/o*100;return h=Math.max(h,0),h=Math.min(h,100),(0,l.V9)(h,this.percentStep,0)}_update(){this._updateZIndexes(),this._updateOutput(),this._updateProgress()}_updateZIndexes(){this.positionRight===this.positionLeft&&(100===this.positionLeft?(this.$leftThumb.addClass(u),this.$rightThumb.removeClass(u)):0===this.positionLeft&&(this.$leftThumb.removeClass(u),this.$rightThumb.addClass(u)))}_updateOutput(){const{postfix:t}=this,e=this._getValue(!0),s=this._getValue(!1),i=(0,l.R3)(e,t),n=(0,l.R3)(s,t);this.$output.html(`${i} - ${n}`)}_updateProgress(){const t=this._getPosition(!0),e=this._getPosition(!1),s=Math.abs(t-e),{$progress:i}=this;i.css("width",`${s}%`),i.css("left",`${t}%`)}_isLeftThumb(t){const{$leftThumb:e}=this;return t===e[0]}_getValue(t){return this._positionToValue(this._getPosition(t))}_getPosition(t){const{positionLeft:e,positionRight:s}=this;return t?e:s}_setPosition(t,e){const{$leftThumb:s,$rightThumb:i}=this;e?(this.positionLeft=t,s.css("left",`${t}%`)):(this.positionRight=t,i.css("left",`${t}%`))}_positionToValue(t){const{max:e,min:s}=this;return Math.round((e-s)*t/100+s)}_valueToPosition(t){const{max:e,min:s}=this;return(t-s)/(e-s)*100}}(s).init()}))}));n()((()=>{n()(".js-checkbox-list").each(((t,e)=>{const s=n()(e);new class{constructor(t){this.$component=t,this.$button=n()(".js-checkbox-list__button",t)}init(){this._handleButtonClick=this._handleButtonClick.bind(this),this._attachEventHandlers()}_attachEventHandlers(){const{$button:t}=this;t.on("click",this._handleButtonClick)}_handleButtonClick(){const{$component:t}=this;t.toggleClass("checkbox-list_open")}}(s).init()}))})),s(291);n()((()=>{n()(".js-room-thumbnail").each(((t,e)=>{const s=n()(e);new class{constructor(t){this.$component=t,this.selected=Number(t.attr("data-selected")),this.$prev=n()(".js-room-thumbnail__prev",t),this.$next=n()(".js-room-thumbnail__next",t)}init(){const{$component:t,selected:e}=this;this.images=Array.from(n()(".js-room-thumbnail__image",t)).map((t=>n()(t))),this.buttons=Array.from(n()(".js-room-thumbnail__button",t)).map((t=>n()(t))),this._selectImage(e),this._handlePrevClick=this._handlePrevClick.bind(this),this._handleNextClick=this._handleNextClick.bind(this),this._handleButtonClick=this._handleButtonClick.bind(this),this._attachEventHandlers()}_attachEventHandlers(){const{$prev:t,$next:e,buttons:s}=this;t.on("click",this._handlePrevClick),e.on("click",this._handleNextClick),s.forEach((t=>{t.on("click",this._handleButtonClick)}))}_handlePrevClick(){const{selected:t,images:e}=this,s=0===t?e.length-1:t-1;this._selectImage(s)}_handleNextClick(){const{selected:t,images:e}=this,s=(t+1)%e.length;this._selectImage(s)}_handleButtonClick({target:t}){const e=this._getButtonIndex(t);this._selectImage(e)}_getButtonIndex(t){const{buttons:e}=this;return e.findIndex((e=>e.is(t)))}_selectImage(t){const{images:e,buttons:s}=this;this._setSelected(e,t,"room-thumbnail__image_selected"),this._setSelected(s,t,"room-thumbnail__button_selected"),this.selected=t}_setSelected(t,e,s){if(0===t.length)return;const{selected:i}=this;t[i].removeClass(s),t[e].addClass(s)}}(s).init()}))}));n()((()=>{n()(".js-pagination").each(((t,e)=>{const s=n()(e);new class{constructor(t){this.$component=t,this.itemsCounter=Number(t.attr("data-items-counter")),this.itemsPerPage=Number(t.attr("data-items-per-page")),this.pagesCounter=Math.ceil(this.itemsCounter/this.itemsPerPage),this.postfix=t.attr("data-postfix"),this.buttons=Array.from(n()(".js-pagination__number",t)).map((t=>n()(t))),this.$prev=n()(".js-pagination__prev",t),this.$next=n()(".js-pagination__next",t),this.$text=n()(".js-pagination__text",t)}init(){const{$component:t}=this;this.pageNumber=0;const e=Number(t.attr("data-init-state"));this._updateState(e),this._handlePrevButtonClick=this._handlePrevButtonClick.bind(this),this._handleNextButtonClick=this._handleNextButtonClick.bind(this),this._handleNumberButtonClick=this._handleNumberButtonClick.bind(this),this._attachEventHandlers()}_attachEventHandlers(){const{$prev:t,$next:e,buttons:s}=this;t.on("click",this._handlePrevButtonClick),e.on("click",this._handleNextButtonClick),s.forEach((t=>{t.on("click",this._handleNumberButtonClick)}))}_handleNumberButtonClick({target:t}){const e=n()(t).html();"..."!==e&&this._updateState(Number(e))}_handlePrevButtonClick(){const{pageNumber:t}=this;this._updateState(t-1)}_handleNextButtonClick(){const{pageNumber:t}=this;this._updateState(t+1)}_setButtons(t){const{buttons:e}=this;e.forEach(((e,s)=>{s<t.length?(e.html(t[s]),e.show()):e.hide()}))}_toggleButtonSelection(t){const{buttons:e}=this,s=e.find((e=>e.html()===String(t)));s&&s.toggleClass("pagination__number_current")}_updateButtons(t){this._toggleButtonSelection(this.pageNumber),this._setButtons(this._calcButtonsTexts(t)),this._toggleButtonSelection(t);const{$prev:e,$next:s,pagesCounter:i}=this;1===t?(e.hide(),s.show()):t===i?(s.hide(),e.show()):(s.show(),e.show()),this.pageNumber=t}_updateText(t){const{itemsPerPage:e,itemsCounter:s,postfix:i}=this,n=(t-1)*e+1,o=Math.min(n+e-1,s),h=Math.trunc(Math.log10(s));this.$text.html(`${n} – ${o} из ${10**h}+ ${i}`)}_updateState(t){const{pageNumber:e}=this;e!==t&&(this._updateButtons(t),this._updateText(t))}_calcButtonsTexts(t,e=1){const{pagesCounter:s}=this,i=[],n=2*e+1;if(t-e<=1)for(let t=1;t<=this.pagesCounter&&t<=n;t+=1)i.push(t);else if(t+e>=s)for(let t=s;t>=1&&t>s-n;t-=1)i.unshift(t);else for(let s=t-e;s<=t+e;s+=1)i.push(s);if(s-i[i.length-1]>2)i.push("...",s);else for(let t=i[i.length-1]+1;t<=s;t+=1)i.push(t);if(i[0]-1>2)i.unshift(1,"...");else for(let t=i[0]-1;t>=1;t-=1)i.unshift(t);return i.map((t=>String(t)))}}(s).init()}))}))}},s={};function i(t){var n=s[t];if(void 0!==n)return n.exports;var o=s[t]={exports:{}};return e[t].call(o.exports,o,o.exports,i),o.exports}i.m=e,t=[],i.O=(e,s,n,o)=>{if(!s){var h=1/0;for(u=0;u<t.length;u++){for(var[s,n,o]=t[u],a=!0,r=0;r<s.length;r++)(!1&o||h>=o)&&Object.keys(i.O).every((t=>i.O[t](s[r])))?s.splice(r--,1):(a=!1,o<h&&(h=o));if(a){t.splice(u--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[s,n,o]},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={769:0,427:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var n,o,[h,a,r]=s,l=0;if(h.some((e=>0!==t[e]))){for(n in a)i.o(a,n)&&(i.m[n]=a[n]);if(r)var u=r(i)}for(e&&e(s);l<h.length;l++)o=h[l],i.o(t,o)&&t[o]&&t[o][0](),t[h[l]]=0;return i.O(u)},s=self.webpackChunktoxin=self.webpackChunktoxin||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var n=i.O(void 0,[815,590,326,427],(()=>i(140)));n=i.O(n)})();