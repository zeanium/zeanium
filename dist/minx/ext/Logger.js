!function(l){function a(e,o){return"number"==typeof o?o="["+o+"m":"string"==typeof o&&(o=n[o]||t[o]),o?o+e+"[0m":e}var u=Array.prototype.slice,o={log:{color:"#3b3b3b",number:37,level:0},info:{color:"#3399ea",number:36,level:1},debug:{color:"#0b109a",number:35,level:2},warn:{color:"#ff9900",number:33,level:3},error:{color:"#e20611",number:31,level:4},ok:{color:"#2de60b",number:32,level:5},trace:{color:"#0c5cec",number:34,level:6},white:{color:"#fff",number:37,level:7},all:{color:"#000",number:36,level:10}},n={bright:"[1m",grey:"[2m",italic:"[3m",underline:"[4m",reverse:"[7m",hidden:"[8m",black:"[30m",red:"[31m",green:"[32m",yellow:"[33m",blue:"[34m",magenta:"[35m",cyan:"[36m",white:"[37m",blackBG:"[40m",redBG:"[41m",greenBG:"[42m",yellowBG:"[43m",blueBG:"[44m",magentaBG:"[45m",cyanBG:"[46m",whiteBG:"[47m"},t={Close:"[0m",Highlight:"[1m",Underline:"[4m",Blink:"[5m",Invert:"[7m",Blank:"[8m",MouseUpTo:"[nA",MouseDownTo:"[nB",MouseRightTo:"[nC",MouseLeftTo:"[nD",MousePosition:"[y;xH",ClearScreen:"[2J",ClearFrom:"[K",Reset:"[0m",Bright:"[1m",Dim:"[2m",Underscore:"[4m",Reverse:"[7m",Hidden:"[8m",FgBlack:"[30m",FgRed:"[31m",FgGreen:"[32m",FgYellow:"[33m",FgBlue:"[34m",FgMagenta:"[35m",FgCyan:"[36m",FgWhite:"[37m",BgBlack:"[40m",BgRed:"[41m",BgGreen:"[42m",BgYellow:"[43m",BgBlue:"[44m",BgMagenta:"[45m",BgCyan:"[46m",BgWhite:"[47m"},e=l.Class({events:["log","info","debug","warn","error","ok","trace","all","position"],methods:{init:function(e){this._config={only:null,levels:o},this.events(e)},config:function(e){return this._config=l.overwrite(e,this._config),this},events:function(e){if(e&&"object"==typeof e)for(var o in e)this.on(o,e[o],this);return this},define:function(e,o){this._config.levels[e]=l.extend({color:"cyan"},o);var n=this.constructor;return n&&(n.defineEvent(e,{},n),n.defineMethod(e,{value:function(){this.__consoleLog.call(this,e,arguments)}.bind(this)},n),this[e]=function(){this.__consoleLog.call(this,e,arguments)}.bind(this)),this},log:function(){this.__consoleLog.call(this,"log",arguments)},info:function(){this.__consoleLog.call(this,"info",arguments)},debug:function(){this.__consoleLog.call(this,"debug",arguments)},warn:function(){this.__consoleLog.call(this,"warn",arguments)},error:function(){this.__consoleLog.call(this,"error",arguments)},ok:function(){this.__consoleLog.call(this,"ok",arguments)},trace:function(){this.__consoleLog.call(this,"trace",arguments)},all:function(){this.__consoleLog.call(this,"all",arguments)},__getDateString:function(e){return l.date.asString(e||new Date)},__getPosition:function(){try{throw new Error("Get Logger Position")}catch(e){e.DEBUG&&l.CONSOLE_ERROR&&console.error(e);var o=this.fire("position",e);return null==o&&e.stack.split("\n")[5]&&(o=e.stack.split("\n")[5].replace(/\(/g,"").replace(/\)/g,"").split("/").pop()),o||""}},prefix:function(e){var o=e.toLowerCase(),n=this.__getDateString(),l=this._config.levels[o],t=this.__getPosition(),i=null;return!(!l||this._config.only&&this._config.only!=o)&&("undefined"!=typeof module&&module.exports?(i=l.number,[n,"[",a(a(o.toUpperCase(),i),"Highlight"),"] [",a(a(t,i),"Underline"),"]"].join(" ")):(i=l.color,[n+"[%c "+o.toUpperCase()+" %c][%c "+t+"]","color:"+i+";font-weight:bold;","color:#404850:font-weight:normal;","color:"+i+";text-decoration:underline;"]))},__consoleLog:function(e,o){var n=u.call(o),l=u.call(o),t=e.toLowerCase(),i=this.__getDateString(),r=this._config.levels[t],c=this.__getPosition(),g=null,s=null;if(!r||this._config.only&&this._config.only!=t)return!1;"undefined"!=typeof module&&module.exports?(s=null!=r.number?r.number:r.color,g=[i,"[",a(a(t.toUpperCase(),s),"Highlight"),"] [",a(a(c,s),"Underline"),"]"],n.unshift(g.join(" "))):(s=r.color,n=[g=i+"[ %c"+t.toUpperCase()+"%c ][ %c"+c+"%c ]","color:"+s+";font-weight:bold;","color:#404850:font-weight:normal;","color:"+s+";text-decoration:underline;","color:#404850:font-weight:normal;"].concat(n)),this.fireApply("all",this,i,t,c,l,n,g),!1!==this.fireApply(t,this,i,t,c,l,n,g)&&console.log.apply(this,n)}}});l.logger=new e;var i={log:function(){l.logger.log.apply(l.logger,arguments)},info:function(){l.logger.info.apply(l.logger,arguments)},debug:function(){l.logger.debug.apply(l.logger,arguments)},warn:function(){l.logger.warn.apply(l.logger,arguments)},trace:function(){l.logger.trace.apply(l.logger,arguments)},error:function(){l.logger.error.apply(l.logger,arguments)},ok:function(){l.logger.ok.apply(l.logger,arguments)},nodeConsoleColorText:a,prefix:function(){l.logger.prefix.apply(l.logger,arguments)}};l.extend(l,i)}(zn);