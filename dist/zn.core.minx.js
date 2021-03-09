var __isServer="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0),zn={VERSION:"1.0.8",DEBUG:!0,ZN_PATH:"",PATH:"",GLOBAL:function(){return __isServer?global:window}.call(null),isServer:__isServer};if(zn.GLOBAL.zn=zn,__isServer)zn.ZN_PATH=__dirname,zn.PATH=process.cwd(),module.exports=zn;else{var _zn_url="";try{__a__=__b__}catch(r){r.fileName?_zn_url=r.fileName:r.sourceURL?_zn_url=r.sourceURL:r.stacktrace?console.error(r.stacktrace):r.stack?_zn_url=(_zn_url=(_zn_url=r.stack.split("\n")[1]).replace(/\s/g,"")).substring(2,_zn_url.length):console.error(r.toString())}if(!_zn_url)for(var _node,_scripts=document.getElementsByTagName("script"),_src="",i=0,_len=scripts.length;i<_len;i++)if((_node=scripts[i]).getAttribute&&("zn.js"===(_src=_node.getAttribute("src")||"").slice(-5)||"zn.minx.js"===_src.slice(-10))){_zn_url=_src;break}if(!_zn_url)throw new Error("zn.js has not been included, please do it first.");zn.ZN_PATH=_zn_url.substring(0,_zn_url.lastIndexOf("/")+1)}
!function(p){var a=Object.prototype.toString,o={isNull:function(e){return null==e},isNotNull:function(e){return null!=e},idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var e,t=arguments,n=null;return t.length<2?t[0]:(n=(n=t[0]).toString?n.toString():n,e=t[1],_.each(e,function(e,t){null!=e&&(e=_.is(e,"object")?JSON.stringify(e):e.toString?e.toString():e,n=n.replace(new RegExp("\\{"+t+"\\}","gi"),e))}),n)},uuid:function(e){var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)});return e&&e.ifUpperCase&&(t=t.toUpperCase()),t},fix:function(e){for(var t=e||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&"function"!=typeof t[o]&&(t[o]=i[o])}return t},extend:function(e){for(var t=e||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&(t[o]=i[o])}return t},isJson:function(e){return"object"==typeof e&&"[object object]"==a.call(e).toLowerCase()&&0==e.constructor.toString().indexOf("function Object() {")},deepAssign:function(e,t){var n,r=null;switch(a.call(t)){case"[object Object]":if(!o.isJson(t))return e;for(var i in t)if(n=e[i],r=t[i],t.hasOwnProperty(i))switch(a.call(r)){case"[object Object]":if(!o.isJson(r))continue;r=this.deepAssign({},r),"[object Object]"==a.call(n)?e[i]=o.deepAssign(n,r):e[i]=r;break;case"[object Array]":"[object Array]"==a.call(n)?e[i]=e[i].concat(r):e[i]=r;break;case"[object Null]":case"[object Boolean]":case"[object Function]":case"[object Number]":case"[object String]":e[i]=r}break;case"[object Array]":t.unshift(e),o.deepAssigns.apply(o.deepAssigns,t)}return e},callOnce:function(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}},deepAssigns:function(){for(var e=arguments[0],t=1,n=arguments.length;t<n;t++)o.deepAssign(e,arguments[t]);return e},convertArrayArgv:function(e,t){for(var n,r=[],i=p.extend({prefix:"--"},t).prefix,o={},c=null,a={},_=!1,s=0,f=e.length;s<f;s++)if(-1!==(c=e[s]).indexOf(i))o[n=c.replace(i,"")]=!0,a[s+1]=n,_=_||!0;else if(_)if(a[s])o[a[s]]=c;else{for(var u,l=s-1;!a[l]&&0<l;)--l;a[l]&&(null!=(u=o[a[l]])?"string"==typeof u?o[a[l]]=[u,c]:"object"==typeof u&&o[a[l]].push(c):o[a[l]]=c)}else r.push(c);return{env:r,argv:o}},overwrite:function(e){for(var t=e||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&void 0===t[o]&&(t[o]=i[o])}return t},path:function(e,t,n){var r=e||{};if(t){var i,o=t.split("."),c=o.length,a=0;if(arguments.length<3)for(;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i];else{for(--c;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i]=r[i]||{};i=o[a],r&&(r.__set__?r.__set__(i,n):r[i]=n,r=n)}}return r},invoke:function(e,t,n){var r,i,o;e&&t&&(0<(r=t.lastIndexOf("."))?(i=p.path(e,t.substring(0,r)))&&(o=i[t.substring(r+1)]):o=(i=e)[t],o&&o.apply(i,n))},deepEachObject:function(e,t,n){if(_.is(e,"object")){var r,i;for(var o in e)r=e[o],_.is(r,"object")?this.deepEachObject(r,t,n):null!=(i=t&&t.call(n,r,o,e))&&(e[o]=i)}return e},arrayValueToObject:function(e,t,n){if(_.is(e,"array")){for(var r,i,o={},c=0,a=e.length;c<a;c++)r=e[c],null!=(i=t&&t.call(n,r,c,e,o))&&(o[r]=i);e=o}return e}},_={toString:function(e){return e&&e.toString?e.toString():a.call(e)},each:function(e,t,n){if(e&&t)if(e.__each__)e.__each__(t,n);else{var r=e.length,i=null;if(0<r&&"[object Array]"===a.call(e)){for(var o=0;o<r;o++)if(!1===(i=t.call(n,e[o],o)))return!1}else for(var c in e)if(e.hasOwnProperty(c)){if(!1===(i=t.call(n,e[c],c)))return!1;if(-1===i)continue}}},clone:function(e){if(e){if(e.__clone__)return e.__clone__();if(p.is(e,"array"))return e.slice(0);var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}return e},type:function(e){return e&&e.__type__?e.__type__:a.call(e).slice(8,-1).toLowerCase()},is:function(e,t){if(e&&e.__is__)return e.__is__(t);if("string"==typeof t)switch(t.toLowerCase()){case"plain":return e&&e.constructor===Object;default:return this.type(e)===t}else if("function"==typeof t)return e instanceof t},may:function(e,t){return!!e&&(e.__may__?e.__may__(t):e.hasOwnProperty("on"+t))},can:function(e,t){return!!e&&(e.__can__?e.__can__(t):"function"==typeof e[t])},has:function(e,t){return!!e&&(e.__has__?e.__has__(t):e.hasOwnProperty(t))},get:function(e,t){if(e)return e.__get__?e.__get__(t):e[t]},set:function(e,t,n){e&&(e.__set__?e.__set__(t,n):e[t]=n)},gets:function(e){if(e){if(e.__gets__)return e.__gets__();var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}},sets:function(e,t){if(e&&t)if(e.__sets__)e.__sets__(t);else for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}};o.extend(p,o),o.extend(p,_)}(zn);
!function(f){var o=f.GLOBAL,a=Array.prototype.slice,s=1,l=1,p={fixTargetCtor:function(t){return t instanceof d?t.constructor:t},fixTargetKey:function(t){return"@"+t},defineEvent:function(t,n,e){var r=p.fixTargetCtor(t),i=p.fixTargetKey(n),s=i in r,_={};return s||(_=Object.defineProperty(t,"on"+n.toLowerCase(),{get:function(){var t=this.__handlers__[n];return t?t[0].handler:null},set:function(t){var e=this.__handlers__;(e[n]=e[n]||[])[0]={owner:this,handler:t,context:null}}})),r[i]={name:n,type:"event",meta:e,descriptor:_},s},defineProperty:function(t,e,n){var r,i,s,_,o,a,h,u=p.fixTargetCtor(t),c=p.fixTargetKey(e),l=c in u;return h="value"in n?(i=n.value,s="_"+e,_=n.get,o=n.set,a=_||function(){return s in this?this[s]:f.is(i,"function")?i.call(this):i},n.readonly?function(t,e){if(!e||!e.force)return!1;this[s]=t}:o||function(t){this[s]=t}):(a=n.get||function(){},n.set||function(){return!1}),l&&(a.__super__=u[c].getter,h.__super__=u[c].setter),r=Object.defineProperty(t,e,{get:a,set:h,configurable:!0}),u[c]={name:e,type:"property",meta:n,getter:a,setter:h,descriptor:r},l},defineMethod:function(t,e,n){var r=p.fixTargetCtor(t),i=p.fixTargetKey(e),s=i in r;return r[i]={name:e,type:"method",meta:n},e in t&&(n.value||(n.value=function(){}),n.value.__super__=t[e]),t[e]=n.value,s}},_={__handlers__:{},member:function(t,e){var n=p.fixTargetCtor(e||this),r=n[p.fixTargetKey(t)];return r||n===d?r:this.member(t,n._super_)},may:function(t){var e=this.member(t);return e&&"event"==e.type},has:function(t){var e=this.member(t);return e&&"property"==e.type},can:function(t){var e=this.member(t);return e&&"method"==e.type},get:function(t,e){var n=this.member(t);if(n&&n.getter)return n.getter.call(this,e)},set:function(t,e,n){var r=this.member(t);return r&&r.setter&&r.setter.call(this,e,n),this},gets:function(e){var n={},t=p.fixTargetCtor(this)._properties_;return f.each(t,function(t){n[t]=this.get(t,e)},this),n},sets:function(t,e,n){if(t){var r;for(var i in t)t.hasOwnProperty(i)&&(r=t[i],!1!==(n&&n(r,i,e))&&this.set(i,r,e))}return this},each:function(t,e){for(var n=p.fixTargetCtor(this)._properties_,r=0,i=n.length;r<i;r++){var s=n[r];if(!1===t.call(e,s,r,this.member(s),this.get(s)))return!1}return this},__may__:function(t){return this.may(t)},__has__:function(t){return this.has(t)},__can__:function(t){return this.can(t)},__get__:function(t){return this.get(t)},__gets__:function(){return this.gets()},__set__:function(t,e){this.set(t,e)},__sets__:function(t){this.sets(t)},__each__:function(t,e){return this.each(t,e)}},h={toJson:function(){return{ClassName:this._name_||"Anonymous",ClassID:this._id_}},info:function(){return{_id_:this._id_,_name_:this._name_,_super_:this._super_,_events_:this._events_,_properties_:this._properties_,_methods_:this._methods_,_meta_:this._meta_}},createSelf:function(){return new this.constructor.apply(this,Array.prototype.slice.call(arguments))},getProperties:function(r,i,t){var s={},_=t||{};if(!this.getMeta||"ZNObject"==this._name_)return s;var e=this._super_,n=this._mixins_;return e&&f.extend(s,e.getProperties(r,i,_)),n&&n.length&&f.each(n,function(t){t&&f.extend(s,t.getProperties(r,i,_))}),f.each(this.getMeta("properties"),function(t,e){if(_[e])return-1;_[e]=t;var n=r&&r.call(i||this,t,e,s);if(!1===n||-1===n)return n;t.hidden||(s[e]=t)},this),s},getProperty:function(n){var r=null;return n&&this.getProperties(function(t,e){return n==e&&(r=field),-1}),r},existProperty:function(t){return!!this.getProperty(t)},getMeta:function(t){return t?this._meta_[t]:this._meta_},setMeta:function(t,e){return t&&e&&(this._meta_[t]=e),this},defineEvent:function(t,e,n){return p.defineEvent(n||this.prototype,t,e)||(-1===this._meta_.events.indexOf(t)&&this._meta_.events.push(t),-1===this._events_.indexOf(t)&&this._events_.push(t)),this},defineProperty:function(t,e,n){return p.defineProperty(n||this.prototype,t,e)||(this._meta_.properties[t]||(this._meta_.properties[t]=e),-1===this._properties_.indexOf(t)&&this._properties_.push(t)),this},defineMethod:function(t,e,n){return p.defineMethod(n||this.prototype,t,e)||(this._meta_.methods[t]||(this._meta_.methods[t]=e),-1===this._methods_.indexOf(t)&&this._methods_.push(t)),this}},u={toString:function(){var t={ClassName:this.__name__||"Anonymous",InstanceID:this.__id__,Meta:this.constructor._meta_};return JSON.stringify(t)},toJson:function(){var n={};return f.each(this.constructor.getProperties(),function(t,e){n[e]=this.get(e)},this),n},getProperties:function(){return this.constructor.getProperties.apply(this,arguments)},getPropertie:function(t){return this.constructor.getPropertie(t)},upon:function(t,e,n){var r;return e&&(((r=this.__handlers__)[t]=r[t]||[])[0]=f.extend({owner:this,handler:e},n)),this},on:function(t,e,n){var r,i;return!e||(i=(r=this.__handlers__)[t]=r[t]||[{owner:null,handler:null,context:null}]).push&&"function"==typeof i.push&&i.push(f.extend({owner:this,handler:e},n)),this},hasEventHandler:function(t){return!!(this.__handlers__[t]||[]).length},off:function(t,e,n){var r,i=this.__handlers__[t]||[],s=n&&n.context;if(e)for(var _=i.length-1;0<=_;_--)(r=i[_]).handler!==e||s&&r.context!==s||this.__handlers__[t].splice(_,1);else this.__handlers__[t]=[{owner:null,handler:null,context:null}];return this},offs:function(t){var e=Array.prototype.slice.call(arguments);return e.length?f.each(e,function(t){this.__handlers__[t]&&(this.__handlers__[t]=[{owner:null,handler:null,context:null}])}.bind(this)):this.__handlers__={},this},fire:function(t,e,n){var r,i=this.__handlers__[t],s=null,_=null;if(i)for(var o=0,a=i.length;o<a;o++)if((r=i[o])&&r.handler){if(!1===(_=n&&"apply"==n.method?(n.ownerFirst&&(e=Array.from(e)).unshift(r.owner),r.handler.apply(r.context||r.owner,e)):r.handler.call(r.context||r.owner,r.owner,e,n)))return!1;if(-1===_)continue;if(n&&n.overwrite)s=_;else if(null!=_)return _}return s},fireApply:function(){var t=a.call(arguments),e=t.shift();if(!e)return this;var n,r,i=this.__handlers__[e];if(i)for(var s=0,_=i.length;s<_;s++)if((n=i[s])&&n.handler){if(!1===(r=n.handler.apply(n.context||n.owner,t)))return!1;if(-1===r)continue;if(null!=r)return r}return null},dispose:function(){for(var n in this.__id__=null,delete this.__id__,this.__handlers__)this.__handlers__[n]=null,this.__handlers__[n]&&this.__handlers__[n].length&&this.__handlers__[n].forEach(function(t,e){this.__handlers__[n][e]=null,delete this.__handlers__[n][e]}),delete this.__handlers__[n];this.__handlers__=null,delete this.__handlers__,this.__initializing__=null,delete this.__initializing__,this.__super__=null,delete this.__super__,this.__afters__=null,delete this.__afters__},destroy:function(){this.dispose()},super:function(){var t=this.super.caller.__super__;if(t)return t.apply(this,arguments)},is:function(t){if("string"==typeof t&&(t=f.path(o,t)),t){if(this instanceof t)return!0;for(var e=this.constructor._mixins_,n=0,r=e.length;n<r;n++){if(t===e[n])return!0}}return!1},__is__:function(t){return this.is(t)},__clone__:function(){}};function d(){}f.extend(d,_,h,{_id_:0,_name_:"ZNObject",_statics_:{},_events_:[],_properties_:[],_methods_:[],_mixins_:[],_meta_:{}}),f.extend(d.prototype,_,u),f.isZNObject=function(t){return t instanceof d},f.isZNFunction=function(t){return"function"==typeof t&&new t instanceof d};var m={_arguments:function(){var t,e,n,r=arguments,i=r.length,s=r[0];if(3===i){if(t=s,e=r[1],n=r[2],!f.is(e,"function"))throw new Error("Invalid _super class.")}else if(2===i){if(f.is(s,"string"))t=s,e=null;else{if(!f.is(s,"function"))throw new Error("Invalid _super class.");t=null,e=s}n=r[1]}else{if(1!==i)throw new Error("Invalid arguments.");if(e=t=null,n=s,!f.is(n,"object"))throw new Error("The meta argument must be an object.")}return{name:t=t||"",super:e=e||d,meta:n=f.overwrite(n||{},{static:!1,statics:[],partial:!1,abstract:!1,final:!1,mixins:[],events:[],properties:[],methods:[]})}},_meta:function(n,t){var e=t.name,r=t.super,i=t.meta;return f.extend(n,_,h,{_id_:s++,_name_:e,_super_:r,_partial_:i.partial,_abstract_:i.abstract,_static_:i.static,_final_:i.final,_statics_:f.extend({},r._statics_,i.statics),_events_:r._events_.slice(0),_properties_:r._properties_.slice(0),_methods_:r._methods_.slice(0),_mixins_:r._mixins_.concat(i.mixins),_meta_:i}),f.extend(n,n._statics_),i.static?(f.each(i.events,function(t){n.defineEvent(t,{},n)}),f.each(i.properties,function(t,e){n.defineProperty(e,f.is(t,"object")?t:{value:t},n)}),f.each(i.methods,function(t,e){n.defineMethod(e,f.is(t,"function")?{value:t}:t,n)}),i.methods.init&&i.methods.init.call(n,n)):(f.each(i.mixins,function(t){var e;t&&(e=t.prototype,f.each(t._events_,function(t){n.defineEvent(t,e.member(t).meta)}),f.each(t._properties_,function(t){n.defineProperty(t,e.member(t).meta)}),f.each(t._methods_,function(t){_[t]||u[t]||n.defineMethod(t,e.member(t).meta)}))}),f.each(i.events,function(t){n.defineEvent(t,{})}),f.each(i.properties,function(t,e){n.defineProperty(e,f.is(t,"object")?t:{value:t})}),f.each(i.methods,function(t,e){n.defineMethod(e,f.is(t,"function")?{value:t}:t)})),n}},v=function(t,e,n){if(t&&t!==d){var r=t.member("init"),i=t._mixins_,s=null;return r&&r.meta.after&&e.__afters__.push({context:e,handler:r.meta.after}),i.length&&f.each(i,function(t){t&&t["@init"]&&(s=t["@init"].meta,s=f.is(s,"function")?s:s.value,v(t.prototype.__super__,t.prototype,n),s&&s.call(e))}),r&&r.meta.auto&&r.meta.value.apply(e,n),arguments.callee(t._super_,e)}};f.Class=function(){var c,t,e,n=m._arguments.apply(this,arguments),r=n.name,i=n.super,s=n.meta,_=s.methods.init;if(s.properties=s.properties||s.props,s.props=null,delete s.props,i._static_)throw new Error("Static class cannot be inherited.");if(i._final_)throw new Error("Final class cannot be inherited.");if(r&&s.partial&&(c=f.path(o,r)),s.static){if(c){if(!c._static_)throw new Error('Partial class "'+r+'" must be static.')}else c=function(){throw new Error("Cannot instantiate static class.")};e=c.prototype}else{if(c){if(c._static_)throw new Error('Partial class "'+r+'" must not be static.');if(c._super_!==i&&c._super_!==d)throw new Error('Partial class "'+r+'" must have consistent super class.')}else(c=s.abstract?function(){throw new Error("Cannot instantiate abstract class.")}:function(){var t=c._mixins_||[],e=c._ctors_||[],n=null,r=arguments;this.__id__=l++,this.__handlers__={},this.__initializing__=!0,this.__afters__=[];for(var i,s=null,_=0,o=t.length;_<o;_++)(i=t[_])&&(i["@init"]?(s=i["@init"].meta,s=f.is(s,"function")?s:s.value,v(i.prototype.__super__,this,r),s&&s.call(this)):v(i.prototype.__super__,this,r));v(this.__super__,this,r);for(var a=0,h=e.length;a<h;a++)n=e[a],(n=f.is(n,"function")?n:n.value)&&n.apply(this,r);for(;0<this.__afters__.length;){var u=this.__afters__.pop();u.handler.apply(u.context,r)}this.__afters__=null,delete this.__afters__,this.__initializing__=!1})._ctors_=[];c._super_!==i?((t=function(){}).prototype=i.prototype,(e=new t).constructor=c,e.__type__=r||"Anonymous",e.__super__=i,c.prototype=e):e=c.prototype,e.class=e.constructor,_&&(c._ctors_.push(_),e.__ctor__||(e.__ctor__=_))}return m._meta(c,n),e.__define__&&e.__define__.call(c),r&&f.path(o,r,c),c}}(zn);
!function(n){var e=Array.prototype.slice,t=(Object.prototype.hasOwnProperty,Object.prototype.toString),r={format:function(){var t=arguments,e=this;return 1==t.length&&"object"==typeof t[0]&&(t=t[0]),n.each(t,function(t,r){null!=t&&(t="object"==n.type(t)?JSON.stringify(t):t.toString?t.toString():t,e=e.replace(new RegExp("\\{"+r+"\\}","gi"),t))}),e.toString()},firstUpperCase:function(t){return t.replace(/\b(\w)(\w*)/g,function(t,r,e){return r.toUpperCase()+e})}},i={isArray:function(t){return t&&"[object Array]"===n.toString(t)&&t.constructor===Array}},o={format:function(t,r){var e="\\d(?=(\\d{"+(r||3)+"})+"+(0<t?"\\.":"$")+")";return this.toFixed(Math.max(0,~~t)).replace(new RegExp(e,"g"),"$&,")},sectionThree:function(){return this.toString().replace(/(\d)(?=(\d{3})+\.)/g,"$1,")},price:function(t){var r=n.extend({unit:1e4,unitText:"万",prefix:"",decimal:2,sections:3},t);return 1<this/r.unit&&this%100==0?(this/r.unit).sectionThree()+r.unitText:this.format(r.decimal,r.sections)}},s={bind:function(t){var r=this;return function(){return r.apply(t,e.call(arguments,1))}}};var u,a,c,f;u=t,a=Array.isArray,c={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},f=/[\\"\u0000-\u001F\u2028\u2029]/g;function h(t){return c[t]||"\\u"+(t.charCodeAt(0)+65536).toString(16).substr(1)}var p={format:function(t){var r={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var e in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[e]:("00"+r[e]).substr((""+r[e]).length)));return t}};n.fix(Array,i),n.fix(Array.prototype,{forEach:function(t,r){if(!t)return!1;for(var e=0,n=this.length;e<n;e++)t.call(r,this[e],e);return this},indexOf:function(t){for(var r=0,e=this.length;r<e;r++)if(this[r]===t)return r;return-1},lastIndexOf:function(t){for(var r=this.length-1;0<=r;r--)if(this[r]===t)return r;return-1}}),n.fix(Function.prototype,s),n.fix(String.prototype,r),n.fix(Number.prototype,o),n.fix(Date.prototype,p)}(zn);