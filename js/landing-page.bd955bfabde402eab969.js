(()=>{"use strict";var t,e={74:(t,e,s)=>{var n=s(755),i=s.n(n);const a=".js-menu__item",o="menu__item_active";class r{constructor(t){this.$component=t,this.$items=t.children(),this.items=Array.from(this.$items)}init(){this._handleItemMouseDown=this._handleItemMouseDown.bind(this),this._handleOutOfComponentMouseDown=this._handleOutOfComponentMouseDown.bind(this),this._attachEventHandlers()}_attachEventHandlers(){this.$items.each(((t,e)=>{i()(e).on("mousedown",this._handleItemMouseDown)})),i()(document).on("mousedown",this._handleOutOfComponentMouseDown)}_handleItemMouseDown({target:t}){const e=i()(t).closest(a),s=e.hasClass(o);this._isTopmostItem(e)&&this._setAllItemsInactive(),s?r.setItemInactive(e):e.addClass(o)}_handleOutOfComponentMouseDown({target:t}){const{$component:e}=this;0===e.has(t).length&&this._setAllItemsInactive()}_isTopmostItem(t){const[e]=t;return this.items.some((t=>t===e))}_setAllItemsInactive(){this.$items.each(((t,e)=>{const s=i()(e);r.setItemInactive(s)}))}static setItemInactive(t){t.removeClass(o),i()(a,t).removeClass(o)}}const l=r;i()((()=>{i()(".js-menu").each(((t,e)=>{const s=i()(e);new l(s).init()}))}));i()((()=>{i()(".js-header").each(((t,e)=>{const s=i()(e);new class{constructor(t){this.$component=t,this.$burgerButton=i()(".js-header__burger",t),this.$info=i()(".js-header__info",t)}init(){this._handleBurgerButtonClick=this._handleBurgerButtonClick.bind(this),this._attachEventHandlers()}_attachEventHandlers(){const{$burgerButton:t}=this;t.on("click",this._handleBurgerButtonClick)}_handleBurgerButtonClick(){const{$burgerButton:t,$info:e}=this;t.toggleClass("header__burger_active"),e.toggleClass("header__info_mobile-expanded")}}(s).init()}))}));var c=s(382),h=s.n(c);i()((()=>{i()(".js-text-field__input").each(((t,e)=>{const s=i()(e),n=s.attr("placeholder");new class{constructor({$input:t,inputFormat:e,placeholder:s}){const n={alias:"datetime",inputFormat:e,placeholder:s};this.outsideInputmask=new(h())(n),this.$input=t}init(){const{outsideInputmask:t,$input:e}=this;t.mask(e)}}({$input:s,inputFormat:"dd.mm.yyyy",placeholder:n}).init()}))}));const u="backgrounds__image_visible",d="backgrounds__image_animation_fade";i()((()=>{i()(".js-backgrounds").each(((t,e)=>{const s=i()(e);new class{constructor(t){this.$component=t,this.delay=Number(t.attr("data-delay")),this.delayMS=1e3*this.delay,this.duration=Number(t.attr("data-duration")),this.durationMS=1e3*this.duration}init(){const t=i()(".js-backgrounds__image",this.$component);this.images=Array.from(t).map((t=>i()(t))),this._setImageVisibility(0,!0),this._setImagesAnimationDuration(),t.length>1&&this._startAnimationLoop()}async _startAnimationLoop(){const{images:{length:t},delayMS:e}=this;this.imageIndex=0,this.nextImageIndex=1,setInterval((async()=>{const{nextImageIndex:e,imageIndex:s}=this;this._setImageZIndex(s,-1),this._setImageZIndex(e,-2),this._setImageVisibility(e,!0),this._playImageAnimation(s),await this._stopImageAnimation(s),this.imageIndex=e,this.nextImageIndex=(e+1)%t}),e)}_setImageVisibility(t,e){const{images:s}=this;e?s[t].addClass(u):s[t].removeClass(u)}_setImagesAnimationDuration(){const{images:t,duration:e}=this;t.forEach((t=>{t.css("animation-duration",`${e}s`)}))}_setImageZIndex(t,e){const{images:s}=this;s[t].css("z-index",e)}_playImageAnimation(t){const{images:e}=this;e[t].addClass(d)}async _stopImageAnimation(t){const{images:e,durationMS:s}=this;setTimeout((()=>{e[t].removeClass(d),e[t].removeClass(u)}),s)}}(s).init()}))}));const _=".js-dropdown__button-minus",m=".js-dropdown__counter",p="dropdown_open",C="dropdown__button-minus_active",g="dropdown__button-plus_active",b="data-row-countables",$=class{constructor(t){this.$component=t,this.valueChanged=t.attr("data-value-changed"),this.$inputBox=i()(".js-dropdown__input-box",t),this.$content=i()(".js-dropdown__content",t)}init(){this._handleOutOfComponentClick=this._handleOutOfComponentClick.bind(this),this._handleInputBoxClick=this._handleInputBoxClick.bind(this),this._attachEventHandlers()}_attachEventHandlers(){const{$inputBox:t}=this;i()(document).on("click",this._handleOutOfComponentClick),t.on("click",this._handleInputBoxClick)}_handleOutOfComponentClick({target:t}){const{$component:e}=this;0===e.has(t).length&&e.removeClass(p)}_handleInputBoxClick(){const{$component:t}=this;t.toggleClass(p)}_triggerValueChanged(){const{valueChanged:t}=this;t&&i()(document).trigger(t)}};function k(t,e){if(t>10&&t<20)return e[2];switch(t%10){case 1:return e[0];case 2:case 3:case 4:return e[1];default:return e[2]}}const v=class extends ${constructor(t){super(t),this.maxLen=Number(t.attr("data-max-len")),this.constraint=Number(t.attr("data-constraint")),this.hasControls=void 0!==t.has("data-has-controls"),this.$text=i()(".js-dropdown__text",t),this.rows=this._getRows()}init(){const{hasControls:t,constraint:e}=this;t&&this._initControls(),this._calcCountersSum()>e&&this._setAllCounters(0),this._handleClearButtonClick=this._handleClearButtonClick.bind(this),this._handleAcceptButtonClick=this._handleAcceptButtonClick.bind(this),this._handleMinusClick=this._handleMinusClick.bind(this),this._handlePlusClick=this._handlePlusClick.bind(this),super.init(),this._update()}_initControls(){const{$component:t}=this;this.$clear=t.find(".js-dropdown__clear-button"),this.$accept=t.find(".js-dropdown__accept-button")}_attachEventHandlers(){super._attachEventHandlers();const{hasControls:t,rows:e,$clear:s,$accept:n}=this;t&&(s.on("click",this._handleClearButtonClick),n.on("click",this._handleAcceptButtonClick)),e.forEach((t=>{t.$minus.on("click",this._handleMinusClick),t.$plus.on("click",this._handlePlusClick)}))}_handleClearButtonClick(){this._setAllCounters(0),this._update()}_handleAcceptButtonClick(){const{$component:t}=this;t.removeClass(p)}_handleMinusClick({target:t}){const e=i()(t);if(!e.hasClass(C))return;const s=e.siblings(m),n=Number(s.html());1===n&&e.removeClass(C),s.html(n-1),this._update()}_handlePlusClick({target:t}){const e=i()(t);if(!e.hasClass(g))return;const s=e.siblings(_),n=e.siblings(m),a=Number(n.html());0===a&&s.addClass(C),n.html(a+1),this._update()}_setText(t){const{maxLen:e,$text:s}=this;let n=t.substring(0,e);t.length>=e&&(n+="..."),s.val(n)}_getRows(){const{$component:t}=this;return Array.from(i()(".js-dropdown__row",t)).map((t=>{const e=i()(t),s={$minus:e.find(_),$counter:e.find(m),$plus:e.find(".js-dropdown__button-plus"),countables:null};return void 0!==e.attr(b)&&(s.countables=JSON.parse(e.attr(b))),s}))}_areAllCountersZero(){const{rows:t}=this;return t.every((t=>0===Number(t.$counter.html())))}_calcCountersSum(){const{rows:t}=this;return t.reduce(((t,e)=>t+Number(e.$counter.html())),0)}_setAllCounters(t){const{rows:e}=this;e.forEach((e=>{e.$minus.removeClass(C),e.$counter.html(t)}))}_setAllPlusesActivity(t){const{rows:e}=this;e.forEach((e=>{t?e.$plus.addClass(g):e.$plus.removeClass(g)}))}_update(){this._updateText(),this._updateValue(),this._updateClearButtonVisibility(),this._updatePlusButtonsActivity(),this._triggerValueChanged()}_updateText(){this._areAllCountersZero()?this._setText(""):this._setText(this._calcDropdownText())}_updateValue(){const{$component:t}=this;t.attr("data-value",this._calcDropdownValue())}_updateClearButtonVisibility(){const{$clear:t}=this;this._areAllCountersZero()?t.hide():t.show()}_updatePlusButtonsActivity(){const{constraint:t}=this,e=this._calcCountersSum()<t;this._setAllPlusesActivity(e)}_calcDropdownValue(){const{rows:t}=this;return t.map((t=>Number(t.$counter.html())))}_calcDropdownText(){const{rows:t}=this;return t.map((t=>{const e=Number(t.$counter.html());return 0===e?"":`${e} ${k(e,t.countables)}`})).filter((t=>""!==t)).join(", ")}},f=class extends v{constructor(t){super(t),this.countables=JSON.parse(t.attr("data-countables"))}_sumAllDropdownCountables(){return this.rows.filter((t=>null===t.countables)).reduce(((t,e)=>t+Number(e.$counter.html())),0)}_calcDropdownText(){const{rows:t,countables:e}=this,s=this._sumAllDropdownCountables();return[s?`${s} ${k(s,e)}`:"",...t.filter((t=>null!==t.countables)).map((t=>{const e=Number(t.$counter.html());return 0===e?"":`${e} ${k(e,t.countables)}`}))].filter((t=>""!==t)).join(", ")}};i()((()=>{i()(".js-dropdown").each(((t,e)=>{const s=i()(e);(function(t,e){switch(t){case"counter":return new v(e);case"summator":return new f(e);default:return new $(e)}})(s.attr("data-type"),s).init()}))}));var w=s(808);const x={days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],daysShort:["Вос","Пон","Вто","Сре","Чет","Пят","Суб"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],today:"Сегодня",clear:"Очистить",dateFormat:"dd.MM.yyyy",timeFormat:"HH:mm",firstDay:1};class y{constructor(t){this.$component=t.$component,this.texts=t.texts,this.isSplit=t.isSplit,this.triggerValueChanged=t.triggerValueChanged,this.onAcceptButtonClick=t.onAcceptButtonClick,this.DATE_FROM=t.DATE_FROM,this.DATE_TO=t.DATE_TO;const{range:e,altField:s,$content:n}=t,i=this._createAirOptions({range:e,altField:s}),a=new w.Z(n[0],i);return this.$clear=y.findClearButton(a),this._updateClearButtonVisibility(a),y.fixButtonsType(a),a}_createAirOptions(t){return{...t,inline:!0,locale:x,altFieldDateFormat:"d MMM",prevHtml:"",nextHtml:"",multipleDatesSeparator:" - ",dateFormat:"d MMM",moveToOtherMonthsOnSelect:!1,navTitles:{days:"MMMM yyyy"},onSelect:t=>this._onCellSelect(t),buttons:[{content:"очистить",className:"clear",onClick:t=>this._onClearCalendarClick(t)},{content:"применить",className:"accept",onClick:()=>this.onAcceptButtonClick()}]}}_setState(t,e){this._setTexts(t,e),this._setValues(t,e)}_setValues(t,e){const{$component:s,DATE_FROM:n,DATE_TO:i}=this,a=y.dateToString(t),o=y.dateToString(e);s.attr(n,a),s.attr(i,o)}_setTexts(t,e){const{isSplit:s,texts:n}=this;if(!s)return;const a=y.dateToString(t,"ru"),o=y.dateToString(e,"ru");i()(n[0]).val(a),i()(n[1]).val(o)}_onCellSelect({date:t,datepicker:e}){const[s,n]=e.selectedDates,i=1===e.selectedDates.length,a=2===e.selectedDates.length;i?(y.fixFocusDisplay(t,e),this._setState(s,"")):a&&this._setState(s,n),this._update(e)}_onClearCalendarClick(t){const{isSplit:e,texts:s}=this;t.clear(),e&&i()(s[1]).val("")}_update(t){this._updateClearButtonVisibility(t),this.triggerValueChanged()}_updateClearButtonVisibility(t){const{$clear:e}=this;0!==t.selectedDates.length?e.show():e.hide()}static findClearButton(t){const e=i()("button",t.$buttons);return i()(e[0])}static fixButtonsType(t){i()("button",t.$buttons).attr("type","button")}static fixFocusDisplay(t,e){const s=`.air-datepicker-cell[data-year=${t.getFullYear()}][data-month=${t.getMonth()}][data-date=${t.getDate()}]`,n=i()(s,e.$datepicker);n.hasClass("-focus-")&&(n.addClass("-range-from-"),n.addClass("-range-to-"))}static dateToString(t,e="en"){return"string"==typeof t?t:t.toLocaleDateString(e)}}const I=y,O="datepicker_open";i()((()=>{i()(".js-datepicker").each(((t,e)=>{const s=i()(e);new class{constructor(t){this.$component=t,this.valueChanged=t.attr("data-value-changed"),this.$inputs=i()(".js-datepicker__inputs",t),this.$content=i()(".js-datepicker__content",t),this.texts=i()(".js-datepicker__text",t),this.isSplit=void 0!==t.attr("data-is-split"),this.isRange=void 0!==t.attr("data-is-range"),this.datepicker=this._createCalendar()}init(){const t=JSON.parse(this.$component.attr("data-selected")),{datepicker:e}=this;e.selectDate(t),this._handleOutOfComponentClick=this._handleOutOfComponentClick.bind(this),this._handleInputsClick=this._handleInputsClick.bind(this),this._attachEventHandlers()}_attachEventHandlers(){const{$inputs:t}=this;i()(document).on("click",this._handleOutOfComponentClick),t.on("click",this._handleInputsClick)}_handleAcceptButtonClick(){const{$component:t}=this;t.removeClass(O)}_handleOutOfComponentClick({target:t}){const{$component:e}=this;0===e.has(t).length&&e.removeClass(O)}_handleInputsClick({target:t}){const{$component:e}=this;0!==i()(t).closest(".js-datepicker__input-box").length&&e.toggleClass(O)}_triggerValueChanged(){const{valueChanged:t}=this;t&&i()(document).trigger(t)}_createCalendar(){const{$component:t,$content:e,texts:s,isSplit:n,isRange:i}=this,a={$component:t,$content:e,texts:s,isSplit:n,range:i,triggerValueChanged:()=>this._triggerValueChanged(),onAcceptButtonClick:()=>this._handleAcceptButtonClick(),altField:s[0],DATE_FROM:"data-date-from",DATE_TO:"data-date-to"};return new I(a)}}(s).init()}))}))}},s={};function n(t){var i=s[t];if(void 0!==i)return i.exports;var a=s[t]={exports:{}};return e[t].call(a.exports,a,a.exports,n),a.exports}n.m=e,t=[],n.O=(e,s,i,a)=>{if(!s){var o=1/0;for(h=0;h<t.length;h++){for(var[s,i,a]=t[h],r=!0,l=0;l<s.length;l++)(!1&a||o>=a)&&Object.keys(n.O).every((t=>n.O[t](s[l])))?s.splice(l--,1):(r=!1,a<o&&(o=a));if(r){t.splice(h--,1);var c=i();void 0!==c&&(e=c)}}return e}a=a||0;for(var h=t.length;h>0&&t[h-1][2]>a;h--)t[h]=t[h-1];t[h]=[s,i,a]},n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={781:0};n.O.j=e=>0===t[e];var e=(e,s)=>{var i,a,[o,r,l]=s,c=0;if(o.some((e=>0!==t[e]))){for(i in r)n.o(r,i)&&(n.m[i]=r[i]);if(l)var h=l(n)}for(e&&e(s);c<o.length;c++)a=o[c],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(h)},s=self.webpackChunktoxin=self.webpackChunktoxin||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var i=n.O(void 0,[815,590],(()=>n(74)));i=n.O(i)})();