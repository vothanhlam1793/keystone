(window.webpackJsonp=window.webpackJsonp||[]).push([[9,45],{329:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r(5),o=r(7),a=r(1),c=r(2),s=r(19),i=r(66),l=r(18);let u=e=>{let{isActive:t,label:r,icon:u,as:d="button",tooltipPlacement:b="top"}=e,f=Object(o.a)(e,["isActive","label","icon","as","tooltipPlacement"]);return Object(a.jsx)(i.a,{placement:b,css:{margin:2*c.d},content:r},e=>Object(a.jsx)(d,Object(n.a)({},"button"===d?{type:"button"}:null,{css:{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"transparent",border:0,cursor:"pointer",color:t?c.b.primary:"white",":hover,:focus":{color:t?Object(s.b)(c.b.primary,10):Object(s.c)(c.b.primary,40)},":active":{color:t?Object(s.b)(c.b.primary,25):Object(s.c)(c.b.primary,10)},fontSize:16,outline:"none"},ref:e},f),u,Object(a.jsx)(l.a,null,r)))}},333:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return o}));let n=(e,t)=>e.blocks.some(e=>e.type===t),o=(e,t)=>e.blocks.some(r=>e.document.getClosest(r.key,e=>e.type===t)),a=()=>{let e,t={top:0,left:0,right:0,bottom:0,hight:0,width:0},r=()=>{let r=window.getSelection(),{nodeName:n}=r.anchorNode,o=r.rangeCount&&"INPUT"!==n&&"TEXTAREA"!==n?r.getRangeAt(0):e;if(!o)return t;let a=s(o);return 0===a.width&&0===a.height?e?s(e):t:(e=o,a)};return{getBoundingClientRect:r,get clientWidth(){return r().width},get clientHeight(){return r().height}}};const c="undefined"!=typeof window&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)?e=>{for(var t=e.cloneRange(),r=[],n=e.endContainer;null!==n;n=n.parentNode){var o=n===e.commonAncestorContainer;o?t.setStart(e.startContainer,e.startOffset):t.setStart(t.endContainer,0);var a=Array.from(t.getClientRects());if(r.push(a),o)return r.reverse(),[].concat(...r);t.setEndBefore(n)}throw new Error("Found an unexpected detached subtree when getting range client rects.")}:function(e){return Array.from(e.getClientRects())},s=e=>{var t=c(e),r=0,n=0,o=0,a=0;if(t.length){({top:r,right:n,bottom:o,left:a}=t[0]);for(var s=1;s<t.length;s++){var i=t[s];0===i.height&&0===i.width||(r=Math.min(r,i.top),n=Math.max(n,i.right),o=Math.max(o,i.bottom),a=Math.min(a,i.left))}}return{top:r,right:n,bottom:o,left:a,width:n-a,height:o-r}}},335:function(e,t,r){"use strict";r.r(t),r.d(t,"Node",(function(){return c})),r.d(t,"type",(function(){return a}));var n=r(5),o=r(1);let a="paragraph";function c({attributes:e,children:t}){return Object(o.jsx)("p",Object(n.a)({},e,{css:{":first-of-type":{marginTop:0},":last-of-type":{marginBottom:0}}}),t)}},514:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0);function o(e){let[t,r]=Object(n.useState)(e),o=Object(n.useCallback)(e=>{e!==t&&r(e)},[t]);return[t,o]}},682:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});for(var n="undefined"!=typeof window&&/Mac|iPod|iPhone|iPad/.test(window.navigator.platform),o={alt:"altKey",control:"ctrlKey",meta:"metaKey",shift:"shiftKey"},a={add:"+",break:"pause",cmd:"meta",command:"meta",ctl:"control",ctrl:"control",del:"delete",down:"arrowdown",esc:"escape",ins:"insert",left:"arrowleft",mod:n?"meta":"control",opt:"alt",option:"alt",return:"enter",right:"arrowright",space:" ",spacebar:" ",up:"arrowup",win:"meta",windows:"meta"},c={backspace:8,tab:9,enter:13,shift:16,control:17,alt:18,pause:19,capslock:20,escape:27," ":32,pageup:33,pagedown:34,end:35,home:36,arrowleft:37,arrowup:38,arrowright:39,arrowdown:40,insert:45,delete:46,meta:91,numlock:144,scrolllock:145,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},s=1;s<20;s++)c["f"+s]=111+s;function i(e,t,r){t&&!("byKey"in t)&&(r=t,t=null),Array.isArray(e)||(e=[e]);var n=e.map((function(e){return l(e,t)})),o=function(e){return n.some((function(t){return u(t,e)}))};return null==r?o:o(r)}function l(e,t){var r=t&&t.byKey,n={},s=(e=e.replace("++","+add")).split("+"),i=s.length;for(var l in o)n[o[l]]=!1;var u=!0,f=!1,p=void 0;try{for(var j,h=s[Symbol.iterator]();!(u=(j=h.next()).done);u=!0){var m=j.value,g=m.endsWith("?")&&m.length>1;g&&(m=m.slice(0,-1));var y=b(m),O=o[y];if(m.length>1&&!O&&!a[m]&&!c[y])throw new TypeError('Unknown modifier: "'+m+'"');1!==i&&O||(r?n.key=y:n.which=d(m)),O&&(n[O]=!g||null)}}catch(e){f=!0,p=e}finally{try{!u&&h.return&&h.return()}finally{if(f)throw p}}return n}function u(e,t){for(var r in e){var n=e[r],o=void 0;if(null!=n&&((null!=(o="key"===r&&null!=t.key?t.key.toLowerCase():"which"===r?91===n&&93===t.which?91:t.which:t[r])||!1!==n)&&o!==n))return!1}return!0}function d(e){return e=b(e),c[e]||e.toUpperCase().charCodeAt(0)}function b(e){return e=e.toLowerCase(),e=a[e]||e}t.default=i,t.isHotkey=i,t.isCodeHotkey=function(e,t){return i(e,t)},t.isKeyHotkey=function(e,t){return i(e,{byKey:!0},t)},t.parseHotkey=l,t.compareHotkey=u,t.toKeyCode=d,t.toKeyName=b},742:function(e,t,r){"use strict";r.r(t);var n=r(6),o=r(16),a=r(0),c=r.n(a),s=r(1),i=r(2),l=r(5),u=r(494),d=r(330),b=r(682),f=r.n(b),p=r(335),j=r(9),h=r(514),m=r(20),g=r(313),y=r(329),O=r(141);var k=r(333),v=r(217),x=r(87),w=r(86);r(168),r(19),r(66),r(18);let C={bold:{test:f()("mod+b"),label:"Bold",icon:e=>c.a.createElement("strong",Object(l.a)({},e,{"aria-hidden":!0}),"B"),render:e=>c.a.createElement("strong",e.attributes,e.children)},italic:{test:f()("mod+i"),label:"Italic",icon:e=>c.a.createElement("em",Object(l.a)({},e,{"aria-hidden":!0}),"I"),render:e=>c.a.createElement("em",e.attributes,e.children)},strikethrough:{test:f()("mod+~"),label:"Strikethrough",icon:e=>c.a.createElement("s",Object(l.a)({},e,{"aria-hidden":!0}),"S"),render:e=>c.a.createElement("s",e.attributes,e.children)},underline:{test:f()("mod+u"),label:"Underline",icon:e=>c.a.createElement("u",Object(l.a)({},e,{"aria-hidden":!0}),"U"),render:e=>c.a.createElement("u",e.attributes,e.children)}},S=Object.keys(C),E=Object.entries(C).map(([e,t])=>function(e,t){return{onKeyDown(r,n,o){if(!t.test(r))return o();r.preventDefault(),n.toggleMark(e)},renderMark:(r,n,o)=>r.mark.type===e?t.render(r):o()}}(e,t));let M=({editorState:e,editor:t,blocks:r})=>{let[n,o]=Object(a.useState)(!1),c=e.focusBlock,i=Object(a.useRef)(null),l=Object(a.useRef)(null),u=Object(a.useCallback)(()=>{let e=i.current,a=l.current;const s=(()=>{if(document.selection)return document.selection.createRange().parentElement();var e=window.getSelection();return e.rangeCount>0?e.getRangeAt(0).startContainer.parentNode:void 0})();if(null===c||""!==c.text||c.type!==p.type)return e.style.top="-9999px",e.style.left="-9999px",a.style.top="-9999px",a.style.left="-9999px",void(n&&o(!1));r&&Object.keys(r).length&&(s&&t&&t.el.contains(s)?(e.style.top=s.offsetTop+s.offsetHeight/2+"px",e.style.left=0,a.style.top=s.offsetTop-s.offsetHeight/2+"px",a.style.left="42px"):n&&o(!1))},[c,i.current,l.current]);return Object(a.useLayoutEffect)(u),Object(s.jsx)(a.Fragment,null,Object(s.jsx)("div",{css:{position:"absolute",zIndex:10,transform:"translate(0, -50%)",top:-99999,left:-9999},ref:i},Object(s.jsx)("button",{type:"button",css:{border:"none",background:"#efefef",color:"#aaa",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",marginLeft:4,":hover":{color:"#888"}},onClick:()=>{o(e=>!e)},title:"Add block"},Object(s.jsx)(j.s,{css:{transition:"50ms transform",transform:n?"rotateZ(45deg)":"rotateZ(0deg)"},title:n?"Close":"Open"}))),Object(s.jsx)("div",{ref:l,css:{position:"absolute",zIndex:10,top:-99999,left:-9999}},n&&Object(s.jsx)("ul",{css:{background:"white",listStyle:"none",padding:0,margin:0,border:"solid 1px #eaeaea"}},Object(s.jsx)("li",{css:{display:"flex",justifyContent:"left",alignItems:"center"}},Object(s.jsx)("strong",{css:{textTransform:"uppercase",color:"#999",fontSize:".8rem",padding:"5px 15px"}},"Insert Block")),Object.keys(r).map(e=>{let{Sidebar:n}=r[e];return r[e].withChrome&&void 0!==n?Object(s.jsx)("li",{key:"sidebar-"+e,css:{display:"flex",justifyContent:"left",alignItems:"center"}},Object(s.jsx)(n,{key:e,editor:t,blocks:r})):null}))))},A=e=>{e.stopPropagation()};function I({blocks:e,editor:t,editorState:r}){return Object(s.jsx)("div",{css:{display:"flex"}},Object.keys(e).map(t=>e[t].withChrome&&e[t].Toolbar).filter(e=>e).reduce((e,n)=>Object(s.jsx)(n,{editor:t,editorState:r},e),Object(s.jsx)(a.Fragment,null,Object.keys(C).map(e=>{let n=C[e].icon;return Object(s.jsx)(y.a,{label:C[e].label,icon:Object(s.jsx)(n,null),isActive:r.activeMarks.some(t=>t.type===e),onClick:()=>{t.toggleMark(e),t.focus()},key:e})}),Object(s.jsx)(y.a,{label:"Remove Formatting",icon:Object(s.jsx)(j.e,null),onClick:()=>{S.forEach(e=>{t.removeMark(e)}),t.focus()}}),Object.keys(e).map(n=>{let o=e[n].ToolbarElement;return e[n].withChrome&&void 0!==o?Object(s.jsx)(o,{key:n,editor:t,editorState:r}):null}))))}const R=Object(a.forwardRef)(({update:e,editorState:t,style:r,children:n},o)=>{let{fragment:c}=t,l=""!==c.text,u=Object(a.useRef)(null),d=function(e){let[t,r]=Object(a.useState)(()=>({height:0,width:0}));return Object(a.useLayoutEffect)(()=>{let n=e.current;if(null!==n){let e=new O.a(([e])=>{const n=e.target.offsetHeight,o=e.target.offsetWidth;o===t.width&&n===t.height||r({width:o,height:n})});return e.observe(n),()=>{e.unobserve(n)}}}),t}(u);return Object(a.useLayoutEffect)(()=>{l&&e()},[e,t,d,l]),Object(m.createPortal)(Object(s.jsx)("div",{onMouseDown:A,ref:e=>{Object(v.b)(o,e),Object(v.b)(u,e)},style:r,css:{transition:"transform 100ms, opacity 100ms"}},Object(s.jsx)("div",{css:{backgroundColor:i.b.N90,padding:8,borderRadius:6,margin:i.d,display:l?"flex":"none"}},l&&n)),document.body)});var P=({editorState:e,blocks:t,editor:r})=>{const o=Object(s.jsx)(I,{blocks:t,editor:r,editorState:e}),c=Object(a.useMemo)(k.b,[]),[i,l]=Object(a.useState)(null),{styles:u,update:d}=Object(g.a)(c,i,{placement:"top",modifiers:[{name:"computeStyles",options:{adaptive:!1}}]});return Object(s.jsx)(R,{update:d,editorState:e,style:Object(n.a)(Object(n.a)({},u.popper),{},{zIndex:10}),blocks:t,editor:r,ref:l,children:o})};function K({value:e,onChange:t,blocks:r,className:n,id:o,isDisabled:c}){let i=Object(a.useMemo)(()=>function(e){const t={document:{last:{type:p.type},normalize:(e,{code:t,node:r})=>{switch(t){case"last_child_type_invalid":{const t=d.a.create(p.type);return e.insertNodeByKey(r.key,r.nodes.size,t)}}}},blocks:{}};return Object.keys(e).forEach(r=>{"function"==typeof e[r].getSchema&&(t.blocks[r]=e[r].getSchema({blocks:e}))}),t}(r),[r]),b=Object(a.useMemo)(()=>{const e=e=>{let t=r[e.node.type];return t?Object(s.jsx)(t.Node,Object(l.a)({},e,{blocks:r})):null};return Object.values(r).reduce((e,t)=>"function"!=typeof t.getPlugins?e:[...e,...t.getPlugins({blocks:r})],[...E,{renderBlock:e,renderInline:e}])},[r]),[f,j]=Object(h.a)(null);return Object(s.jsx)("div",{className:n,css:{position:"relative"},id:o},Object(s.jsx)(u.a,{schema:i,ref:j,plugins:b,value:e,tabIndex:0,onChange:({value:e})=>{t(e)},readOnly:c,css:{minHeight:200,padding:"16px 32px"}}),Object(s.jsx)(M,{editor:f,editorState:e,blocks:r}),Object(s.jsx)(P,{editorState:e,editor:f,blocks:r}))}class N extends a.Component{constructor(...e){super(...e),Object(o.a)(this,"state",{hasError:!1})}static getDerivedStateFromError(){return{hasError:!0}}render(){return this.state.hasError?Object(s.jsx)("span",{css:{color:i.b.danger}},"Unable to render content"):this.props.children}}t.default=({field:e,value:t,onChange:r,autoFocus:o,errors:a,isDisabled:c})=>{const i="ks-content-editor-"+e.path;return Object(s.jsx)(x.a,null,Object(s.jsx)(x.d,{htmlFor:i,field:e,errors:a}),Object(s.jsx)(N,null,Object.values(e.getBlocks()).filter(({Provider:e,options:t})=>e&&t).reduce((e,{Provider:t,options:r},n)=>Object(s.jsx)(t,{value:r,key:`${i}-provider-${n}`},e),Object(s.jsx)(K,{key:i,blocks:e.getBlocks(),value:t,onChange:r,autoFocus:o,id:i,css:Object(n.a)(Object(n.a)({},Object(w.d)({isMultiline:!0})),{},{padding:"0"}),isDisabled:c}))))}}}]);