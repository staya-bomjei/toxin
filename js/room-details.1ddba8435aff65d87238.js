(()=>{"use strict";var t,e={534:(t,e,o)=>{var s=o(755),r=o.n(s);r()((()=>{r()(".js-header").each(((t,e)=>{const o=r()(e);new class{constructor(t){this.$component=t,this.$burgerButton=r()(".js-header__burger",t),this.$info=r()(".js-header__info",t)}init(){this._attachEventHandlers()}_attachEventHandlers(){this.$burgerButton.on("click",(()=>this._handleBurgerButtonClick()))}_handleBurgerButtonClick(){this.$burgerButton.toggleClass("header__burger_active"),this.$info.toggleClass("header__info_mobile-expanded")}}(o).init()}))})),o(729);var n=o(403);class i{constructor(t){this.ctx=t.ctx,this.counters=t.counters,this.colors=t.colors,this.counters.reverse(),this.colors.reverse();const e=this._createData(),o=i.createOutsideOptions();return new n.Z(this.ctx,{type:"doughnut",data:e,options:o})}_createData(){return{datasets:[{data:this.counters,backgroundColor:this.colors}]}}static createOutsideOptions(){return{cutout:"89%",radius:60,borderWidth:2,aspectRatio:1,responsive:!0,maintainAspectRatio:!1,animation:{animateRotate:!1},interaction:{mode:null},layout:{padding:{left:0,right:0,top:-10,bottom:0}},plugins:{tooltip:{enabled:!1},legend:{display:!1}}}}}const a=i;r()((()=>{r()(".js-doughnut-chart").each(((t,e)=>{const o=r()(e);new class{constructor(t){this.$component=t,this.$chart=r()(".js-doughnut-chart__chart",t),this.$dots=r()(".js-doughnut-chart__dot",t),this.ctx=this.$chart[0].getContext("2d")}init(){const t=JSON.parse(this.$component.attr("data-items"));this.counters=t.map((t=>t.counter)),this.colors=t.map((t=>t.color)),this.chart=this._createChart(t),this._paintDots()}_createChart(){const t=this.colors.map((t=>"string"==typeof t?t:this._createCanvasGradient(t))),e={ctx:this.ctx,counters:this.counters,colors:t};return new a(e)}_paintDots(){this.$dots.each(((t,e)=>{if("string"==typeof this.colors[t])r()(e).css("background",this.colors[t]);else{const o=this.colors[t].stops.map((t=>`${t.color} ${t.percent}%`)),s=`linear-gradient(${this.colors[t].direction}deg, ${o.join(", ")})`;r()(e).css("background",s)}}))}_createCanvasGradient({direction:t,stops:e}){const o=this.$chart.width(),s=(t-90-90)*(Math.PI/180),r=o/Math.cos(s),n=o-Math.sqrt(r*r-o*o),i=r+Math.sin(s)*n,a=o+Math.cos(-Math.PI/2+s)*i,c=o+Math.sin(-Math.PI/2+s)*i,h=o+Math.cos(Math.PI/2+s)*i,l=o+Math.sin(Math.PI/2+s)*i,u=this.ctx.createLinearGradient(a,c,h,l);return e.forEach((t=>u.addColorStop(t.percent/100,t.color))),u}}(o).init()}))}));const c="like-button_liked";r()((()=>{r()(".js-like-button").each(((t,e)=>{const o=r()(e);new class{constructor(t){this.$component=t,this.$icon=r()(".js-like-button__icon",t),this.$counter=r()(".js-like-button__counter",t)}init(){this._attachEventHandlers()}_attachEventHandlers(){this.$component.on("click",(()=>this._handleComponentClick()))}_handleComponentClick(){this._isLiked()?(this._setCounter(this._getCounter()-1),this.$icon.html("favorite_border")):(this._setCounter(this._getCounter()+1),this.$icon.html("favorite")),this.$component.toggleClass(c)}_isLiked(){return this.$component.hasClass(c)}_getCounter(){return Number(this.$counter.html())}_setCounter(t){this.$counter.html(t)}}(o).init()}))})),o(963)}},o={};function s(t){var r=o[t];if(void 0!==r)return r.exports;var n=o[t]={exports:{}};return e[t].call(n.exports,n,n.exports,s),n.exports}s.m=e,t=[],s.O=(e,o,r,n)=>{if(!o){var i=1/0;for(l=0;l<t.length;l++){for(var[o,r,n]=t[l],a=!0,c=0;c<o.length;c++)(!1&n||i>=n)&&Object.keys(s.O).every((t=>s.O[t](o[c])))?o.splice(c--,1):(a=!1,n<i&&(i=n));if(a){t.splice(l--,1);var h=r();void 0!==h&&(e=h)}}return e}n=n||0;for(var l=t.length;l>0&&t[l-1][2]>n;l--)t[l]=t[l-1];t[l]=[o,r,n]},s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={125:0};s.O.j=e=>0===t[e];var e=(e,o)=>{var r,n,[i,a,c]=o,h=0;if(i.some((e=>0!==t[e]))){for(r in a)s.o(a,r)&&(s.m[r]=a[r]);if(c)var l=c(s)}for(e&&e(o);h<i.length;h++)n=i[h],s.o(t,n)&&t[n]&&t[n][0](),t[i[h]]=0;return s.O(l)},o=self.webpackChunktoxin=self.webpackChunktoxin||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})();var r=s.O(void 0,[815,590,403,635],(()=>s(534)));r=s.O(r)})();