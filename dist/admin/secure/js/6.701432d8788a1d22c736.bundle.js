(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{515:function(t){t.exports=JSON.parse('["ase","art","bmp","blp","cd5","cit","cpt","cr2","cut","dds","dib","djvu","egt","exif","gif","gpl","grf","icns","ico","iff","jng","jpeg","jpg","jfif","jp2","jps","lbm","max","miff","mng","msp","nitf","ota","pbm","pc1","pc2","pc3","pcf","pcx","pdn","pgm","PI1","PI2","PI3","pict","pct","pnm","pns","ppm","psb","psd","pdd","psp","px","pxm","pxr","qfx","raw","rle","sct","sgi","rgb","int","bw","tga","tiff","tif","vtf","xbm","xcf","xpm","3dv","amf","ai","awg","cgm","cdr","cmx","dxf","e2d","egt","eps","fs","gbr","odg","svg","stl","vrml","x3d","sxd","v2d","vnd","wmf","emf","art","xar","png","webp","jxr","hdp","wdp","cur","ecw","iff","lbm","liff","nrrd","pam","pcx","pgf","sgi","rgb","rgba","bw","int","inta","sid","ras","sun","tga"]')},516:function(t,n,e){"use strict";e.d(n,"a",(function(){return o}));var r=e(1);const o=({icon:t,text:n,insertBlock:e})=>Object(r.jsx)("button",{css:{background:"none",fontSize:"1rem",padding:"0 15px",margin:0,border:"none",display:"flex",width:"100%",alignItems:"center",":focus,:hover":{background:"#eaeaea"}},type:"button",onClick:e},Object(r.jsx)("div",{css:{padding:"10px 5px"}},t),Object(r.jsx)("span",{css:{padding:"10px 5px"}},n))},545:function(t,n,e){"use strict";var r=e(683),o=e.n(r),i=e(685),s=e.n(i),u=e(686),a=e.n(u),c=e(688),f=e.n(c),l=e(689),h=e(494);function p(t){for(var n=t.split(",")[1],e=atob(n),r=new window.ArrayBuffer(e.length),o=new window.Uint8Array(r),i=0;i<e.length;i++)o[i]=e.charCodeAt(i);100!=new Blob([new window.Uint8Array(100)]).size&&(o=r);var s=new Blob([o],{type:v(t)});return s.slice=s.slice||s.webkitSlice,s}function v(t){return t.split("")[0].slice(5)}function d(t,n){if(o()(t)){var e=p(t);setTimeout((function(){n(null,e)}))}else!function(t,n){var e=window.document.createElement("canvas"),r=window.document.createElement("img");if(!e.getContext)return setTimeout(n,0,new Error("Canvas is not supported."));r.onload=function(){var t=e.getContext("2d");e.width=r.width,e.height=r.height,t.drawImage(r,0,0);var o=e.toDataURL("image/png");n(null,o)},r.ononerror=function(){n(new Error("Failed to load image."))},r.setAttribute("crossOrigin","anonymous"),r.src=t}(t,(function(t,e){var r=p(e);n(t,r)}))}var g=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;function m(t){return(n=t,g.exec(n).slice(1))[3];var n}"ab".substr(-1);var w=function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var s,u=t[Symbol.iterator]();!(r=(s=u.next()).done)&&(e.push(s.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return e}(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")};n.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.insertImage,e=t.extensions;if(t.applyTransform&&(l.a.deprecate("0.6.0","The `applyTransform` argument to `slate-drop-or-paste-images` has been renamed to `insertImage` instead."),n=t.applyTransform),!n)throw new Error("You must supply an `insertImage` function.");function r(t){var n=!1,r=!0,o=!1,i=void 0;try{for(var s,u=e[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){var a=s.value;t.includes(a)&&(n=!0)}}catch(t){o=!0,i=t}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return n}function o(t,e){var r=t.editor;return s.a.resolve(n(t,e)).then((function(){r.onChange(t)}))}function i(t,n,e){var r=n.editor,o=Object(h.d)(t),i=Object(h.c)(t,r);switch(o.type){case"files":return u(t,n,e,o,i);case"html":return c(t,n,e,o,i);case"text":return p(t,n,e,o,i);default:return e()}}function u(t,n,i,s,u){var a=s.files,c=!0,f=!1,l=void 0;try{for(var h,p=a[Symbol.iterator]();!(c=(h=p.next()).done);c=!0){var v=h.value;if(e){var d=v.type.split("/");if(!r(w(d,2)[1]))continue}u&&n.select(u),o(n,v)}}catch(t){f=!0,l=t}finally{try{!c&&p.return&&p.return()}finally{if(f)throw l}}}function c(t,n,i,s,u){var a=n.editor,c=s.html,f=(new DOMParser).parseFromString(c,"text/html").body.firstChild;if("img"!=f.nodeName.toLowerCase())return i();var l=f.src;if(e&&!r(m(l).slice(1)))return i();d(l,(function(t,n){t||a.change((function(t){u&&t.select(u),o(t,n)}))}))}function p(t,n,e,r,i){var s=n.editor,u=r.text;return f()(u)&&a()(u)?void d(u,(function(t,n){t||s.change((function(t){i&&t.select(i),o(t,s)}))})):e()}return{onDrop:i,onPaste:i}}},683:function(t,n,e){"use strict";var r=e(684);t.exports=function(t){return!0===(t&&r().test(t))}},684:function(t,n,e){"use strict";t.exports=function(){return new RegExp(/^(data:)([\w\/\+]+);(charset=[\w-]+|base64).*,(.*)/gi)}},685:function(t,n,e){(function(n,e){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */var r;r=function(){"use strict";function t(t){return"function"==typeof t}var r=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},o=0,i=void 0,s=void 0,u=function(t,n){v[o]=t,v[o+1]=n,2===(o+=2)&&(s?s(d):b())},a="undefined"!=typeof window?window:void 0,c=a||{},f=c.MutationObserver||c.WebKitMutationObserver,l="undefined"==typeof self&&void 0!==n&&"[object process]"==={}.toString.call(n),h="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function p(){var t=setTimeout;return function(){return t(d,1)}}var v=new Array(1e3);function d(){for(var t=0;t<o;t+=2)(0,v[t])(v[t+1]),v[t]=void 0,v[t+1]=void 0;o=0}var g,m,w,y,b=void 0;function _(t,n){var e=this,r=new this.constructor(T);void 0===r[A]&&M(r);var o=e._state;if(o){var i=arguments[o-1];u((function(){return P(o,r,i,e._result)}))}else k(e,r,t,n);return r}function x(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var n=new this(T);return E(n,t),n}l?b=function(){return n.nextTick(d)}:f?(m=0,w=new f(d),y=document.createTextNode(""),w.observe(y,{characterData:!0}),b=function(){y.data=m=++m%2}):h?((g=new MessageChannel).port1.onmessage=d,b=function(){return g.port2.postMessage(0)}):b=void 0===a?function(){try{var t=Function("return this")().require("vertx");return void 0!==(i=t.runOnLoop||t.runOnContext)?function(){i(d)}:p()}catch(t){return p()}}():p();var A=Math.random().toString(36).substring(2);function T(){}function j(n,e,r){e.constructor===n.constructor&&r===_&&e.constructor.resolve===x?function(t,n){1===n._state?C(t,n._result):2===n._state?O(t,n._result):k(n,void 0,(function(n){return E(t,n)}),(function(n){return O(t,n)}))}(n,e):void 0===r?C(n,e):t(r)?function(t,n,e){u((function(t){var r=!1,o=function(t,n,e,r){try{t.call(n,e,r)}catch(t){return t}}(e,n,(function(e){r||(r=!0,n!==e?E(t,e):C(t,e))}),(function(n){r||(r=!0,O(t,n))}),t._label);!r&&o&&(r=!0,O(t,o))}),t)}(n,e,r):C(n,e)}function E(t,n){if(t===n)O(t,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(r=n),null===r||"object"!==o&&"function"!==o)C(t,n);else{var e=void 0;try{e=n.then}catch(n){return void O(t,n)}j(t,n,e)}var r,o}function S(t){t._onerror&&t._onerror(t._result),I(t)}function C(t,n){void 0===t._state&&(t._result=n,t._state=1,0!==t._subscribers.length&&u(I,t))}function O(t,n){void 0===t._state&&(t._state=2,t._result=n,u(S,t))}function k(t,n,e,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=n,o[i+1]=e,o[i+2]=r,0===i&&t._state&&u(I,t)}function I(t){var n=t._subscribers,e=t._state;if(0!==n.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<n.length;s+=3)r=n[s],o=n[s+e],r?P(e,r,o,i):o(i);t._subscribers.length=0}}function P(n,e,r,o){var i=t(r),s=void 0,u=void 0,a=!0;if(i){try{s=r(o)}catch(t){a=!1,u=t}if(e===s)return void O(e,new TypeError("A promises callback cannot return that same promise."))}else s=o;void 0!==e._state||(i&&a?E(e,s):!1===a?O(e,u):1===n?C(e,s):2===n&&O(e,s))}var D=0;function M(t){t[A]=D++,t._state=void 0,t._result=void 0,t._subscribers=[]}var N=function(){function t(t,n){this._instanceConstructor=t,this.promise=new t(T),this.promise[A]||M(this.promise),r(n)?(this.length=n.length,this._remaining=n.length,this._result=new Array(this.length),0===this.length?C(this.promise,this._result):(this.length=this.length||0,this._enumerate(n),0===this._remaining&&C(this.promise,this._result))):O(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var n=0;void 0===this._state&&n<t.length;n++)this._eachEntry(t[n],n)},t.prototype._eachEntry=function(t,n){var e=this._instanceConstructor,r=e.resolve;if(r===x){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(t){s=!0,i=t}if(o===_&&void 0!==t._state)this._settledAt(t._state,n,t._result);else if("function"!=typeof o)this._remaining--,this._result[n]=t;else if(e===F){var u=new e(T);s?O(u,i):j(u,t,o),this._willSettleAt(u,n)}else this._willSettleAt(new e((function(n){return n(t)})),n)}else this._willSettleAt(r(t),n)},t.prototype._settledAt=function(t,n,e){var r=this.promise;void 0===r._state&&(this._remaining--,2===t?O(r,e):this._result[n]=e),0===this._remaining&&C(r,this._result)},t.prototype._willSettleAt=function(t,n){var e=this;k(t,void 0,(function(t){return e._settledAt(1,n,t)}),(function(t){return e._settledAt(2,n,t)}))},t}(),F=function(){function n(t){this[A]=D++,this._result=this._state=void 0,this._subscribers=[],T!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof n?function(t,n){try{n((function(n){E(t,n)}),(function(n){O(t,n)}))}catch(n){O(t,n)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return n.prototype.catch=function(t){return this.then(null,t)},n.prototype.finally=function(n){var e=this.constructor;return t(n)?this.then((function(t){return e.resolve(n()).then((function(){return t}))}),(function(t){return e.resolve(n()).then((function(){throw t}))})):this.then(n,n)},n}();return F.prototype.then=_,F.all=function(t){return new N(this,t).promise},F.race=function(t){var n=this;return r(t)?new n((function(e,r){for(var o=t.length,i=0;i<o;i++)n.resolve(t[i]).then(e,r)})):new n((function(t,n){return n(new TypeError("You must pass an array to race."))}))},F.resolve=x,F.reject=function(t){var n=new this(T);return O(n,t),n},F._setScheduler=function(t){s=t},F._setAsap=function(t){u=t},F._asap=u,F.polyfill=function(){var t=void 0;if(void 0!==e)t=e;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(t){}if("[object Promise]"===r&&!n.cast)return}t.Promise=F},F.Promise=F,F},t.exports=r()}).call(this,e(194),e(80))},686:function(t,n,e){"use strict";var r=e(687),o=e(515),i=Object.create(null);o.forEach((function(t){i[t]=!0})),t.exports=function(t){return r.extname(t).slice(1).toLowerCase()in i}},687:function(t,n,e){(function(t){function e(t,n){for(var e=0,r=t.length-1;r>=0;r--){var o=t[r];"."===o?t.splice(r,1):".."===o?(t.splice(r,1),e++):e&&(t.splice(r,1),e--)}if(n)for(;e--;e)t.unshift("..");return t}function r(t,n){if(t.filter)return t.filter(n);for(var e=[],r=0;r<t.length;r++)n(t[r],r,t)&&e.push(t[r]);return e}n.resolve=function(){for(var n="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var s=i>=0?arguments[i]:t.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(n=s+"/"+n,o="/"===s.charAt(0))}return(o?"/":"")+(n=e(r(n.split("/"),(function(t){return!!t})),!o).join("/"))||"."},n.normalize=function(t){var i=n.isAbsolute(t),s="/"===o(t,-1);return(t=e(r(t.split("/"),(function(t){return!!t})),!i).join("/"))||i||(t="."),t&&s&&(t+="/"),(i?"/":"")+t},n.isAbsolute=function(t){return"/"===t.charAt(0)},n.join=function(){var t=Array.prototype.slice.call(arguments,0);return n.normalize(r(t,(function(t,n){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},n.relative=function(t,e){function r(t){for(var n=0;n<t.length&&""===t[n];n++);for(var e=t.length-1;e>=0&&""===t[e];e--);return n>e?[]:t.slice(n,e-n+1)}t=n.resolve(t).substr(1),e=n.resolve(e).substr(1);for(var o=r(t.split("/")),i=r(e.split("/")),s=Math.min(o.length,i.length),u=s,a=0;a<s;a++)if(o[a]!==i[a]){u=a;break}var c=[];for(a=u;a<o.length;a++)c.push("..");return(c=c.concat(i.slice(u))).join("/")},n.sep="/",n.delimiter=":",n.dirname=function(t){if("string"!=typeof t&&(t+=""),0===t.length)return".";for(var n=t.charCodeAt(0),e=47===n,r=-1,o=!0,i=t.length-1;i>=1;--i)if(47===(n=t.charCodeAt(i))){if(!o){r=i;break}}else o=!1;return-1===r?e?"/":".":e&&1===r?"/":t.slice(0,r)},n.basename=function(t,n){var e=function(t){"string"!=typeof t&&(t+="");var n,e=0,r=-1,o=!0;for(n=t.length-1;n>=0;--n)if(47===t.charCodeAt(n)){if(!o){e=n+1;break}}else-1===r&&(o=!1,r=n+1);return-1===r?"":t.slice(e,r)}(t);return n&&e.substr(-1*n.length)===n&&(e=e.substr(0,e.length-n.length)),e},n.extname=function(t){"string"!=typeof t&&(t+="");for(var n=-1,e=0,r=-1,o=!0,i=0,s=t.length-1;s>=0;--s){var u=t.charCodeAt(s);if(47!==u)-1===r&&(o=!1,r=s+1),46===u?-1===n?n=s:1!==i&&(i=1):-1!==n&&(i=-1);else if(!o){e=s+1;break}}return-1===n||-1===r||0===i||1===i&&n===r-1&&n===e+1?"":t.slice(n,r)};var o="b"==="ab".substr(-1)?function(t,n,e){return t.substr(n,e)}:function(t,n,e){return n<0&&(n=t.length+n),t.substr(n,e)}}).call(this,e(194))},688:function(t,n){t.exports=function(t){if("string"!=typeof t)return!1;var n=t.match(e);if(!n)return!1;var i=n[1];if(!i)return!1;if(r.test(i)||o.test(i))return!0;return!1};var e=/^(?:\w+:)?\/\/(\S+)$/,r=/^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/,o=/^[^\s\.]+\.\S{2,}$/},689:function(t,n,e){"use strict";(function(t){var e=void 0!==t?t:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}var i=r,s=o;function u(t){if(i===setTimeout)return setTimeout(t,0);if((i===r||!i)&&setTimeout)return i=setTimeout,setTimeout(t,0);try{return i(t,0)}catch(n){try{return i.call(null,t,0)}catch(n){return i.call(this,t,0)}}}"function"==typeof e.setTimeout&&(i=setTimeout),"function"==typeof e.clearTimeout&&(s=clearTimeout);var a,c=[],f=!1,l=-1;function h(){f&&a&&(f=!1,a.length?c=a.concat(c):l=-1,c.length&&p())}function p(){if(!f){var t=u(h);f=!0;for(var n=c.length;n;){for(a=c,c=[];++l<n;)a&&a[l].run();l=-1,n=c.length}a=null,f=!1,function(t){if(s===clearTimeout)return clearTimeout(t);if((s===o||!s)&&clearTimeout)return s=clearTimeout,clearTimeout(t);try{s(t)}catch(n){try{return s.call(null,t)}catch(n){return s.call(this,t)}}}(t)}}function v(t,n){this.fun=t,this.array=n}v.prototype.run=function(){this.fun.apply(null,this.array)};function d(){}var g=d,m=d,w=d,y=d,b=d,_=d,x=d;var A=e.performance||{},T=A.now||A.mozNow||A.msNow||A.oNow||A.webkitNow||function(){return(new Date).getTime()};var j=new Date;var E={nextTick:function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];c.push(new v(t,n)),1!==c.length||f||u(p)},title:"browser",browser:!0,env:{},argv:[],version:"",versions:{},on:g,addListener:m,once:w,off:y,removeListener:b,removeAllListeners:_,emit:x,binding:function(t){throw new Error("process.binding is not supported")},cwd:function(){return"/"},chdir:function(t){throw new Error("process.chdir is not supported")},umask:function(){return 0},hrtime:function(t){var n=.001*T.call(A),e=Math.floor(n),r=Math.floor(n%1*1e9);return t&&(e-=t[0],(r-=t[1])<0&&(e--,r+=1e9)),[e,r]},platform:"browser",release:{},config:{},uptime:function(){return(new Date-j)/1e3}},S=E&&E.env&&E.env.FORBID_DEPRECATIONS,C=E&&E.env&&E.env.FORBID_WARNINGS,O=void 0!==E&&E.env&&!0,k="undefined"!=typeof console&&"function"==typeof console.log&&"function"==typeof console.warn&&"function"==typeof console.error;function I(t,n){if(O&&k){for(var e,r=arguments.length,o=Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];(e=console)[t].apply(e,[n].concat(o))}}function P(t,n){throw new Error(n)}var D={deprecate:function(t,n){for(var e=S?P:I,r=arguments.length,o=Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];e.apply(void 0,["warn","Deprecation ("+t+"): "+n].concat(o))},error:function(t){if(k){for(var n,e=arguments.length,r=Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];(n=console).error.apply(n,[t].concat(r))}},warn:function(t){for(var n=C?P:I,e=arguments.length,r=Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];n.apply(void 0,["warn","Warning: "+t].concat(r))}};n.a=D}).call(this,e(80))}}]);