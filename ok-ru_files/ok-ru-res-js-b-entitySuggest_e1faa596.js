define("OK/utils/throttle",[],(function(){"use strict";
/*!
     * jQuery throttle / debounce - v1.1 - 3/7/2010
     * http://benalman.com/projects/jquery-throttle-debounce-plugin/
     *
     * Copyright (c) 2010 "Cowboy" Ben Alman
     * Dual licensed under the MIT and GPL licenses.
     * http://benalman.com/about/license/
     */return function(t,e,i,s){var n,o=0;return"boolean"!=typeof e&&(s=i,i=e,e=void 0),function(){var a=this,r=Date.now()-o,c=arguments;function l(){o=Date.now(),i.apply(a,c)}function h(){n=void 0}s&&!n&&l(),n&&clearTimeout(n),void 0===s&&r>t?l():!0!==e&&(n=setTimeout(s?h:l,void 0===s?t-r:t))}}})),define("OK/LogClicks",["OK/logger","OK/utils/dom"],(function(t,e){"use strict";var i,s="data-l",n="data-log-click",o="[data-l],[data-log-click]",a="click",r="log.click",c=null;function l(t,e,i){e&&Object.keys(e).length&&(t.push(e),e.target&&!i.okTarget&&(i.okTarget=e.target))}function h(e){OK.logging.alert(r+" "+e),t.error(r,e)}function d(t){if(!t)return null;var e=t.getAttribute(s);return e||(e=t.getAttribute(n)),e}var u={t:"target",ti:"targetId",mB:"mtBlockType",gA:"groupActionType",fF:"feedFeatures",fP:"feedPosition",fL:"feedLocation",fD:"feedDetails",fO:"feedOwners",fI:"feedId",".r":"remove",rM:"removeMenu",".c":"content",".k":"comment",re:"reshare",".l":"like",e1:"entity1",e2:"entity2",uL:"userLink",gL:"groupLink",".a":"action"};function p(t){var e=-2;try{if(!t||0==t.length||/^{|^null&/i.test(t))return e=-1,JSON.parse(t);e=0;for(var i={},s=!1,n=!0,o="",a="",r="",c=t.length,l=0,d=0,p=0;p<c;p++){e=1;var g=t.charAt(p);s?(s=!1,d++):"\\"==g?(d>0&&(n?(e=2,o+=t.substr(l,d)):(e=3,a+=t.substr(l,d)),d=0),l=p+1,s=!0):","==g?(n?(d>0&&(e=4,o+=t.substr(l,d),d=0),n=!1):(d>0&&(e=5,a+=t.substr(l,d),d=0),n=!0,(r=u[o])&&(o=r),(r=u[a])&&(a=r),i[o]=a,o="",a=""),l=p+1):d++}return e=6,s?h("err: escapeNow - "+t):n?l!=c&&h("err: keyNow - "+t):(l<c&&(e=7,a+=t.substr(l)),(r=u[o])&&(o=r),(r=u[a])&&(a=r),i[o]=a),i}catch(i){return h("unkn err: stepN = "+e+", data = "+t+", e = "+i),{}}}function g(t){if(null==c&&function(){c=0;try{var t,e,s=performance.getEntriesByType("navigation");if(s&&s.length&&(t=(i=s[0]).serverTiming),t&&t.length)for(e=0;e<t.length;e+=1)if("from"===t[e].name){c=t[e].duration;break}}catch(t){c=0}}(),c>0)try{var e=Math.round(performance.now()-i.responseStart+c);t.push({adjustedTime:e})}catch(t){}}function m(e){var i,s,n=!1,r=[];try{(i=d(e.target))&&l(r,p(i),e);for(var c=e.target.parentElement;c;)c.matches(o)&&(i=d(c))&&l(r,p(i),e),c.hasAttribute("data-force")&&(n=!0),c=c.parentElement;r.length&&(g(r),n?(s=JSON.stringify(r),OK.logging.info("click "+s),t.force(a,s)):function(e){OK.logging.info("click "+e),t.success(a,e)}(JSON.stringify(r)))}catch(t){h(t)}}return{activate:function(t){t.addEventListener("click",m,!0),OK.clickLog.incCounter()},deactivate:function(t){t.removeEventListener("click",m,!0),OK.clickLog.decCounter()},getLogDataAsString:d,parseLogData:p,getLogData:function(t){var e=d(t);if(e)return p(e)},updateLogData:function(t,e){var i=s;t.getAttribute(n)&&(i=n);var o=JSON.stringify(e);t.setAttribute(i,o)},copyLogData:function(t,e){var i=s;t.getAttribute(n)&&(i=n),e.setAttribute(i,t.getAttribute(i))},getClosestLogClickElement:function(t){return t.matches(o)?t:e.traverseParents(t,(function(t){return t.matches(o)}))},doLogOnElement:function(t){m({target:t})},LOG_ATTR_SELECTOR:o}})),define("OK/LogSeen",["OK/logger","OK/utils/utils","OK/utils/throttle","OK/LogClicks"],(function(t,e,i,s){"use strict";var n="seen",o="log.seen",a=[],r=[],c=i(150,(function(){for(var t=r.length;t--;)r[t].onScroll()}));function l(e,i,s){OK.logging.info("seen "+e+" "+i),t[s?"force":"success"](n,e,i)}function h(){this.params={},this.seenStartTime=0,this.hoverStartTime=0,this.onScrollSeenTimer=null,this.logData={}}return h.prototype.activate=function(t){if(this.element=t,this.params=JSON.parse(t.getAttribute("data-seen-params")),this.params.options){this.seenTimeout=this.params.options.seenTimeout,this.skipVisible=this.params.options.skipVisible||!1,this.hoverTimeout=this.params.options.hoverTimeout,this.seenPartial=this.params.options.partial||.01,this.seenForce=this.params.options.force||!1,this.onScrollSeen=this.params.options.onScrollSeen||!1,this.onScrollSeenTimeout=this.params.options.onScrollSeenTimeout||1e4,this.onScrollPartial=this.params.options.onScrollPartial||.6,this.disableNullHeight=this.params.options.disableNullHeight||!1;var i=s.getLogDataAsString(t),n=i&&s.parseLogData(i);n&&n.feedFeatures&&(this.params.data=this.params.data||{},this.params.data.feedFeatures=n.feedFeatures,n.feedPosition&&(this.params.data.feedPosition=Number(n.feedPosition)),n.feedLocation&&(this.params.data.feedLocation=n.feedLocation))}if(this.boundMouseEnter=this.mouseEnter.bind(this),this.boundMouseLeave=this.mouseLeave.bind(this),this.boundClick=this.onClick.bind(this),this.hoverTimeout&&(this.element.addEventListener("mouseenter",this.boundMouseEnter),this.element.addEventListener("mouseleave",this.boundMouseLeave)),this.seenTimeout&&this.element.addEventListener("click",this.boundClick),this.seenTimeout&&!this.skipVisible){var o=e.isElementPartiallyInViewport(t,this.seenPartial,this.disableNullHeight);!1!==o&&this.shown(this.getNullHeightLogParam(o))}return this},h.prototype.deactivate=function(){this.hoverTimeout&&(this.element.removeEventListener("mouseenter",this.boundMouseEnter),this.element.removeEventListener("mouseleave",this.boundMouseLeave)),this.seenTimeout&&(this.element.removeEventListener("click",this.boundClick),this.hidden())},h.prototype.shown=function(t){this.logData=Object.assign(t,this.params.data),this.seenStartTime=Date.now()},h.prototype.shownOnScroll=function(){if(this.onScrollSeen&&!this.onScrollSeenTimer&&!this.logData.seen){var t=e.isElementPartiallyInViewport(this.element,this.onScrollPartial,this.disableNullHeight);!1!==t&&(this.onScrollSeenTimer=setTimeout(function(){this.logData.seen||(this.logData.seen=this.onScrollSeenTimeout,this.logData.nullHeight=null===t,l(this.params.type,JSON.stringify(this.logData),this.seenForce))}.bind(this),this.onScrollSeenTimeout))}},h.prototype.hidden=function(){if(this.seenStartTime&&!this.logData.seen){var t=Date.now()-this.seenStartTime;t>=this.seenTimeout&&(this.logData.seen=t,l(this.params.type,JSON.stringify(this.logData),this.seenForce))}this.logData.seen=0,this.seenStartTime=0,this.onScrollSeenTimer&&(clearTimeout(this.onScrollSeenTimer),this.onScrollSeenTimer=null)},h.prototype.mouseEnter=function(){this.hoverStartTime=Date.now()},h.prototype.mouseLeave=function(){if(this.hoverStartTime){var t=Date.now()-this.hoverStartTime;t>=this.hoverTimeout&&(this.logData.hovered=t)}this.hoverStartTime=0},h.prototype.onScroll=function(){if(this.seenTimeout){var t=e.isElementPartiallyInViewport(this.element,this.seenPartial,this.disableNullHeight);!1!==t?(this.seenStartTime||this.shown(this.getNullHeightLogParam(t)),this.shownOnScroll()):!0!==this.disableNullHeight&&this.hidden()}},h.prototype.onClick=function(){this.seenStartTime?this.logData.seen=Date.now()-this.seenStartTime:(this.skipVisible&&this.shown(this.getNullHeightLogParam(!0)),this.logData.seen=0),this.logData.seen=this.seenStartTime?Date.now()-this.seenStartTime:0,this.logData.clicked=!0,l(this.params.type,JSON.stringify(this.logData),this.seenForce),this.seenStartTime=0},h.prototype.getNullHeightLogParam=function(t){return{nullHeight:null===t}},{logError:function(e){OK.logging.alert(o+" "+e),t.error(o,e)},logSuccess:l,activate:function(t){-1===a.indexOf(t)&&(a.push(t),r.push((new h).activate(t))),1===r.length&&window.addEventListener("scroll",c,!0)},deactivate:function(t){var e=a.indexOf(t);-1!==e&&(r[e].deactivate(),a.splice(e,1),r.splice(e,1)),r.length||window.removeEventListener("scroll",c,!0)}}})),define("OK/utils/debounce",["OK/utils/throttle"],(function(t){"use strict";return function(e,i,s){return void 0===s?t(e,i,!1):t(e,s,!1!==i)}})),define("OK/entitySuggest/EntitySuggestSeenLogger",["OK/utils/utils","OK/LogSeen","OK/utils/debounce"],(function(t,e,i){function s(t,e){if(t){try{this.seenParams=JSON.parse(t)}catch(t){return void(this.seenParams=null)}this.logged={},this.entities=e,this.seenParams.options.scrollHanlderElement&&(this.scrollHanlderElement=document.getElementsByClassName(this.seenParams.options.scrollHanlderElement)[0]),this.scrollHanlderElement||(this.scrollHanlderElement=window),this.logSeenInternal=function(){this.logSeen(this.entities)}.bind(this),this.logSeenOnWinowScroll=i(150,function(t){t.isTrigger||this.logSeenInternal()}.bind(this)),this.scrollHanlderElement.addEventListener("scroll",this.logSeenOnWinowScroll),setTimeout(this.logSeenInternal,0)}}return s.prototype={logSeen:function(i){if(this.seenParams){var s=[],n=[];for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];if(t.isElementPartiallyInViewport(a.element,.9)){if(!this.logged[o]){this.logged[o]=!0;var r=parseInt(o,10);r&&(s.push(r),n.push(a.position))}}else t.isElementPartiallyInViewport(a.element,.2)||(this.logged[o]=!1)}s.length>0&&(this.seenParams.data.user_ids=s.join(","),this.seenParams.data.positions=n.join(","),e.logSuccess(this.seenParams.type,JSON.stringify(this.seenParams.data)))}},deactivate:function(){this.scrollHanlderElement&&this.scrollHanlderElement.removeEventListener("scroll",this.logSeenOnWinowScroll)}},s})),define("OK/entitySuggest/AbstractEntitySuggest",["OK/capture","OK/utils/delegate","OK/utils/dom","OK/utils/utils","OK/entitySuggest/EntitySuggestSeenLogger"],(function(t,e,i,s,n){"use strict";var o={LOADED:"loaded",READY:"ready",SUCCESS:"success",PROCESS:"process",ERROR:"error",HIDE:"hide"},a={friendshipRequests:"/dk?cmd=FriendshipRequests",pymk:"/dk?cmd=AddPossibleFriend",pymkRelations:"/dk?cmd=AddPossibleFriend",pymkWithRelationsWithTabs:"/dk?cmd=AddPossibleFriend",commonFriends:"/dk?cmd=NotificationsRecommendedFriends",friendship:"/dk?cmd=AddPossibleFriend",recommendations:"/dk?cmd=GetRecommendOrPYMK"},r={friendshipRequests:{portlets:{},commonEntities:{}},pymk:{portlets:{},commonEntities:{}},pymkRelations:{portlets:{},commonEntities:{}},pymkWithRelationsWithTabs:{portlets:{},commonEntities:{}},commonFriends:{portlets:{},commonEntities:{}},recommendations:{portlets:{},commonEntities:{}},friendship:{portlets:{},commonEntities:{}}},c=0;function l(){var t;this.uniqueId=(t=++c,function(){return t})}return l.entityStateStatus=o,l.urlConfig=a,l.typeStorage=r,l.prototype.acceptEntity=function(t,e){},l.prototype.declineEntity=function(t,e){},l.prototype.addElement=function(t,e,i){var s=t.getAttribute("data-entity-id");return s&&void 0===this.entities[s]?(this.entities[s]={element:t,state:e,position:i},void 0===r[this.type].commonEntities[s]?r[this.type].commonEntities[s]=[this]:r[this.type].commonEntities[s].push(this),s):null},l.prototype.replaceElement=function(e,s){if(e&&this.entities[e]){var n=this.entities[e].element,a=n.parentNode,c=i.byClass(this.hook,this.hookClass).indexOf(n);if(delete this.entities[e],delete r[this.type].commonEntities[e],s){t.deactivate(n),a.removeChild(n);var l=document.createElement("div");l.innerHTML=s;var h=l.firstElementChild;h.classList.add("__loaded"),a.appendChild(h);var d=this.addElement(h,o.LOADED,c);if(t.activate(h),this.hook.dispatchEvent(new CustomEvent("entitySuggestUpdateCount",{detail:{type:"replace",index:c}})),d){var u={};u[d]=this.entities[d],this.seenLogger.logSeen(u)}}else this.emptyListChecker(function(){var e=OK.hookModel.getNearestBlockHookId(n),s=OK.hookModel.getHookById(e).element;t.deactivate(n,!0),i.remove(s),this.hook.dispatchEvent(new CustomEvent("entitySuggestUpdateCount",{detail:{type:"remove",index:c}}))}.bind(this))}},l.prototype.emptyListChecker=function(t){Object.keys(this.entities).length?t():this.emptyBlockCallback?s.ajax({url:this.emptyBlockCallback}).done((function(e,i,n){t(),s.updateBlockModelCallback(e,i,n)})):(this.hook.classList.add("invisible"),t())},l.prototype.setEntityState=function(t,e){var i=this.entities[t];if(i&&i.state!==e){var s=i.element.classList;switch(e){case o.READY:s.remove("__loaded");break;case o.HIDE:s.remove("__highlight"),s.add("__hide");break;case o.SUCCESS:case o.PROCESS:case o.ERROR:s.remove("__success","__process","__error","__highlight"),s.add("__"+e)}i.state=e}},l.prototype.getRenderingList=function(){return Object.keys(r[this.type].commonEntities)},l.prototype.prepareRequest=function(t){var e=r[this.type].commonEntities[t],i=[],s=[];e.forEach((function(t){i.push(t.mode),s.push(t.size||"")}));for(var n=!1,o=0;o<e.length;o++)n=n||r[this.type].portlets[e[o].uniqueId()].largeCard;return{target:t,"st.modes":i.join(";"),list:this.getRenderingList().join(";"),disableShortcut:this.disableShortcut,largeCard:n,"st.sizes":s.join(";")}},l.prototype.processEntityModes=function(t,e){for(var i=r[this.type].commonEntities[t],s=0;s<i.length;s++){e(r[this.type].portlets[i[s].uniqueId()],s)}},l.prototype.setModesEntityState=function(t,e){this.processEntityModes(t,(function(i){i.setEntityState(t,e)}))},l.prototype.replaceContent=function(t,e){this.processEntityModes(t,(function(i,s){i.entities[t].newElementHTML=Array.isArray(e)?e[s]:null})),this.setModesEntityState(t,o.HIDE)},l.prototype.getEntityAttribute=function(t,e){return this.entities[t].element.getAttribute(e)},l.prototype.getActivityId=function(t,e){var i=e?"data-aid-accept":"data-aid-decline",s=e?this.activityIdAccept:this.activityIdDecline;return this.entities[t].element.getAttribute(i)||s},l.prototype.getAction=function(t,e){var i=e?"data-action-accept":"data-action-decline",s=e?this.actionAccept:this.actionDecline;return this.entities[t].element.getAttribute(i)||s},l.prototype.isUseOptimisticHandler=function(){return this.optimistic},l.prototype.defaultRequestHandler=function(t,e,i){var n=t.target;this.setModesEntityState(n,o.PROCESS),s.ajax({url:a[this.type],data:t}).done(function(s){if("function"==typeof e&&e.call(this,t,s),r[this.type].commonEntities[n])if(this.setModesEntityState(n,o.SUCCESS),s){var a=s.split(OK.navigation.SPLITER);setTimeout(this.replaceContent.bind(this,n,a),1e3)}else"function"==typeof i&&i.call(this,t)}.bind(this)).fail(function(){this.setModesEntityState(n,o.ERROR)}.bind(this))},l.prototype.optimisticRequestHandler=function(t){var e=t.target;this.replaceContent(e),s.ajax({url:a[this.type],data:t}).done(function(t){if(this.entities[e]&&this.entities[e].state===o.HIDE&&t){var i=t.split(OK.navigation.SPLITER);this.replaceContent(e,i)}}.bind(this))},l.prototype.register=function(t){for(var e=0;e<t.length;e++)this.addElement(t[e],o.READY,this.entitiesCount),this.entitiesCount++},l.prototype.append=function(e){var s,n=document.createElement("div");for(n.innerHTML=e,this.register(i.byClass(n,this.hookClass));s=n.firstElementChild;)this.hook.appendChild(s),t.activate(s);this.hook.dispatchEvent(new CustomEvent("entitySuggestUpdateCount",{detail:{type:"append"}}))},l.prototype.click=function(t,e){var i=e.getAttribute("data-entity-id");this.entities[i].state===o.READY&&(e.classList.contains("js-entity-decline")?this.declineEntity(i,e):e.classList.contains("js-entity-accept")&&this.acceptEntity(i,e))},l.prototype.appearance=function(t){var e=t.target.getAttribute("data-entity-id");if(e){var i=this.entities[e];i.state===o.HIDE&&this.replaceElement(e,i.newElementHTML),i.state===o.LOADED&&this.setEntityState(e,o.READY)}},l.prototype.getPortlets=function(t){return r[t].portlets},l.prototype.getCommonEntities=function(t){return r[t].commonEntities},l.prototype.activate=function(t){this.hook=t,this.entities={},this.entitiesCount=0,this.hookClass="js-entity-item",this.clickHandler=this.click.bind(this),this.appearanceHandler=this.appearance.bind(this),this.boundRegister=function(t){if(t.detail&&Array.isArray(t.detail.elements)){for(var e=[],s=0;s<t.detail.elements.length;s++){var n=t.detail.elements[s],o=n.classList.contains(this.hookClass)?n:i.firstByClass(n,this.hookClass);o&&e.push(o)}this.register(e)}}.bind(this),this.type=t.getAttribute("data-type"),this.mode=t.getAttribute("data-mode"),this.emptyBlockCallback=t.getAttribute("data-empty-block"),this.disableShortcut="true"===t.getAttribute("data-disable-shortcut"),this.largeCard="true"===t.getAttribute("data-large-card"),this.optimistic="true"===t.getAttribute("data-optimistic"),this.activityIdAccept=t.getAttribute("data-aid-accept"),this.activityIdDecline=t.getAttribute("data-aid-decline"),this.actionAccept=t.getAttribute("data-action-accept")||"add",this.actionDecline=t.getAttribute("data-action-decline")||"remove",this.delegator=new e(t),this.seenLogger=new n(t.getAttribute("data-seen-params"),this.entities),this.size=t.getAttribute("data-size"),this.register(i.byClass(this.hook,this.hookClass)),this.hook.addEventListener("animationend",this.appearanceHandler),this.hook.addEventListener("dataload",this.boundRegister),this.delegator.on("click",".js-entity-accept, .js-entity-decline",this.click.bind(this)),r[this.type].portlets[this.uniqueId()]=this,t.setAttribute("data-entity-suggest-id",this.uniqueId())},l.prototype.deactivate=function(){for(var t in this.seenLogger.deactivate(),delete r[this.type].portlets[this.uniqueId()],this.entities){if(this.entities.hasOwnProperty(t))if(r[this.type].commonEntities[t].length>1){var e=r[this.type].commonEntities[t].indexOf(this);r[this.type].commonEntities[t].splice(e,1)}else delete r[this.type].commonEntities[t]}this.hook.removeEventListener("animationend",this.appearanceHandler),this.hook.removeEventListener("dataload",this.boundRegister),this.delegator.off()},l})),define("OK/entitySuggest/PYMKCard",["OK/entitySuggest/AbstractEntitySuggest"],(function(t){"use strict";function e(){t.call(this)}return e.prototype=Object.create(t.prototype),e.prototype.acceptEntity=function(t){var e=this.prepareRequest(t);e["st._aid"]=this.getActivityId(t,!0),e.action=this.getAction(t,!0),this.isUseOptimisticHandler()?this.optimisticRequestHandler(e):this.defaultRequestHandler(e)},e.prototype.declineEntity=function(t){var e=this.prepareRequest(t);e.action=this.actionDecline,e["st._aid"]=this.getActivityId(t,!1),this.optimisticRequestHandler(e)},e})),define("OK/entitySuggest/PYMKWithRelationsWithTabs",["OK/entitySuggest/AbstractEntitySuggest","OK/utils/utils"],(function(t,e){"use strict";function i(){t.call(this)}return i.prototype=Object.create(t.prototype),i.prototype.acceptEntity=function(t,i){if(i.getAttribute("data-goto-second-screen")){(s=this.prepareRequest(t))["st._aid"]=this.getActivityId(t,!0),s.action=this.getAction(t,!0),(n=i.getAttribute("data-additional-log-attr"))&&(s.logAttr=n),e.ajax({url:"/dk?cmd=AddPossibleFriend",data:s}),this.switchTab(t,"__select-relation")}else{var s,n,o=i.getAttribute("data-relsAdd");(s=this.prepareRequest(t))["st._aid"]=this.getActivityId(t,!0),s.action=this.getAction(t,!0),(n=i.getAttribute("data-additional-log-attr"))&&(s.logAttr=n),s.relsAdd=o,this.optimisticRequestHandler(s)}},i.prototype.switchTab=function(t,e){var i=this.entities[t];if(i){var s=i.element.classList;if(s.contains(e))return;switch(e){case"__select-friend":s.remove("__select-relation"),s.add("__select-friend");break;case"__select-relation":s.add("__select-relation"),s.remove("__select-friend")}}},i.prototype.declineEntity=function(t,e){var i=this.prepareRequest(t),s=e.getAttribute("data-additional-log-attr");s&&(i.logAttr=s),i.action=this.actionDecline,i["st._aid"]=this.getActivityId(t,!1),this.optimisticRequestHandler(i)},i})),define("OK/entitySuggest/PYMKRelationsCard",["OK/entitySuggest/AbstractEntitySuggest"],(function(t){"use strict";function e(){t.call(this)}return e.prototype=Object.create(t.prototype),e.prototype.acceptEntity=function(t,e){var i=this.prepareRequest(t);i["st._aid"]=this.getActivityId(t,!0),i.action=this.getAction(t,!0),i.relsAdd=e.getAttribute("data-relsAdd"),this.optimisticRequestHandler(i)},e.prototype.declineEntity=function(t){var e=this.prepareRequest(t);e.action=this.actionDecline,e["st._aid"]=this.getActivityId(t,!1),this.optimisticRequestHandler(e)},e})),define("OK/entitySuggest/FriendshipCard",["OK/entitySuggest/AbstractEntitySuggest","OK/ToolbarBubble","OK/FriendshipCardCounters","OK/utils/utils"],(function(t,e,i,s){"use strict";function n(){t.call(this)}return n.prototype=Object.create(t.prototype),n.prototype.getRenderingList=function(){if("wideportlet"===this.mode)return[];var e=t.prototype.getRenderingList.call(this),i=e.indexOf("wideportlet");return-1!==i&&e.splice(i,1),e},n.prototype.acceptEntity=function(t){var e=this.prepareRequest(t),i=this.getEntityAttribute(t,"data-item-action-accept");e["st._aid"]=this.getActivityId(t,!0),e.action=null==i?this.actionAccept:i;var s=this.getEntityAttribute(t,"data-item-fbp-photoid"),n=this.getEntityAttribute(t,"data-item-fbp-hash");null!=s&&null!=n&&(e.fbpPhotoId=s,e.fbpHash=n),this.switchStatus(t,this.actionAccept),this.defaultRequestHandler(e,this.onAcceptResponseCallback,this.onEmptyResponse)},n.prototype.declineEntity=function(t){var e=this.prepareRequest(t),i=this.getEntityAttribute(t,"data-item-action-decline");e.action=null==i?this.actionDecline:i,e["st._aid"]=this.getActivityId(t,!1);var s=this.getEntityAttribute(t,"data-item-fbp-photoid"),n=this.getEntityAttribute(t,"data-item-fbp-hash");null!=s&&null!=n&&(e.fbpPhotoId=s,e.fbpHash=n),this.switchStatus(t,this.actionDecline),this.defaultRequestHandler(e,this.onDeclineResponseCallback,this.onEmptyResponse)},n.prototype.onAcceptResponseCallback=function(t,e){"wideportlet"===this.mode&&e&&this.replaceElement(t.target,e),this.decreaseFriendshipRequestCounters()},n.prototype.onDeclineResponseCallback=function(t,e){this.decreaseFriendshipRequestCounters()},n.prototype.decreaseFriendshipRequestCounters=function(){("revoke"==this.actionDecline?["counter_outgoingFriendRequestsPage"]:["counter_friendRequestsPage","counter_Toolbar_friends","counter_friendRequestBurningHeader"]).forEach((function(t){var i=e.wrap(t);i&&i.decrease(1)})),i.decreaseCounters(this.type,1)},n.prototype.switchStatus=function(t,e){this.processEntityModes(t,function(i){var s=i.entities[t].element,n=s.getElementsByClassName("js-done")[0],o=s.getElementsByClassName("js-decline")[0];switch(e){case this.actionAccept:n.classList.remove("invisible"),o.classList.add("invisible");break;case this.actionDecline:n.classList.add("invisible"),o.classList.remove("invisible")}}.bind(this))},n.prototype.onEmptyResponse=function(e){var i=e.target;setTimeout(function(){this.processEntityModes(i,function(e){if(e.emptyBlockCallback){var i=!0;for(var n in e.entities){if(e.entities.hasOwnProperty(n))e.entities[n].state!==t.entityStateStatus.SUCCESS&&(i=!1)}i&&s.ajax({url:e.emptyBlockCallback}).done((function(t,e,i){s.updateBlockModelCallback(t,e,i)}))}}.bind(this))}.bind(this),1e3)},n})),define("OK/entitySuggest/SetSuccessCardStatus",["OK/entitySuggest/AbstractEntitySuggest","OK/entitySuggest/FriendshipCard"],(function(t,e){"use strict";var i=["friendshipRequests","pymk","commonFriends","friendship","recommendations"];function s(){t.call(this)}return s.prototype=Object.create(t.prototype),s.prototype.setSuccess=function(){for(var s=t.typeStorage,n=0;n<i.length;n++)this.type=i[n],s[this.type].commonEntities[this.entityId]&&("friendshipRequests"===this.type&&e.prototype.switchStatus.call(this,this.entityId,this.actionAccept),this.setModesEntityState(this.entityId,t.entityStateStatus.SUCCESS))},s.prototype.activate=function(t){this.element=t,this.entityId=this.element.getAttribute("data-entity-id"),this.boundSetSuccess=this.setSuccess.bind(this),this.element.addEventListener("click",this.boundSetSuccess,!1)},s.prototype.deactivate=function(){this.element.removeEventListener("click",this.boundSetSuccess,!1)},s})),define("b/entitySuggest",["OK/entitySuggest/AbstractEntitySuggest","OK/entitySuggest/PYMKCard","OK/entitySuggest/PYMKWithRelationsWithTabs","OK/entitySuggest/PYMKRelationsCard","OK/entitySuggest/FriendshipCard","OK/entitySuggest/EntitySuggestSeenLogger","OK/entitySuggest/SetSuccessCardStatus"],{});
//# sourceMappingURL=/res/source-maps/js/b/entitySuggest.js.map