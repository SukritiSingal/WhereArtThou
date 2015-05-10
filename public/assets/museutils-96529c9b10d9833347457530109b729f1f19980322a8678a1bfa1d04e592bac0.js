/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2011 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
"undefined"==typeof Muse&&(window.Muse={}),Muse.Assert={},Muse.Assert.fail=function(e){alert("MuseJSAssert: "+e)},Muse.Assert.assert=function(e,t){if(!e)throw Error(t)},$.extend($.browser,{SafariMobile:navigator.userAgent.toLowerCase().match(/iP(hone|ad|od)/i)}),Array.indexOf||(Array.prototype.indexOf=function(e){for(var t=0;t<this.length;++t)if(this[t]==e)return t;return-1}),Muse.Plugins={},Muse.Utils={},Muse.Utils.getCssVendorPrefix=function(){return Muse.Utils.isDefined(Muse.Utils.getCssVendorPrefix.flag)||(Muse.Utils.getCssVendorPrefix.flag=/webkit/i.test(navigator.appVersion)?"-webkit":/firefox/i.test(navigator.userAgent)?"-moz":/trident/i.test(navigator.userAgent)?"-ms":"opera"in window?"-o":""),Muse.Utils.getCssVendorPrefix.flag},Muse.Utils.wrapElement=function(e,t){e.parentNode.replaceChild(t,e),t.appendChild(e)},Muse.Utils.firstChild=function(e,t){for(var i=0;i<e.childNodes.length;i++){var s=e.childNodes[i];if(1==s.nodeType&&(!t||t.matches(s)))return s}return null},Muse.Utils.firstDescendant=function(e,t,i){for(var s=0;s<e.childNodes.length;s++){var r=e.childNodes[s];if(1==r.nodeType){if(!t||t.matches(r))return r;if((!i||!i.matches(r))&&(r=Muse.Utils.firstDescendant(r,t,i)))return r}}return null},Muse.Utils.descendants=function(e,t,i,s){s||(s=[],s.forEach=function(e){for(var t=0;t<this.length&&!e(this[t]);t++);},s.forEachTry=function(e){for(var t=0;t<this.length;t++)try{if(e(this[t]))break}catch(i){}});for(var r=0;r<e.childNodes.length;r++){var n=e.childNodes[r];1==n.nodeType&&((!t||t.matches(n))&&s.push(n),(!i||!i.matches(n))&&Muse.Utils.descendants(n,t,i,s))}return s},Muse.Utils.children=function(e,t){return Muse.Utils.descendants(e,t,Muse.Utils.Match.always)},Muse.Utils.Match={},Muse.Utils.Match.ByClass=function(e){this.cl=e},Muse.Utils.Match.ByClass.prototype.matches=function(e){return $(e).hasClass(this.cl)},Muse.Utils.Match.ByNodeName=function(e){this.nm=e.toLowerCase()},Muse.Utils.Match.ByNodeName.prototype.matches=function(e){return this.nm==e.nodeName.toLowerCase()},Muse.Utils.Match.ByFixed=function(e){this.matchResult=e},Muse.Utils.Match.ByFixed.prototype.matches=function(){return this.matchResult},Muse.Utils.Match.byClass=function(e){return new Muse.Utils.Match.ByClass(e)},Muse.Utils.Match.byNodeName=function(e){return new Muse.Utils.Match.ByNodeName(e)},Muse.Utils.Match.byFixed=function(e){return new Muse.Utils.Match.ByFixed(e)},Muse.Utils.Match.always=Muse.Utils.Match.byFixed(!0),Muse.Utils.Match.never=Muse.Utils.Match.byFixed(!1),Muse.Utils.moveChildren=function(e,t){for(;e.childNodes.length>0;)t.appendChild(e.childNodes[0])},Muse.Utils.copyChildren=function(e,t){for(var i=0;i<e.childNodes.length;i++)t.appendChild(e.childNodes[i].cloneNode(!0))},Muse.Utils.copyChildrenBefore=function(e,t){for(var i=0;i<e.childNodes.length;i++)t.parentNode.insertBefore(e.childNodes[i].cloneNode(!0),t)},Muse.Utils.pixelRound=function(e){return Math.floor((100*e+.5)/100)},Muse.Utils.getCurrentHTMLFileName=function(e){var t=document.location.href;return"/"==t.charAt(t.length-1)?t="index":(t=t.substring(t.lastIndexOf("/")+1),t=0==t.indexOf("#")?"index":t.substring(0,t.lastIndexOf("."))),e&&(t+=".html"),t},Muse.Utils.getPageStyleSheet=function(){for(var e=0;e<document.styleSheets.length;++e){var t=document.styleSheets[e],i=t.ownerNode?t.ownerNode:t.owningElement;if(i&&"pagesheet"==i.id)return t}},Muse.Utils.getStyleSheetRuleById=function(e,t){var i="#"+t.toLowerCase();return Muse.Utils.anyStyleSheetRule(e,function(e){return e.toLowerCase()==i})},Muse.Utils.anyStyleSheetRule=function(e,t){var i,s=!1;try{i=e.cssRules}catch(r){}if(i||(s=!0,i=e.rules),!i)return null;for(var n=0;n<i.length;++n){var o=i[n];if(Muse.Utils.isDefined(o.selectorText))if(s){if(t(o.selectorText))return o}else for(var a=o.selectorText.split(/\s*,\s*/),u=0;u<a.length;u++)if(t(a[u]))return o}return null},Muse.Utils.getRuleProperty=function(e,t){return e.style.getPropertyValue?e.style.getPropertyValue(t):e.style.getAttribute(t)},Muse.Utils.setRuleProperty=function(e,t,i){e.style.setProperty?e.style.setProperty(t,i,""):e.style.setAttribute(t,i,0)},Muse.Utils.removeRuleProperty=function(e,t){e.style.removeProperty?e.style.removeProperty(t):e.style.removeAttribute(t,0)},Muse.Utils.cloneStyleSheetRule=function(e){Muse.Utils.isDefined(Muse.Utils.cloneStyleSheetRule.newNumber)||(Muse.Utils.cloneStyleSheetRule.newNumber=1);var t=Muse.Utils.getPageStyleSheet(e),i=Muse.Utils.getStyleSheetRuleById(t,e),s="c"+Muse.Utils.cloneStyleSheetRule.newNumber++,r="#"+s;return t.insertRule?t.insertRule(i.cssText.replace("#"+e,r),t.cssRules.length):t.addRule(r,i.style.cssText),s},Muse.Utils.toCamelCase=function(e){for(var t=Muse.Utils.toCamelCase.exp;t.test(e);e=e.replace(t,RegExp.$1.toUpperCase()));return e},Muse.Utils.toCamelCase.exp=/-([a-z])/,Muse.Utils.getStyleValue=function(e,t){var i=e.style[Muse.Utils.toCamelCase(t)];return i||(document.defaultView?i=document.defaultView.getComputedStyle(e,"").getPropertyValue(t):e.currentStyle&&(i=e.currentStyle[Muse.Utils.toCamelCase(t)])),i&&i.match(/(\d+)px/)&&(i=parseInt(i.substring(0,i.length-2))),i},Muse.Utils.getCanvasDirection=function(e,t){var i=e.closest("*[data-rotate]"),i=i.length>0?parseFloat(i.data("rotate"))%360:0;return{dir:i>=0&&45>=i||i>=135&&225>=i||i>=315&&360>i?t:"horizontal"===t?"vertical":"horizontal",reverse:"horizontal"===t?i>=135&&315>=i:i>=45&&225>=i}},Muse.Utils.urlParam=function(e,t){var i=RegExp("[\\?&]"+t+"=([^&#]*)").exec(e);return i?i[1]:null},Muse.Utils.processHyperlink=function(e){var t=e.href,i=$(window),e=$(e),s=e.attr("target");if(!s||"_self"==s){var r=t.lastIndexOf("/"),s=t.lastIndexOf("#"),n=e.attr("class").match(/anim_(\w+)/);if(n&&s>r){var e=i.data("scrollWrapper"),o=t.substring(s),s=Muse.Utils.getAnchorWithDestination(o).offset(),t=n[1],a=e||window,r=document.documentElement||document.body,n=(e?e.scrollHeight():r.scrollHeight)-i.height(),i=(e?e.scrollWidth():r.scrollWidth)-i.width(),u=Math.min(n,s.top+(e&&!e.isStandard()?e.scrollTop():0)),l=Math.min(i,s.left+(e&&!e.isStandard()?e.scrollLeft():0)),i=function(){a.scrollTo(l,u);try{history.replaceState({})}catch(e){(!jQuery.browser.msie||jQuery.browser.version>7)&&(window.location.hash=o)}};try{history.pushState({},null,o)}catch(c){}if(window.scrollTo||void 0!==e){var e=e||$(document),d=e.scrollLeft(),h=e.scrollTop(),f=d,p=h;$({scrollDistance:0}).animate({scrollDistance:1},{duration:1e3,easing:t,step:function(e){0!=e&&(p=e*(u-h),f=e*(l-d),a.scrollTo(d+f,h+p))},complete:i})}else $("html,body").animate({scrollTop:u,scrollLeft:l},1e3,t,i);return!1}}return(i=Muse.Utils.urlParam(t,"devicelock"))&&Muse.Utils.createCookie("devicelock",i,0),!0};var actionStack=[];Muse.Utils.redirectCancelled=!1,Muse.Utils.redirectHyperlink=function(e){if(Muse.Utils.redirectCancelled)setTimeout(function(){Muse.Utils.redirectCancelled=!1},0);else if(actionStack=[],Muse.Utils.processHyperlink(e)&&!Muse.Utils.isIBE()){var t=$(e).attr("target");t||(t="_self"),window.open(e.href,t)}},Muse.Utils.redirectHyperlinkInNewTab=function(e,t){if(Muse.Utils.redirectCancelled)setTimeout(function(){Muse.Utils.redirectCancelled=!1},0);else{actionStack=[],thisWindow=window.self;var i=window.open(e);t?i.focus():thisWindow.focus()}},Muse.Utils.isMouseLeftClick=function(e){return 1==e.which},Muse.Utils.isMouseMiddleClick=function(e){return 2==e.which},Muse.Utils.isRedirectLinkKeyboardAction=function(e){return 13==e.which},Muse.Utils.addHyperlinkAnchor=function(e){e=$(e),e.bind("mousedown",function(e){(Muse.Utils.isMouseLeftClick(e)||Muse.Utils.isMouseMiddleClick(e))&&actionStack.push(this)}),e.bind("mouseup keyup",function(e){if(Muse.Utils.isMouseLeftClick(e)&&-1!=actionStack.indexOf(this))e.ctrlKey||e.metaKey?Muse.Utils.redirectHyperlinkInNewTab(this.href,e.shiftKey):Muse.Utils.redirectHyperlink(this);else if(Muse.Utils.isMouseMiddleClick(e)&&-1!=actionStack.indexOf(this)){if(!(jQuery.browser.webkit||!e.target.href&&jQuery.browser.msie))return actionStack=[],!0;Muse.Utils.redirectHyperlinkInNewTab(this.href,e.shiftKey)}else Muse.Utils.isRedirectLinkKeyboardAction(e)&&Muse.Utils.redirectHyperlink(this);return!1}),Muse.Utils.isIBE()||e.bind("click",function(){return!1})},Muse.Utils.addHyperlinkBlock=function(e){var t=$(e.parentNode);t.bind("mousedown",function(e){return(Muse.Utils.isMouseLeftClick(e)||Muse.Utils.isMouseMiddleClick(e))&&actionStack.push(this),!1}),t.bind("mouseup keyup",function(t){return Muse.Utils.isMouseLeftClick(t)&&-1!=actionStack.indexOf(this)?t.ctrlKey||t.metaKey?Muse.Utils.redirectHyperlinkInNewTab(e.href,t.shiftKey):Muse.Utils.redirectHyperlink(e):Muse.Utils.isMouseMiddleClick(t)&&-1!=actionStack.indexOf(this)?Muse.Utils.redirectHyperlinkInNewTab(e.href,t.shiftKey):Muse.Utils.isRedirectLinkKeyboardAction(t)&&Muse.Utils.redirectHyperlink(e),!1}),Muse.Utils.isIBE()||t.bind("click",function(){return!1})},Muse.Utils.prepHyperlinks=function(e){$("a.block").each(function(){var e=$(this.parentNode);Muse.Utils.addHyperlinkBlock(this),e.find("a.nonblock").each(function(){var e=$(this);return e.data("registeredNonBlockLink")===!0?!1:(Muse.Utils.addHyperlinkAnchor(this),void e.data("registeredNonBlockLink",!0))})}),$("a.nonblock").each(function(){var e=$(this);e.data("registeredNonBlockLink")!==!0&&(e.parent('[class~="sbg"]').length>0?Muse.Utils.addHyperlinkAnchor(this):(e.attr("class").match(/anim_(\w+)/)||-1!=this.href.indexOf("devicelock="))&&$(this).bind("click",function(){return Muse.Utils.processHyperlink(this)}))}),e&&Muse.Utils.enableAnchorLinksActiveState()},Muse.Utils.pathOnly=function(e){return e?e.replace(/#(?:[^#]+)$/,"").replace(/\?(?:[^\?]+)$/,""):e},Muse.Utils.enableAnchorLinksActiveState=function(){var e=$("#page"),t=e.outerWidth()/e.outerHeight()>2,i=[],e=$(window),s=Muse.Utils.getPageStyleSheet(),r=function(e){var t=e.parent('[class~="sbg"]');return e.hasClass("MenuItem")||t.hasClass("MenuItem")?"MuseMenuActive":e.hasClass("Button")||t.hasClass("Button")?"ButtonSelected":"MuseLinkActive"},n=function(){i.splice(0,i.length),$("a.nonblock,a.block").each(function(){Muse.Utils.saveHyperlinkInfo($(this),r($(this)),s,t,i)}),i.sort(function(e,t){return e.from<t.from?-1:e.from>t.from?1:0})};if(n(),0!=i.length){var o=!1,a=e.data("scrollWrapper"),u=a||e,l=function(){o=!1;var e,s=t?u.scrollLeft():u.scrollTop();e:{var l=0;e=i.length;for(var c;e>l;l++)if(c=i[l],c.from<=s&&s<=c.to){e=l;break e}e=-1}var d,h,l=Math.max(0,e);for(e=Math.min(e+2,i.length);e>l;l++)if(d=i[l],c=d.$elem.offset().left+(a&&!a.isStandard()?a.scrollLeft():0),h=d.$elem.offset().top+(a&&!a.isStandard()?a.scrollTop():0),d.from!=(t?c:h)){n();break}for(l=0,e=i.length;e>l;l++){d=i[l],c=d.from<=s&&s<=d.to,d=d.hyperLinks,h=void 0;for(var f=0;f<d.length;f++)h=r(d[f]),c&&!d[f].hasClass(h)?d[f].addClass(h):!c&&d[f].hasClass(h)&&d[f].removeClass(h)}},c=function(){o||(o=!0,Muse.Utils.requestAnimationFrame(l))};(a=e.data("scrollWrapper"))?a.registerUpdateCallback(c):e.scroll(c),l()}},Muse.Utils.getAnchorWithDestination=function(e){return $(e&&e.replace?e.replace(/([\.\:])/gi,"\\$1"):e)},Muse.Utils.saveHyperlinkInfo=function(e,t,i,s,r){var n=e.attr("href"),o=Muse.Utils.pathOnly(n),a=-1,u=e.attr("target"),l=window.location.href.replace(/#.*$/i,"");if(!(!n||-1==n.indexOf("#")||u&&"_self"!=u||0<=o.indexOf("/")||("/"==l.charAt(l.length-1)&&(l+="index.html"),-1==l.indexOf("/"+o,l.length-o.length-1)))){var o=$(window).data("scrollWrapper"),c=n.substring(n.lastIndexOf("#")),e=e.parent('[class~="sbg"]').length>0||e.hasClass("block")?e.parent():e,d="#"+e.attr("id"),t="."+t;if(null!==Muse.Utils.anyStyleSheetRule(i,function(e){return 0<=e.indexOf(d+t)||0<=e.indexOf(t+d)})){for(u=0,l=r.length;l>u;u++)if(r[u].href==n){a=u;break}if(-1==a){if(i=Muse.Utils.getAnchorWithDestination(c),0===i.length)return;for(u=o&&!o.isStandard(),s=Math.floor(s?i.offset().left+(u?o.scrollLeft():0):i.offset().top+(u?o.scrollTop():0)),o=Number.MAX_VALUE,u=0,l=r.length;l>u;u++)if(r[u].href!=n&&r[u].from==s){a=u;break}if(-1==a){for(u=0,l=r.length;l>u;u++){if(a=r[u],a.from<s&&s<a.to){o=a.to,a.to=s-1;break}a.from<=o&&(o=a.from-1)}r.push({hyperLinks:[],from:s,to:o,$elem:i,href:n}),a=r.length-1}}r[a].hyperLinks.push(e)}}},Muse.Utils.isIBE=function(){return"true"==Muse.Utils.readCookie("inbrowserediting")},Muse.Utils.getNaturalWidth=function(e){var t=-1;return null!=e.naturalWidth?t=e.naturalWidth:e.runtimeStyle?(e.runtimeStyle.width="auto",e.runtimeStyle.height="auto",e.runtimeStyle.borderWidth="0",e.runtimeStyle.padding="0",t=e.offsetWidth,e.runtimeStyle.width="",e.runtimeStyle.height="",e.runtimeStyle.borderWidth="",e.runtimeStyle.padding=""):(e=e.cloneNode(!0),e.className="",e.style.width="auto !important",e.style.height="auto !important",e.style.borderWidth="0 !important",e.style.padding="0 !important",t=e.width),t},Muse.Utils.getNaturalHeight=function(e){var t=-1;return null!=e.naturalHeight?t=e.naturalHeight:e.runtimeStyle?(e.runtimeStyle.width="auto",e.runtimeStyle.height="auto",e.runtimeStyle.borderWidth="0",e.runtimeStyle.padding="0",t=e.offsetHeight,e.runtimeStyle.width="",e.runtimeStyle.height="",e.runtimeStyle.borderWidth="",e.runtimeStyle.padding=""):(e=e.cloneNode(!0),e.className="",e.style.width="auto !important",e.style.height="auto !important",e.style.borderWidth="0 !important",e.style.padding="0 !important",t=e.height),t},Muse.Utils.pieLoading=!1,Muse.Utils.pieFunctionQueue=[],Muse.Utils.needPIE=function(e){Muse.Utils.havePIE?e():(Muse.Utils.pieFunctionQueue.push(e),Muse.Utils.pieLoading||(Muse.Utils.pieLoading=!0,e="scripts/pie.js","/"==e[0]&&(e=-1!=location.pathname.indexOf(".html")?location.pathname.substring(0,location.pathname.lastIndexOf("/"))+e:location.pathname+e,e=e.replace(/\/+/g,"/")),$.ajax({url:e,dataType:"script",complete:function(){if(Muse.Utils.isDefined(window.PIE)){Muse.Utils.havePIE=!0,Muse.Utils.pieLoading=!1;for(var e=0;e<Muse.Utils.pieFunctionQueue.length;++e)Muse.Utils.pieFunctionQueue[e]()}}})))},Muse.Utils.transformMarkupToFixBrowserProblemsPreInit=function(){jQuery.browser.msie?(jQuery("html").addClass("ie"),jQuery.browser.version<8&&Muse.Utils.changeLItoDIVs(),jQuery.browser.version<=8&&Muse.Utils.monitorCheckboxes()):jQuery.browser.SafariMobile&&jQuery("body").css("-webkit-text-size-adjust","none")},Muse.Utils.monitorCheckboxes=function(){var e=function(e){"checked"==e.attr("checked")?e.removeClass("not_checked").addClass("checked"):e.removeClass("checked").addClass("not_checked")};$(".fld-checkbox input[type=checkbox]").each(function(){e($(this))}).click(function(){e($(this))})},Muse.Utils.transformMarkupToFixBrowserProblems=function(){Muse.Utils.havePIE=!1,jQuery.browser.msie&&jQuery.browser.version<=9&&(jQuery.browser.version<=9&&(Muse.Utils.addGradientFill(),Muse.Utils.addShadows()),jQuery.browser.version<9&&(Muse.Utils.applyIEFilterToPNGImages(),Muse.Utils.addRoundedCorners(),Muse.Utils.addRGBA(),Muse.Utils.removeEdgeAnimationBorderForIE78()),jQuery.browser.version<8&&Muse.Utils.fixWidthsForClearingInIE7()),(jQuery.browser.msie&&jQuery.browser.version<9||jQuery.browser.webkit)&&Muse.Utils.insertEmptyDivAfterPinnedColumnElements(),Muse.Utils.fixTransformRotations(),Muse.Utils.fixImageFramesWithRoundedCorners(),Muse.Utils.fixSVGImages();var e=$(window).data("musePolyfill.bgSize");null!=e&&e.initialize($(".museBGSize"))},Muse.Utils.fixSVGImages=function(){var e=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),t=$("html");e||(t.addClass("nosvg"),$("body img").each(function(){var e=$(this),t=e.data("mu-svgfallback");t&&e.attr("src",t)}))},Muse.Utils.applyIEFilterToPNGImages=function(){jQuery.browser.msie&&jQuery.browser.version<9&&$("body *").not(".museBgSizePolyfill img,.f3s_top,.f3s_mid,.f3s_bot").each(function(){var e=$(this);if(!e.data("mu-ie-matrix")&&(e.css("background-image").match(/\b.png/i)||this.nodeName&&"img"==this.nodeName.toLowerCase()&&e.attr("src").match(/\b.png/i))){var t=e.css("filter");e.css("filter",t?t+" progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)":"progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)")}})},Muse.Utils.insertEmptyDivAfterPinnedColumnElements=function(){$(".pinned-colelem").each(function(){$("<div class='colelem'/>").insertAfter($(this))})},Muse.Utils.fixPNGImages=function(){$("body *").each(function(){var e=this,t=$(e);(t.css("background-image").match(/\b.png/i)||e.nodeName&&"img"==e.nodeName.toLowerCase()&&t.attr("src").match(/\b.png/i))&&Muse.Utils.needPIE(function(){t.css("-pie-png-fix","true"),PIE.attach(e)})})},Muse.Utils.addGradientFill=function(){$(".gradient").each(function(){var e=this;Muse.Utils.needPIE(function(){PIE.attach(e)})})},Muse.Utils.addShadows=function(){$(".shadow").each(function(){var e=this,t=$(e);Muse.Utils.needPIE(function(){t.data("mu-ie-matrix")||PIE.attach(e)})})},Muse.Utils.fixImageFramesWithRoundedCorners=function(){Muse.Browser.Features.checkCSSFeature("border-radius")&&Muse.Browser.Features.checkCSSFeature("-webkit-border-radius")&&$(".rounded-corners").each(function(){if($(this).hasClass("clip_frame")){var e=Muse.Utils.firstDescendant(this,Muse.Utils.Match.byNodeName("img"));e&&$(e).wrap('<div class="clip_frame"></div>')}})},Muse.Utils.addRoundedCorners=function(){$(".rounded-corners").each(function(){var e=this;Muse.Utils.needPIE(function(){var t=$(e);if(!t.data("mu-ie-matrix")){var i=t.css("filter");if(!i||!(i.toLowerCase().indexOf("opacity")>0&&i.indexOf("=100")<0)){if(e.childNodes.length&&!Muse.Browser.Features.checkCSSFeature("border-radius")&&(i=Muse.Utils.firstChild(e))&&"img"==i.nodeName.toLowerCase()){var i=$(i),s=i.attr("src"),r=t.css("background-color")+" ",n=i.css("margin-left");("0px"==n||"auto"==n)&&(n=i.css("padding-left"));var o=i.css("margin-top");("0px"==o||"auto"==o)&&(o=i.css("padding-top")),i.css("visibility","hidden"),t.css("background",r+"url("+s+") no-repeat "+n+" "+o)}!(jQuery.browser.msie&&jQuery.browser.version<8)||0!=t.css("border-left-width")&&"none"!=t.css("border-left-style")||0!=t.css("border-right-width")&&"none"!=t.css("border-right-style")||0!=t.css("border-top-width")&&"none"!=t.css("border-top-style")||0!=t.css("border-bottom-width")&&"none"!=t.css("border-bottom-style")||(t.css({"border-right-width":"1px","border-right-style":"solid","border-right-color":t.css("background-color")}),t.width(t.width()-1)),PIE.attach(e)}}})})},Muse.Utils.addRGBA=function(){$(".rgba-background").each(function(){var e=this;Muse.Utils.needPIE(function(){PIE.attach(e)})})},Muse.Utils.resizeHeight=function(){$(".browser_width").each(function(){var e=$(this),t=e;e.parent().hasClass("sbg")&&(t=e.parent()),e=$(e.children()[0]),"fixed"!=e.css("position")&&(t.height(e.outerHeight()),e.watch("height",function(){t.height($(this).outerHeight())}))})},Muse.Utils.fixWidthsForClearingInIE7=function(){$(".colelem").each(function(){var e=$(this).offset().left-$(this).parent().offset().left;($(this).width()<1||$(this).width()+e<1)&&$(this).css("width",(0>e?1-e:1)+"px")})},Muse.Utils.removeEdgeAnimationBorderForIE78=function(){$(".animationContainer").each(function(){$(this).parent().html(function(e,t){return t.replace(/><\/iframe>$/gi,' frameBorder="0"></iframe>')})})},Muse.Utils.initializeAnimations=function(e){var t=function(t){if(!0===e){var i=t.contents();$("#report-abuse",i).remove(),$("#report-abuse-spacer",i).remove()}t.removeClass("an_invi")};$(".animationContainer").each(function(){var e=$(this);Muse.Utils.isIBE()||this.contentDocument&&"complete"==this.contentDocument.readyState?t(e):e.load(function(){t(e)})})},Muse.Utils.fixTransformRotations=function(){Muse.Browser.Features.checkCSSFeature("transform")||$("*[data-mu-ie-matrix]").each(function(){var e=$(this),t=e.parent(),i=Math.round(e.data("mu-ie-matrix-dx")),s=Math.round(e.data("mu-ie-matrix-dy")),r=t.innerHeight(),n=t.innerWidth();e.css({filter:function(t,i){return i?i+" "+e.data("mu-ie-matrix"):e.data("mu-ie-matrix")},"margin-bottom":"-="+s}).removeClass("shadow"),t.css({"margin-bottom":"-="+(t.innerHeight()-r),"margin-right":"-="+(t.innerWidth()-n)}),e.hasClass("actAsDiv")?(e.wrap('<span class="actAsDiv rotateWrapper"></span>'),e.parent().css("float",e.css("float"))):e.wrap(e.hasClass("actAsInlineDiv")?'<span class="actAsInlineDiv rotateWrapper"></span>':'<div class="rotateWrapper"></div>'),e.parent().css({top:s,left:i,position:"relative","margin-bottom":s})})},Muse.Utils.fullPage=function(e){$(window).data("stickyFooter").init(e)},Muse.Utils.endsWith=function(e,t){return e&&t?(Muse.Assert.assert("string"==typeof e,'Invalid type for "str" argument - expected string.'),Muse.Assert.assert("string"==typeof t,'Invalid type for "ending" argument - expected string.'),e.substring(e.length-t.length)==t):!1},Muse.Utils.firstDefined=function(){for(var e=0;e<arguments.length;e++)if(Muse.Utils.isDefined(arguments[e]))return arguments[e]},Muse.Utils.isDefined=function(e){return"undefined"!=typeof e},Muse.Utils.getCSSIntValue=function(e,t){return Muse.Utils.tryParse(e.css(t),parseInt,0)},Muse.Utils.tryParse=function(e,t,i){return Muse.Utils.isDefined(e)?(e=t(e),isNaN(e)?i:e):i},Muse.Utils.changeLItoDIVs=function(){var e=function(){var e=$(this),t=$("<div/>");t.addClass(e.attr("class")),t.attr("id",e.attr("id")),t.append(e.contents()),e.replaceWith(t)};$("ul").each(function(){$(this).find("li").each(e)}),$("ul").each(e)},Muse.Utils.initWidget=function(e,t){$(e).each(function(){t(this)})},Muse.Utils.showWidgetsWhenReady=function(){jQuery(".disn").removeClass("disn"),jQuery(".invi").removeClass("invi"),jQuery(".widget_invisible").removeClass("widget_invisible")},Muse.Utils.detachIframesAndObjectsToPauseMedia=function(e){var t=[],i=[];$("iframe, object",e).each(function(){var e=$(this);if(!e.is("object")||!(jQuery.browser.msie&&jQuery.browser.version<9)){if(e.is("iframe")){var s=e.prop("src");if(""==s||!s||!s.indexOf)return;if(0<=s.indexOf("vimeo.com"))return Muse.Utils.VimeoVideoHelper.pause(e),void i.push({$node:e,playFn:function(e){Muse.Utils.VimeoVideoHelper.seekTo(e,0),Muse.Utils.VimeoVideoHelper.isAutoPlay(e)&&Muse.Utils.VimeoVideoHelper.play(e)}})}s={},s.$next=e.next(),s.$parent=e.parent(),jQuery.browser.msie?(s.html=e.wrap('<div id="deleteMeWrapper"/>').parent().html(),e.remove(),s.$parent.children("div #deleteMeWrapper").remove()):(s.$node=e.clone(),e.remove()),t.push(s)}}),t.length&&e.data("detached",t),i.length&&e.data("paused",i),$("video",e).each(function(){jQuery.browser.msie&&9==jQuery.browser.version&&this.pause&&this.getAttribute("autoplay")&&4!=this.readyState?$(this).one("play",function(){this.pause()}):this.pause&&!this.paused&&this.pause()})},Muse.Utils.attachIframesAndObjectsToResumeMedia=function(e){var t=e.data("detached");if(t){for(var i=t.length-1;i>=0;i--){var s=t[i];s.$next&&0!=s.$next.length?s.$next.before(s.$node?s.$node:s.html):s.$parent.append(s.$node?s.$node:s.html),s.$next=s.$parent=s.$node=s.html=void 0}e.data("detached",null)}if(t=e.data("paused"))for(i=0;i<t.length;i++)s=t[i],s.playFn(s.$node);$("iframe",e).each(function(){var e=$(this),t=e.attr("src"),i=e.data("src");"about:blank"==t&&i&&e.attr("src",i)}),$("video",e).each(function(){this.play&&this.getAttribute("autoplay")&&this.paused&&(this.currentTime=0,this.play())})},Muse.Utils.VimeoVideoHelper=function(e){var t=[],i=function(e,t){if(1==e.data("isReady"))t();else{var i=e.data("readyQueue");i||(i=[]),i.push(t),e.data("readyQueue",i)}},s=function(e,i,s,r){var n=e[0].contentWindow;r&&t.push({source:n,method:i,callbackFn:r}),i='"method": "'+i+'"',"undefined"!=typeof s&&null!==s&&(i+='"value":"'+s+'"'),e=e.attr("src").split("?")[0],e.match(/^\w+\:\/\//gi)||(e=document.location.protocol+e),n.postMessage("{"+i+"}",e)},r=function(t){data=null,JSON&&JSON.parse&&(data=JSON.parse(t.data));var i=null;return data&&data.player_id&&(i=e("#"+data.player_id)),(!i||!i.length)&&e("iframe").each(function(){return this.contentWindow==t.source?(i=e(this),!1):void 0}),i},n=function(e){var i=JSON.parse(e.data);if(i){if("ready"==i.event){var s=r(e);s.data("isReady",!0);var n=s.data("readyQueue");if(n&&n.length)for(var o=0;o<n.length;o++)n[o]();s.data("readyQueue",null)}for(o=0;o<t.length;)s=t[o],s.source==e.source&&s.method==i.method?(s.callbackFn(i.value),t.splice(o,1)):o++}};return window.addEventListener?window.addEventListener("message",n,!1):window.attachEvent("onmessage",n,!1),n=function(){},n.prototype.play=function(e){i(e,function(){s(e,"play")})},n.prototype.pause=function(e){i(e,function(){s(e,"pause")})},n.prototype.isPaused=function(e,t){i(e,function(){s(e,"paused",null,t)})},n.prototype.seekTo=function(e,t){i(e,function(){s(e,"seekTo",t)})},n.prototype.isAutoPlay=function(e){e=e.attr("src").split("?"),e.shift();for(var e=e.join("?").split("&"),t=0;t<e.length;t++)if(e[t].match(/autoplay\s*=\s*1/gi))return!0;return!1},new n}(jQuery),function(e){e(window);var t=e("html"),i=["src"],s=["hidpi-src","src"],r=e(".hidpi_button"),n=function(){this._mode="standard"};n.swapSources=function(e,t,i){var s=e.data(t);s&&!("src"==t&&e.hasClass("ImageInclude")&&"images/blank.gif"==e.attr("src")&&e.parents(".SlideShowWidget").length)&&("src"==i&&!e.data(i)&&e.data(i,e.attr("src")),e.attr("src",s))},n.isRetina=function(){return 1.5<=window.devicePixelRatio?!0:window.matchMedia&&window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)").matches?!0:!1}(),n.shouldUseCookie=0<r.length,n.getResolutionPreference=function(){return Muse.Utils.readCookie("museresolution")},n.saveResolutionPreference=function(e){Muse.Utils.createCookie("museresolution",e)},n.prototype.initializeHiDPIButton=function(){if(n.isRetina){var e=this;r.removeClass("unavailable").click(function(){switch(e._mode){case"standard":e.hidpiMode();break;case"hidpi":e.standardMode();break;default:Muse.Assert.assert(!1,"Unknown mode: "+e._mode)}})}},n.prototype.activate=function(){this.initializeHiDPIButton(),!n.isRetina||n.shouldUseCookie&&"hidpi"!=n.getResolutionPreference()?this.standardMode():this.hidpiMode()},n.prototype.getCurrentMode=function(){return this._mode},n.prototype.setCurrentMode=function(e){if(this._mode=e,n.isRetina){switch(e){case"standard":r.removeClass("on").addClass("off");break;case"hidpi":r.removeClass("off").addClass("on");break;default:Muse.Assert.assert(!1,"Unknown mode: "+e)}n.shouldUseCookie&&n.saveResolutionPreference(e)}},n.prototype.standardMode=function(){this.setCurrentMode("standard"),t.removeClass("hidpi"),e("img").each(function(){n.swapSources(e(this),"src","hidpi-src")})},n.prototype.hidpiMode=function(){this.setCurrentMode("hidpi"),t.addClass("hidpi"),e("img").each(function(){n.swapSources(e(this),"hidpi-src","src")})},n.prototype.getDataSrcAttrName=function(){return"standard"==this._mode?i:s},e(window).data("ResolutionManager",new n)}(jQuery),Muse.Utils.detectScreenResolution=function(){$(window).data("ResolutionManager").activate()},Muse.Utils.createCookie=function(e,t,i){if(i){var s=new Date;s.setTime(s.getTime()+864e5*i),i="; expires="+s.toGMTString()}else i="";document.cookie=e+"="+t+i+"; path=/"},Muse.Utils.readCookie=function(e){e+="=";for(var t=document.cookie.split(";"),i=0;i<t.length;i++){for(var s=t[i];" "==s.charAt(0);)s=s.substring(1,s.length);if(0==s.indexOf(e))return s.substring(e.length,s.length)}return null},Muse.Utils.eraseCookie=function(e){createCookie(e,"",-1)},Muse.Browser={},Muse.Browser.domPrefixes=["Webkit","Moz","O","ms","Khtml"],Muse.Browser.Features={},Muse.Browser.Features.Touch=function(){if(navigator.maxTouchPoints>0)return{Start:"pointerDown",End:"pointerUp",Move:"pointerMove",Listener:function(e){return function(t){var i=t.originalEvent||t;return i.pointerType!=i.POINTER_TYPE_MOUSE?e.apply(this,arguments):void 0}}};for(var e=0,t=Muse.Browser.domPrefixes.length;t>e;e++){var i=Muse.Browser.domPrefixes[e];if(i+"MaxTouchPoints"in navigator&&navigator[i+"MaxTouchPoints"])return i=i.toUpperCase(),{Start:i+"PointerDown",End:i+"PointerUp",Move:i+"PointerMove",Listener:function(e){return function(t){var s=t.originalEvent||t;return s.pointerType!=s[i+"POINTER_TYPE_MOUSE"]?e.apply(this,arguments):void 0}}}}try{return document.createEvent("TouchEvent"),{Start:"touchstart",End:"touchend",Move:"touchmove",Listener:function(e){return e}}}catch(s){}return!1}(),Muse.Browser.Features.checkCSSFeature=function(e,t){var i=Muse.Utils.toCamelCase(e),t=t||document.createElement("div");if(i in t.style)return!0;for(var i=i.charAt(0).toUpperCase()+i.substr(1),s=0,r=Muse.Browser.domPrefixes.length;r>s;s++)if(Muse.Browser.domPrefixes[s]+i in t.style)return Muse.Browser.domPrefixes[s];return!1},Muse.Browser.Features.checkCSSValueCompatibility=function(e,t){var i=document.createElement("div"),e=Muse.Utils.toCamelCase(e),s=Muse.Browser.Features.checkCSSFeature(e,i);if(!s)return!1;if(s!==!0&&(e=s+e.charAt(0).toUpperCase()+e.substr(1)),s=i.style[e],i.style[e]=t,i.style[e]!==s||t===s)return!0;for(var r=0;r<Muse.Browser.domPrefixes.length;r++){var n="-"+Muse.Browser.domPrefixes[r].toLowerCase()+"-"+t;if(i.style[e]=n,i.style[e]!==s)return Muse.Browser.domPrefixes[r]}return!1},Muse.Browser.Bugs={},Muse.Browser.Bugs.ClearNeedsOuterWidth=function(){var e=document.createElement("div");e.id="mbbcnow00",e.innerHTML='<div>a</div><style type="text/css">#mbbcnow00{position:absolute;top:-9999px;left:-9999px;visibility:hidden;} #mbbcnow01{width:1px;margin-right:-9999px;float:left} #mbbcnow02{clear:left;}</style>';var t=document.createElement("div"),i=document.createElement("div");return document.body.appendChild(e),e.appendChild(t),e.appendChild(i),t.innerHTML="a",t.id="mbbcnow01",i.innerHTML="b",i.id="mbbcnow02",t=i.getBoundingClientRect().top-t.getBoundingClientRect().top,document.body.removeChild(e),1>t}(),Muse.Browser.Bugs.CannotHandleClearBoth=function(){return jQuery.browser.msie&&7==jQuery.browser.version}(),Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder=function(){var e=!1,t=$("<div>").css({border:"1px solid #000000;",width:100,height:100,position:"absolute",top:-99999,left:-99999,padding:0,margin:0,overflow:"auto"}).appendTo(document.body)[0];return t.scrollHeight!==t.clientHeight&&(e=!0),$(t).remove(),e}(),function(e){var t=e(window),i=e("body"),s=function(){this.pendingRequest=void 0,this.enabled=!0};s.prototype.init=function(s){this.$spacer=e(s+" .verticalspacer"),this.$page=e(s),this.spacerMinHeight=1,this.$spacer.css("min-height",this.spacerMinHeight),this.$spacer.height()<this.spacerMinHeight&&this.$spacer.height(Math.floor(this.spacerMinHeight+1)),this.spacerHeight=this.$spacer.height(),this.pageMarginTop=Muse.Utils.getCSSIntValue(i,"padding-top")+Muse.Utils.getCSSIntValue(i,"margin-top"),this.pageMarginBottom=Muse.Utils.getCSSIntValue(i,"padding-bottom")+Muse.Utils.getCSSIntValue(i,"margin-bottom"),this.pageResizeWatchEnabled=!0,this.alwaysVertScroll=i.hasClass("always_vert_scroll"),this.updateSpacerMargin=0!=Muse.Utils.getCSSIntValue(this.$spacer,"margin-bottom");var r=this;Muse.Browser.Bugs.CannotHandleClearBoth&&0!=Muse.Utils.getCSSIntValue(this.$spacer,"margin-bottom")&&(this.$spacer.css("margin-bottom",0),this.updateSpacerMargin=!1),this.calculateInitialSpacerHeight(),this.$page.watch("height",function(){r.onPageHeightChanged()}),t.resize(function(){r.doUpdate()}),this.initialized=!0,this.doUpdate(this.pendingRequest)},s.prototype.updateScrollClass=function(e){var e=this.spacerMinHeight<Math.floor(100*e)/100,t=!1;this.alwaysVertScroll||(e&&!i.hasClass("no_vert_scroll")?(i.addClass("no_vert_scroll"),t=!0):!e&&i.hasClass("no_vert_scroll")&&(i.removeClass("no_vert_scroll"),t=!0)),t&&this.$spacer.css("height")},s.prototype.doUpdate=function(e){if(this.enabled){if(this.initialized){parseInt(e)||(e=0),this.updateSpacerMargin&&this.$spacer.css("margin-bottom",-(this.$spacer.offset().top-this.pageMarginTop));var i=this.$page.outerHeight(!0),s=i-this.spacerHeight,e=Math.max(this.spacerMinHeight,t.height()-this.pageMarginTop-this.pageMarginBottom-s-e);return e!=this.spacerHeight&&(this.pageResizeWatchEnabled=!1,this.updateScrollClass(e),this.$spacer.css("height",e),e<this.spacerHeight&&i==this.$page.outerHeight(!0)&&(e=this.spacerHeight,this.updateScrollClass(e),this.$spacer.css("height",e)),this.pageResizeWatchEnabled=!0),this.spacerHeight=e}this.pendingRequest=e}},s.prototype.calculateInitialSpacerHeight=function(){for(var e=0,t=0;t++<20;){var i=this.doUpdate();if(e>=i)break;e=i}},s.prototype.onPageHeightChanged=function(e){this.pageResizeWatchEnabled&&this.doUpdate(e)},s.prototype.enable=function(){this.enabled=!0},s.prototype.disable=function(){this.enabled=!1},t.data("stickyFooter",new s("#page"))}(jQuery),Muse.Utils.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame&&window.webkitRequestAnimationFrame.bind(window)||window.mozRequestAnimationFrame&&window.mozRequestAnimationFrame.bind(window)||window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||function(e){window.setTimeout(e,20)
}}(),Muse.Utils.animationFrameFx=function(e,t){var i=e.fx;e.extend(i,e.fx);var s,r=e(t).data("stickyFooter"),n=function(){s&&(Muse.Utils.requestAnimationFrame(n),i.tick(),r.doUpdate())};i.timer=function(t){t()&&e.timers.push(t)&&!s&&(s=!0,n())},i.stop=function(){s=!1},e.fn.animationFrameFx=i}(jQuery,this),function(){if("undefined"!=typeof Muse&&"undefined"!=typeof Muse.assets){var e=function(e,t){for(var i=0,s=e.length;s>i;i++)if(e[i]==t)return i;return-1}(Muse.assets.required,"museutils.js");if(-1!=e){Muse.assets.required.splice(e,1);for(var e=document.getElementsByTagName("meta"),t=0,i=e.length;i>t;t++){var s=e[t];if("generator"==s.getAttribute("name")){"2014.3.2.295"!=s.getAttribute("content")&&Muse.assets.outOfDate.push("museutils.js");break}}}}}();