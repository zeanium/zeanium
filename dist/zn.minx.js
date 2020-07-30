var __isServer="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0),zn={VERSION:"1.0.8",DEBUG:!0,ZN_PATH:"",PATH:"",GLOBAL:function(){return __isServer?global:window}.call(null),isServer:__isServer};if(zn.GLOBAL.zn=zn,__isServer)zn.ZN_PATH=__dirname,zn.PATH=process.cwd(),module.exports=zn;else{var _zn_url="";try{__a__=__b__}catch(r){r.fileName?_zn_url=r.fileName:r.sourceURL?_zn_url=r.sourceURL:r.stacktrace?console.error(r.stacktrace):r.stack?_zn_url=(_zn_url=(_zn_url=r.stack.split("\n")[1]).replace(/\s/g,"")).substring(2,_zn_url.length):console.error(r.toString())}if(!_zn_url)for(var _node,_scripts=document.getElementsByTagName("script"),_src="",i=0,_len=scripts.length;i<_len;i++)if((_node=scripts[i]).getAttribute&&("zn.js"===(_src=_node.getAttribute("src")||"").slice(-5)||"zn.minx.js"===_src.slice(-10))){_zn_url=_src;break}if(!_zn_url)throw new Error("zn.js has not been included, please do it first.");zn.ZN_PATH=_zn_url.substring(0,_zn_url.lastIndexOf("/")+1)}
!function(p){var a=Object.prototype.toString,o={isNull:function(t){return null==t},isNotNull:function(t){return null!=t},idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var t,e=arguments,n=null;return e.length<2?e[0]:(n=(n=e[0]).toString?n.toString():n,t=e[1],_.each(t,function(t,e){null!=t&&(t=_.is(t,"object")?JSON.stringify(t):t.toString?t.toString():t,n=n.replace(new RegExp("\\{"+e+"\\}","gi"),t))}),n)},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}).toUpperCase()},fix:function(t){for(var e=t||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&"function"!=typeof e[o]&&(e[o]=i[o])}return e},extend:function(t){for(var e=t||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o])}return e},isJson:function(t){return"object"==typeof t&&"[object object]"==a.call(t).toLowerCase()&&"function Object() { [native code] }"==t.constructor.toString()},deepAssign:function(t,e){var n,r=null;switch(a.call(e)){case"[object Object]":if(!o.isJson(e))return t;for(var i in e)if(n=t[i],r=e[i],e.hasOwnProperty(i))switch(a.call(r)){case"[object Object]":if(!o.isJson(r))continue;r=this.deepAssign({},r),"[object Object]"==a.call(n)?t[i]=this.deepAssign(n,r):t[i]=r;break;case"[object Array]":"[object Array]"==a.call(n)?t[i]=t[i].concat(r):t[i]=r;break;case"[object Null]":case"[object Boolean]":case"[object Function]":case"[object Number]":case"[object String]":t[i]=r}break;case"[object Array]":e.unshift(t),o.deepAssigns.apply(this,e)}return t},callOnce:function(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}},deepAssigns:function(){for(var t=arguments[0],e=1,n=arguments.length;e<n;e++)o.deepAssign(t,arguments[e]);return t},convertArrayArgv:function(t,e){for(var n,r=[],i=p.extend({prefix:"--"},e).prefix,o={},c=null,a={},_=!1,s=0,u=t.length;s<u;s++)if(-1!==(c=t[s]).indexOf(i))o[n=c.replace(i,"")]=!0,a[s+1]=n,_=_||!0;else if(_)if(a[s])o[a[s]]=c;else{for(var f,l=s-1;!a[l]&&0<l;)--l;a[l]&&(null!=(f=o[a[l]])?"string"==typeof f?o[a[l]]=[f,c]:"object"==typeof f&&o[a[l]].push(c):o[a[l]]=c)}else r.push(c);return{env:r,argv:o}},overwrite:function(t){for(var e=t||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&void 0===e[o]&&(e[o]=i[o])}return e},path:function(t,e,n){var r=t||{};if(e){var i,o=e.split("."),c=o.length,a=0;if(arguments.length<3)for(;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i];else{for(--c;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i]=r[i]||{};i=o[a],r&&(r.__set__?r.__set__(i,n):r[i]=n,r=n)}}return r},invoke:function(t,e,n){var r,i,o;t&&e&&(0<(r=e.lastIndexOf("."))?(i=p.path(t,e.substring(0,r)))&&(o=i[e.substring(r+1)]):o=(i=t)[e],o&&o.apply(i,n))},deepEachObject:function(t,e,n){if(_.is(t,"object")){var r,i;for(var o in t)r=t[o],_.is(r,"object")?this.deepEachObject(r,e,n):null!=(i=e&&e.call(n,r,o,t))&&(t[o]=i)}return t},arrayValueToObject:function(t,e,n){if(_.is(t,"array")){for(var r,i,o={},c=0,a=t.length;c<a;c++)r=t[c],null!=(i=e&&e.call(n,r,c,t,o))&&(o[r]=i);t=o}return t}},_={toString:function(t){return t&&t.toString?t.toString():a.call(t)},each:function(t,e,n){if(t&&e)if(t.__each__)t.__each__(e,n);else{var r=t.length,i=null;if(0<r&&"[object Array]"===a.call(t)){for(var o=0;o<r;o++)if(!1===(i=e.call(n,t[o],o)))return!1}else for(var c in t)if(t.hasOwnProperty(c)){if(!1===(i=e.call(n,t[c],c)))return!1;if(-1===i)continue}}},clone:function(t){if(t){if(t.__clone__)return t.__clone__();if(p.is(t,"array"))return t.slice(0);var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}return t},type:function(t){return t&&t.__type__?t.__type__:a.call(t).slice(8,-1).toLowerCase()},is:function(t,e){if(t&&t.__is__)return t.__is__(e);if("string"==typeof e)switch(e.toLowerCase()){case"plain":return t&&t.constructor===Object;default:return this.type(t)===e}else if("function"==typeof e)return t instanceof e},may:function(t,e){return!!t&&(t.__may__?t.__may__(e):t.hasOwnProperty("on"+e))},can:function(t,e){return!!t&&(t.__can__?t.__can__(e):"function"==typeof t[e])},has:function(t,e){return!!t&&(t.__has__?t.__has__(e):t.hasOwnProperty(e))},get:function(t,e){if(t)return t.__get__?t.__get__(e):t[e]},set:function(t,e,n){t&&(t.__set__?t.__set__(e,n):t[e]=n)},gets:function(t){if(t){if(t.__gets__)return t.__gets__();var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}},sets:function(t,e){if(t&&e)if(t.__sets__)t.__sets__(e);else for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}};o.extend(p,o),o.extend(p,_)}(zn);
!function(f){var o=f.GLOBAL,a=Array.prototype.slice,s=1,c=1,p={fixTargetCtor:function(t){return t instanceof d?t.constructor:t},fixTargetKey:function(t){return"@"+t},defineEvent:function(t,n,e){var r=p.fixTargetCtor(t),i=p.fixTargetKey(n),s=i in r,_={};return s||(_=Object.defineProperty(t,"on"+n.toLowerCase(),{get:function(){var t=this.__handlers__[n];return t?t[0].handler:null},set:function(t){var e=this.__handlers__;(e[n]=e[n]||[])[0]={owner:this,handler:t,context:null}}})),r[i]={name:n,type:"event",meta:e,descriptor:_},s},defineProperty:function(t,e,n){var r,i,s,_,o,a,u,h=p.fixTargetCtor(t),l=p.fixTargetKey(e),c=l in h;return u="value"in n?(i=n.value,s="_"+e,_=n.get,o=n.set,a=_||function(){return s in this?this[s]:f.is(i,"function")?i.call(this):i},n.readonly?function(t,e){if(!e||!e.force)return!1;this[s]=t}:o||function(t){this[s]=t}):(a=n.get||function(){},n.set||function(){return!1}),c&&(a.__super__=h[l].getter,u.__super__=h[l].setter),r=Object.defineProperty(t,e,{get:a,set:u,configurable:!0}),h[l]={name:e,type:"property",meta:n,getter:a,setter:u,descriptor:r},c},defineMethod:function(t,e,n){var r=p.fixTargetCtor(t),i=p.fixTargetKey(e),s=i in r;return r[i]={name:e,type:"method",meta:n},e in t&&(n.value||(n.value=function(){}),n.value.__super__=t[e]),t[e]=n.value,s}},_={__handlers__:{},member:function(t,e){var n=p.fixTargetCtor(e||this),r=n[p.fixTargetKey(t)];return r||n===d?r:this.member(t,n._super_)},may:function(t){var e=this.member(t);return e&&"event"==e.type},has:function(t){var e=this.member(t);return e&&"property"==e.type},can:function(t){var e=this.member(t);return e&&"method"==e.type},get:function(t,e){var n=this.member(t);if(n&&n.getter)return n.getter.call(this,e)},set:function(t,e,n){var r=this.member(t);return r&&r.setter&&r.setter.call(this,e,n),this},gets:function(e){var n={},t=p.fixTargetCtor(this)._properties_;return f.each(t,function(t){n[t]=this.get(t,e)},this),n},sets:function(t,e,n){if(t){var r;for(var i in t)t.hasOwnProperty(i)&&(r=t[i],!1!==(n&&n(r,i,e))&&this.set(i,r,e))}return this},each:function(t,e){for(var n=p.fixTargetCtor(this)._properties_,r=0,i=n.length;r<i;r++){var s=n[r];if(!1===t.call(e,s,r,this.member(s),this.get(s)))return!1}return this},__may__:function(t){return this.may(t)},__has__:function(t){return this.has(t)},__can__:function(t){return this.can(t)},__get__:function(t){return this.get(t)},__gets__:function(){return this.gets()},__set__:function(t,e){this.set(t,e)},__sets__:function(t){this.sets(t)},__each__:function(t,e){return this.each(t,e)}},u={toString:function(){return JSON.stringify({ClassName:this._name_||"Anonymous",ClassID:this._id_})},createSelf:function(){return new this.constructor.apply(this,Array.prototype.slice.call(arguments))},getProperties:function(r,i){var s={};if(!this.getMeta||"ZNObject"==this._name_)return s;var t=this._super_,e=this._mixins_;return t&&f.extend(s,t.getProperties(r,i)),e&&e.length&&f.each(e,function(t){t&&f.extend(s,t.getProperties(r,i))}),f.each(this.getMeta("properties"),function(t,e){var n=r&&r.call(i||this,t,e,s);if(!1===n||-1===n)return n;t.hidden||(s[e]=t)},this),s},getProperty:function(n){var r=null;return n&&this.getProperties(function(t,e){return n==e&&(r=field),-1}),r},existProperty:function(t){return!!this.getProperty(t)},getMeta:function(t){return t?this._meta_[t]:this._meta_},setMeta:function(t,e){return t&&e&&(this._meta_[t]=e),this},defineEvent:function(t,e,n){return p.defineEvent(n||this.prototype,t,e)||this._events_.push(t),this},defineProperty:function(t,e,n){return p.defineProperty(n||this.prototype,t,e)||this._properties_.push(t),this},defineMethod:function(t,e,n){return p.defineMethod(n||this.prototype,t,e)||this._methods_.push(t),this}},h={toString:function(){var t={ClassName:this.__name__||"Anonymous",InstanceID:this.__id__,Meta:this.constructor._meta_};return JSON.stringify(t)},toJson:function(){var n={};return f.each(this.constructor.getProperties(),function(t,e){n[e]=this.get(e)},this),n},getProperties:function(){return this.constructor.getProperties.apply(this,arguments)},getPropertie:function(t){return this.constructor.getPropertie(t)},upon:function(t,e,n){var r;return e&&(((r=this.__handlers__)[t]=r[t]||[])[0]=f.extend({owner:this,handler:e},n)),this},on:function(t,e,n){var r,i;return!e||(i=(r=this.__handlers__)[t]=r[t]||[{owner:null,handler:null,context:null}]).push&&"function"==typeof i.push&&i.push(f.extend({owner:this,handler:e},n)),this},hasEventHandler:function(t){return!!(this.__handlers__[t]||[]).length},off:function(t,e,n){var r,i=this.__handlers__[t]||[],s=n&&n.context;if(e)for(var _=i.length-1;0<=_;_--)(r=i[_]).handler!==e||s&&r.context!==s||this.__handlers__[t].splice(_,1);else this.__handlers__[t]=[{owner:null,handler:null,context:null}];return this},offs:function(t){var e=Array.prototype.slice.call(arguments);return e.length?f.each(e,function(t){this.__handlers__[t]&&(this.__handlers__[t]=[{owner:null,handler:null,context:null}])}.bind(this)):this.__handlers__={},this},fire:function(t,e,n){var r,i=this.__handlers__[t],s=null,_=null;if(i)for(var o=0,a=i.length;o<a;o++)if((r=i[o])&&r.handler){if(!1===(_=n&&"apply"==n.method?(n.ownerFirst&&(e=Array.from(e)).unshift(r.owner),r.handler.apply(r.context||r.owner,e)):r.handler.call(r.context||r.owner,r.owner,e,n)))return!1;if(-1===_)continue;if(n&&n.overwrite)s=_;else if(null!=_)return _}return s},fireApply:function(){var t=a.call(arguments),e=t.shift();if(!e)return this;var n,r,i=this.__handlers__[e];if(i)for(var s=0,_=i.length;s<_;s++)if((n=i[s])&&n.handler){if(!1===(r=n.handler.apply(n.context||n.owner,t)))return!1;if(-1===r)continue;if(null!=r)return r}return null},dispose:function(){for(var n in this.__id__=null,delete this.__id__,this.__handlers__)this.__handlers__[n]=null,this.__handlers__[n]&&this.__handlers__[n].length&&this.__handlers__[n].forEach(function(t,e){this.__handlers__[n][e]=null,delete this.__handlers__[n][e]}),delete this.__handlers__[n];this.__handlers__=null,delete this.__handlers__,this.__initializing__=null,delete this.__initializing__,this.__super__=null,delete this.__super__,this.__afters__=null,delete this.__afters__},destroy:function(){this.dispose()},super:function(){var t=this.super.caller.__super__;if(t)return t.apply(this,arguments)},is:function(t){if("string"==typeof t&&(t=f.path(o,t)),t){if(this instanceof t)return!0;for(var e=this.constructor._mixins_,n=0,r=e.length;n<r;n++){if(t===e[n])return!0}}return!1},__is__:function(t){return this.is(t)},__clone__:function(){}};function d(){}f.extend(d,_,u,{_id_:0,_name_:"ZNObject",_statics_:{},_events_:[],_properties_:[],_methods_:[],_mixins_:[],_meta_:{}}),f.extend(d.prototype,_,h),f.isZNObject=function(t){return t instanceof d};var m={_arguments:function(){var t,e,n,r=arguments,i=r.length,s=r[0];if(3===i){if(t=s,e=r[1],n=r[2],!f.is(e,"function"))throw new Error("Invalid _super class.")}else if(2===i){if(f.is(s,"string"))t=s,e=null;else{if(!f.is(s,"function"))throw new Error("Invalid _super class.");t=null,e=s}n=r[1]}else{if(1!==i)throw new Error("Invalid arguments.");if(e=t=null,n=s,!f.is(n,"object"))throw new Error("The meta argument must be an object.")}return{name:t=t||"",super:e=e||d,meta:n=f.overwrite(n||{},{static:!1,statics:[],partial:!1,abstract:!1,final:!1,mixins:[],events:[],properties:[],methods:[]})}},_meta:function(n,t){var e=t.name,r=t.super,i=t.meta;return f.extend(n,_,u,{_id_:s++,_name_:e,_super_:r,_partial_:i.partial,_abstract_:i.abstract,_static_:i.static,_final_:i.final,_statics_:f.extend({},r._statics_,i.statics),_events_:r._events_.slice(0),_properties_:r._properties_.slice(0),_methods_:r._methods_.slice(0),_mixins_:r._mixins_.concat(i.mixins),_meta_:i}),f.extend(n,n._statics_),i.static?(f.each(i.events,function(t){n.defineEvent(t,{},n)}),f.each(i.properties,function(t,e){n.defineProperty(e,f.is(t,"object")?t:{value:t},n)}),f.each(i.methods,function(t,e){n.defineMethod(e,f.is(t,"function")?{value:t}:t,n)}),i.methods.init&&i.methods.init.call(n,n)):(f.each(i.mixins,function(t){var e;t&&(e=t.prototype,f.each(t._events_,function(t){n.defineEvent(t,e.member(t).meta)}),f.each(t._properties_,function(t){n.defineProperty(t,e.member(t).meta)}),f.each(t._methods_,function(t){_[t]||h[t]||n.defineMethod(t,e.member(t).meta)}))}),f.each(i.events,function(t){n.defineEvent(t,{})}),f.each(i.properties,function(t,e){n.defineProperty(e,f.is(t,"object")?t:{value:t})}),f.each(i.methods,function(t,e){n.defineMethod(e,f.is(t,"function")?{value:t}:t)})),n}},v=function(t,e,n){if(t&&t!==d){var r=t.member("init"),i=t._mixins_,s=null;return r&&r.meta.after&&e.__afters__.push({context:e,handler:r.meta.after}),i.length&&f.each(i,function(t){t&&t["@init"]&&(s=t["@init"].meta,s=f.is(s,"function")?s:s.value,v(t.prototype.__super__,t.prototype,n),s&&s.call(e))}),r&&r.meta.auto&&r.meta.value.apply(e,n),arguments.callee(t._super_,e)}};f.Class=function(){var l,t,e,n=m._arguments.apply(this,arguments),r=n.name,i=n.super,s=n.meta,_=s.methods.init;if(s.properties=s.properties||s.props,s.props=null,delete s.props,i._static_)throw new Error("Static class cannot be inherited.");if(i._final_)throw new Error("Final class cannot be inherited.");if(r&&s.partial&&(l=f.path(o,r)),s.static){if(l){if(!l._static_)throw new Error('Partial class "'+r+'" must be static.')}else l=function(){throw new Error("Cannot instantiate static class.")};e=l.prototype}else{if(l){if(l._static_)throw new Error('Partial class "'+r+'" must not be static.');if(l._super_!==i&&l._super_!==d)throw new Error('Partial class "'+r+'" must have consistent super class.')}else(l=s.abstract?function(){throw new Error("Cannot instantiate abstract class.")}:function(){var t=l._mixins_||[],e=l._ctors_||[],n=null,r=arguments;this.__id__=c++,this.__handlers__={},this.__initializing__=!0,this.__afters__=[];for(var i,s=null,_=0,o=t.length;_<o;_++)(i=t[_])&&(i["@init"]?(s=i["@init"].meta,s=f.is(s,"function")?s:s.value,v(i.prototype.__super__,this,r),s&&s.call(this)):v(i.prototype.__super__,this,r));v(this.__super__,this,r);for(var a=0,u=e.length;a<u;a++)n=e[a],(n=f.is(n,"function")?n:n.value)&&n.apply(this,r);for(;0<this.__afters__.length;){var h=this.__afters__.pop();h.handler.apply(h.context,r)}this.__afters__=null,delete this.__afters__,this.__initializing__=!1})._ctors_=[];l._super_!==i?((t=function(){}).prototype=i.prototype,(e=new t).constructor=l,e.__type__=r||"Anonymous",e.__super__=i,l.prototype=e):e=l.prototype,e.class=e.constructor,_&&(l._ctors_.push(_),e.__ctor__||(e.__ctor__=_))}return m._meta(l,n),e.__define__&&e.__define__.call(l),r&&f.path(o,r,l),l}}(zn);
!function(n){var e=Array.prototype.slice,t=(Object.prototype.hasOwnProperty,Object.prototype.toString),r={format:function(){var t=arguments,e=this;return 1==t.length&&"object"==typeof t[0]&&(t=t[0]),n.each(t,function(t,r){null!=t&&(t="object"==n.type(t)?JSON.stringify(t):t.toString?t.toString():t,e=e.replace(new RegExp("\\{"+r+"\\}","gi"),t))}),e.toString()},firstUpperCase:function(t){return t.replace(/\b(\w)(\w*)/g,function(t,r,e){return r.toUpperCase()+e})}},i={isArray:function(t){return t&&"[object Array]"===n.toString(t)&&t.constructor===Array}},o={format:function(t,r){var e="\\d(?=(\\d{"+(r||3)+"})+"+(0<t?"\\.":"$")+")";return this.toFixed(Math.max(0,~~t)).replace(new RegExp(e,"g"),"$&,")},sectionThree:function(){return this.toString().replace(/(\d)(?=(\d{3})+\.)/g,"$1,")},price:function(t){var r=n.extend({unit:1e4,unitText:"万",prefix:"",decimal:2,sections:3},t);return 1<this/r.unit&&this%100==0?(this/r.unit).sectionThree()+r.unitText:this.format(r.decimal,r.sections)}},s={bind:function(t){var r=this;return function(){return r.apply(t,e.call(arguments,1))}}};var u,a,c,f;u=t,a=Array.isArray,c={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},f=/[\\"\u0000-\u001F\u2028\u2029]/g;function h(t){return c[t]||"\\u"+(t.charCodeAt(0)+65536).toString(16).substr(1)}var p={format:function(t){var r={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var e in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[e]:("00"+r[e]).substr((""+r[e]).length)));return t}};n.fix(Array,i),n.fix(Array.prototype,{forEach:function(t,r){if(!t)return!1;for(var e=0,n=this.length;e<n;e++)t.call(r,this[e],e);return this},indexOf:function(t){for(var r=0,e=this.length;r<e;r++)if(this[r]===t)return r;return-1},lastIndexOf:function(t){for(var r=this.length-1;0<=r;r--)if(this[r]===t)return r;return-1}}),n.fix(Function.prototype,s),n.fix(String.prototype,r),n.fix(Number.prototype,o),n.fix(Date.prototype,p)}(zn);
!function(i){var a=Array.prototype.slice,c=0,o=1,s=2,l=i.Class({events:["complete"],properties:{promise:null},methods:{init:function(t,e){this._promise=new u,t&&this.resolve(t),e&&this.reject(e)},resolve:function(){var e=a.call(arguments);try{var t=this.get("promise"),n=this;if(t.get("readyState")!=c)return;t.set("readyState",o),t.set("data",e),i.each(t.get("resolves"),function(t){t.apply(n,e)})}catch(t){h.catch(t,this)}this.fire("complete",e)},reject:function(){var t=a.call(arguments);try{var e=this.get("promise");if(e.get("readyState")!=c)return;e.set("readyState",s),e.set("reason",t);var n=e.get("rejects")[0];n&&n.apply(this,t)}catch(t){h.catch(t,this)}this.fire("complete",t)}}}),u=i.Class({statics:{isPromise:function(t){return null!=t&&"function"==typeof t.then},defer:null},properties:{resolves:null,rejects:null,data:null,reason:null,readyState:null},methods:{init:function(t){this.set("resolves",[]),this.set("rejects",[]),this.set("exceptions",[]),this.set("readyState",c)},then:function(n,t){var e,s=new l;function r(){var t=a.call(arguments),e=n?n.apply(this,t):t;return u.isPromise(e)?e.then(function(){s.resolve.apply(s,a.call(arguments))}):s.resolve.apply(s,e),e}return this.get("readyState")===c?(this.get("resolves").push(r),t?this.get("rejects").push(t):this.get("rejects").push(function(){s.reject.apply(s,a.call(arguments))})):this.get("readyState")===o&&(e=this,setTimeout(function(){r.apply(e,e.get("data"))})),s.promise},catch:function(t){return h.exception(t)},finally:function(t){return h.finally(t)},otherwise:function(t){return this.then(void 0,t)}}}),h=i.async=i.Class({static:!0,methods:{init:function(t){this._exceptions=[],this._finallys=[],this._count=0,this._currIndex=0,this._dataArray=[]},exception:function(t){return this._exceptions.push(t),this},catch:function(e,n){return i.each(this._exceptions,function(t){t.call(n,e)}),this},finally:function(t){return this._finallys.push(t),this},defer:function(t,e){var n=this,s=new l(t,e);return s.on("complete",function(t,e){n._currIndex++,n._dataArray.push(e),n._currIndex==n._count&&(i.each(n._finallys,function(t){try{t(n._dataArray)}catch(t){i.error(t.message)}}),n._finallys=[])}),n._count++,s},all:function(e){var n=h.defer(),s=0,r=[];return i.each(e,function(t){t.then(function(t){r.push(t),++s>=e.length&&n.resolve(r)})}),n.promise},any:function(t){var e=h.defer();return i.each(t,function(t){t.then(function(t){e.resolve(t)})}),e.promise}}})}(zn);
!function(t){var r=[97,123],e=[65,91];t.char=t.Class({static:!0,methods:{getRandomChar:function(){return this.getUppercaseLetters()[Math.floor(26*Math.random())]},lowercase:function(r){return t.is(r,"string")?r.replace(/[A-Z]/g,function(r){return String.fromCharCode(32|r.charCodeAt(0))}):r},uppercase:function(r){return t.is(r,"string")?r.replace(/[a-z]/g,function(r){return String.fromCharCode(-33&r.charCodeAt(0))}):r},toUnicode:function(r){for(var t=[],e=0,n=r.length;e<n;e++)t.push(r.charCodeAt(e));return t},toChar:function(r,t){for(var e=[],n=r;n<t;n++)e.push(String.fromCharCode(n));return e},getLowercaseLetters:function(){return this.toChar(r[0],r[1])},getUppercaseLetters:function(){return this.toChar(e[0],e[1])},getStringFromChar:function(r,t){for(var e=r||"A",n=t||26,o=[],a=0;a<n;a++)o.push(String.fromCharCode(e.charCodeAt(0)+a));return o.join("")}}})}(zn);
!function(t){t.data=t.Class({static:!0,methods:{}})}(zn);
!function(e){var c="yyyy-MM-dd hh:mm:ss.SSS";e.date=e.Class({static:!0,methods:{format:function(){},timestampToString:function(e){return new Date(e).toISOString().split("T")[1].split("Z")[0]},nowDateString:function(e,t){var n=new Date;null!=t&&null!=t&&(n=new Date(t));var r=n.getFullYear(),a=n.getMonth()+1,i=n.getDate();return[r,a=a<10?"0"+a:a,i=i<10?"0"+i:i].join(e||"")},nowTimeString:function(e,t){var n=new Date;null!=t&&null!=t&&(n=new Date(t));var r=n.getHours(),a=n.getMinutes(),i=n.getSeconds(),s=n.getMilliseconds();return[r=r<10?"0"+r:r,a=a<10?"0"+a:a,i=i<10?"0"+i:i,s=s<10?"0"+s:s].join(e||":")},getSecond:function(e){var t=+e.substring(1,e.length);switch(e.substring(0,1)){case"s":return 1e3*t;case"h":return 60*t*60*1e3;case"d":return 24*t*60*60*1e3}},asString:function(e){var t=c;"string"==typeof e&&(t=arguments[0],e=arguments[1]);var n=this.__addZero(e.getDate()),r=this.__addZero(e.getMonth()+1),a=this.__addZero(e.getFullYear()),i=this.__addZero(e.getFullYear().toString().substring(2,4)),s=-1<t.indexOf("yyyy")?a:i,o=this.__addZero(e.getHours()),g=this.__addZero(e.getMinutes()),l=this.__addZero(e.getSeconds()),u=this.__padWithZeros(e.getMilliseconds(),3),d=this.__offset(e);return t.replace(/dd/g,n).replace(/MM/g,r).replace(/y{1,4}/g,s).replace(/hh/g,o).replace(/mm/g,g).replace(/ss/g,l).replace(/SSS/g,u).replace(/O/g,d)},__padWithZeros:function(e,t){for(var n=e+"";n.length<t;)n="0"+n;return n},__addZero:function(e){return this.__padWithZeros(e,2)},__offset:function(e){var t=Math.abs(e.getTimezoneOffset()),n=String(Math.floor(t/60)),r=String(t%60);return 1==n.length&&(n="0"+n),1==r.length&&(r="0"+r),e.getTimezoneOffset()<0?"+"+n+r:"-"+n+r}}})}(zn);
!function(f){f.json=f.Class({static:!0,methods:{serialize:function(n){return Object.keys(n).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])}).join("&")},format:function(e,n,t){if(!n)return n;for(var c=null,r=null,a=escape(n),i=f.extend({prefix:"${",suffix:"}"},t),o=escape(i.prefix)+"([^%>]+)?"+escape(i.suffix),s=new RegExp(o,"i");c=s.exec(a);){switch(r=f.path(e,c[1].trim()),f.type(r)){case"array":r=r.join("");break;case"object":r=JSON.stringify(r);break;case"function":r=r.call(null,e,n,t)}a=a.replace(s,r)}return unescape(a)}}})}(zn);
!function(l){function a(e,o){return"number"==typeof o?o="["+o+"m":"string"==typeof o&&(o=n[o]||t[o]),o?o+e+"[0m":e}var u=Array.prototype.slice,o={log:{color:"#3b3b3b",number:37,level:0},info:{color:"#3399ea",number:36,level:1},debug:{color:"#0b109a",number:35,level:2},warn:{color:"#ff9900",number:33,level:3},error:{color:"#e20611",number:31,level:4},ok:{color:"#2de60b",number:32,level:5},trace:{color:"#0c5cec",number:34,level:6},white:{color:"#fff",number:37,level:7},all:{color:"#000",number:36,level:10}},n={bright:"[1m",grey:"[2m",italic:"[3m",underline:"[4m",reverse:"[7m",hidden:"[8m",black:"[30m",red:"[31m",green:"[32m",yellow:"[33m",blue:"[34m",magenta:"[35m",cyan:"[36m",white:"[37m",blackBG:"[40m",redBG:"[41m",greenBG:"[42m",yellowBG:"[43m",blueBG:"[44m",magentaBG:"[45m",cyanBG:"[46m",whiteBG:"[47m"},t={Close:"[0m",Highlight:"[1m",Underline:"[4m",Blink:"[5m",Invert:"[7m",Blank:"[8m",MouseUpTo:"[nA",MouseDownTo:"[nB",MouseRightTo:"[nC",MouseLeftTo:"[nD",MousePosition:"[y;xH",ClearScreen:"[2J",ClearFrom:"[K",Reset:"[0m",Bright:"[1m",Dim:"[2m",Underscore:"[4m",Reverse:"[7m",Hidden:"[8m",FgBlack:"[30m",FgRed:"[31m",FgGreen:"[32m",FgYellow:"[33m",FgBlue:"[34m",FgMagenta:"[35m",FgCyan:"[36m",FgWhite:"[37m",BgBlack:"[40m",BgRed:"[41m",BgGreen:"[42m",BgYellow:"[43m",BgBlue:"[44m",BgMagenta:"[45m",BgCyan:"[46m",BgWhite:"[47m"},e=l.Class({events:["log","info","debug","warn","error","ok","trace","all","position"],methods:{init:function(e){this._config={only:null,levels:o},this.events(e)},config:function(e){return this._config=l.overwrite(e,this._config),this},events:function(e){if(e&&"object"==typeof e)for(var o in e)this.on(o,e[o],this);return this},define:function(e,o){this._config.levels[e]=l.extend({color:"cyan"},o);var n=this.constructor;return n&&(n.defineEvent(e,{},n),n.defineMethod(e,{value:function(){this.__consoleLog.call(this,e,arguments)}.bind(this)},n),this[e]=function(){this.__consoleLog.call(this,e,arguments)}.bind(this)),this},log:function(){this.__consoleLog.call(this,"log",arguments)},info:function(){this.__consoleLog.call(this,"info",arguments)},debug:function(){this.__consoleLog.call(this,"debug",arguments)},warn:function(){this.__consoleLog.call(this,"warn",arguments)},error:function(){this.__consoleLog.call(this,"error",arguments)},ok:function(){this.__consoleLog.call(this,"ok",arguments)},trace:function(){this.__consoleLog.call(this,"trace",arguments)},all:function(){this.__consoleLog.call(this,"all",arguments)},__getDateString:function(e){return l.date.asString(e||new Date)},__getPosition:function(){try{throw new Error("Get Logger Position")}catch(e){e.DEBUG&&l.CONSOLE_ERROR&&console.error(e);var o=this.fire("position",e);return null==o&&e.stack.split("\n")[5]&&(o=e.stack.split("\n")[5].replace(/\(/g,"").replace(/\)/g,"").split("/").pop()),o||""}},prefix:function(e){var o=e.toLowerCase(),n=this.__getDateString(),l=this._config.levels[o],t=this.__getPosition(),i=null;return!(!l||this._config.only&&this._config.only!=o)&&("undefined"!=typeof module&&module.exports?(i=l.number,[n,"[",a(a(o.toUpperCase(),i),"Highlight"),"] [",a(a(t,i),"Underline"),"]"].join(" ")):(i=l.color,[n+"[%c "+o.toUpperCase()+" %c][%c "+t+"]","color:"+i+";font-weight:bold;","color:#404850:font-weight:normal;","color:"+i+";text-decoration:underline;"]))},__consoleLog:function(e,o){var n=u.call(o),l=u.call(o),t=e.toLowerCase(),i=this.__getDateString(),r=this._config.levels[t],c=this.__getPosition(),g=null,s=null;if(!r||this._config.only&&this._config.only!=t)return!1;"undefined"!=typeof module&&module.exports?(s=null!=r.number?r.number:r.color,g=[i,"[",a(a(t.toUpperCase(),s),"Highlight"),"] [",a(a(c,s),"Underline"),"]"],n.unshift(g.join(" "))):(s=r.color,n=[g=i+"[ %c"+t.toUpperCase()+"%c ][ %c"+c+"%c ]","color:"+s+";font-weight:bold;","color:#404850:font-weight:normal;","color:"+s+";text-decoration:underline;","color:#404850:font-weight:normal;"].concat(n)),this.fireApply("all",this,i,t,c,l,n,g),!1!==this.fireApply(t,this,i,t,c,l,n,g)&&console.log.apply(this,n)}}});l.logger=new e;var i={log:function(){l.logger.log.apply(l.logger,arguments)},info:function(){l.logger.info.apply(l.logger,arguments)},debug:function(){l.logger.debug.apply(l.logger,arguments)},warn:function(){l.logger.warn.apply(l.logger,arguments)},trace:function(){l.logger.trace.apply(l.logger,arguments)},error:function(){l.logger.error.apply(l.logger,arguments)},ok:function(){l.logger.ok.apply(l.logger,arguments)},nodeConsoleColorText:a,prefix:function(){l.logger.prefix.apply(l.logger,arguments)}};l.extend(l,i)}(zn);
!function(l){l.querystring=l.Class({static:!0,properties:{config:{get:function(){return this._config}}},methods:{init:function(){this._config={separator:"&",equal:"=",minIndex:0,maxIndex:1e3}},config:function(e){return this.overwrite(this._config,e),this},parse:function(e,n){if("object"==typeof e)return e;if(""===e||!1===e||null==e)return{};var r=l.extend({},this._config,n),t={},i=r.equal,o=e.split(r.separator),s=o.length;0<r.maxIndex&&s>r.maxIndex&&(s=r.maxIndex);for(var a=r.minIndex;a<s;a++){var u=o[a].replace(/\+/g,"%20"),c=u.indexOf(i),f=null,g=null,g=0<=c?(f=u.substr(0,c),u.substr(c+1)):(f=u,"");""!==f&&(f=decodeURIComponent(f),g=decodeURIComponent(g),t.hasOwnProperty(f)?l.is(t[f],"array")?t[f].push(g):t[f]=[t[f],g]:t[f]=g)}return t},stringify:function(e,n){if("string"==typeof e)return e;var r=l.extend({},this._config,n),t=[],i=r.equal,o={},o=l.isZNObject(e)?e.gets():e;if(!l.is(o,"object"))throw new Error("Agrument Error.");for(var s in e){var a=e[s],u=encodeURIComponent(this.__stringifyValue(s)),a=encodeURIComponent(this.__stringifyValue(a));t.push(u+i+a)}return t.join(r.separator)},__stringifyValue:function(e){switch(l.type(e)){case"string":return e;case"boolean":return e?"true":"false";case"object":case"array":return JSON.stringify(e);case"number":return isFinite(e)?e:"0";case"function":return e();default:return""}}}})}(zn);
!function(s){var t=Array.prototype.slice,e=Object.prototype.toString,r=0,n=1,o=3,i=s.Class({events:["stop","error","finished"],properties:{status:null},methods:{init:function(s){if(this._status=r,s&&"object"==typeof s)for(var t in s)this.on(t,s[t])},doTask:function(t,s){var i=s||[];"[object Array]"!=e.call(i)&&(i=[i]),t.done=this.done.bind(this),t.processor=this,i.unshift(t);try{this._status=n;var r=t.handler.apply(t.context,i);!1===r&&(this._status=o,this.fire("stop",i)),null!=r&&t.done(r)}catch(s){this._status=o,this.fire("error",[s,t])}},done:function(){this._status=o,this.fire("finished",t.call(arguments))}}}),h=s.Class({events:["clear","insert","pause","resume","error","stop","every","destroy","finally"],methods:{init:function(s,t){if(this._tasks=[],this._taskProcessors=[],this._lastTask=null,this._data=[],this._max=(s||{}).max||1,t&&"object"==typeof t)for(var i in t)this.on(i,t[i],this)},destroy:function(){this._tasks=null,delete this._tasks,this._taskProcessors=null,delete this._taskProcessors,this._lastTask=null,delete this._lastTask,this._data=null,delete this._data,this._max=null,delete this._max,this.fire("destroy",this),this.dispose()},size:function(){return this._tasks.length},clear:function(){return this._tasks=[],this._data=[],this._lastTask=null,this.fire("clear"),this},pause:function(s){return this._paused=!0,0<s&&(this._pauseTimer=setTimeout(this.resume,s)),this.fire("pause",s),this},resume:function(){return this._pauseTimer&&clearTimeout(this._pauseTimer),this._paused=!1,this.doTask(),this.fire("resume",this),this},onError:function(s,t){return this.on("error",s,t||this),this},onStop:function(s,t){return this.on("stop",s,t||this),this},onEvery:function(s,t){return this.on("every",s,t||this),this},onFinally:function(s,t){return this.on("finally",s,t||this),this},unshift:function(s,t){return this.insert(s,t,0),this},push:function(s,t){return this.insert(s,t,-1),this},inserts:function(s,t,i){var r=s||[],e=i||0,n=this._tasks[0],o=null,h=null,r=r.map(function(s){return h={handler:s,context:t||this},o&&((h.previous=o).next=h),o=h}.bind(this));return n&&((o.next=n).previous=o),r.unshift(0),r.unshift(e),this._tasks.splice.apply(this._tasks,r),this},insert:function(s,t,i){var r={handler:s,context:t||this},e=i||-1;switch(e){case-1:this._lastTask&&(r.previous=r,this._lastTask.next=r),this._lastTask=r,this._tasks.push(r);break;case 0:var n=this._tasks[0];n&&((r.next=n).previous=r),this._tasks.unshift(r);break;default:this._tasks.splice(e,0,r)}return this.fire("insert",r),this},getTaskProcessor:function(){var s,t=this._taskProcessors.length;if(!t)return this.createTaskProcessor();for(var i=0;i<t;i++)if((s=this._taskProcessors[i]).status==o||s.status==r)return s;return this._max>t?this.createTaskProcessor():void 0},createTaskProcessor:function(){var s=new i({finished:this.__onProcessorFinished.bind(this),stop:this.__onProcessorStop.bind(this),error:this.__onProcessorError.bind(this)});return this._taskProcessors.push(s),s},start:function(){return this._data=[],this.doTask()},doTask:function(s){if(!this._tasks)return this;var i=this._tasks.shift();if(i){if(this._paused)return this;var t=this.getTaskProcessor();t&&(null!=s&&(i.previousResult=s),i.queue=this,i.error=function(s,t){this.error(s,t||i)}.bind(this),i.stop=this.stop.bind(this),t.doTask(i,s))}else this.finally.apply(this,s);return this},stop:function(){this.clear();var s=t.call(arguments);return!1!==this.fire("stop",s,{ownerFirst:!0,method:"apply"})&&this.finally.apply(this,s),this},error:function(s,t){var i=this.fire("error",[s,t],{ownerFirst:!0,method:"apply"});return!0===i&&t?t.done.apply(t.processor,t.previousResult):!1!==i&&this.finally(s,t),this},finally:function(){return this.fire("finally",t.call(arguments),{ownerFirst:!0,method:"apply"}),this.destroy(),this},__onProcessorFinished:function(s,t){this._data&&this._data.push(t),!1!==this.fire("every",t||[],{ownerFirst:!0,method:"apply"})&&this.doTask(t)},__onProcessorStop:function(s,t){this.stop.apply(this,t)},__onProcessorError:function(s,t){return this.error.apply(this,t)}}});s.queue=function(s,t){return new h(s,t)}}(zn);
!function(e){e.string=e.Class({static:!0,methods:{decode:function(e){return e&&e.length&&(e=(e=(e=(e=(e=(e=(e=e.replace(/&amp;/g,"&")).replace(/&lt;/g,"<")).replace(/&gt;/g,">")).replace(/&nbsp;/g," ")).replace(/&#39;/g,"'")).replace(/&quot;/g,'"')).replace(/<br>/g,"\n")),e},encode:function(e){return e&&e.length&&(e=(e=(e=(e=(e=(e=e.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/ /g,"&nbsp;")).replace(/\'/g,"&#39;")).replace(/\"/g,"&quot;")),e}}})}(zn);
!function(t){t.util=t.Class({static:!0,methods:{formatDate:function(t,n){},wordCount:function(t){var n=data.match(/[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/),r=0;if(null===n)return r;for(var e=0;e<n.length;e++)19968<=n[e].charCodeAt(0)?r+=n[e].length:r+=1;return r},rate:function(t){return"★★★★★☆☆☆☆☆".slice(5-t,10-t)},valueExchange:function(t,n){return t^=n,[t^=n^=t,n]},htmlspecialchars:function(t){return t.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},getColorValue:function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6)},humpToSeparator:function(t,n){return t.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join(n||"_").toLowerCase()},getTime:function(){return(new Date).getTime()},generateCode:function(){return this.getTime().toString().substring(1).toString()+Math.floor(100*(9*Math.random()+1))},getRandomNumber:function(){return Math.floor(10*Math.random())},getRandomNumbers:function(){return Math.floor(1e3*(9*Math.random()+1))},getRandomChars:function(){return(Math.random()/new Date).toString(36).replace(/\d/g,"").slice(1)},randomNumbers:function(t){return Math.random().toString().slice(-(t||6))}}})}(zn);