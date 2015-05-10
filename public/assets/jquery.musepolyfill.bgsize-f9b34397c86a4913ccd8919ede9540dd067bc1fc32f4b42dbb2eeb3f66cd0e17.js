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
!function(t){function e(t){var e=t.css("background-image");t.css("background-image","");var s=t.css("background-image");return e!=s&&t.css("background-image",e),s.replace(/^\s*url\(\"?/,"").replace(/['"]?\)$/,"")}if(!Muse.Browser.Features.checkCSSFeature("background-size")){var s=function(s){var i=t(s),o=e(i),r=document.createElement("img"),n=document.createElement("div"),a=this,l=!1,c=!1,d=!0,p={};t(n).css({overflow:"hidden",position:"absolute",top:"0px",left:"0px",width:s.clientWidth+"px",height:s.clientHeight+"px",marginBottom:"-"+s.clientHeight+"px",marginRight:"-"+s.clientWidth+"px",zIndex:"-1"}).addClass("museBgSizePolyfill"),r.src=o,r.alt="",r.style.position="absolute",n.appendChild(r),s.children.length>0?s.insertBefore(n,s.children[0]):s.appendChild(n),s===document.body?(i=t("html"),s=i.get(0),o=e(i),r.src=o,"fixed"==i.css("background-attachment")?(n.style.position="fixed",d=!1):n.style.position="absolute"):i.is("#page")?("auto"==i.css("marginLeft").toLowerCase()&&(c=!0),n.style.top=i.offset().top+parseInt(i.css("borderTopWidth"))+"px",n.style.bottom=parseInt(i.parent().css("paddingBottom"))+parseInt(i.css("borderBottomWidth"))+"px",n.style.left=i.offset().left+parseInt(i.css("borderLeftWidth"))+"px",n.style.right=i.offset().left+parseInt(i.css("borderRightWidth"))+"px",n.style.zIndex=0):"static"==i.css("position")&&(s.style.position="relative"),this.reloadImage=function(){var t=e(i),o=i.css("background-color");if(t!=r.src&&(r.src=t),s.style.backgroundImage="none",s.style.backgroundColor="transparent",n.style.backgroundColor=o,t=(i.css("background-position-x")+" "+i.css("background-position-y")).replace(/^\s+/,"").replace(/\s+$/,"").split(/\s+/),1==t.length&&t[0].indexOf("center")>=0&&t.push("center"),1!=i.data("hasBackgroundPositionScrollEffect"))for(var o=0,a=t.length;a>o;o++)switch(t[o]){case"center":case"50%":0==o?(r.style.right="",r.style.left="50%",r.style.marginLeft="-"+Math.ceil(r.offsetWidth/2)+"px"):(r.style.bottom="",r.style.top="50%",r.style.marginTop="-"+Math.ceil(r.offsetHeight/2)+"px");break;case"left":r.style.right="",r.style.left="0px",r.style.marginLeft="0px";break;case"right":r.style.left="",r.style.right="0px",r.style.marginLeft="0px";break;case"top":r.style.bottom="",r.style.top="0px",r.style.marginTop="0px";break;case"bottom":r.style.top="",r.style.bottom="0px",r.style.marginTop="0px";break;default:0==o?(r.style.left=t[o],r.style.marginLeft="-"+Math.ceil(r.offsetWidth/2)+"px"):(r.style.top=t[o],r.style.marginTop="-"+Math.ceil(r.offsetHeight/2)+"px")}},this.resizeImage=function(t){var e=s.getBoundingClientRect(),o=s.scrollWidth-(Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder?e.right-e.left-i.innerWidth():0),e=s.scrollHeight-(Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder?e.bottom-e.top-i.innerHeight():0),o=d?Math.max(o,s.clientWidth):s.clientWidth,e=d?Math.max(e,s.clientHeight):s.clientHeight;!p[r.src]&&r.clientWidth&&(p[r.src]={width:r.clientWidth,height:r.clientHeight});var a=o/(p[r.src]?p[r.src].width:1),l=e/(p[r.src]?p[r.src].height:1);n.style.height=e+"px",n.style.marginBottom="-"+e+"px",n.style.width=o+"px",n.style.marginRight="-"+o+"px",l>a==t?(r.style.height=e+1+"px",r.style.width="auto"):(r.style.width=o+1+"px",r.style.height="auto")},this.update=function(){if(l){s.style.backgroundImage="",i.css("background-color","");var t=i.css("background-image").toLowerCase(),e=(s.currentStyle||window.getComputedStyle(s,null))["background-size"];e&&e.toLowerCase(),"none"==t||"cover"!=e&&"contain"!=e?n.style.display="none":(a.reloadImage(),n.style.display="block",n.style.width="0px",n.style.height="0px",a.resizeImage("cover"==e),c&&(n.style.left=i.offset().left+parseInt(i.css("borderLeftWidth"))+"px",n.style.right=i.offset().left+parseInt(i.css("borderRightWidth"))+"px"))}},r.complete||"none"==o?l=!0:t(r).one("load",function(){l=!0,a.update()}),this.update()},i=function(){this.updateList=[]};i.prototype.initialize=function(e){var i=this;e.each(function(){var e=new s(this);this!==document.body?i.updateList.push(e):(t(window).resize(function(){setTimeout(function(){e.update()},10)}),t(window).load(function(){setTimeout(function(){e.update()},10)}))});var o=i.updateList.length;o>0&&setInterval(function(){for(var t=0;o>t;t++)i.updateList[t].update()},Math.max(120,16*o))},t(window).data("musePolyfill.bgSize",new i)}}(jQuery),function(){if("undefined"!=typeof Muse&&"undefined"!=typeof Muse.assets){var t=function(t,e){for(var s=0,i=t.length;i>s;s++)if(t[s]==e)return s;return-1}(Muse.assets.required,"jquery.musepolyfill.bgsize.js");if(-1!=t){Muse.assets.required.splice(t,1);for(var t=document.getElementsByTagName("meta"),e=0,s=t.length;s>e;e++){var i=t[e];if("generator"==i.getAttribute("name")){"2014.3.2.295"!=i.getAttribute("content")&&Muse.assets.outOfDate.push("jquery.musepolyfill.bgsize.js");break}}}}}();