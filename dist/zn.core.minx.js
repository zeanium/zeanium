var __isServer="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0),zn={VERSION:"1.0.8",DEBUG:!0,ZN_PATH:"",PATH:"",GLOBAL:function(){return __isServer?global:window}.call(null),isServer:__isServer};if(zn.GLOBAL.zn=zn,__isServer)zn.ZN_PATH=__dirname,zn.PATH=process.cwd(),module.exports=zn;else{var _zn_url="";try{__a__=__b__}catch(r){r.fileName?_zn_url=r.fileName:r.sourceURL?_zn_url=r.sourceURL:r.stacktrace?console.error(r.stacktrace):r.stack?_zn_url=(_zn_url=(_zn_url=r.stack.split("\n")[1]).replace(/\s/g,"")).substring(2,_zn_url.length):console.error(r.toString())}if(!_zn_url)for(var _node,_scripts=document.getElementsByTagName("script"),_src="",i=0,_len=scripts.length;i<_len;i++)if((_node=scripts[i]).getAttribute&&("zn.js"===(_src=_node.getAttribute("src")||"").slice(-5)||"zn.minx.js"===_src.slice(-10))){_zn_url=_src;break}if(!_zn_url)throw new Error("zn.js has not been included, please do it first.");zn.ZN_PATH=_zn_url.substring(0,_zn_url.lastIndexOf("/")+1)}
!function(p){var a=Object.prototype.toString,o={isNull:function(t){return null==t},isNotNull:function(t){return null!=t},idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var t=arguments,e=null,n=null;return t.length<2?t[0]:(e=(e=t[0]).toString?e.toString():e,n=t[1],_.each(n,function(t,n){null!=t&&(t=_.is(t,"object")?JSON.stringify(t):t.toString?t.toString():t,e=e.replace(new RegExp("\\{"+n+"\\}","gi"),t))}),e)},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=16*Math.random()|0;return("x"==t?n:3&n|8).toString(16)}).toUpperCase()},fix:function(t){for(var n=t||{},e=1,r=arguments.length;e<r;e++){var i=arguments[e];for(var o in i)i.hasOwnProperty(o)&&"function"!=typeof n[o]&&(n[o]=i[o])}return n},extend:function(t){for(var n=t||{},e=1,r=arguments.length;e<r;e++){var i=arguments[e];for(var o in i)i.hasOwnProperty(o)&&(n[o]=i[o])}return n},isJson:function(t){return"object"==typeof t&&"[object object]"==a.call(t).toLowerCase()&&"function Object() { [native code] }"==t.constructor.toString()},deepAssign:function(t,n){var e=null,r=null;switch(a.call(n)){case"[object Object]":if(!o.isJson(n))return t;for(var i in n)if(e=t[i],r=n[i],n.hasOwnProperty(i))switch(a.call(r)){case"[object Object]":if(!o.isJson(r))continue;r=this.deepAssign({},r),"[object Object]"==a.call(e)?t[i]=this.deepAssign(e,r):t[i]=r;break;case"[object Array]":"[object Array]"==a.call(e)?t[i]=t[i].concat(r):t[i]=r;break;case"[object Null]":case"[object Boolean]":case"[object Function]":case"[object Number]":case"[object String]":t[i]=r}break;case"[object Array]":n.unshift(t),o.deepAssigns.apply(this,n)}return t},callOnce:function(t){var n=!1;return function(){n||(n=!0,t.apply(this,arguments))}},deepAssigns:function(){for(var t=arguments[0],n=1,e=arguments.length;n<e;n++)o.deepAssign(t,arguments[n]);return t},convertArrayArgv:function(t,n){for(var e=[],r=p.extend({prefix:"--"},n).prefix,i={},o="",c=null,a={},_=!1,u=0,s=t.length;u<s;u++)if(-1!==(c=t[u]).indexOf(r))i[o=c.replace(r,"")]=!0,a[u+1]=o,_=_||!0;else if(_)if(a[u])i[a[u]]=c;else{for(var f,l=u-1;!a[l]&&0<l;)--l;a[l]&&(null!=(f=i[a[l]])?"string"==typeof f?i[a[l]]=[f,c]:"object"==typeof f&&i[a[l]].push(c):i[a[l]]=c)}else e.push(c);return{env:e,argv:i}},overwrite:function(t){for(var n=t||{},e=1,r=arguments.length;e<r;e++){var i=arguments[e];for(var o in i)i.hasOwnProperty(o)&&void 0===n[o]&&(n[o]=i[o])}return n},path:function(t,n,e){var r=t||{};if(n){var i,o=n.split("."),c=o.length,a=0;if(arguments.length<3)for(;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i];else{for(--c;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i]=r[i]||{};i=o[a],r&&(r.__set__?r.__set__(i,e):r[i]=e,r=e)}}return r},invoke:function(t,n,e){var r,i,o;t&&n&&(0<(r=n.lastIndexOf("."))?(i=p.path(t,n.substring(0,r)))&&(o=i[n.substring(r+1)]):o=(i=t)[n],o&&o.apply(i,e))},deepEachObject:function(t,n,e){if(_.is(t,"object")){var r,i=null;for(var o in t)i=t[o],_.is(i,"object")?this.deepEachObject(i,n,e):null!=(r=n&&n.call(e,i,o,t))&&(t[o]=r)}return t},arrayValueToObject:function(t,n,e){if(_.is(t,"array")){for(var r,i=null,o={},c=0,a=t.length;c<a;c++)i=t[c],null!=(r=n&&n.call(e,i,c,t,o))&&(o[i]=r);t=o}return t}},_={toString:function(t){return t&&t.toString?t.toString():a.call(t)},each:function(t,n,e){if(t&&n)if(t.__each__)t.__each__(n,e);else{var r=t.length,i=null;if(0<r&&"[object Array]"===a.call(t)){for(var o=0;o<r;o++)if(!1===(i=n.call(e,t[o],o)))return!1}else for(var c in t)if(t.hasOwnProperty(c)){if(!1===(i=n.call(e,t[c],c)))return!1;if(-1===i)continue}}},clone:function(t){if(t){if(t.__clone__)return t.__clone__();if(p.is(t,"array"))return t.slice(0);var n={};for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}return t},type:function(t){return t&&t.__type__?t.__type__:a.call(t).slice(8,-1).toLowerCase()},is:function(t,n){if(t&&t.__is__)return t.__is__(n);if("string"==typeof n)switch(n.toLowerCase()){case"plain":return t&&t.constructor===Object;default:return this.type(t)===n}else if("function"==typeof n)return t instanceof n},may:function(t,n){return!!t&&(t.__may__?t.__may__(n):t.hasOwnProperty("on"+n))},can:function(t,n){return!!t&&(t.__can__?t.__can__(n):"function"==typeof t[n])},has:function(t,n){return!!t&&(t.__has__?t.__has__(n):t.hasOwnProperty(n))},get:function(t,n){if(t)return t.__get__?t.__get__(n):t[n]},set:function(t,n,e){t&&(t.__set__?t.__set__(n,e):t[n]=e)},gets:function(t){if(t){if(t.__gets__)return t.__gets__();var n={};for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}},sets:function(t,n){if(t&&n)if(t.__sets__)t.__sets__(n);else for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])}};o.extend(p,o),o.extend(p,_)}(zn);
!function(f){var o=f.GLOBAL,a=Array.prototype.slice,s=1,c=1,p={fixTargetCtor:function(t){return t instanceof d?t.constructor:t},fixTargetKey:function(t){return"@"+t},defineEvent:function(t,n,e){var r=p.fixTargetCtor(t),i=p.fixTargetKey(n),s=i in r,_={};return s||(_=Object.defineProperty(t,"on"+n.toLowerCase(),{get:function(){var t=this.__handlers__[n];return t?t[0].handler:null},set:function(t){var e=this.__handlers__;(e[n]=e[n]||[])[0]={owner:this,handler:t,context:null}}})),r[i]={name:n,type:"event",meta:e,descriptor:_},s},defineProperty:function(t,e,n){var r,i,s,_,o,a,u,h=p.fixTargetCtor(t),l=p.fixTargetKey(e),c=l in h;return u="value"in n?(i=n.value,s="_"+e,_=n.get,o=n.set,a=_||function(){return s in this?this[s]:f.is(i,"function")?i.call(this):i},n.readonly?function(t,e){if(!e||!e.force)return!1;this[s]=t}:o||function(t){this[s]=t}):(a=n.get||function(){},n.set||function(){return!1}),c&&(a.__super__=h[l].getter,u.__super__=h[l].setter),r=Object.defineProperty(t,e,{get:a,set:u,configurable:!0}),h[l]={name:e,type:"property",meta:n,getter:a,setter:u,descriptor:r},c},defineMethod:function(t,e,n){var r=p.fixTargetCtor(t),i=p.fixTargetKey(e),s=i in r;return r[i]={name:e,type:"method",meta:n},e in t&&(n.value||(n.value=function(){}),n.value.__super__=t[e]),t[e]=n.value,s}},_={__handlers__:{},member:function(t,e){var n=p.fixTargetCtor(e||this),r=n[p.fixTargetKey(t)];return r||n===d?r:this.member(t,n._super_)},may:function(t){var e=this.member(t);return e&&"event"==e.type},has:function(t){var e=this.member(t);return e&&"property"==e.type},can:function(t){var e=this.member(t);return e&&"method"==e.type},get:function(t,e){var n=this.member(t);if(n&&n.getter)return n.getter.call(this,e)},set:function(t,e,n){var r=this.member(t);return r&&r.setter&&r.setter.call(this,e,n),this},gets:function(e){var n={},t=p.fixTargetCtor(this)._properties_;return f.each(t,function(t){n[t]=this.get(t,e)},this),n},sets:function(t,e,n){if(t){var r=null;for(var i in t)t.hasOwnProperty(i)&&(r=t[i],!1!==(n&&n(r,i,e))&&this.set(i,r,e))}return this},each:function(t,e){for(var n=p.fixTargetCtor(this)._properties_,r=0,i=n.length;r<i;r++){var s=n[r];if(!1===t.call(e,s,r,this.member(s),this.get(s)))return!1}return this},__may__:function(t){return this.may(t)},__has__:function(t){return this.has(t)},__can__:function(t){return this.can(t)},__get__:function(t){return this.get(t)},__gets__:function(){return this.gets()},__set__:function(t,e){this.set(t,e)},__sets__:function(t){this.sets(t)},__each__:function(t,e){return this.each(t,e)}},u={toString:function(){return JSON.stringify({ClassName:this._name_||"Anonymous",ClassID:this._id_})},createSelf:function(){return new this.constructor.apply(this,Array.prototype.slice.call(arguments))},getProperties:function(r,i){var s={};if(!this.getMeta||"ZNObject"==this._name_)return s;var t=this._super_,e=this._mixins_;return t&&f.extend(s,t.getProperties(r,i)),e&&e.length&&f.each(e,function(t){t&&f.extend(s,t.getProperties(r,i))}),f.each(this.getMeta("properties"),function(t,e){var n=r&&r.call(i||this,t,e,s);if(!1===n||-1===n)return n;t.hidden||(s[e]=t)},this),s},getProperty:function(n){var r=null;return n&&this.getProperties(function(t,e){return n==e&&(r=field),-1}),r},existProperty:function(t){return!!this.getProperty(t)},getMeta:function(t){return t?this._meta_[t]:this._meta_},setMeta:function(t,e){return t&&e&&(this._meta_[t]=e),this},defineEvent:function(t,e,n){return p.defineEvent(n||this.prototype,t,e)||this._events_.push(t),this},defineProperty:function(t,e,n){return p.defineProperty(n||this.prototype,t,e)||this._properties_.push(t),this},defineMethod:function(t,e,n){return p.defineMethod(n||this.prototype,t,e)||this._methods_.push(t),this}},h={toString:function(){var t={ClassName:this.__name__||"Anonymous",InstanceID:this.__id__,Meta:this.constructor._meta_};return JSON.stringify(t)},toJson:function(){var n={};return f.each(this.constructor.getProperties(),function(t,e){n[e]=this.get(e)},this),n},getProperties:function(){return this.constructor.getProperties.apply(this,arguments)},getPropertie:function(t){return this.constructor.getPropertie(t)},upon:function(t,e,n){var r;return e&&(((r=this.__handlers__)[t]=r[t]||[])[0]=f.extend({owner:this,handler:e},n)),this},on:function(t,e,n){var r,i;return!e||(i=(r=this.__handlers__)[t]=r[t]||[{owner:null,handler:null,context:null}]).push&&"function"==typeof i.push&&i.push(f.extend({owner:this,handler:e},n)),this},hasEventHandler:function(t){return!!(this.__handlers__[t]||[]).length},off:function(t,e,n){var r,i=this.__handlers__[t]||[],s=n&&n.context;if(e)for(var _=i.length-1;0<=_;_--)(r=i[_]).handler!==e||s&&r.context!==s||this.__handlers__[t].splice(_,1);else this.__handlers__[t]=[{owner:null,handler:null,context:null}];return this},offs:function(t){var e=Array.prototype.slice.call(arguments);return e.length?f.each(e,function(t){this.__handlers__[t]&&(this.__handlers__[t]=[{owner:null,handler:null,context:null}])}.bind(this)):this.__handlers__={},this},fire:function(t,e,n){var r,i=this.__handlers__[t],s=null,_=null;if(i)for(var o=0,a=i.length;o<a;o++)if((r=i[o])&&r.handler){if(!1===(_=n&&"apply"==n.method?(n.ownerFirst&&e.unshift(r.owner),r.handler.apply(r.context||r.owner,e)):r.handler.call(r.context||r.owner,r.owner,e,n)))return!1;if(-1===_)continue;if(n&&n.overwrite)s=_;else if(null!=_)return _}return s},fireApply:function(){var t=a.call(arguments),e=t.shift();if(!e)return this;var n,r=this.__handlers__[e],i=null;if(r)for(var s=0,_=r.length;s<_;s++)if((n=r[s])&&n.handler){if(!1===(i=n.handler.apply(n.context||n.owner,t)))return!1;if(-1===i)continue;if(null!=i)return i}return null},dispose:function(){for(var n in this.__id__=null,delete this.__id__,this.__handlers__)this.__handlers__[n]=null,this.__handlers__[n]&&this.__handlers__[n].length&&this.__handlers__[n].forEach(function(t,e){this.__handlers__[n][e]=null,delete this.__handlers__[n][e]}),delete this.__handlers__[n];this.__handlers__=null,delete this.__handlers__,this.__initializing__=null,delete this.__initializing__,this.__super__=null,delete this.__super__,this.__afters__=null,delete this.__afters__},destroy:function(){this.dispose()},super:function(){var t=this.super.caller.__super__;if(t)return t.apply(this,arguments)},is:function(t){if("string"==typeof t&&(t=f.path(o,t)),t){if(this instanceof t)return!0;for(var e=this.constructor._mixins_,n=0,r=e.length;n<r;n++){if(t===e[n])return!0}}return!1},__is__:function(t){return this.is(t)},__clone__:function(){}};function d(){}f.extend(d,_,u,{_id_:0,_name_:"ZNObject",_statics_:{},_events_:[],_properties_:[],_methods_:[],_mixins_:[],_meta_:{}}),f.extend(d.prototype,_,h),f.isZNObject=function(t){return t instanceof d};var m={_arguments:function(){var t,e,n,r=arguments,i=r.length,s=r[0];if(3===i){if(t=s,e=r[1],n=r[2],!f.is(e,"function"))throw new Error("Invalid _super class.")}else if(2===i){if(f.is(s,"string"))t=s,e=null;else{if(!f.is(s,"function"))throw new Error("Invalid _super class.");t=null,e=s}n=r[1]}else{if(1!==i)throw new Error("Invalid arguments.");if(e=t=null,n=s,!f.is(n,"object"))throw new Error("The meta argument must be an object.")}return{name:t=t||"",super:e=e||d,meta:n=f.overwrite(n||{},{static:!1,statics:[],partial:!1,abstract:!1,final:!1,mixins:[],events:[],properties:[],methods:[]})}},_meta:function(n,t){var e=t.name,r=t.super,i=t.meta;return f.extend(n,_,u,{_id_:s++,_name_:e,_super_:r,_partial_:i.partial,_abstract_:i.abstract,_static_:i.static,_final_:i.final,_statics_:f.extend({},r._statics_,i.statics),_events_:r._events_.slice(0),_properties_:r._properties_.slice(0),_methods_:r._methods_.slice(0),_mixins_:r._mixins_.concat(i.mixins),_meta_:i}),f.extend(n,n._statics_),i.static?(f.each(i.events,function(t){n.defineEvent(t,{},n)}),f.each(i.properties,function(t,e){n.defineProperty(e,f.is(t,"object")?t:{value:t},n)}),f.each(i.methods,function(t,e){n.defineMethod(e,f.is(t,"function")?{value:t}:t,n)}),i.methods.init&&i.methods.init.call(n,n)):(f.each(i.mixins,function(t){var e;t&&(e=t.prototype,f.each(t._events_,function(t){n.defineEvent(t,e.member(t).meta)}),f.each(t._properties_,function(t){n.defineProperty(t,e.member(t).meta)}),f.each(t._methods_,function(t){_[t]||h[t]||n.defineMethod(t,e.member(t).meta)}))}),f.each(i.events,function(t){n.defineEvent(t,{})}),f.each(i.properties,function(t,e){n.defineProperty(e,f.is(t,"object")?t:{value:t})}),f.each(i.methods,function(t,e){n.defineMethod(e,f.is(t,"function")?{value:t}:t)})),n}},v=function(t,e,n){if(t&&t!==d){var r=t.member("init"),i=t._mixins_,s=null;return r&&r.meta.after&&e.__afters__.push({context:e,handler:r.meta.after}),i.length&&f.each(i,function(t){t&&t["@init"]&&(s=t["@init"].meta,s=f.is(s,"function")?s:s.value,v(t.prototype.__super__,t.prototype,n),s&&s.call(e))}),r&&r.meta.auto&&r.meta.value.apply(e,n),arguments.callee(t._super_,e)}};f.Class=function(){var l,t,e,n=m._arguments.apply(this,arguments),r=n.name,i=n.super,s=n.meta,_=s.methods.init;if(s.properties=s.properties||s.props,s.props=null,delete s.props,i._static_)throw new Error("Static class cannot be inherited.");if(i._final_)throw new Error("Final class cannot be inherited.");if(r&&s.partial&&(l=f.path(o,r)),s.static){if(l){if(!l._static_)throw new Error('Partial class "'+r+'" must be static.')}else l=function(){throw new Error("Cannot instantiate static class.")};e=l.prototype}else{if(l){if(l._static_)throw new Error('Partial class "'+r+'" must not be static.');if(l._super_!==i&&l._super_!==d)throw new Error('Partial class "'+r+'" must have consistent super class.')}else(l=s.abstract?function(){throw new Error("Cannot instantiate abstract class.")}:function(){var t=l._mixins_||[],e=l._ctors_||[],n=null,r=arguments;this.__id__=c++,this.__handlers__={},this.__initializing__=!0,this.__afters__=[];for(var i=null,s=null,_=0,o=t.length;_<o;_++)(i=t[_])&&(i["@init"]?(s=i["@init"].meta,s=f.is(s,"function")?s:s.value,v(i.prototype.__super__,this,r),s&&s.call(this)):v(i.prototype.__super__,this,r));v(this.__super__,this,r);for(var a=0,u=e.length;a<u;a++)n=e[a],(n=f.is(n,"function")?n:n.value)&&n.apply(this,r);for(;0<this.__afters__.length;){var h=this.__afters__.pop();h.handler.apply(h.context,r)}this.__afters__=null,delete this.__afters__,this.__initializing__=!1})._ctors_=[];l._super_!==i?((t=function(){}).prototype=i.prototype,(e=new t).constructor=l,e.__type__=r||"Anonymous",e.__super__=i,l.prototype=e):e=l.prototype,e.class=e.constructor,_&&(l._ctors_.push(_),e.__ctor__||(e.__ctor__=_))}return m._meta(l,n),e.__define__&&e.__define__.call(l),r&&f.path(o,r,l),l}}(zn);
!function(n){var e=Array.prototype.slice,t=(Object.prototype.hasOwnProperty,Object.prototype.toString),r={format:function(){var t=arguments,e=this;return 1==t.length&&"object"==typeof t[0]&&(t=t[0]),n.each(t,function(t,r){null!=t&&(t="object"==n.type(t)?JSON.stringify(t):t.toString?t.toString():t,e=e.replace(new RegExp("\\{"+r+"\\}","gi"),t))}),e.toString()},firstUpperCase:function(t){return t.replace(/\b(\w)(\w*)/g,function(t,r,e){return r.toUpperCase()+e})}},i={isArray:function(t){return t&&"[object Array]"===n.toString(t)&&t.constructor===Array}},o={format:function(t,r){var e="\\d(?=(\\d{"+(r||3)+"})+"+(0<t?"\\.":"$")+")";return this.toFixed(Math.max(0,~~t)).replace(new RegExp(e,"g"),"$&,")},sectionThree:function(){return this.toString().replace(/(\d)(?=(\d{3})+\.)/g,"$1,")},price:function(t){var r=n.extend({unit:1e4,unitText:"万",prefix:"",decimal:2,sections:3},t);return 1<this/r.unit&&this%100==0?(this/r.unit).sectionThree()+r.unitText:this.format(r.decimal,r.sections)}},s={bind:function(t){var r=this;return function(){return r.apply(t,e.call(arguments,1))}}};var u,a,c,f;u=t,a=Array.isArray,c={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},f=/[\\"\u0000-\u001F\u2028\u2029]/g;function h(t){return c[t]||"\\u"+(t.charCodeAt(0)+65536).toString(16).substr(1)}var p={format:function(t){var r={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var e in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[e]:("00"+r[e]).substr((""+r[e]).length)));return t}};n.fix(Array,i),n.fix(Array.prototype,{forEach:function(t,r){if(!t)return!1;for(var e=0,n=this.length;e<n;e++)t.call(r,this[e],e);return this},indexOf:function(t){for(var r=0,e=this.length;r<e;r++)if(this[r]===t)return r;return-1},lastIndexOf:function(t){for(var r=this.length-1;0<=r;r--)if(this[r]===t)return r;return-1}}),n.fix(Function.prototype,s),n.fix(String.prototype,r),n.fix(Number.prototype,o),n.fix(Date.prototype,p)}(zn);