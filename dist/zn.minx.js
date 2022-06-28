var __isServer="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0),zn={VERSION:"1.0.8",DEBUG:!0,ZN_PATH:"",PATH:"",GLOBAL:function(){return __isServer?global:window}.call(null),isServer:__isServer};if(zn.GLOBAL.zn=zn,__isServer)zn.ZN_PATH=__dirname,zn.PATH=process.cwd(),module.exports=zn;else{var _zn_url="";try{__a__=__b__}catch(r){r.fileName?_zn_url=r.fileName:r.sourceURL?_zn_url=r.sourceURL:r.stacktrace?console.error(r.stacktrace):r.stack?_zn_url=(_zn_url=(_zn_url=r.stack.split("\n")[1]).replace(/\s/g,"")).substring(2,_zn_url.length):console.error(r.toString())}if(!_zn_url)for(var _node,_scripts=document.getElementsByTagName("script"),_src="",i=0,_len=scripts.length;i<_len;i++)if((_node=scripts[i]).getAttribute&&("zn.js"===(_src=_node.getAttribute("src")||"").slice(-5)||"zn.minx.js"===_src.slice(-10))){_zn_url=_src;break}if(!_zn_url)throw new Error("zn.js has not been included, please do it first.");zn.ZN_PATH=_zn_url.substring(0,_zn_url.lastIndexOf("/")+1)}
!function(g){var a=Object.prototype.toString,o={timeout:function(t){return new Promise(function(n){setTimeout(n,t)})},truncate:function(n,t){if(n.length<=t)return"["+n+" ".repeat(t-n.length)+"]";var e=t/2;return"["+n.substring(0,e-3)+"..."+n.substring(n.length-e)+"]"},formatFieldData:function(n,t,e){var r=null,i={},o=t||[],c=e||[];for(var a in n)if((!o.length||-1!==o.indexOf(a))&&-1==c.indexOf(a)){switch(r=n[a],g.type(r)){case"object":case"array":r=JSON.stringify(r)}g.is(r,"string")&&(r=(r=r.replace(/'/g,"")).replace(/\n/g,"")),i[a]=r}return i},sliceArrayData:function(n,t){var e=[],r=[];if(n.length<t+1)return[n];for(;0<n.length;)r.length==t&&(e.push(r),r=[]),r.push(n.shift()),0==n.length&&e.push(r);return e},splitArrayData:function(n,t){for(var e=n.length,r=Math.ceil(e/t),i=[],o=0;o<r;o++)i[o]=n.slice(o*t,Math.min((o+1)*t,e));return i},isNull:function(n){return null==n},isNotNull:function(n){return null!=n},idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var n,t=arguments,e=null;return t.length<2?t[0]:(e=(e=t[0]).toString?e.toString():e,n=t[1],u.each(n,function(n,t){null!=n&&(n=u.is(n,"object")?JSON.stringify(n):n.toString?n.toString():n,e=e.replace(new RegExp("\\{"+t+"\\}","gi"),n))}),e)},uuid:function(n){var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){var t=16*Math.random()|0;return("x"==n?t:3&t|8).toString(16)});return n&&n.ifUpperCase&&(t=t.toUpperCase()),t},fix:function(n){for(var t=n||{},e=1,r=arguments.length;e<r;e++){var i=arguments[e];for(var o in i)i.hasOwnProperty(o)&&"function"!=typeof t[o]&&(t[o]=i[o])}return t},extend:function(n){for(var t=n||{},e=1,r=arguments.length;e<r;e++){var i=arguments[e];for(var o in i)i.hasOwnProperty(o)&&(t[o]=i[o])}return t},isJson:function(n){return"object"==typeof n&&"[object object]"==a.call(n).toLowerCase()&&0==n.constructor.toString().indexOf("function Object() {")},deepAssign:function(n,t){var e,r=null;switch(a.call(t)){case"[object Object]":if(!o.isJson(t))return n;for(var i in t)if(e=n[i],r=t[i],t.hasOwnProperty(i))switch(a.call(r)){case"[object Object]":if(!o.isJson(r))continue;r=this.deepAssign({},r),"[object Object]"==a.call(e)?n[i]=o.deepAssign(e,r):n[i]=r;break;case"[object Array]":"[object Array]"==a.call(e)?n[i]=n[i].concat(r):n[i]=r;break;case"[object Null]":case"[object Boolean]":case"[object Function]":case"[object Number]":case"[object String]":n[i]=r}break;case"[object Array]":t.unshift(n),o.deepAssigns.apply(o.deepAssigns,t)}return n},callOnce:function(n){var t=!1;return function(){t||(t=!0,n.apply(this,arguments))}},deepAssigns:function(){for(var n=arguments[0],t=1,e=arguments.length;t<e;t++)o.deepAssign(n,arguments[t]);return n},convertArrayArgv:function(n,t){for(var e,r=[],i=g.extend({prefix:"--"},t).prefix,o={},c=null,a={},u=!1,s=0,f=n.length;s<f;s++)if(-1!==(c=n[s]).indexOf(i))o[e=c.replace(i,"")]=!0,a[s+1]=e,u=u||!0;else if(u)if(a[s])o[a[s]]=c;else{for(var _,l=s-1;!a[l]&&0<l;)--l;a[l]&&(null!=(_=o[a[l]])?"string"==typeof _?o[a[l]]=[_,c]:"object"==typeof _&&o[a[l]].push(c):o[a[l]]=c)}else r.push(c);return{env:r,argv:o}},overwrite:function(n){for(var t=n||{},e=1,r=arguments.length;e<r;e++){var i=arguments[e];for(var o in i)i.hasOwnProperty(o)&&void 0===t[o]&&(t[o]=i[o])}return t},path:function(n,t,e){var r=n||{};if(t){var i,o=t.split("."),c=o.length,a=0;if(arguments.length<3)for(;r&&a<c;a++)i=o[a],r.__get__?r.__get__(i)?r=r.__get__(i):r[i]&&(r=r[i]):r=r[i];else{for(--c;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i]=r[i]||{};i=o[a],r&&(r.__set__?r.__set__(i,e):r[i]=e,r=e)}}return r},invoke:function(n,t,e){var r,i,o;n&&t&&(0<(r=t.lastIndexOf("."))?(i=g.path(n,t.substring(0,r)))&&(o=i[t.substring(r+1)]):o=(i=n)[t],o&&o.apply(i,e))},deepEachObject:function(n,t,e){if(u.is(n,"object")){var r,i;for(var o in n)r=n[o],u.is(r,"object")?this.deepEachObject(r,t,e):null!=(i=t&&t.call(e,r,o,n))&&(n[o]=i)}return n},arrayValueToObject:function(n,t,e){if(u.is(n,"array")){for(var r,i,o={},c=0,a=n.length;c<a;c++)r=n[c],null!=(i=t&&t.call(e,r,c,n,o))&&(o[r]=i);n=o}return n}},u={toString:function(n){return n&&n.toString?n.toString():a.call(n)},each:function(n,t,e){if(n&&t)if(n.__each__)n.__each__(t,e);else{var r=n.length,i=null;if(0<r&&"[object Array]"===a.call(n)){for(var o=0;o<r;o++)if(!1===(i=t.call(e,n[o],o)))return!1}else for(var c in n)if(n.hasOwnProperty(c)){if(!1===(i=t.call(e,n[c],c)))return!1;if(-1===i)continue}}},clone:function(n){if(n){if(n.__clone__)return n.__clone__();if(g.is(n,"array"))return n.slice(0);var t={};for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}return n},type:function(n){return n&&n.__type__?n.__type__:a.call(n).slice(8,-1).toLowerCase()},is:function(n,t){if(n&&n.__is__)return n.__is__(t);if("string"==typeof t)switch(t.toLowerCase()){case"plain":return n&&n.constructor===Object;case"function":return n&&("Function"==n.constructor.name||"AsyncFunction"==n.constructor.name);case"asyncfunction":return n&&"AsyncFunction"==n.constructor.name;default:return this.type(n)===t}else if("function"==typeof t)return n instanceof t},may:function(n,t){return!!n&&(n.__may__?n.__may__(t):n.hasOwnProperty("on"+t))},can:function(n,t){return!!n&&(n.__can__?n.__can__(t):"function"==typeof n[t])},has:function(n,t){return!!n&&(n.__has__?n.__has__(t):n.hasOwnProperty(t))},get:function(n,t){if(n)return n.__get__?n.__get__(t):n[t]},set:function(n,t,e){n&&(n.__set__?n.__set__(t,e):n[t]=e)},gets:function(n){if(n){if(n.__gets__)return n.__gets__();var t={};for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}},sets:function(n,t){if(n&&t)if(n.__sets__)n.__sets__(t);else for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])}};o.extend(g,o),o.extend(g,u)}(zn);
!function(f){var o=f.GLOBAL,a=Array.prototype.slice,_=1,l=1,p={fixTargetCtor:function(t){return t instanceof d?t.constructor:t},fixTargetKey:function(t){return"@"+t},defineEvent:function(t,n,e){var r=p.fixTargetCtor(t),i=p.fixTargetKey(n),_=i in r,s={};return _||(s=Object.defineProperty(t,"on"+n.toLowerCase(),{get:function(){var t=this.__handlers__[n];return t?t[0].handler:null},set:function(t){var e=this.__handlers__;(e[n]=e[n]||[])[0]={owner:this,handler:t,context:null}}})),r[i]={name:n,type:"event",meta:e,descriptor:s},_},defineProperty:function(t,e,n){var r,i,_,s,o,a,h,u=p.fixTargetCtor(t),c=p.fixTargetKey(e),l=c in u;return h="value"in n?(i=n.value,_="_"+e,s=n.get,o=n.set,a=s||function(){return _ in this?this[_]:f.is(i,"function")?i.call(this):i},n.readonly?function(t,e){if(!e||!e.force)return!1;this[_]=t}:o||function(t){this[_]=t}):(a=n.get||function(){},n.set||function(){return!1}),l&&(a.__super__=u[c].getter,h.__super__=u[c].setter),r=Object.defineProperty(t,e,{get:a,set:h,configurable:!0}),u[c]={name:e,type:"property",meta:n,getter:a,setter:h,descriptor:r},l},defineMethod:function(t,e,n){var r=p.fixTargetCtor(t),i=p.fixTargetKey(e),_=i in r;return r[i]={name:e,type:"method",meta:n},e in t&&(n.value||(n.value=function(){}),n.value.__super__=t[e]),t[e]=n.value,_}},s={__handlers__:{},member:function(t,e){var n=p.fixTargetCtor(e||this),r=n[p.fixTargetKey(t)];return r||n===d?r:this.member(t,n._super_)},may:function(t){var e=this.member(t);return e&&"event"==e.type},has:function(t){var e=this.member(t);return e&&"property"==e.type},can:function(t){var e=this.member(t);return e&&"method"==e.type},get:function(t,e){var n=this.member(t);if(n&&n.getter)return n.getter.call(this,e)},set:function(t,e,n){var r=this.member(t);return r&&r.setter&&r.setter.call(this,e,n),this},gets:function(e){var n={},t=p.fixTargetCtor(this)._properties_;return f.each(t,function(t){n[t]=this.get(t,e)},this),n},sets:function(t,e,n){if(t){var r;for(var i in t)t.hasOwnProperty(i)&&(r=t[i],!1!==(n&&n(r,i,e))&&this.set(i,r,e))}return this},each:function(t,e){for(var n=p.fixTargetCtor(this)._properties_,r=0,i=n.length;r<i;r++){var _=n[r];if(!1===t.call(e,_,r,this.member(_),this.get(_)))return!1}return this},__may__:function(t){return this.may(t)},__has__:function(t){return this.has(t)},__can__:function(t){return this.can(t)},__get__:function(t){return this.get(t)},__gets__:function(){return this.gets()},__set__:function(t,e){this.set(t,e)},__sets__:function(t){this.sets(t)},__each__:function(t,e){return this.each(t,e)}},h={toJson:function(){return{ClassName:this._name_||"Anonymous",ClassID:this._id_}},info:function(){return{_id_:this._id_,_name_:this._name_,_super_:this._super_,_events_:this._events_,_properties_:this._properties_,_methods_:this._methods_,_meta_:this._meta_}},createSelf:function(){return this.__ctor__.apply(this,Array.prototype.slice.call(arguments))},createInstance:function(){return this.__ctor__.apply(this,Array.prototype.slice.call(arguments))},getProperties:function(r,i,t){var _={},s=t||{};if(!this.getMeta||"ZNObject"==this._name_)return _;var e=this._super_,n=this._mixins_;return e&&f.extend(_,e.getProperties(r,i,s)),n&&n.length&&f.each(n,function(t){t&&f.extend(_,t.getProperties(r,i,s))}),f.each(this.getMeta("properties"),function(t,e){if(s[e])return-1;s[e]=t;var n=r&&r.call(i||this,t,e,_);if(!1===n||-1===n)return n;t.hidden||(_[e]=t)},this),_},getProperty:function(n){var r=null;return n&&this.getProperties(function(t,e){return n==e&&(r=field),-1}),r},existProperty:function(t){return!!this.getProperty(t)},getMeta:function(t){return t?this._meta_[t]:this._meta_},setMeta:function(t,e){return t&&e&&(this._meta_[t]=e),this},defineEvent:function(t,e,n){return p.defineEvent(n||this.prototype,t,e)||(-1===this._meta_.events.indexOf(t)&&this._meta_.events.push(t),-1===this._events_.indexOf(t)&&this._events_.push(t)),this},defineProperty:function(t,e,n){return p.defineProperty(n||this.prototype,t,e)||(this._meta_.properties[t]||(this._meta_.properties[t]=e),-1===this._properties_.indexOf(t)&&this._properties_.push(t)),this},defineMethod:function(t,e,n){return p.defineMethod(n||this.prototype,t,e)||(this._meta_.methods[t]||(this._meta_.methods[t]=e),-1===this._methods_.indexOf(t)&&this._methods_.push(t)),this}},u={toString:function(){var t={ClassName:this.__name__||"Anonymous",InstanceID:this.__id__,Meta:this.constructor._meta_};return JSON.stringify(t)},toJson:function(){var n={};return f.each(this.constructor.getProperties(),function(t,e){n[e]=this.get(e)},this),n},getProperties:function(){return this.constructor.getProperties.apply(this,arguments)},getPropertie:function(t){return this.constructor.getPropertie(t)},upon:function(t,e,n){var r;return e&&(((r=this.__handlers__)[t]=r[t]||[])[0]=f.extend({owner:this,handler:e},n)),this},on:function(t,e,n){var r,i;return!e||(i=(r=this.__handlers__)[t]=r[t]||[{owner:null,handler:null,context:null}]).push&&"function"==typeof i.push&&i.push(f.extend({owner:this,handler:e},n)),this},hasEventHandler:function(t){return!!(this.__handlers__[t]||[]).length},off:function(t,e,n){var r,i=this.__handlers__[t]||[],_=n&&n.context;if(e)for(var s=i.length-1;0<=s;s--)(r=i[s]).handler!==e||_&&r.context!==_||this.__handlers__[t].splice(s,1);else this.__handlers__[t]=[{owner:null,handler:null,context:null}];return this},offs:function(t){var e=Array.prototype.slice.call(arguments);return e.length?f.each(e,function(t){this.__handlers__[t]&&(this.__handlers__[t]=[{owner:null,handler:null,context:null}])}.bind(this)):this.__handlers__={},this},fire:function(t,e,n){var r,i=this.__handlers__[t],_=null,s=null;if(i)for(var o=0,a=i.length;o<a;o++)if((r=i[o])&&r.handler){if(!1===(s=n&&"apply"==n.method?(n.ownerFirst&&(e=Array.from(e)).unshift(r.owner),r.handler.apply(r.context||r.owner,e)):r.handler.call(r.context||r.owner,r.owner,e,n)))return!1;if(-1===s)continue;if(n&&n.overwrite)_=s;else if(null!=s)return s}return _},fireApply:function(){var t=a.call(arguments),e=t.shift();if(!e)return this;var n,r,i=this.__handlers__[e];if(i)for(var _=0,s=i.length;_<s;_++)if((n=i[_])&&n.handler){if(!1===(r=n.handler.apply(n.context||n.owner,t)))return!1;if(-1===r)continue;if(null!=r)return r}return null},dispose:function(){for(var n in this.__id__=null,delete this.__id__,this.__handlers__)this.__handlers__[n]=null,this.__handlers__[n]&&this.__handlers__[n].length&&this.__handlers__[n].forEach(function(t,e){this.__handlers__[n][e]=null,delete this.__handlers__[n][e]}),delete this.__handlers__[n];this.__handlers__=null,delete this.__handlers__,this.__initializing__=null,delete this.__initializing__,this.__super__=null,delete this.__super__,this.__afters__=null,delete this.__afters__},destroy:function(){this.dispose()},super:function(){var t=this.super.caller.__super__;if(t)return t.apply(this,arguments)},is:function(t){if("string"==typeof t&&(t=f.path(o,t)),t){if(this instanceof t)return!0;for(var e=this.constructor._mixins_,n=0,r=e.length;n<r;n++){if(t===e[n])return!0}}return!1},__is__:function(t){return this.is(t)},__clone__:function(){}};function d(){}f.extend(d,s,h,{_id_:0,_name_:"ZNObject",_statics_:{},_events_:[],_properties_:[],_methods_:[],_mixins_:[],_meta_:{}}),f.extend(d.prototype,s,u),f.isZNObject=function(t){return t instanceof d},f.isZNFunction=function(t){return"function"==typeof t&&new t instanceof d};var m={_arguments:function(){var t,e,n,r=arguments,i=r.length,_=r[0];if(3===i){if(t=_,e=r[1],n=r[2],!f.is(e,"function"))throw new Error("Invalid _super class.")}else if(2===i){if(f.is(_,"string"))t=_,e=null;else{if(!f.is(_,"function"))throw new Error("Invalid _super class.");t=null,e=_}n=r[1]}else{if(1!==i)throw new Error("Invalid arguments.");if(e=t=null,n=_,!f.is(n,"object"))throw new Error("The meta argument must be an object.")}return{name:t=t||"",super:e=e||d,meta:n=f.overwrite(n||{},{static:!1,statics:[],partial:!1,abstract:!1,final:!1,mixins:[],events:[],properties:[],methods:[]})}},_meta:function(n,t){var e=t.name,r=t.super,i=t.meta;return f.extend(n,s,h,{_id_:_++,_name_:e,_super_:r,_partial_:i.partial,_abstract_:i.abstract,_static_:i.static,_final_:i.final,_statics_:f.extend({},r._statics_,i.statics),_events_:r._events_.slice(0),_properties_:r._properties_.slice(0),_methods_:r._methods_.slice(0),_mixins_:r._mixins_.concat(i.mixins),_meta_:i}),f.extend(n,n._statics_),i.static?(f.each(i.events,function(t){n.defineEvent(t,{},n)}),f.each(i.properties,function(t,e){n.defineProperty(e,f.is(t,"object")?t:{value:t},n)}),f.each(i.methods,function(t,e){n.defineMethod(e,f.is(t,"function")?{value:t}:t,n)}),i.methods.init&&i.methods.init.call(n,n)):(f.each(i.mixins,function(t){var e;t&&(e=t.prototype,f.each(t._events_,function(t){n.defineEvent(t,e.member(t).meta)}),f.each(t._properties_,function(t){n.defineProperty(t,e.member(t).meta)}),f.each(t._methods_,function(t){s[t]||u[t]||n.defineMethod(t,e.member(t).meta)}))}),f.each(i.events,function(t){n.defineEvent(t,{})}),f.each(i.properties,function(t,e){n.defineProperty(e,f.is(t,"object")?t:{value:t})}),f.each(i.methods,function(t,e){n.defineMethod(e,f.is(t,"function")?{value:t}:t)})),n}},v=function(t,e,n){if(t&&t!==d){var r=t.member("init"),i=t._mixins_,_=null;return r&&r.meta.after&&e.__afters__.push({context:e,handler:r.meta.after}),i.length&&f.each(i,function(t){t&&t["@init"]&&(_=t["@init"].meta,_=f.is(_,"function")?_:_.value,v(t.prototype.__super__,t.prototype,n),_&&_.call(e))}),r&&r.meta.auto&&r.meta.value.apply(e,n),arguments.callee(t._super_,e)}};f.Class=function(){var c,t,e,n=m._arguments.apply(this,arguments),r=n.name,i=n.super,_=n.meta,s=_.methods.init;if(_.properties=_.properties||_.props,_.props=null,delete _.props,i._static_)throw new Error("Static class cannot be inherited.");if(i._final_)throw new Error("Final class cannot be inherited.");if(r&&_.partial&&(c=f.path(o,r)),_.static){if(c){if(!c._static_)throw new Error('Partial class "'+r+'" must be static.')}else c=function(){throw new Error("Cannot instantiate static class.")};e=c.prototype}else{if(c){if(c._static_)throw new Error('Partial class "'+r+'" must not be static.');if(c._super_!==i&&c._super_!==d)throw new Error('Partial class "'+r+'" must have consistent super class.')}else((c=_.abstract?function(){throw new Error("Cannot instantiate abstract class.")}:function(){var t=c._mixins_||[],e=c._ctors_||[],n=null,r=arguments;this.__id__=l++,this.__handlers__={},this.__initializing__=!0,this.__afters__=[];for(var i,_=null,s=0,o=t.length;s<o;s++)(i=t[s])&&(i["@init"]?(_=i["@init"].meta,_=f.is(_,"function")?_:_.value,v(i.prototype.__super__,this,r),_&&_.call(this)):v(i.prototype.__super__,this,r));v(this.__super__,this,r);for(var a=0,h=e.length;a<h;a++)n=e[a],(n=f.is(n,"function")?n:n.value)&&n.apply(this,r);for(;0<this.__afters__.length;){var u=this.__afters__.pop();u.handler.apply(u.context,r)}this.__afters__=null,delete this.__afters__,this.__initializing__=!1}).__ctor__=c)._ctors_=[];c._super_!==i?((t=function(){}).prototype=i.prototype,(e=new t).constructor=c,e.__type__=r||"Anonymous(ZNClass)",e.__super__=i,c.prototype=e):e=c.prototype,e.class=e.constructor,s&&(c._ctors_.push(s),e.__ctor__||(e.__ctor__=s))}return m._meta(c,n),e.__define__&&e.__define__.call(c),r&&f.path(o,r,c),c}}(zn);
!function(n){var e=Array.prototype.slice,t=(Object.prototype.hasOwnProperty,Object.prototype.toString),r={format:function(){var t=arguments,e=this;return 1==t.length&&"object"==typeof t[0]&&(t=t[0]),n.each(t,function(t,r){null!=t&&(t="object"==n.type(t)?JSON.stringify(t):t.toString?t.toString():t,e=e.replace(new RegExp("\\{"+r+"\\}","gi"),t))}),e.toString()},firstUpperCase:function(t){return t.replace(/\b(\w)(\w*)/g,function(t,r,e){return r.toUpperCase()+e})}},i={isArray:function(t){return t&&"[object Array]"===n.toString(t)&&t.constructor===Array}},o={format:function(t,r){var e="\\d(?=(\\d{"+(r||3)+"})+"+(0<t?"\\.":"$")+")";return this.toFixed(Math.max(0,~~t)).replace(new RegExp(e,"g"),"$&,")},sectionThree:function(){return this.toString().replace(/(\d)(?=(\d{3})+\.)/g,"$1,")},price:function(t){var r=n.extend({unit:1e4,unitText:"万",prefix:"",decimal:2,sections:3},t);return 1<this/r.unit&&this%100==0?(this/r.unit).sectionThree()+r.unitText:this.format(r.decimal,r.sections)}},s={bind:function(t){var r=this;return function(){return r.apply(t,e.call(arguments,1))}}};var u,a,c,f;u=t,a=Array.isArray,c={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},f=/[\\"\u0000-\u001F\u2028\u2029]/g;function h(t){return c[t]||"\\u"+(t.charCodeAt(0)+65536).toString(16).substr(1)}var p={format:function(t){var r={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var e in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[e]:("00"+r[e]).substr((""+r[e]).length)));return t}};n.fix(Array,i),n.fix(Array.prototype,{forEach:function(t,r){if(!t)return!1;for(var e=0,n=this.length;e<n;e++)t.call(r,this[e],e);return this},indexOf:function(t){for(var r=0,e=this.length;r<e;r++)if(this[r]===t)return r;return-1},lastIndexOf:function(t){for(var r=this.length-1;0<=r;r--)if(this[r]===t)return r;return-1}}),n.fix(Function.prototype,s),n.fix(String.prototype,r),n.fix(Number.prototype,o),n.fix(Date.prototype,p)}(zn);
!function(i){var a=Array.prototype.slice,c=0,o=1,s=2,l=i.Class({events:["complete"],properties:{promise:null},methods:{init:function(t,e){this._promise=new u,t&&this.resolve(t),e&&this.reject(e)},resolve:function(){var e=a.call(arguments);try{var t=this.get("promise"),n=this;if(t.get("readyState")!=c)return;t.set("readyState",o),t.set("data",e),i.each(t.get("resolves"),function(t){t.apply(n,e)})}catch(t){h.catch(t,this)}this.fire("complete",e)},reject:function(){var t=a.call(arguments);try{var e=this.get("promise");if(e.get("readyState")!=c)return;e.set("readyState",s),e.set("reason",t);var n=e.get("rejects")[0];n&&n.apply(this,t)}catch(t){h.catch(t,this)}this.fire("complete",t)}}}),u=i.Class({statics:{isPromise:function(t){return null!=t&&"function"==typeof t.then},defer:null},properties:{resolves:null,rejects:null,data:null,reason:null,readyState:null},methods:{init:function(t){this.set("resolves",[]),this.set("rejects",[]),this.set("exceptions",[]),this.set("readyState",c)},then:function(n,t){var e,s=new l;function r(){var t=a.call(arguments),e=n?n.apply(this,t):t;return u.isPromise(e)?e.then(function(){s.resolve.apply(s,a.call(arguments))}):s.resolve.apply(s,e),e}return this.get("readyState")===c?(this.get("resolves").push(r),t?this.get("rejects").push(t):this.get("rejects").push(function(){s.reject.apply(s,a.call(arguments))})):this.get("readyState")===o&&(e=this,setTimeout(function(){r.apply(e,e.get("data"))})),s.promise},catch:function(t){return h.exception(t)},finally:function(t){return h.finally(t)},otherwise:function(t){return this.then(void 0,t)}}}),h=i.async=i.Class({static:!0,methods:{init:function(t){this._exceptions=[],this._finallys=[],this._count=0,this._currIndex=0,this._dataArray=[]},exception:function(t){return this._exceptions.push(t),this},catch:function(e,n){return i.each(this._exceptions,function(t){t.call(n,e)}),this},finally:function(t){return this._finallys.push(t),this},defer:function(t,e){var n=this,s=new l(t,e);return s.on("complete",function(t,e){n._currIndex++,n._dataArray.push(e),n._currIndex==n._count&&(i.each(n._finallys,function(t){try{t(n._dataArray)}catch(t){i.error(t.message)}}),n._finallys=[])}),n._count++,s},all:function(e){var n=h.defer(),s=0,r=[];return i.each(e,function(t){t.then(function(t){r.push(t),++s>=e.length&&n.resolve(r)})}),n.promise},any:function(t){var e=h.defer();return i.each(t,function(t){t.then(function(t){e.resolve(t)})}),e.promise}}})}(zn);
!function(t){var r=[97,123],n=[65,91];t.char=t.Class({static:!0,methods:{trim:function(r,t){var n=r.attr(t);return n=n?n.trim():""},trimLeft:function(r,t){return r&&r.startsWith(t)&&(r=r.substr(t.length)),r},trimRight:function(r,t){return r&&r.endsWith(t)&&(r=r.substr(0,r.length-t.length)),r},getRandomChar:function(){return this.getUppercaseLetters()[Math.floor(26*Math.random())]},lowercase:function(r){return t.is(r,"string")?r.replace(/[A-Z]/g,function(r){return String.fromCharCode(32|r.charCodeAt(0))}):r},uppercase:function(r){return t.is(r,"string")?r.replace(/[a-z]/g,function(r){return String.fromCharCode(-33&r.charCodeAt(0))}):r},toUnicode:function(r){for(var t=[],n=0,e=r.length;n<e;n++)t.push(r.charCodeAt(n));return t},toChar:function(r,t){for(var n=[],e=r;e<t;e++)n.push(String.fromCharCode(e));return n},getLowercaseLetters:function(){return this.toChar(r[0],r[1])},getUppercaseLetters:function(){return this.toChar(n[0],n[1])},getStringFromChar:function(r,t){for(var n=r||"A",e=t||26,o=[],i=0;i<e;i++)o.push(String.fromCharCode(n.charCodeAt(0)+i));return o.join("")}}})}(zn);
!function(t){t.data=t.Class({static:!0,methods:{}})}(zn);
!function(c){var d="yyyy-MM-dd hh:mm:ss.SSS";c.date=c.Class({static:!0,methods:{format:function(){},timestampToString:function(e){if(c.is(e,"string")&&(e=parseInt(e)),!c.is(e,"number"))throw new Error("参数不是整数");if(!e)throw new Error("参数不存在");10==e.toString().length&&(e*=1e3);var t=new Date(e),n=t.getFullYear(),r=t.getMonth()+1,s=t.getDate(),i=t.getHours(),a=t.getMinutes(),g=t.getSeconds();return[n,r<10?"0"+r:r,s<10?"0"+s:s].join("-")+" "+[i<10?"0"+i:i,a<10?"0"+a:a,g<10?"0"+g:g].join(":")},datatimeToString:function(e){var t=null;return c.is(e,"string")&&(t=new Date(e)),e instanceof Date&&(t=e),t?t.toISOString().split("T")[1].split("Z")[0]:""},nowString:function(e,t,n){var r=new Date;if(c.is(n,"string")&&(r=new Date(n)),!r)return"";var s=r.getFullYear(),i=(i=r.getMonth()+1)<10?"0"+i:i,a=(a=r.getDate())<10?"0"+a:a,g=(g=r.getHours())<10?"0"+g:g,o=(o=r.getMinutes())<10?"0"+o:o,u=(u=r.getSeconds())<10?"0"+u:u,l=(l=r.getMilliseconds())<10?"0"+l:l;return[s,i,a].join(e||"-")+" "+[g,o,u].join(t||":")},nowDateString:function(e,t){var n=new Date;if(c.is(t,"string")&&(n=new Date(t)),!n)return"";var r=n.getFullYear(),s=n.getMonth()+1,i=n.getDate();return[r,s=s<10?"0"+s:s,i=i<10?"0"+i:i].join(e||"")},nowTimeString:function(e,t,n){var r=new Date;if(c.is(n,"string")&&(r=new Date(n)),!r)return"";var s=r.getHours(),i=r.getMinutes(),a=r.getSeconds(),g=(g=r.getMilliseconds())<10?"0"+g:g,o=[s=s<10?"0"+s:s,i=i<10?"0"+i:i,a=a<10?"0"+a:a];return t&&o.push(g),o.join(e||":")},getSecond:function(e){var t=+e.substring(1,e.length);switch(e.substring(0,1)){case"s":return 1e3*t;case"h":return 60*t*60*1e3;case"d":return 24*t*60*60*1e3}},secondString:function(e){var t=parseInt(e),n=0,r=0,s=0;60<t&&(n=parseInt(t/60),t=parseInt(t%60),60<n&&(r=parseInt(n/60),n=parseInt(n%60),24<r&&(s=parseInt(r/24),r=parseInt(r%24))));var i="";return 0<t&&(i=parseInt(t)+"秒"),0<n&&(i=parseInt(n)+"分"+i),0<r&&(i=parseInt(r)+"小时"+i),0<s&&(i=parseInt(s)+"天"+i),i},dateFormat:function(e,t){var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};for(var r in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substring(4-RegExp.$1.length))),n)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?n[r]:("00"+n[r]).substring((""+n[r]).length)));return e},asString:function(e){e=e||new Date;var t=d;"string"==typeof e&&(t=arguments[0],e=arguments[1]);var n=this.__addZero(e.getDate()),r=this.__addZero(e.getMonth()+1),s=this.__addZero(e.getFullYear()),i=this.__addZero(e.getFullYear().toString().substring(2,4)),a=-1<t.indexOf("yyyy")?s:i,g=this.__addZero(e.getHours()),o=this.__addZero(e.getMinutes()),u=this.__addZero(e.getSeconds()),l=this.__padWithZeros(e.getMilliseconds(),3),c=this.__offset(e);return t.replace(/dd/g,n).replace(/MM/g,r).replace(/y{1,4}/g,a).replace(/hh/g,g).replace(/mm/g,o).replace(/ss/g,u).replace(/SSS/g,l).replace(/O/g,c)},__padWithZeros:function(e,t){for(var n=e+"";n.length<t;)n="0"+n;return n},__addZero:function(e){return this.__padWithZeros(e,2)},__offset:function(e){var t=Math.abs(e.getTimezoneOffset()),n=String(Math.floor(t/60)),r=String(t%60);return 1==n.length&&(n="0"+n),1==r.length&&(r="0"+r),e.getTimezoneOffset()<0?"+"+n+r:"-"+n+r}}})}(zn);
!function(f){f.json=f.Class({static:!0,methods:{serialize:function(n){return Object.keys(n).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])}).join("&")},format:function(e,n,t){if(!n)return n;for(var c=null,r=null,a=escape(n),i=f.extend({prefix:"${",suffix:"}"},t),o=escape(i.prefix)+"([^%>]+)?"+escape(i.suffix),s=new RegExp(o,"i");c=s.exec(a);){switch(r=f.path(e,c[1].trim()),f.type(r)){case"array":r=r.join("");break;case"object":r=JSON.stringify(r);break;case"function":r=r.call(null,e,n,t)}a=a.replace(s,r)}return unescape(a)}}})}(zn);
!function(l){function a(o,e){return"number"==typeof e?e="["+e+"m":"string"==typeof e&&(e=n[e]||t[e]),e?e+o+"[0m":o}var u=Array.prototype.slice,e={log:{color:"#3b3b3b",number:37,level:0},info:{color:"#3399ea",number:36,level:1},debug:{color:"#0b109a",number:35,level:2},warn:{color:"#ff9900",number:33,level:3},error:{color:"#e20611",number:31,level:4},ok:{color:"#2de60b",number:32,level:5},trace:{color:"#0c5cec",number:34,level:6},white:{color:"#fff",number:37,level:7},all:{color:"#000",number:36,level:10}},n={bright:"[1m",grey:"[2m",italic:"[3m",underline:"[4m",reverse:"[7m",hidden:"[8m",black:"[30m",red:"[31m",green:"[32m",yellow:"[33m",blue:"[34m",magenta:"[35m",cyan:"[36m",white:"[37m",blackBG:"[40m",redBG:"[41m",greenBG:"[42m",yellowBG:"[43m",blueBG:"[44m",magentaBG:"[45m",cyanBG:"[46m",whiteBG:"[47m"},t={Close:"[0m",Highlight:"[1m",Underline:"[4m",Blink:"[5m",Invert:"[7m",Blank:"[8m",MouseUpTo:"[nA",MouseDownTo:"[nB",MouseRightTo:"[nC",MouseLeftTo:"[nD",MousePosition:"[y;xH",ClearScreen:"[2J",ClearFrom:"[K",Reset:"[0m",Bright:"[1m",Dim:"[2m",Underscore:"[4m",Reverse:"[7m",Hidden:"[8m",FgBlack:"[30m",FgRed:"[31m",FgGreen:"[32m",FgYellow:"[33m",FgBlue:"[34m",FgMagenta:"[35m",FgCyan:"[36m",FgWhite:"[37m",BgBlack:"[40m",BgRed:"[41m",BgGreen:"[42m",BgYellow:"[43m",BgBlue:"[44m",BgMagenta:"[45m",BgCyan:"[46m",BgWhite:"[47m"},o=l.Class({events:["log","info","debug","warn","error","ok","trace","all","position"],methods:{init:function(o){this._config={only:null,levels:e},this.events(o)},config:function(o){return this._config=l.overwrite(o,this._config),this},events:function(o){if(o&&"object"==typeof o)for(var e in o)this.on(e,o[e],this);return this},define:function(o,e){this._config.levels[o]=l.extend({color:"cyan"},e);var n=this.constructor;return n&&(n.defineEvent(o,{},n),n.defineMethod(o,{value:function(){this.__consoleLog.call(this,o,arguments)}.bind(this)},n),this[o]=function(){this.__consoleLog.call(this,o,arguments)}.bind(this)),this},log:function(){this.__consoleLog.call(this,"log",arguments)},info:function(){this.__consoleLog.call(this,"info",arguments)},debug:function(){this.__consoleLog.call(this,"debug",arguments)},warn:function(){this.__consoleLog.call(this,"warn",arguments)},error:function(){this.__consoleLog.call(this,"error",arguments)},ok:function(){this.__consoleLog.call(this,"ok",arguments)},trace:function(){this.__consoleLog.call(this,"trace",arguments)},all:function(){this.__consoleLog.call(this,"all",arguments)},__getDateString:function(o){return l.date.asString(o||new Date)},__getPosition:function(){try{throw new Error("Get Logger Position")}catch(o){o.DEBUG&&l.CONSOLE_ERROR&&console.error(o);var e=this.fire("position",o);return null==e&&o.stack.split("\n")[5]&&(e=o.stack.split("\n")[5].replace(/\(/g,"").replace(/\)/g,"").split("/").pop()),e||""}},prefix:function(o){var e=o.toLowerCase(),n=this.__getDateString(),l=this._config.levels[e],t=this.__getPosition(),r=null;return!(!l||this._config.only&&this._config.only!=e)&&("undefined"!=typeof module&&module.exports?(r=l.number,[n,"[",a(a(e.toUpperCase(),r),"Highlight"),"] [",a(a(t,r),"Underline"),"]"].join(" ")):(r=l.color,[n+"[%c "+e.toUpperCase()+" %c][%c "+t+"]","color:"+r+";font-weight:bold;","color:#404850:font-weight:normal;","color:"+r+";text-decoration:underline;"]))},__consoleLog:function(o,e){var n=u.call(e),l=u.call(e),t=o.toLowerCase(),r=this.__getDateString(),i=this._config.levels[t],c=this.__getPosition(),g=null,s=null;if(!i||this._config.only&&this._config.only!=t)return!1;if("undefined"!=typeof module&&module.exports?(s=null!=i.number?i.number:i.color,g=[r,"[",a(a(t.toUpperCase(),s),"Highlight"),"] [",a(a(c,s),"Underline"),"]"],n.unshift(g.join(" "))):(s=i.color,n=[g=r+"[ %c"+t.toUpperCase()+"%c ][ %c"+c+"%c ]","color:"+s+";font-weight:bold;","color:#404850:font-weight:normal;","color:"+s+";text-decoration:underline;","color:#404850:font-weight:normal;"].concat(n)),this.fireApply("all",this,r,t,c,l,n,g),!1!==this.fireApply(t,this,r,t,c,l,n,g)&&console.log.apply&&"function"==typeof console.log.apply)try{console.log.apply(console.log,n)}catch(o){console.error(o)}}}});l.logger=new o;var r={log:function(){l.logger.log.apply(l.logger,arguments)},info:function(){l.logger.info.apply(l.logger,arguments)},debug:function(){l.logger.debug.apply(l.logger,arguments)},warn:function(){l.logger.warn.apply(l.logger,arguments)},trace:function(){l.logger.trace.apply(l.logger,arguments)},error:function(){l.logger.error.apply(l.logger,arguments)},ok:function(){l.logger.ok.apply(l.logger,arguments)},nodeConsoleColorText:a,prefix:function(){l.logger.prefix.apply(l.logger,arguments)}};l.extend(l,r)}(zn);
!function(l){l.querystring=l.Class({static:!0,properties:{config:{get:function(){return this._config}}},methods:{init:function(){this._config={separator:"&",equal:"=",minIndex:0,maxIndex:1e3}},config:function(e){return this.overwrite(this._config,e),this},parse:function(e,n){if("object"==typeof e)return e;if(""===e||!1===e||null==e)return{};var r=l.extend({},this._config,n),t={},i=r.equal,o=e.split(r.separator),s=o.length;0<r.maxIndex&&s>r.maxIndex&&(s=r.maxIndex);for(var a=r.minIndex;a<s;a++){var u=o[a].replace(/\+/g,"%20"),c=u.indexOf(i),f=null,g=null,g=0<=c?(f=u.substr(0,c),u.substr(c+1)):(f=u,"");""!==f&&(f=decodeURIComponent(f),g=decodeURIComponent(g),t.hasOwnProperty(f)?l.is(t[f],"array")?t[f].push(g):t[f]=[t[f],g]:t[f]=g)}return t},stringify:function(e,n){if("string"==typeof e)return e;var r=l.extend({},this._config,n),t=[],i=r.equal,o={},o=l.isZNObject(e)?e.gets():e;if(!l.is(o,"object"))throw new Error("Agrument Error.");for(var s in e){var a=e[s],u=encodeURIComponent(this.__stringifyValue(s)),a=encodeURIComponent(this.__stringifyValue(a));t.push(u+i+a)}return t.join(r.separator)},__stringifyValue:function(e){switch(l.type(e)){case"string":return e;case"boolean":return e?"true":"false";case"object":case"array":return JSON.stringify(e);case"number":return isFinite(e)?e:"0";case"function":return e();default:return""}}}})}(zn);
!function(s){var t=Array.prototype.slice,e=Object.prototype.toString,r=0,n=1,o=3,i=s.Class({events:["stop","error","finished"],properties:{status:null},methods:{init:function(s){if(this._status=r,s&&"object"==typeof s)for(var t in s)this.on(t,s[t])},doTask:function(t,s){var i=s||[];"[object Array]"!=e.call(i)&&(i=[i]),t.done=this.done.bind(this),t.processor=this,i.unshift(t);try{this._status=n;var r=t.handler.apply(t.context,i);!1===r&&(this._status=o,this.fire("stop",i)),null!=r&&t.done(r)}catch(s){this._status=o,this.fire("error",[s,t])}},done:function(){this._status=o,this.fire("finished",t.call(arguments))}}}),h=s.Class({events:["clear","insert","pause","resume","error","stop","every","destroy","finally"],methods:{init:function(s,t){if(this._tasks=[],this._taskProcessors=[],this._lastTask=null,this._data=[],this._max=(s||{}).max||1,t&&"object"==typeof t)for(var i in t)this.on(i,t[i],this)},destroy:function(){this._tasks=null,delete this._tasks,this._taskProcessors=null,delete this._taskProcessors,this._lastTask=null,delete this._lastTask,this._data=null,delete this._data,this._max=null,delete this._max,this.fire("destroy",this),this.dispose()},size:function(){return this._tasks.length},clear:function(){return this._tasks=[],this._data=[],this._lastTask=null,this.fire("clear"),this},pause:function(s){return this._paused=!0,0<s&&(this._pauseTimer=setTimeout(this.resume,s)),this.fire("pause",s),this},resume:function(){return this._pauseTimer&&clearTimeout(this._pauseTimer),this._paused=!1,this.doTask(),this.fire("resume",this),this},onError:function(s,t){return this.on("error",s,t||this),this},onStop:function(s,t){return this.on("stop",s,t||this),this},onEvery:function(s,t){return this.on("every",s,t||this),this},onFinally:function(s,t){return this.on("finally",s,t||this),this},unshift:function(s,t){return this.insert(s,t,0),this},push:function(s,t){return this.insert(s,t,-1),this},inserts:function(s,t,i){var r=s||[],e=i||0,n=this._tasks[0],o=null,h=null,r=r.map(function(s){return h={handler:s,context:t||this},o&&((h.previous=o).next=h),o=h}.bind(this));return n&&((o.next=n).previous=o),r.unshift(0),r.unshift(e),this._tasks.splice.apply(this._tasks,r),this},insert:function(s,t,i){var r={handler:s,context:t||this},e=i||-1;switch(e){case-1:this._lastTask&&(r.previous=r,this._lastTask.next=r),this._lastTask=r,this._tasks.push(r);break;case 0:var n=this._tasks[0];n&&((r.next=n).previous=r),this._tasks.unshift(r);break;default:this._tasks.splice(e,0,r)}return this.fire("insert",r),this},getTaskProcessor:function(){var s,t=this._taskProcessors.length;if(!t)return this.createTaskProcessor();for(var i=0;i<t;i++)if((s=this._taskProcessors[i]).status==o||s.status==r)return s;return this._max>t?this.createTaskProcessor():void 0},createTaskProcessor:function(){var s=new i({finished:this.__onProcessorFinished.bind(this),stop:this.__onProcessorStop.bind(this),error:this.__onProcessorError.bind(this)});return this._taskProcessors.push(s),s},start:function(){return this._data=[],this.doTask()},doTask:function(s){if(!this._tasks)return this;var i=this._tasks.shift();if(i){if(this._paused)return this;var t=this.getTaskProcessor();t&&(null!=s&&(i.previousResult=s),i.queue=this,i.error=function(s,t){this.error(s,t||i)}.bind(this),i.stop=this.stop.bind(this),t.doTask(i,s))}else this.finally.apply(this,s);return this},stop:function(){this.clear();var s=t.call(arguments);return!1!==this.fire("stop",s,{ownerFirst:!0,method:"apply"})&&this.finally.apply(this,s),this},error:function(s,t){var i=this.fire("error",[s,t],{ownerFirst:!0,method:"apply"});return!0===i&&t?t.done.apply(t.processor,t.previousResult):!1!==i&&this.finally(s,t),this},finally:function(){return this.fire("finally",t.call(arguments),{ownerFirst:!0,method:"apply"}),this.destroy(),this},__onProcessorFinished:function(s,t){this._data&&this._data.push(t),!1!==this.fire("every",t||[],{ownerFirst:!0,method:"apply"})&&this.doTask(t)},__onProcessorStop:function(s,t){this.stop.apply(this,t)},__onProcessorError:function(s,t){return this.error.apply(this,t)}}});s.queue=function(s,t){return new h(s,t)}}(zn);
!function(e){e.string=e.Class({static:!0,methods:{decode:function(e){return e&&e.length&&(e=(e=(e=(e=(e=(e=(e=e.replace(/&amp;/g,"&")).replace(/&lt;/g,"<")).replace(/&gt;/g,">")).replace(/&nbsp;/g," ")).replace(/&#39;/g,"'")).replace(/&quot;/g,'"')).replace(/<br>/g,"\n")),e},encode:function(e){return e&&e.length&&(e=(e=(e=(e=(e=(e=e.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/ /g,"&nbsp;")).replace(/\'/g,"&#39;")).replace(/\"/g,"&quot;")),e}}})}(zn);
!function(t){t.util=t.Class({static:!0,methods:{formatDate:function(t,n){},wordCount:function(t){var n=data.match(/[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/),r=0;if(null===n)return r;for(var e=0;e<n.length;e++)19968<=n[e].charCodeAt(0)?r+=n[e].length:r+=1;return r},rate:function(t){return"★★★★★☆☆☆☆☆".slice(5-t,10-t)},valueExchange:function(t,n){return t^=n,[t^=n^=t,n]},htmlspecialchars:function(t){return t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},getColorValue:function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6)},humpToSeparator:function(t,n){return t.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join(n||"_").toLowerCase()},getTime:function(){return(new Date).getTime()},generateCode:function(){return this.getTime().toString().substring(1).toString()+Math.floor(100*(9*Math.random()+1))},getRandomNumber:function(){return Math.floor(10*Math.random())},getRandomNumbers:function(){return Math.floor(1e3*(9*Math.random()+1))},getRandomChars:function(){return(Math.random()/new Date).toString(36).replace(/\d/g,"").slice(1)},randomNumbers:function(t){return Math.random().toString().slice(-(t||6))}}})}(zn);