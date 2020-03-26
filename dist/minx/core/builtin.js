!function(p){var c=Object.prototype.toString,o={isNull:function(e){return null==e},isNotNull:function(e){return null!=e},idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var e=arguments,t=null,n=null;return e.length<2?e[0]:(t=(t=e[0]).toString?t.toString():t,n=e[1],_.each(n,function(e,n){null!=e&&(e=_.is(e,"object")?JSON.stringify(e):e.toString?e.toString():e,t=t.replace(new RegExp("\\{"+n+"\\}","gi"),e))}),t)},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random()|0;return("x"==e?n:3&n|8).toString(16)}).toUpperCase()},fix:function(e){for(var n=e||{},t=1,r=arguments.length;t<r;t++){var i=arguments[t];for(var o in i)i.hasOwnProperty(o)&&"function"!=typeof n[o]&&(n[o]=i[o])}return n},extend:function(e){for(var n=e||{},t=1,r=arguments.length;t<r;t++){var i=arguments[t];for(var o in i)i.hasOwnProperty(o)&&(n[o]=i[o])}return n},deepAssign:function(e,n){var t=null,r=null;switch(c.call(n)){case"[object Object]":for(var i in n)if(t=e[i],r=n[i],n.hasOwnProperty(i)&&e.hasOwnProperty(i))switch(c.call(r)){case"[object Object]":r=this.deepAssign({},r),"[object Object]"==c.call(t)?e[i]=this.deepAssign(t,r):e[i]=r;break;case"[object Array]":"[object Array]"==c.call(t)?e[i]=e[i].concat(r):e[i]=r;break;case"[object Null]":case"[object Boolean]":case"[object Function]":case"[object Number]":case"[object String]":e[i]=r}break;case"[object Array]":n.unshift(e),o.deepAssigns.apply(this,n)}return e},callOnce:function(e){var n=!1;return function(){n||(n=!0,e.apply(this,arguments))}},deepAssigns:function(){for(var e=arguments[0],n=1,t=arguments.length;n<t;n++)o.deepAssign(e,arguments[n]);return e},convertArrayArgv:function(e,n){for(var t=[],r=p.extend({prefix:"--"},n).prefix,i={},o="",a=null,c={},_=!1,u=0,f=e.length;u<f;u++)if(-1!==(a=e[u]).indexOf(r))i[o=a.replace(r,"")]=!0,c[u+1]=o,_=_||!0;else if(_)if(c[u])i[c[u]]=a;else{for(var s=u-1;!c[s]&&0<s;)s-=1;if(c[s]){var l=i[c[s]];null!=l?"string"==typeof l?i[c[s]]=[l,a]:"object"==typeof l&&i[c[s]].push(a):i[c[s]]=a}}else t.push(a);return{env:t,argv:i}},overwrite:function(e){for(var n=e||{},t=1,r=arguments.length;t<r;t++){var i=arguments[t];for(var o in i)i.hasOwnProperty(o)&&void 0===n[o]&&(n[o]=i[o])}return n},path:function(e,n,t){var r=e||{};if(n){var i,o=n.split("."),a=o.length,c=0;if(arguments.length<3)for(;r&&c<a;c++)i=o[c],r=r.__get__?r.__get__(i):r[i];else{for(a-=1;r&&c<a;c++)i=o[c],r=r.__get__?r.__get__(i):r[i]=r[i]||{};i=o[c],r&&(r.__set__?r.__set__(i,t):r[i]=t,r=t)}}return r},invoke:function(e,n,t){if(e&&n){var r,i,o=n.lastIndexOf(".");0<o?(r=p.path(e,n.substring(0,o)))&&(i=r[n.substring(o+1)]):i=(r=e)[n],i&&i.apply(r,t)}},deepEachObject:function(e,n,t){if(_.is(e,"object")){var r,i=null;for(var o in e)i=e[o],_.is(i,"object")?this.deepEachObject(i,n,t):null!=(r=n&&n.call(t,i,o,e))&&(e[o]=r)}return e},arrayValueToObject:function(e,n,t){if(_.is(e,"array")){for(var r,i=null,o={},a=0,c=e.length;a<c;a++)i=e[a],null!=(r=n&&n.call(t,i,a,e,o))&&(o[i]=r);e=o}return e}},_={toString:function(e){return e&&e.toString?e.toString():c.call(e)},each:function(e,n,t){if(e&&n)if(e.__each__)e.__each__(n,t);else{var r=e.length,i=null;if(0<r&&"[object Array]"===c.call(e)){for(var o=0;o<r;o++)if(!1===(i=n.call(t,e[o],o)))return!1}else for(var a in e)if(e.hasOwnProperty(a)){if(!1===(i=n.call(t,e[a],a)))return!1;if(-1===i)continue}}},clone:function(e){if(e){if(e.__clone__)return e.__clone__();if(p.is(e,"array"))return e.slice(0);var n={};for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}return e},type:function(e){return e&&e.__type__?e.__type__:c.call(e).slice(8,-1).toLowerCase()},is:function(e,n){if(e&&e.__is__)return e.__is__(n);if("string"==typeof n)switch(n.toLowerCase()){case"plain":return e&&e.constructor===Object;default:return this.type(e)===n}else if("function"==typeof n)return e instanceof n},may:function(e,n){return!!e&&(e.__may__?e.__may__(n):e.hasOwnProperty("on"+n))},can:function(e,n){return!!e&&(e.__can__?e.__can__(n):"function"==typeof e[n])},has:function(e,n){return!!e&&(e.__has__?e.__has__(n):e.hasOwnProperty(n))},get:function(e,n){if(e)return e.__get__?e.__get__(n):e[n]},set:function(e,n,t){e&&(e.__set__?e.__set__(n,t):e[n]=t)},gets:function(e){if(e){if(e.__gets__)return e.__gets__();var n={};for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}},sets:function(e,n){if(e&&n)if(e.__sets__)e.__sets__(n);else for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])}};o.extend(p,o),o.extend(p,_)}(zn);