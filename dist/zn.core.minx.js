var __isServer="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0),zn={VERSION:"1.0.8",DEBUG:!0,ZN_PATH:"",PATH:"",GLOBAL:function(){return __isServer?global:window}.call(null),isServer:__isServer};if(zn.GLOBAL.zn=zn,__isServer)zn.ZN_PATH=__dirname,zn.PATH=process.cwd(),module.exports=zn;else{var _zn_url="";try{__a__=__b__}catch(r){r.fileName?_zn_url=r.fileName:r.sourceURL?_zn_url=r.sourceURL:r.stacktrace?console.error(r.stacktrace):r.stack?_zn_url=(_zn_url=(_zn_url=r.stack.split("\n")[1]).replace(/\s/g,"")).substring(2,_zn_url.length):console.error(r.toString())}if(!_zn_url)for(var _node,_scripts=document.getElementsByTagName("script"),_src="",i=0,_len=scripts.length;i<_len;i++)if((_node=scripts[i]).getAttribute&&("zn.js"===(_src=_node.getAttribute("src")||"").slice(-5)||"zn.minx.js"===_src.slice(-10))){_zn_url=_src;break}if(!_zn_url)throw new Error("zn.js has not been included, please do it first.");zn.ZN_PATH=_zn_url.substring(0,_zn_url.lastIndexOf("/")+1)}
!function(p){var c=Object.prototype.toString,o={isNull:function(e){return null==e},isNotNull:function(e){return null!=e},idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var e=arguments,t=null,n=null;return e.length<2?e[0]:(t=(t=e[0]).toString?t.toString():t,n=e[1],_.each(n,function(e,n){null!=e&&(e=_.is(e,"object")?JSON.stringify(e):e.toString?e.toString():e,t=t.replace(new RegExp("\\{"+n+"\\}","gi"),e))}),t)},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random()|0;return("x"==e?n:3&n|8).toString(16)}).toUpperCase()},fix:function(e){for(var n=e||{},t=1,r=arguments.length;t<r;t++){var i=arguments[t];for(var o in i)i.hasOwnProperty(o)&&"function"!=typeof n[o]&&(n[o]=i[o])}return n},extend:function(e){for(var n=e||{},t=1,r=arguments.length;t<r;t++){var i=arguments[t];for(var o in i)i.hasOwnProperty(o)&&(n[o]=i[o])}return n},deepAssign:function(e,n){var t=null,r=null;switch(c.call(n)){case"[object Object]":for(var i in n)if(t=e[i],r=n[i],n.hasOwnProperty(i)&&e.hasOwnProperty(i))switch(c.call(r)){case"[object Object]":r=this.deepAssign({},r),"[object Object]"==c.call(t)?e[i]=this.deepAssign(t,r):e[i]=r;break;case"[object Array]":"[object Array]"==c.call(t)?e[i]=e[i].concat(r):e[i]=r;break;case"[object Null]":case"[object Boolean]":case"[object Function]":case"[object Number]":case"[object String]":e[i]=r}break;case"[object Array]":n.unshift(e),o.deepAssigns.apply(this,n)}return e},callOnce:function(e){var n=!1;return function(){n||(n=!0,e.apply(this,arguments))}},deepAssigns:function(){for(var e=arguments[0],n=1,t=arguments.length;n<t;n++)o.deepAssign(e,arguments[n]);return e},convertArrayArgv:function(e,n){for(var t=[],r=p.extend({prefix:"--"},n).prefix,i={},o="",a=null,c={},_=!1,u=0,f=e.length;u<f;u++)if(-1!==(a=e[u]).indexOf(r))i[o=a.replace(r,"")]=!0,c[u+1]=o,_=_||!0;else if(_)if(c[u])i[c[u]]=a;else{for(var s=u-1;!c[s]&&0<s;)s-=1;if(c[s]){var l=i[c[s]];null!=l?"string"==typeof l?i[c[s]]=[l,a]:"object"==typeof l&&i[c[s]].push(a):i[c[s]]=a}}else t.push(a);return{env:t,argv:i}},overwrite:function(e){for(var n=e||{},t=1,r=arguments.length;t<r;t++){var i=arguments[t];for(var o in i)i.hasOwnProperty(o)&&void 0===n[o]&&(n[o]=i[o])}return n},path:function(e,n,t){var r=e||{};if(n){var i,o=n.split("."),a=o.length,c=0;if(arguments.length<3)for(;r&&c<a;c++)i=o[c],r=r.__get__?r.__get__(i):r[i];else{for(a-=1;r&&c<a;c++)i=o[c],r=r.__get__?r.__get__(i):r[i]=r[i]||{};i=o[c],r&&(r.__set__?r.__set__(i,t):r[i]=t,r=t)}}return r},invoke:function(e,n,t){if(e&&n){var r,i,o=n.lastIndexOf(".");0<o?(r=p.path(e,n.substring(0,o)))&&(i=r[n.substring(o+1)]):i=(r=e)[n],i&&i.apply(r,t)}},deepEachObject:function(e,n,t){if(_.is(e,"object")){var r,i=null;for(var o in e)i=e[o],_.is(i,"object")?this.deepEachObject(i,n,t):null!=(r=n&&n.call(t,i,o,e))&&(e[o]=r)}return e},arrayValueToObject:function(e,n,t){if(_.is(e,"array")){for(var r,i=null,o={},a=0,c=e.length;a<c;a++)i=e[a],null!=(r=n&&n.call(t,i,a,e,o))&&(o[i]=r);e=o}return e}},_={toString:function(e){return e&&e.toString?e.toString():c.call(e)},each:function(e,n,t){if(e&&n)if(e.__each__)e.__each__(n,t);else{var r=e.length,i=null;if(0<r&&"[object Array]"===c.call(e)){for(var o=0;o<r;o++)if(!1===(i=n.call(t,e[o],o)))return!1}else for(var a in e)if(e.hasOwnProperty(a)){if(!1===(i=n.call(t,e[a],a)))return!1;if(-1===i)continue}}},clone:function(e){if(e){if(e.__clone__)return e.__clone__();if(p.is(e,"array"))return e.slice(0);var n={};for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}return e},type:function(e){return e&&e.__type__?e.__type__:c.call(e).slice(8,-1).toLowerCase()},is:function(e,n){if(e&&e.__is__)return e.__is__(n);if("string"==typeof n)switch(n.toLowerCase()){case"plain":return e&&e.constructor===Object;default:return this.type(e)===n}else if("function"==typeof n)return e instanceof n},may:function(e,n){return!!e&&(e.__may__?e.__may__(n):e.hasOwnProperty("on"+n))},can:function(e,n){return!!e&&(e.__can__?e.__can__(n):"function"==typeof e[n])},has:function(e,n){return!!e&&(e.__has__?e.__has__(n):e.hasOwnProperty(n))},get:function(e,n){if(e)return e.__get__?e.__get__(n):e[n]},set:function(e,n,t){e&&(e.__set__?e.__set__(n,t):e[n]=t)},gets:function(e){if(e){if(e.__gets__)return e.__gets__();var n={};for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}},sets:function(e,n){if(e&&n)if(e.__sets__)e.__sets__(n);else for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])}};o.extend(p,o),o.extend(p,_)}(zn);
!function(l){var o=l.GLOBAL,s=1,f=1,p={fixTargetCtor:function(t){return t instanceof c?t.constructor:t},fixTargetKey:function(t){return"@"+t},defineEvent:function(t,n,e){var r=p.fixTargetCtor(t),i=p.fixTargetKey(n),s=i in r,_={};return s||(_=Object.defineProperty(t,"on"+n.toLowerCase(),{get:function(){var t=this.__handlers__[n];return t?t[0].handler:null},set:function(t){var e=this.__handlers__;(e[n]=e[n]||[])[0]={owner:this,handler:t,context:null}}})),r[i]={name:n,type:"event",meta:e,descriptor:_},s},defineProperty:function(t,e,n){var r,i,s,_=p.fixTargetCtor(t),o=p.fixTargetKey(e),a=o in _;if("value"in n){var u=n.value,c="_"+e,h=n.get,f=n.set;i=h||function(){return c in this?this[c]:l.is(u,"function")?u.call(this):u},s=n.readonly?function(t,e){if(!e||!e.force)return!1;this[c]=t}:f||function(t){this[c]=t}}else i=n.get||function(){},s=n.set||function(){return!1};return a&&(i.__super__=_[o].getter,s.__super__=_[o].setter),r=Object.defineProperty(t,e,{get:i,set:s,configurable:!0}),_[o]={name:e,type:"property",meta:n,getter:i,setter:s,descriptor:r},a},defineMethod:function(t,e,n){var r=p.fixTargetCtor(t),i=p.fixTargetKey(e),s=i in r;return r[i]={name:e,type:"method",meta:n},e in t&&(n.value||(n.value=function(){}),n.value.__super__=t[e]),t[e]=n.value,s}},_={__handlers__:{},member:function(t,e){var n=p.fixTargetCtor(e||this),r=n[p.fixTargetKey(t)];return r||n===c?r:this.member(t,n._super_)},may:function(t){var e=this.member(t);return e&&"event"==e.type},has:function(t){var e=this.member(t);return e&&"property"==e.type},can:function(t){var e=this.member(t);return e&&"method"==e.type},get:function(t,e){var n=this.member(t);if(n&&n.getter)return n.getter.call(this,e)},set:function(t,e,n){var r=this.member(t);return r&&r.setter&&r.setter.call(this,e,n),this},gets:function(e){var n={},t=p.fixTargetCtor(this)._properties_;return l.each(t,function(t){n[t]=this.get(t,e)},this),n},sets:function(t,e,n){if(t){var r=null;for(var i in t)t.hasOwnProperty(i)&&(r=t[i],!1!==(n&&n(r,i,e))&&this.set(i,r,e))}return this},each:function(t,e){for(var n=p.fixTargetCtor(this)._properties_,r=0,i=n.length;r<i;r++){var s=n[r];if(!1===t.call(e,s,r,this.member(s),this.get(s)))return!1}return this},__may__:function(t){return this.may(t)},__has__:function(t){return this.has(t)},__can__:function(t){return this.can(t)},__get__:function(t){return this.get(t)},__gets__:function(){return this.gets()},__set__:function(t,e){this.set(t,e)},__sets__:function(t){this.sets(t)},__each__:function(t,e){return this.each(t,e)}},a={toString:function(){return JSON.stringify({ClassName:this._name_||"Anonymous",ClassID:this._id_})},createSelf:function(){return new this.constructor.apply(this,Array.prototype.slice.call(arguments))},getProperties:function(r,i){var s={};if(!this.getMeta||"ZNObject"==this._name_)return s;var t=this._super_,e=this._mixins_;return t&&l.extend(s,t.getProperties(r,i)),e&&e.length&&l.each(e,function(t){t&&l.extend(s,t.getProperties(r,i))}),l.each(this.getMeta("properties"),function(t,e){var n=r&&r.call(i||this,t,e,s);if(!1===n||-1===n)return n;t.hidden||(s[e]=t)},this),s},getProperty:function(n){var r=null;return n&&this.getProperties(function(t,e){return n==e&&(r=field),-1}),r},existProperty:function(t){return!!this.getProperty(t)},getMeta:function(t){return t?this._meta_[t]:this._meta_},setMeta:function(t,e){return t&&e&&(this._meta_[t]=e),this},defineEvent:function(t,e,n){return p.defineEvent(n||this.prototype,t,e)||this._events_.push(t),this},defineProperty:function(t,e,n){return p.defineProperty(n||this.prototype,t,e)||this._properties_.push(t),this},defineMethod:function(t,e,n){return p.defineMethod(n||this.prototype,t,e)||this._methods_.push(t),this}},u={toString:function(){var t={ClassName:this.__name__||"Anonymous",InstanceID:this.__id__,Meta:this.constructor._meta_};return JSON.stringify(t)},toJson:function(){var n={};return l.each(this.constructor.getProperties(),function(t,e){n[e]=this.get(e)},this),n},getProperties:function(){return this.constructor.getProperties.apply(this,arguments)},getPropertie:function(t){return this.constructor.getPropertie(t)},upon:function(t,e,n){if(e){var r=this.__handlers__;(r[t]=r[t]||[])[0]=l.extend({owner:this,handler:e},n)}return this},on:function(t,e,n){if(e){var r=this.__handlers__;(r[t]=r[t]||[{owner:null,handler:null,context:null}]).push(l.extend({owner:this,handler:e},n))}return this},hasEventHandler:function(t){return!!(this.__handlers__[t]||[]).length},off:function(t,e,n){var r,i=this.__handlers__[t]||[],s=n&&n.context;if(e)for(var _=i.length-1;0<=_;_--)(r=i[_]).handler!==e||s&&r.context!==s||this.__handlers__[t].splice(_,1);else this.__handlers__[t]=[{owner:null,handler:null,context:null}];return this},offs:function(t){var e=Array.prototype.slice.call(arguments);return e.length?l.each(e,function(t){this.__handlers__[t]&&(this.__handlers__[t]=[{owner:null,handler:null,context:null}])}.bind(this)):this.__handlers__={},this},fire:function(t,e,n){var r,i=this.__handlers__[t],s=null,_=null;if(i)for(var o=0,a=i.length;o<a;o++)if((r=i[o])&&r.handler){if(!1===(_=n&&"apply"==n.method?r.handler.apply(r.context||r.owner,e):r.handler.call(r.context||r.owner,r.owner,e,n)))return!1;if(-1===_)continue;if(n&&n.overwrite)s=_;else if(_)return _}return s},dispose:function(){return this.__handlers__={},this},destroy:function(){return this.dispose()},super:function(){var t=this.super.caller.__super__;if(t)return t.apply(this,arguments)},is:function(t){if("string"==typeof t&&(t=l.path(o,t)),t){if(this instanceof t)return!0;for(var e=this.constructor._mixins_,n=0,r=e.length;n<r;n++){if(t===e[n])return!0}}return!1},__is__:function(t){return this.is(t)},__clone__:function(){}};function c(){}l.extend(c,_,a,{_id_:0,_name_:"ZNObject",_statics_:{},_events_:[],_properties_:[],_methods_:[],_mixins_:[],_meta_:{}}),l.extend(c.prototype,_,u),l.isZNObject=function(t){return t instanceof c};var d={_arguments:function(){var t,e,n,r=arguments,i=r.length,s=r[0];if(3===i){if(t=s,e=r[1],n=r[2],!l.is(e,"function"))throw new Error("Invalid _super class.")}else if(2===i){if(l.is(s,"string"))t=s,e=null;else{if(!l.is(s,"function"))throw new Error("Invalid _super class.");t=null,e=s}n=r[1]}else{if(1!==i)throw new Error("Invalid arguments.");if(e=t=null,n=s,!l.is(n,"object"))throw new Error("The meta argument must be an object.")}return{name:t=t||"",super:e=e||c,meta:n=l.overwrite(n||{},{static:!1,statics:[],partial:!1,abstract:!1,final:!1,mixins:[],events:[],properties:[],methods:[]})}},_meta:function(n,t){var e=t.name,r=t.super,i=t.meta;return l.extend(n,_,a,{_id_:s++,_name_:e,_super_:r,_partial_:i.partial,_abstract_:i.abstract,_static_:i.static,_final_:i.final,_statics_:l.extend({},r._statics_,i.statics),_events_:r._events_.slice(0),_properties_:r._properties_.slice(0),_methods_:r._methods_.slice(0),_mixins_:r._mixins_.concat(i.mixins),_meta_:i}),l.extend(n,n._statics_),i.static?(l.each(i.events,function(t){n.defineEvent(t,{},n)}),l.each(i.properties,function(t,e){n.defineProperty(e,l.is(t,"object")?t:{value:t},n)}),l.each(i.methods,function(t,e){n.defineMethod(e,l.is(t,"function")?{value:t}:t,n)}),i.methods.init&&i.methods.init.call(n,n)):(l.each(i.mixins,function(t){if(t){var e=t.prototype;l.each(t._events_,function(t){n.defineEvent(t,e.member(t).meta)}),l.each(t._properties_,function(t){n.defineProperty(t,e.member(t).meta)}),l.each(t._methods_,function(t){_[t]||u[t]||n.defineMethod(t,e.member(t).meta)})}}),l.each(i.events,function(t){n.defineEvent(t,{})}),l.each(i.properties,function(t,e){n.defineProperty(e,l.is(t,"object")?t:{value:t})}),l.each(i.methods,function(t,e){n.defineMethod(e,l.is(t,"function")?{value:t}:t)})),n}},m=function(t,e,n){if(t&&t!==c){var r=t.member("init"),i=t._mixins_,s=null;return r&&r.meta.after&&e.__afters__.push({context:e,handler:r.meta.after}),i.length&&l.each(i,function(t){t&&t["@init"]&&(s=t["@init"].meta,s=l.is(s,"function")?s:s.value,m(t.prototype.__super__,t.prototype,n),s&&s.call(e))}),r&&r.meta.auto&&r.meta.value.apply(e,n),arguments.callee(t._super_,e)}};l.Class=function(){var h,t,e,n=d._arguments.apply(this,arguments),r=n.name,i=n.super,s=n.meta,_=s.methods.init;if(s.properties=s.properties||s.props,s.props=null,delete s.props,i._static_)throw new Error("Static class cannot be inherited.");if(i._final_)throw new Error("Final class cannot be inherited.");if(r&&s.partial&&(h=l.path(o,r)),s.static){if(h){if(!h._static_)throw new Error('Partial class "'+r+'" must be static.')}else h=function(){throw new Error("Cannot instantiate static class.")};e=h.prototype}else{if(h){if(h._static_)throw new Error('Partial class "'+r+'" must not be static.');if(h._super_!==i&&h._super_!==c)throw new Error('Partial class "'+r+'" must have consistent super class.')}else(h=s.abstract?function(){throw new Error("Cannot instantiate abstract class.")}:function(){var t=h._mixins_||[],e=h._ctors_||[],n=null,r=arguments;this.__id__=f++,this.__handlers__={},this.__initializing__=!0,this.__afters__=[];for(var i=null,s=null,_=0,o=t.length;_<o;_++)(i=t[_])["@init"]?(s=i["@init"].meta,s=l.is(s,"function")?s:s.value,m(i.prototype.__super__,this,r),s&&s.call(this)):m(i.prototype.__super__,this,r);m(this.__super__,this,r);for(var a=0,u=e.length;a<u;a++)n=e[a],(n=l.is(n,"function")?n:n.value)&&n.apply(this,r);for(;0<this.__afters__.length;){var c=this.__afters__.pop();c.handler.apply(c.context,r)}this.__afters__=null,delete this.__afters__,this.__initializing__=!1})._ctors_=[];h._super_!==i?((t=function(){}).prototype=i.prototype,(e=new t).constructor=h,e.__type__=r||"Anonymous",e.__super__=i,h.prototype=e):e=h.prototype,e.class=e.constructor,_&&(h._ctors_.push(_),e.__ctor__||(e.__ctor__=_))}return d._meta(h,n),e.__define__&&e.__define__.call(h),r&&l.path(o,r,h),h}}(zn);
!function(n){var e=Array.prototype.slice,t=(Object.prototype.hasOwnProperty,Object.prototype.toString),r={format:function(){var t=arguments,e=this;return 1==t.length&&"object"==typeof t[0]&&(t=t[0]),n.each(t,function(t,r){null!=t&&(t="object"==n.type(t)?JSON.stringify(t):t.toString?t.toString():t,e=e.replace(new RegExp("\\{"+r+"\\}","gi"),t))}),e.toString()},firstUpperCase:function(t){return t.replace(/\b(\w)(\w*)/g,function(t,r,e){return r.toUpperCase()+e})}},i={isArray:function(t){return t&&"[object Array]"===n.toString(t)&&t.constructor===Array}},o={format:function(t,r){var e="\\d(?=(\\d{"+(r||3)+"})+"+(0<t?"\\.":"$")+")";return this.toFixed(Math.max(0,~~t)).replace(new RegExp(e,"g"),"$&,")},sectionThree:function(){return this.toString().replace(/(\d)(?=(\d{3})+\.)/g,"$1,")},price:function(t){var r=n.extend({unit:1e4,unitText:"万",prefix:"",decimal:2,sections:3},t);return 1<this/r.unit&&this%100==0?(this/r.unit).sectionThree()+r.unitText:this.format(r.decimal,r.sections)}},s={bind:function(t){var r=this;return function(){return r.apply(t,e.call(arguments,1))}}};var u,a,c,f;u=t,a=Array.isArray,c={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},f=/[\\"\u0000-\u001F\u2028\u2029]/g;function h(t){return c[t]||"\\u"+(t.charCodeAt(0)+65536).toString(16).substr(1)}var p={format:function(t){var r={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var e in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[e]:("00"+r[e]).substr((""+r[e]).length)));return t}};n.fix(Array,i),n.fix(Array.prototype,{forEach:function(t,r){if(!t)return!1;for(var e=0,n=this.length;e<n;e++)t.call(r,this[e],e);return this},indexOf:function(t){for(var r=0,e=this.length;r<e;r++)if(this[r]===t)return r;return-1},lastIndexOf:function(t){for(var r=this.length-1;0<=r;r--)if(this[r]===t)return r;return-1}}),n.fix(Function.prototype,s),n.fix(String.prototype,r),n.fix(Number.prototype,o),n.fix(Date.prototype,p)}(zn);