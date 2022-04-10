define(["jquery","OK/utils/throttle"],(function(t,e){"use strict";var i=[];function l(t,e){this.el=t[0],this.lockDelay=e,this._onLockTimeout=this._onLockTimeout.bind(this)}function s(){this.interval=null}return l.prototype={hide:function(){this.locked||(this.lockDelay?this.lock():this.setHidden(!0))},setHidden:function(t){this.el&&this.el.classList.toggle("hidden",t)},setLocked:function(t){this.locked=t,this.el&&this.el.classList.toggle("__lock",t)},lock:function(){this.setLocked(!0),this.lockTimeout=setTimeout(this._onLockTimeout,this.lockDelay)},unlock:function(){this.locked&&(this.setLocked(!1),this.lockTimeout&&(clearTimeout(this.lockTimeout),this.lockTimeout=0))},_onLockTimeout:function(){this.lockTimeout=0,this.unlock(),this.setHidden(!0)},show:function(){this.locked&&this.unlock(),this.setHidden(!1)},onClick:function(t){this.el&&(this.callback=t,this.el.addEventListener("click",this))},handleEvent:function(t){"click"===t.type&&!this.locked&&this.callback&&this.callback()},destroy:function(){this.el&&(this.callback&&(this.el.removeEventListener("click",this),this.callback=null),this.el=null)}},s.prototype={activate:function(s){var o=this,a=o.$el=t(s);o.$content=a.find(".uslider_cnt");var n=a.attr("data-type");o.isCarousel=null!=n&&"carousel"==n;var r=a.attr("data-play");o.autoplay=null!=r&&"auto"==r;var d=a.attr("data-customEvent");o.customEvent=null!=d&&"true"==d;var f=a.attr("data-delete-enabled");o.intervalTime=a.attr("data-interval");var c=+a.attr("data-lock-delay-of-scrolling-end")||0,u=a.attr("data-in-layer");o.inLayer=null!=u&&"true"==u;var h=a.attr("data-loop");o.loop=null!=h&&"true"==h,o.autoPlayForward=!0;var v=a.attr("data-gap");o.options={gap:v?parseInt(v):6},o.isCarousel&&(o.options.gap=0);var m=o.$nextBtn=new l(a.find(".uslider_ctrl.__next"),c),S=o.$prevBtn=new l(a.find(".uslider_ctrl.__prev"),c),b=o.$container=a.find(".uslider_hld"),p=a.attr("data-slide-width"),k=b.children();o.slideWidth=p||t(k[0]).outerWidth(!0);var C=a.attr("data-visibleSlides");o.maxVisibleSlides=o.calcVisibleSlides(),o.visibleSlides=C?parseInt(C):o.maxVisibleSlides,a.attr("data-visibleSlides",o.visibleSlides);var y=a.attr("data-ring");o.ring=null!=y&&"true"==y&&k.length>=4*o.visibleSlides;var T=a.attr("data-ring-manual-init-transform");o.ringManualInitTransform=null!=T&&"true"==T;var w=a.attr("data-resizable");o.resizable=void 0!==w&&"true"===w;var g=a.attr("data-manualButtonOffset");if(o.buttonOffset=g?parseInt(g):Math.floor((o.$content.outerWidth()-o.visibleSlides*o.slideWidth)/2),o.totalSlides=k.length,o.offset=0,o.ring){if(m.show(),S.show(),o.offset=o.visibleSlides,!o.ringManualInitTransform){b.addClass("__noanim");for(var $=Math.min(Math.floor((o.totalSlides-o.visibleSlides)/3),o.visibleSlides),O=b[0];$-- >0;)O.insertBefore(O.lastChild,O.firstChild);o.setTransalateX(o.offset*o.slideWidth-o.buttonOffset),setTimeout((function(){b.removeClass("__noanim")}),50)}}else o.scrollToOffset();m.onClick((function(){o.handleClick(!0),o.resetAutoPlayInterval()})),S.onClick((function(){o.handleClick(!1),o.resetAutoPlayInterval()})),a.on("uSliderUpdateCount",(function(t){var e=t.originalEvent.detail;switch(e.type){case"remove":o.deleteItem(!0);break;case"append":o.updateCount(),void 0!==e.offset?o.setOffset(e.offset):o.scrollToOffset()}})),a.on("uSliderClick",(function(t){o.handleClick(t.originalEvent.detail.forward),o.resetAutoPlayInterval()})),b.on("transitionend.slider",(function(t){t.target===b[0]&&o.createCustomSlideEvent("slideend")})),o.autoplay&&o.totalSlides>1&&(a.hover((function(){clearInterval(o.interval)}),(function(){o.autoPlay()})),o.autoPlay()),f&&b.on("click.slide",".js-delete-item",(function(){o.deleteItem(!1)})),o.resizable&&(o.isOldLayoutIsSmall=t(window).width()<1274,t(window).on("resize.slider",e(200,(function(){o.resizeHandler()})))),-1===i.indexOf(s)&&i.push(s)},calcVisibleSlides:function(){return Math.floor((this.$content.outerWidth()+2*this.options.gap)/this.slideWidth)},updateCount:function(){this.totalSlides=this.$container.children().length},setOffset:function(t){var e,i=this.totalSlides-this.visibleSlides;switch(t){case"start":e=0;break;case"end":e=i;break;default:(e=t)>i&&(e=i),e<0&&(e=0)}this.offset=e,this.scrollToOffset()},deactivate:function(e){var l=this.$el;l.find(".uslider_ctrl").off(".slider"),l.off("uSliderUpdateCount"),l.off("uSliderClick"),clearInterval(this.interval),this.$nextBtn&&(this.$nextBtn.destroy(),this.$nextBtn=null),this.$prevBtn&&(this.$prevBtn.destroy(),this.$prevBtn=null);var s=i.indexOf(e);-1!==s&&i.splice(s,1),i.length||this.resizable&&t(window).off("resize.slider")},setTransalateX:function(t){var e,i;e=this.$container,i="translateX(-"+t+"px)",e[0].style.cssText="transform: "+i+"; -webkit-transform: "+i+"; -moz-transform: "+i+"; -ms-transform: "+i+";"},createCustomSlideEvent:function(t,e){var i=this;i.customEvent&&"function"==typeof CustomEvent&&i.$el[0].dispatchEvent(new CustomEvent("uSliderAction",{bubbles:!0,detail:{offset:i.offset,totalSlides:i.totalSlides,visibleSlides:i.visibleSlides,container:i.$container[0],action:t,data:e||null}}))},handleClick:function(t){var e=this;e.isCarousel&&e.offset==e.totalSlides-1&&t?e.offset=0:t?e.offset+=e.offset+e.visibleSlides<e.totalSlides-e.visibleSlides?e.visibleSlides:e.totalSlides-(e.offset+e.visibleSlides):e.offset-=e.offset-e.visibleSlides>0?e.visibleSlides:e.offset,e.scrollToOffset(),e.createCustomSlideEvent("slide")},scrollToOffset:function(){var t=this,e=t.$container,i=t.$nextBtn,l=t.$prevBtn;if(t.ring&&(t.offset<1||t.offset>=t.totalSlides-t.visibleSlides)){e.addClass("__noanim");var s=e[0],o=Math.min(Math.floor((t.totalSlides-t.visibleSlides)/3),t.visibleSlides),a=o;if(t.offset<1)for(;a-- >0;)t.createCustomSlideEvent("moveFromRightToLeft",s.lastChild),s.insertBefore(s.lastChild,s.firstChild);else for(o=-o;a-- >0;)t.createCustomSlideEvent("moveFromLeftToRight",s.firstChild),s.appendChild(s.removeChild(s.firstChild));return t.offset+=o,t.setTransalateX((t.offset+o)*t.slideWidth-t.buttonOffset),void setTimeout((function(){e.removeClass("__noanim"),t.setTransalateX(t.offset*t.slideWidth-t.buttonOffset)}),50)}t.offset<1?(l.hide(),t.visibleSlides<t.totalSlides?t.maxVisibleSlides>t.visibleSlides&&t.maxVisibleSlides>=t.totalSlides?i.hide():i.show():i.hide(),t.setTransalateX(t.offset*t.slideWidth+t.options.gap)):t.offset<t.totalSlides-t.visibleSlides?(l.show(),i.show(),t.setTransalateX(t.offset*t.slideWidth-t.buttonOffset)):(l.show(),i.hide(),t.setTransalateX(t.offset*t.slideWidth-2*t.buttonOffset-t.options.gap))},autoPlay:function(){var e=this;e.interval=setInterval((function(){var i=e.$content.offset().top;if(!(OK.Layers.isAnyLayerOpened()&&!e.inLayer||t(window).scrollTop()>i))if(e.loop){var l=e.offset;e.handleClick(e.autoPlayForward),l===e.offset&&e.handleClick(e.autoPlayForward=!e.autoPlayForward)}else e.handleClick(!0)}),e.intervalTime)},resetAutoPlayInterval:function(){this.autoplay&&clearInterval(this.interval)},deleteItem:function(t){var e=this;e.totalSlides=t?e.$container.children().length:e.$container.children().length-1;var i=e.offset;e.offset+e.visibleSlides>e.totalSlides&&(e.offset=e.offset>0?--i:i),e.scrollToOffset(),e.createCustomSlideEvent("remove")},resizeHandler:function(){var e=this,i=t(window).width()<1274;if(e.isOldLayoutIsSmall===i)return!1;e.isOldLayoutIsSmall=i,e.offset=0,e.visibleSlides=Math.floor((e.$content.outerWidth()+2*e.options.gap)/e.slideWidth);var l=e.$el.attr("data-manualButtonOffset");e.buttonOffset=l?parseInt(l):Math.floor((e.$content.outerWidth()-e.visibleSlides*e.slideWidth)/2),e.scrollToOffset()}},s}));
//# sourceMappingURL=/res/source-maps/js/app/uslider.js.map