!function(p){var a=Object.prototype.toString,o={isNull:function(e){return null==e},isNotNull:function(e){return null!=e},idle:function(){},idleArray:function(){return[]},idleObject:function(){return{}},format:function(){var e,t=arguments,n=null;return t.length<2?t[0]:(n=(n=t[0]).toString?n.toString():n,e=t[1],_.each(e,function(e,t){null!=e&&(e=_.is(e,"object")?JSON.stringify(e):e.toString?e.toString():e,n=n.replace(new RegExp("\\{"+t+"\\}","gi"),e))}),n)},uuid:function(e){var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)});return e&&e.ifUpperCase&&(t=t.toUpperCase()),t},fix:function(e){for(var t=e||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&"function"!=typeof t[o]&&(t[o]=i[o])}return t},extend:function(e){for(var t=e||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&(t[o]=i[o])}return t},isJson:function(e){return"object"==typeof e&&"[object object]"==a.call(e).toLowerCase()&&0==e.constructor.toString().indexOf("function Object() {")},deepAssign:function(e,t){var n,r=null;switch(a.call(t)){case"[object Object]":if(!o.isJson(t))return e;for(var i in t)if(n=e[i],r=t[i],t.hasOwnProperty(i))switch(a.call(r)){case"[object Object]":if(!o.isJson(r))continue;r=this.deepAssign({},r),"[object Object]"==a.call(n)?e[i]=o.deepAssign(n,r):e[i]=r;break;case"[object Array]":"[object Array]"==a.call(n)?e[i]=e[i].concat(r):e[i]=r;break;case"[object Null]":case"[object Boolean]":case"[object Function]":case"[object Number]":case"[object String]":e[i]=r}break;case"[object Array]":t.unshift(e),o.deepAssigns.apply(o.deepAssigns,t)}return e},callOnce:function(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}},deepAssigns:function(){for(var e=arguments[0],t=1,n=arguments.length;t<n;t++)o.deepAssign(e,arguments[t]);return e},convertArrayArgv:function(e,t){for(var n,r=[],i=p.extend({prefix:"--"},t).prefix,o={},c=null,a={},_=!1,s=0,f=e.length;s<f;s++)if(-1!==(c=e[s]).indexOf(i))o[n=c.replace(i,"")]=!0,a[s+1]=n,_=_||!0;else if(_)if(a[s])o[a[s]]=c;else{for(var u,l=s-1;!a[l]&&0<l;)--l;a[l]&&(null!=(u=o[a[l]])?"string"==typeof u?o[a[l]]=[u,c]:"object"==typeof u&&o[a[l]].push(c):o[a[l]]=c)}else r.push(c);return{env:r,argv:o}},overwrite:function(e){for(var t=e||{},n=1,r=arguments.length;n<r;n++){var i=arguments[n];for(var o in i)i.hasOwnProperty(o)&&void 0===t[o]&&(t[o]=i[o])}return t},path:function(e,t,n){var r=e||{};if(t){var i,o=t.split("."),c=o.length,a=0;if(arguments.length<3)for(;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i];else{for(--c;r&&a<c;a++)i=o[a],r=r.__get__?r.__get__(i):r[i]=r[i]||{};i=o[a],r&&(r.__set__?r.__set__(i,n):r[i]=n,r=n)}}return r},invoke:function(e,t,n){var r,i,o;e&&t&&(0<(r=t.lastIndexOf("."))?(i=p.path(e,t.substring(0,r)))&&(o=i[t.substring(r+1)]):o=(i=e)[t],o&&o.apply(i,n))},deepEachObject:function(e,t,n){if(_.is(e,"object")){var r,i;for(var o in e)r=e[o],_.is(r,"object")?this.deepEachObject(r,t,n):null!=(i=t&&t.call(n,r,o,e))&&(e[o]=i)}return e},arrayValueToObject:function(e,t,n){if(_.is(e,"array")){for(var r,i,o={},c=0,a=e.length;c<a;c++)r=e[c],null!=(i=t&&t.call(n,r,c,e,o))&&(o[r]=i);e=o}return e}},_={toString:function(e){return e&&e.toString?e.toString():a.call(e)},each:function(e,t,n){if(e&&t)if(e.__each__)e.__each__(t,n);else{var r=e.length,i=null;if(0<r&&"[object Array]"===a.call(e)){for(var o=0;o<r;o++)if(!1===(i=t.call(n,e[o],o)))return!1}else for(var c in e)if(e.hasOwnProperty(c)){if(!1===(i=t.call(n,e[c],c)))return!1;if(-1===i)continue}}},clone:function(e){if(e){if(e.__clone__)return e.__clone__();if(p.is(e,"array"))return e.slice(0);var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}return e},type:function(e){return e&&e.__type__?e.__type__:a.call(e).slice(8,-1).toLowerCase()},is:function(e,t){if(e&&e.__is__)return e.__is__(t);if("string"==typeof t)switch(t.toLowerCase()){case"plain":return e&&e.constructor===Object;default:return this.type(e)===t}else if("function"==typeof t)return e instanceof t},may:function(e,t){return!!e&&(e.__may__?e.__may__(t):e.hasOwnProperty("on"+t))},can:function(e,t){return!!e&&(e.__can__?e.__can__(t):"function"==typeof e[t])},has:function(e,t){return!!e&&(e.__has__?e.__has__(t):e.hasOwnProperty(t))},get:function(e,t){if(e)return e.__get__?e.__get__(t):e[t]},set:function(e,t,n){e&&(e.__set__?e.__set__(t,n):e[t]=n)},gets:function(e){if(e){if(e.__gets__)return e.__gets__();var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}},sets:function(e,t){if(e&&t)if(e.__sets__)e.__sets__(t);else for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}};o.extend(p,o),o.extend(p,_)}(zn);