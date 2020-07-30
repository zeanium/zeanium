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