"use strict";(self.webpackChunktoxin=self.webpackChunktoxin||[]).push([[777],{888:(t,e,s)=>{s.d(e,{Z:()=>l});var n=s(755),a=s.n(n),i=s(938),o=s(651),r=s(96);class c extends o.Z{constructor(t){super(t),this.maxLen=Number(t.attr(r.kG)),this.hasControls=void 0!==t.has(r.Lk),this.$text=a()(r.qW,this.$component),this.rows=this._getRows()}init(){this.hasControls&&this._initControls(),super.init(),this._update()}_initControls(){this.$clear=this.$component.find(r.oi),this.$accept=this.$component.find(r.xJ)}_attachEventHandlers(){super._attachEventHandlers(),this.hasControls&&(this.$clear.on("click",(()=>this._handleClearButtonClick())),this.$accept.on("click",(t=>this._handleAcceptButtonClick(t)))),this.rows.forEach((t=>{t.$minus.on("click",(()=>this._handleMinusClick(t.$minus,t.$counter))),t.$plus.on("click",(()=>this._handlePlusClick(t.$minus,t.$counter)))}))}_handleClearButtonClick(){this.rows.forEach((t=>{t.$minus.removeClass(r.wz),t.$counter.html(0)})),this._update()}_handleAcceptButtonClick(){this.$component.removeClass(r.M2)}_handleMinusClick(t,e){const s=Number(e.html());0!==s&&(1===s&&t.removeClass(r.wz),e.html(s-1),this._update())}_handlePlusClick(t,e){const s=Number(e.html());0===s&&t.addClass(r.wz),e.html(s+1),this._update()}_setText(t){let e=t.substring(0,this.maxLen);t.length>=this.maxLen&&(e+="..."),this.$text.val(e)}_getRows(){return Array.from(a()(r.jk,this.$component)).map((t=>{const e=a()(t),s={$minus:e.find(r.fP),$counter:e.find(r.sH),$plus:e.find(r.S8),countables:null};return void 0!==e.attr(r.gT)&&(s.countables=JSON.parse(e.attr(r.gT))),s}))}_areAllCountersZero(){return this.rows.every((t=>0===Number(t.$counter.html())))}_update(){this._updateText(),this._updateValue(),this._updateClearButtonVisibility(),this._triggerValueChanged()}_updateText(){this._areAllCountersZero()?this._setText(""):this._setText(this._calcDropdownText())}_updateValue(){this.$component.attr(r.o9,this._calcDropdownValue())}_updateClearButtonVisibility(){this._areAllCountersZero()?this.$clear.hide():this.$clear.show()}_calcDropdownValue(){return this.rows.map((t=>Number(t.$counter.html())))}_calcDropdownText(){return this.rows.map((t=>{const e=Number(t.$counter.html());return 0===e?"":`${e} ${(0,i.nK)(e,t.countables)}`})).filter((t=>""!==t)).join(", ")}}const l=c},822:(t,e,s)=>{s.d(e,{Z:()=>l});var n=s(755),a=s.n(n),i=s(563),o=s(651),r=s(96);class c extends o.Z{constructor(t){super(t),this.texts=a()(r.qW,this.$component),this.isSplit=void 0!==this.$component.attr(r.xD),this.isRange=void 0!==this.$component.attr(r.P4),this.datepicker=this._createCalendar()}init(){super.init();const t=JSON.parse(this.$component.attr(r.hd));this.datepicker.selectDate(t)}_handleAcceptButtonClick(){this.$component.removeClass(r.M2)}_createCalendar(){const t={$component:this.$component,$content:this.$content,texts:this.texts,isDatepicker:this.isDatepicker,isSplit:this.isSplit,range:this.isRange,triggerValueChanged:()=>this._triggerValueChanged(),onAcceptButtonClick:()=>this._handleAcceptButtonClick(),altField:this.texts[0],DATE_FROM:r.q8,DATE_TO:r.LX};return new i.Z(t)}}const l=c},651:(t,e,s)=>{s.d(e,{Z:()=>o});var n=s(755),a=s.n(n),i=s(96);const o=class{constructor(t){this.$component=t,this.valueChanged=t.attr(i.KI),this.$inputs=a()(i.BM,t),this.$content=a()(i.kL,t)}init(){this.$component.hasClass(i.yH)||this.$content.css("z-index",Number(this.$content.css("z-index"))+1),this._attachEventHandlers()}_attachEventHandlers(){a()(document).on("click",(t=>this._handleOutOfComponentClick(t))),this.$inputs.on("click",(t=>this._handleInputsClick(t)))}_handleOutOfComponentClick({target:t}){0===this.$component.has(t).length&&this.$component.removeClass(i.M2)}_handleInputsClick({target:t}){0!==a()(t).closest(i.tQ).length&&this.$component.toggleClass(i.M2)}_triggerValueChanged(){this.valueChanged&&a()(document).trigger(this.valueChanged)}}},575:(t,e,s)=>{s.d(e,{Z:()=>r});var n=s(938),a=s(888),i=s(96);class o extends a.Z{constructor(t){super(t),this.countables=JSON.parse(this.$component.attr(i.Je))}_sumAllDropdownCountables(){return this.rows.filter((t=>null===t.countables)).reduce(((t,e)=>t+Number(e.$counter.html())),0)}_calcDropdownText(){const t=this._sumAllDropdownCountables();return[t?`${t} ${(0,n.nK)(t,this.countables)}`:"",...this.rows.filter((t=>null!==t.countables)).map((t=>{const e=Number(t.$counter.html());return 0===e?"":`${e} ${(0,n.nK)(e,t.countables)}`}))].filter((t=>""!==t)).join(", ")}}const r=o},96:(t,e,s)=>{s.d(e,{qt:()=>n,BM:()=>a,kL:()=>i,qW:()=>o,oi:()=>r,xJ:()=>c,tQ:()=>l,jk:()=>h,fP:()=>u,sH:()=>d,S8:()=>p,M2:()=>_,yH:()=>m,wz:()=>$,KI:()=>C,o9:()=>g,kG:()=>k,Lk:()=>w,gT:()=>x,Je:()=>b,xD:()=>S,P4:()=>f,hd:()=>v,q8:()=>y,LX:()=>T,wD:()=>D});const n=".js-dropdown",a=".js-dropdown__inputs",i=".js-dropdown__content",o=".js-dropdown__text",r=".js-dropdown__clear-button",c=".js-dropdown__accept-button",l=".js-dropdown__input-box",h=".js-dropdown__row",u=".js-dropdown__button-minus",d=".js-dropdown__counter",p=".js-dropdown__button-plus",_="dropdown_open",m="dropdown_expanded",$="dropdown__button-minus_active",C="data-value-changed",g="data-value",k="data-max-len",w="data-has-controls",x="data-row-countables",b="data-countables",S="data-is-split",f="data-is-range",v="data-selected",y="data-date-from",T="data-date-to",D="data-type"},177:(t,e,s)=>{var n=s(755),a=s.n(n),i=s(651),o=s(822),r=s(888),c=s(575),l=s(96);a()((()=>{a()(l.qt).each(((t,e)=>{const s=a()(e);(function(t,e){switch(t){case"datepicker":return new o.Z(e);case"counter":return new r.Z(e);case"summator":return new c.Z(e);default:return new i.Z(e)}})(s.attr(l.wD),s).init()}))}))},291:(t,e,s)=>{var n=s(755),a=s.n(n);const i="data-rate";a()((()=>{a()(".js-rate-button").each(((t,e)=>{const s=a()(e);new class{constructor(t){this.$component=t,this.rate=Number(t.attr(i)),this.stars=Array.from(a()(".js-rate-button__star",t)).map((t=>a()(t)))}init(){this._setState(this.rate),this._attachEventHandlers()}_attachEventHandlers(){this.stars.forEach((t=>{t.on("click",(t=>this._handleStarClick(t))).on("mouseover",(t=>this._handleStarHover(t)))})),this.$component.on("mouseout",(()=>this._setState(this.rate)))}_handleStarClick(t){const e=t.target,s=this._getStarRate(e);this.rate===s?this._setState(0):this._setState(s)}_handleStarHover(t){const e=t.target,s=this._getStarRate(e);this._setState(s,!1)}_setState(t,e=!0){e&&(this.rate=t,this.$component.attr(i,t)),this.stars.forEach(((e,s)=>{e.html(s<t?"star":"star_border")}))}_getStarRate(t){return this.stars.findIndex((e=>e.is(t)))+1}}(s).init()}))}))},421:(t,e,s)=>{s.d(e,{Y:()=>n,l:()=>a});const n=".js-text-field__input",a="placeholder"},729:(t,e,s)=>{var n=s(755),a=s.n(n),i=s(462),o=s(421);a()((()=>{a()(o.Y).each(((t,e)=>{const s=a()(e),n=s.attr(o.l);new i.Z({$input:s,inputFormat:"dd.mm.yyyy",placeholder:n}).init()}))}))},563:(t,e,s)=>{s.d(e,{Z:()=>c});var n=s(755),a=s.n(n),i=s(808),o=s(255);class r{constructor(t){this.$component=t.$component,this.texts=t.texts,this.isSplit=t.isSplit,this.triggerValueChanged=t.triggerValueChanged,this.onAcceptButtonClick=t.onAcceptButtonClick,this.DATE_FROM=t.DATE_FROM,this.DATE_TO=t.DATE_TO;const{range:e,altField:s,$content:n}=t,a=this._createAirOptions({range:e,altField:s}),o=new i.Z(n[0],a);return this.$clear=r.findClearButton(o),this._updateClearButtonVisibility(o),r.fixButtonsType(o),o}_createAirOptions(t){return{...t,inline:!0,locale:o.Z,altFieldDateFormat:"d MMM",prevHtml:"",nextHtml:"",multipleDatesSeparator:" - ",dateFormat:"d MMM",moveToOtherMonthsOnSelect:!1,navTitles:{days:"MMMM yyyy"},onSelect:t=>this._onCellSelect(t),buttons:[{content:"очистить",className:"clear",onClick:t=>this._onClearCalendarClick(t)},{content:"применить",className:"accept",onClick:()=>this.onAcceptButtonClick()}]}}_setState(t,e){this._setTexts(t,e),this._setValues(t,e)}_setValues(t,e){const s=r.dateToString(t),n=r.dateToString(e);this.$component.attr(this.DATE_FROM,s),this.$component.attr(this.DATE_TO,n)}_setTexts(t,e){if(!this.isSplit)return;const s=r.dateToString(t,"ru"),n=r.dateToString(e,"ru");a()(this.texts[0]).val(s),a()(this.texts[1]).val(n)}_onCellSelect({date:t,datepicker:e}){const[s,n]=e.selectedDates,a=1===e.selectedDates.length,i=2===e.selectedDates.length;a?(r.fixFocusDisplay(t,e),this._setState(s,"")):i&&this._setState(s,n),this._update(e)}_onClearCalendarClick(t){t.clear(),this.isSplit&&a()(this.texts[1]).val("")}_update(t){this._updateClearButtonVisibility(t),this.triggerValueChanged()}_updateClearButtonVisibility(t){0!==t.selectedDates.length?this.$clear.show():this.$clear.hide()}static findClearButton(t){const e=a()("button",t.$buttons);return a()(e[0])}static fixButtonsType(t){a()("button",t.$buttons).attr("type","button")}static fixFocusDisplay(t,e){const s=`.air-datepicker-cell[data-year=${t.getFullYear()}][data-month=${t.getMonth()}][data-date=${t.getDate()}]`,n=a()(s,e.$datepicker);n.hasClass("-focus-")&&(n.addClass("-range-from-"),n.addClass("-range-to-"))}static dateToString(t,e="en"){return"string"==typeof t?t:t.toLocaleDateString(e)}}const c=r},255:(t,e,s)=>{s.d(e,{Z:()=>n});const n={days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],daysShort:["Вос","Пон","Вто","Сре","Чет","Пят","Суб"],daysMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],today:"Сегодня",clear:"Очистить",dateFormat:"dd.MM.yyyy",timeFormat:"HH:mm",firstDay:1}},462:(t,e,s)=>{s.d(e,{Z:()=>i});var n=s(382),a=s.n(n);const i=class{constructor({$input:t,inputFormat:e,placeholder:s}){const n={alias:"datetime",inputFormat:e,placeholder:s};this.outsideInputmask=new(a())(n),this.$input=t}init(){this.outsideInputmask.mask(this.$input)}}},938:(t,e,s)=>{function n(t,e){if(t>10&&t<20)return e[2];switch(t%10){case 1:return e[0];case 2:case 3:case 4:return e[1];default:return e[2]}}function a(t,e="",s="ru"){return`${t.toLocaleString(s)}${e}`}s.d(e,{nK:()=>n,R3:()=>a})}}]);