/**
 * Created by yangyxu on 2014/9/16.
 * Promise: Promise
 */
(function (zn){

    var __slice = Array.prototype.slice;

    //__slice.call(arguments);

    /**
     * Promise: Promise
     * @class Async
     * @namespace zn.util
     **/

    var PROMISE_STATE = {
        PENDING: 0,
        FULFILLED: 1,
        REJECTED: 2
    };

    var Defer = zn.Class({
        events: ['complete'],
        properties: {
            promise: null
        },
        methods: {
            init: function (resolve, reject) {
                this._promise = new Promise();
                if(resolve){
                    this.resolve(resolve);
                }
                if(reject){
                    this.reject(reject);
                }
            },
            resolve: function () {
                var data = __slice.call(arguments);
                try {
                    var _promise = this.get('promise'), _self = this;
                    if (_promise.get('readyState') != PROMISE_STATE.PENDING){
                        return;
                    }
                    _promise.set('readyState', PROMISE_STATE.FULFILLED);
                    _promise.set('data', data);
                    zn.each(_promise.get('resolves'), function (handler){
                        handler.apply(_self, data);
                    });
                } catch(ex) {
                    Async.catch(ex, this);
                }
                this.fire('complete', data);
            },
            reject: function () {
                var reason = __slice.call(arguments);
                try {
                    var _promise = this.get('promise');
                    if (_promise.get('readyState') != PROMISE_STATE.PENDING){
                        return;
                    }
                    _promise.set('readyState', PROMISE_STATE.REJECTED);
                    _promise.set('reason', reason);
                    var _handler = _promise.get('rejects')[0];
                    if (_handler){
                        _handler.apply(this, reason);
                    }
                } catch(ex) {
                    Async.catch(ex, this);
                }
                this.fire('complete', reason);
            }
        }
    });

    var Promise = zn.Class({
        statics: {
            isPromise: function (obj) {
                return obj !== null && obj !== undefined && typeof obj.then === 'function';
            },
            defer: null
        },
        properties: {
            resolves: null,
            rejects: null,
            data: null,
            reason: null,
            readyState: null
        },
        methods: {
            init: function (inArgs) {
                this.set('resolves', []);
                this.set('rejects', []);
                this.set('exceptions', []);
                this.set('readyState',PROMISE_STATE.PENDING);
            },
            then: function (onFulfilled, onRejected) {
                var deferred = new Defer();
                function fulfill(){
                    var _data = __slice.call(arguments);
                    var _return = onFulfilled ? onFulfilled.apply(this, _data) : _data;

                    if (Promise.isPromise(_return)){
                        _return.then(function (){
                            deferred.resolve.apply(deferred, __slice.call(arguments));
                        });
                    } else {
                        deferred.resolve.apply(deferred, _return);
                    }

                    return _return;
                }

                if(this.get('readyState')===PROMISE_STATE.PENDING){
                    this.get('resolves').push(fulfill);
                    if(onRejected){
                        this.get('rejects').push(onRejected);
                    }else {
                        this.get('rejects').push(function () {
                            deferred.reject.apply(deferred, __slice.call(arguments));
                        });
                    }
                }else if (this.get('readyState')===PROMISE_STATE.FULFILLED) {
                    var _self = this;
                    setTimeout(function (){
                        //fulfill.call();
                        fulfill.apply(_self, _self.get('data'));
                    });
                }

                return deferred.promise;

            },
            catch: function (onException){
                return Async.exception(onException);
            },
            finally: function (onFinally){
                return Async.finally(onFinally);
            },
            otherwise: function (onRejected) {
                return this.then(undefined, onRejected);
            }
        }
    });

    var Async = zn.async = zn.Class({
        static: true,
        methods: {
            init: function (inArgs) {
                this._exceptions = [];
                this._finallys = [];
                this._count = 0;
                this._currIndex = 0;
                this._dataArray = [];
            },
            exception: function (onException){
                return this._exceptions.push(onException), this;
            },
            catch: function (ex, context){
                zn.each(this._exceptions, function (exception){
                    exception.call(context, ex);
                });

                return this;
            },
            finally: function (onFinally){
                return this._finallys.push(onFinally), this;
            },
            defer: function (resolve, reject) {
                var _self = this,
                    _defer = new Defer(resolve, reject);
                _defer.on('complete', function (sender, data){
                    _self._currIndex++;
                    _self._dataArray.push(data);
                    if(_self._currIndex==_self._count){
                        zn.each(_self._finallys, function (_finally){
                            try {
                                _finally(_self._dataArray);
                            } catch(e) {
                                zn.error(e.message);
                            }
                        });
                        _self._finallys = [];
                    }
                });
                _self._count++;

                return _defer;
            },
            all: function (promises) {
                var _deferred = Async.defer();
                var _n = 0, _result = [];
                zn.each(promises, function (promise){
                    promise.then(function (ret){
                        _result.push(ret);
                        _n++;
                        if(_n>=promises.length){
                            _deferred.resolve(_result);
                        }
                    });
                });
                return _deferred.promise;
            },
            any: function (promises) {
                var _deferred = Async.defer();
                zn.each(promises, function (promise){
                    promise.then(function (ret){
                        _deferred.resolve(ret);
                    });
                });
                return _deferred.promise;
            }
        }
    });

})(zn);

/**
 * Created by yangyxu on 5/20/17.
 */
(function (zn){

    var CHAR_CODE = {
        lower: [97, 123],
        upper: [65, 91]
    };

    zn.char = zn.Class({
        static: true,
        methods: {
            getRandomChar: function (){
                return this.getUppercaseLetters()[Math.floor(Math.random()*26)];
            },
            lowercase: function (value){
                return zn.is(value, 'string') ? value.replace(/[A-Z]/g, function(char) {
                    return String.fromCharCode(char.charCodeAt(0) | 32);
                }) : value;
            },
            uppercase: function (value){
                return zn.is(value, 'string') ? value.replace(/[a-z]/g, function(char) {
                    return String.fromCharCode(char.charCodeAt(0) & ~32);
                }) : value;
            },
            toUnicode: function (value){
                var _codes = [];
                for(var i = 0, _len = value.length; i < _len; i++){
                    _codes.push(value.charCodeAt(i));
                }

                return _codes;
            },
            toChar: function (start, end){
                var _chars = [];
                for(var i = start; i < end; i++){
                    _chars.push(String.fromCharCode(i));
                }

                return _chars;
            },
            getLowercaseLetters: function (){
                var _index = CHAR_CODE.lower;
                return this.toChar(_index[0], _index[1]);
            },
            getUppercaseLetters: function (){
                var _index = CHAR_CODE.upper;
                return this.toChar(_index[0], _index[1]);
            },
            getStringFromChar: function (char, length){
                var _char = char || 'A',
                    _len = length || 26,
                    _chars = [];
                for(var i = 0; i < _len; i++){
                    _chars.push(String.fromCharCode(_char.charCodeAt(0) + i));
                }

                return _chars.join('');
            }
        }
    });

})(zn);

/**
 * Created by yangyxu on 5/20/17.
 */
(function (zn){

    zn.data = zn.Class({
        static: true,
        methods: {
            
        }
    });

})(zn);

/**
 * Created by yangyxu on 8/20/14.
 */
(function (zn){

    var DATE_FORMAT = {
        ISO8601: "yyyy-MM-dd hh:mm:ss.SSS",
        ISO8601_WITH_TZ_OFFSET: "yyyy-MM-ddThh:mm:ssO",
        DATETIME: "dd MM yyyy hh:mm:ss.SSS",
        ABSOLUTETIME: "hh:mm:ss.SSS"
    };

    /**
     * Date: Date
     * @class Date
     * @namespace zn.data
     **/
    zn.date = zn.Class({
        static: true,
        methods: {
            format: function (){
                
            },
            timestampToString: function (value){
                var _date = new Date(value),
                    _string = _date.toISOString();

                return _string.split('T')[1].split('Z')[0];
            },
            nowDateString: function (sep){
                var date = new Date(),
                    _year = date.getFullYear(),
                    _month = date.getMonth() + 1,
                    _date = date.getDate();

                _month = _month < 10 ? '0' + _month : _month;
                _date = _date < 10 ? '0' + _date : _date;

                return [_year, _month, _date].join(sep || '');
            },
            nowTimeString: function (sep, value){
                var date = new Date(value),
                    _h = date.getHours(),
                    _m = date.getMinutes(),
                    _s = date.getSeconds(),
                    _ms = date.getMilliseconds();

                _h = _h < 10 ? '0' + _h : _h;
                _m = _m < 10 ? '0' + _m : _m;
                _s = _s < 10 ? '0' + _s : _s;
                _ms = _ms < 10 ? '0' + _ms : _ms;

                return [_h, _m, _s, _ms].join(sep || ':');
            },
            getSecond: function (value) {
                var _value = value.substring(1,value.length)*1;
                switch (value.substring(0,1)) {
                    case 's':
                        return _value * 1000;
                    case 'h':
                        return _value * 60 * 60 * 1000;
                    case 'd':
                        return _value * 24 * 60 * 60 * 1000;
                }
            },
            asString: function (date){
                var format = DATE_FORMAT.ISO8601;
                if (typeof(date) === "string") {
                    format = arguments[0];
                    date = arguments[1];
                }
                var vDay = this.__addZero(date.getDate());
                var vMonth = this.__addZero(date.getMonth()+1);
                var vYearLong = this.__addZero(date.getFullYear());
                var vYearShort = this.__addZero(date.getFullYear().toString().substring(2,4));
                var vYear = (format.indexOf("yyyy") > -1 ? vYearLong : vYearShort);
                var vHour  = this.__addZero(date.getHours());
                var vMinute = this.__addZero(date.getMinutes());
                var vSecond = this.__addZero(date.getSeconds());
                var vMillisecond = this.__padWithZeros(date.getMilliseconds(), 3);
                var vTimeZone = this.__offset(date);
                var formatted = format
                    .replace(/dd/g, vDay)
                    .replace(/MM/g, vMonth)
                    .replace(/y{1,4}/g, vYear)
                    .replace(/hh/g, vHour)
                    .replace(/mm/g, vMinute)
                    .replace(/ss/g, vSecond)
                    .replace(/SSS/g, vMillisecond)
                    .replace(/O/g, vTimeZone);
                return formatted;
            },
            __padWithZeros: function (vNumber, width){
                var numAsString = vNumber + "";
                while (numAsString.length < width) {
                    numAsString = "0" + numAsString;
                }
                return numAsString;
            },
            __addZero: function(vNumber){
                return this.__padWithZeros(vNumber, 2);
            },
            __offset: function (date){
                // Difference to Greenwich time (GMT) in hours
                var os = Math.abs(date.getTimezoneOffset());
                var h = String(Math.floor(os/60));
                var m = String(os%60);
                if (h.length == 1) {
                    h = "0" + h;
                }
                if (m.length == 1) {
                    m = "0" + m;
                }
                return date.getTimezoneOffset() < 0 ? "+"+h+m : "-"+h+m;
            }
        }
    });

})(zn);

(function (zn) {

    /**
     * JSON: JSON
     * @class JSON
     * @namespace zn
     */
    zn.json = zn.Class({
        static: true,
        methods: {
            serialize: function (obj){
                return Object.keys(obj).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
                }).join('&');
            },
            format: function (data, template, options){
                if(!template){
                    return template;
                }
                var _match = null,
                    _value = null,
                    _template = escape(template),
                    _options = zn.extend({ prefix:'${', suffix: '}' }, options),
                    _regexp = escape(_options.prefix) + '([^%>]+)?' + escape(_options.suffix),
                    _reg = new RegExp(_regexp, 'i');
            
                while(_match = _reg.exec(_template)) {
                    _value = zn.path(data, _match[1].trim());
                    switch(zn.type(_value)){
                        case 'array':
                            _value = _value.join('');
                            break;
                        case 'object':
                            _value = JSON.stringify(_value);
                            break;
                        case 'function':
                            _value = _value.call(null, data, template, options);
                            break;
                    }
    
                    _template = _template.replace(_reg, _value);
                }
            
                return unescape(_template);
            }
        }
    });

})(zn);

/**
 * Created by yangyxu on 8/20/14.
 */
(function (zn){

    var __slice =  Array.prototype.slice;

    var COLORS = {
        log: {
            color: '#3b3b3b',
            number: 37,
            level: 0
        },
        info: {
            color: '#3399ea',
            number: 36,
            level: 1
        },
        debug: {
            color: '#0b109a',
            number: 35,
            level: 2
        },
        warn: {
            color: '#ff9900',
            number: 33,
            level: 3
        },
        error: {
            color: '#e20611',
            number: 31,
            level: 4
        },
        ok: {
            color: '#2de60b',
            number: 32,
            level: 5
        },
        trace: {
            color: '#0c5cec',
            number: 34,
            level: 6
        },
        white: {
            color: '#fff',
            number: 37,
            level: 7
        },
        all: {
            color: '#000',
            number: 36,
            level: 10
        }
    };

    var NODE_CONSOLE_COLORS = {
        'bright'    : '\x1B[1m', // 亮色
        'grey'      : '\x1B[2m', // 灰色
        'italic'    : '\x1B[3m', // 斜体
        'underline' : '\x1B[4m', // 下划线
        'reverse'   : '\x1B[7m', // 反向
        'hidden'    : '\x1B[8m', // 隐藏
        'black'     : '\x1B[30m', // 黑色
        'red'       : '\x1B[31m', // 红色
        'green'     : '\x1B[32m', // 绿色
        'yellow'    : '\x1B[33m', // 黄色
        'blue'      : '\x1B[34m', // 蓝色
        'magenta'   : '\x1B[35m', // 品红
        'cyan'      : '\x1B[36m', // 青色
        'white'     : '\x1B[37m', // 白色
        'blackBG'   : '\x1B[40m', // 背景色为黑色
        'redBG'     : '\x1B[41m', // 背景色为红色
        'greenBG'   : '\x1B[42m', // 背景色为绿色
        'yellowBG'  : '\x1B[43m', // 背景色为黄色
        'blueBG'    : '\x1B[44m', // 背景色为蓝色
        'magentaBG' : '\x1B[45m', // 背景色为品红
        'cyanBG'    : '\x1B[46m', // 背景色为青色
        'whiteBG'   : '\x1B[47m' // 背景色为白色
    };

    /*还有些比较特殊的标记
        \033[0m 关闭所有属性
        \033[1m 设置高亮度
        \033[4m 下划线
        \033[5m 闪烁
        \033[7m 反显
        \033[8m 消隐
        \033[nA 光标上移n行
        \033[nB 光标下移n行
        \033[nC 光标右移n列
        \033[nD 光标左移n列
        \033[y;xH 设置光标位置（y列x行）
        \033[2J 清屏
        \033[K 清除从光标到行尾的内容
     */

    var NODE_TAGS = {
        Close: '\033[0m',
        Highlight: '\033[1m',
        Underline: '\033[4m',
        Blink: '\033[5m',
        Invert: '\033[7m',
        Blank: '\033[8m',
        MouseUpTo: '\033[nA',
        MouseDownTo: '\033[nB',
        MouseRightTo: '\033[nC',
        MouseLeftTo: '\033[nD',
        MouseLeftTo: '\033[nD',
        MousePosition: '\033[y;xH',
        ClearScreen: '\033[2J',
        ClearFrom: '\033[K',
        Reset: "\x1b[0m",
        Bright: "\x1b[1m",
        Dim: "\x1b[2m",
        Underscore: "\x1b[4m",
        Blink: "\x1b[5m",
        Reverse: "\x1b[7m",
        Hidden: "\x1b[8m",
        FgBlack: "\x1b[30m",
        FgRed: "\x1b[31m",
        FgGreen: "\x1b[32m",
        FgYellow: "\x1b[33m",
        FgBlue: "\x1b[34m",
        FgMagenta: "\x1b[35m",
        FgCyan: "\x1b[36m",
        FgWhite: "\x1b[37m",
        BgBlack: "\x1b[40m",
        BgRed: "\x1b[41m",
        BgGreen: "\x1b[42m",
        BgYellow: "\x1b[43m",
        BgBlue: "\x1b[44m",
        BgMagenta: "\x1b[45m",
        BgCyan: "\x1b[46m",
        BgWhite: "\x1b[47m"
    };

    var __NodeConsoleColor__ = function (text, color){
        if(typeof color == 'number'){
            color = '\x1B[' + color + 'm';
        }else if(typeof color == 'string'){
            color = NODE_CONSOLE_COLORS[color] || NODE_TAGS[color];
        }
        if(color){
            return color + text + "\x1B[0m";
        }

        return text;
    }

    var __WebConsoleColor__ = function (text, style){
        var _style = '',
            _styleType = typeof style;
        if(_styleType == 'string'){
            _style = "color:" + _style;
        }else if(_styleType == 'object'){
            for(var key in style){
                _style += key + ":" + style[key] + ";";
            }
        }
        if(_style){
            if(text.indexOf('%c')!=-1){
                return [text, _style];
            }else{
                return ['%c ' + text, _style];
            }
        }

        return [text];
    }

    /**
     * Logger: Logger
     * @class Logger
     * @namespace zn
     **/
    var Logger = zn.Class({
        events: [
            'log',
            'info',
            'debug',
            'warn',
            'error',
            'ok',
            'trace',
            'all',
            'position'
        ],
        methods: {
            init: function (events){
                this._config = {
                    only: null,
                    levels: COLORS
                };
                this.events(events);
            },
            config: function (value){
                return this._config = zn.overwrite(value, this._config), this;
            },
            events: function (events){
                if(events && typeof events == 'object'){
                    for(var key in events){
                        this.on(key, events[key], this);
                    }
                }
                return this;
            },
            log: function () {
                this.__consoleLog.call(this, 'log', arguments);
            },
            info: function () {
                this.__consoleLog.call(this, 'info', arguments);
            },
            debug: function () {
                this.__consoleLog.call(this, 'debug', arguments);
            },
            warn: function () {
                this.__consoleLog.call(this, 'warn', arguments);
            },
            error: function (obj) {
                this.__consoleLog.call(this, 'error', arguments);
            },
            ok: function (obj) {
                this.__consoleLog.call(this, 'ok', arguments);
            },
            trace: function () {
                this.__consoleLog.call(this, 'trace', arguments);
            },
            all: function (obj) {
                this.__consoleLog.call(this, 'all', arguments);
            },
            __getDateString: function (date) {
                return zn.date.asString(date||new Date());
            },
            __getPosition: function (){
                try {
                    throw new Error('Get Logger Position');
                } catch(err) {
                    if(err.DEBUG && zn.CONSOLE_ERROR){
                        console.error(err);
                    }
                    var _position = this.fire('position', err);
                    if(_position == null){
                        if(err.stack.split('\n')[5]){
                            _position = err.stack.split('\n')[5].replace(/\(/g, '').replace(/\)/g, '').split('/').pop();
                        }
                    }

                    return _position || '';
                }
            },
            prefix: function (type){
                var _type = type.toLowerCase(),
                    _time = this.__getDateString(),
                    _level = this._config.levels[_type],
                    _pos = this.__getPosition(),
                    _prefix = null,
                    _color = null;
                
                if(!_level || (this._config.only && this._config.only != _type)){
                    return false;
                }
                if (typeof module !== 'undefined' && module.exports){
                    _color = _level.number;
                    _prefix = [_time, '[', __NodeConsoleColor__(__NodeConsoleColor__(_type.toUpperCase(), _color), 'Highlight'), '] [', __NodeConsoleColor__(__NodeConsoleColor__(_pos, _color), 'Underline'),']'];
                    return _prefix.join(' ');
                }else {
                    _color = _level.color;
                    _prefix = _time + '[%c ' + _type.toUpperCase() + ' %c][%c ' + _pos + ']';
                    return [_prefix, "color:"+_color+";font-weight:bold;", "color:#404850:font-weight:normal;", "color:"+_color+";text-decoration:underline;"];
                }
            },
            __consoleLog: function (type, argv) {
                var _argv = __slice.call(argv),
                    _originArgv = __slice.call(argv),
                    _type = type.toLowerCase(),
                    _time = this.__getDateString(),
                    _level = this._config.levels[_type],
                    _pos = this.__getPosition(),
                    _prefix = null,
                    _color = null;
                
                if(!_level || (this._config.only && this._config.only != _type)){
                    return false;
                }
                if (typeof module !== 'undefined' && module.exports){
                    _color = _level.number;
                    _prefix = [_time, '[', __NodeConsoleColor__(__NodeConsoleColor__(_type.toUpperCase(), _color), 'Highlight'), '] [', __NodeConsoleColor__(__NodeConsoleColor__(_pos, _color), 'Underline'),']'];
                    _argv.unshift(_prefix.join(' '));
                }else {
                    _color = _level.color;
                    _prefix = _time + '[ %c' + _type.toUpperCase() + '%c ][ %c' + _pos + '%c ]';
                    _argv = [_prefix, "color:"+_color+";font-weight:bold;", "color:#404850:font-weight:normal;", "color:"+_color+";text-decoration:underline;", "color:#404850:font-weight:normal;"].concat(_argv);
                }
                this.fireApply('all', this, _time, _type, _pos, _originArgv, _argv, _prefix);
                var _result = this.fireApply(_type, this, _time, _type, _pos, _originArgv, _argv, _prefix);
                if(_result !== false){
                    console.log.apply(this, _argv);
                }
            }
        }
    });

    zn.logger = new Logger();

    var __console = {
        log: function (){
            zn.logger.log.apply(zn.logger, arguments);
        },
        info: function (){
            zn.logger.info.apply(zn.logger, arguments);
        },
        debug: function (){
            zn.logger.debug.apply(zn.logger, arguments);
        },
        warn: function (){
            zn.logger.warn.apply(zn.logger, arguments);
        },
        trace: function (){
            zn.logger.trace.apply(zn.logger, arguments);
        },
        error: function (){
            zn.logger.error.apply(zn.logger, arguments);
        },
        ok: function (){
            zn.logger.ok.apply(zn.logger, arguments);
        },
        nodeConsoleColorText: function (color, text){
            return __NodeConsoleColor__(color, text);
        },
        prefix: function (){
            zn.logger.prefix.apply(zn.logger, arguments);
        }
    };

    zn.extend(zn, __console);

})(zn);

(function (zn) {

    /**
     * querystring: querystring
     * @class querystring
     * @namespace zn.util
     */
    zn.querystring = zn.Class({
        static: true,
        properties: {
            config: {
                get: function (){
                    return this._config;
                }
            }
        },
        methods: {
            init: function (){
                this._config = {
                    separator: '&',
                    equal: '=',
                    minIndex: 0,
                    maxIndex: 1000
                };
            },
            config: function (value){
                return this.overwrite(this._config, value), this;
            },
            parse: function (value, options){
                if(typeof value == 'object'){
                    return value;
                }
                if(value === '' || value === false || value == null){
                    return {};
                }

                var _config = zn.extend({}, this._config, options),
                    _object = {},
                    _equal = _config.equal,
                    _qsAry = value.split(_config.separator),
                    _qsLen = _qsAry.length;

                if(_config.maxIndex > 0 && _qsLen > _config.maxIndex){
                    _qsLen = _config.maxIndex;
                }

                for(var i = _config.minIndex; i < _qsLen; i++){
                    var _item = _qsAry[i].replace(/\+/g, '%20'),
                        _firstEqualIndex = _item.indexOf(_equal),
                        _key = null,
                        _value = null;

                    if(_firstEqualIndex >= 0){
                        _key = _item.substr(0, _firstEqualIndex);
                        _value = _item.substr(_firstEqualIndex + 1);
                    } else {
                        _key = _item;
                        _value = '';
                    }
                    if(_key === ''){
                        continue;
                    }

                    _key = decodeURIComponent(_key);
                    _value = decodeURIComponent(_value);
                    if(!(_object).hasOwnProperty(_key)){
                        _object[_key] = _value;
                    }else if(zn.is(_object[_key], 'array')){
                        _object[_key].push(_value);
                    }else {
                        _object[_key] = [_object[_key], _value];
                    }
                }

                return _object;
            },
            stringify: function (object, options){
                if(typeof object == 'string'){
                    return object;
                }
                var _config = zn.extend({}, this._config, options),
                    _strings = [],
                    _self = this,
                    _equal = _config.equal,
                    _object = {};
                if(zn.isZNObject(object)){
                    _object = object.gets();
                }else {
                    _object = object;
                }
                if(zn.is(_object, 'object')){
                    for(var key in object){
                        var _value = object[key],
                            _key = encodeURIComponent(this.__stringifyValue(key));

                        _value = encodeURIComponent(this.__stringifyValue(_value));
                        _strings.push(_key + _equal + _value);
                    }
                }else {
                    throw new Error('Agrument Error.');
                }

                return _strings.join(_config.separator);
            },
            __stringifyValue: function (value){
                switch (zn.type(value)) {
                    case 'string':
                        return value;
                    case 'boolean':
                        return value ? 'true' : 'false';
                    case 'object':
                    case 'array':
                        return JSON.stringify(value);
                    case 'number':
                        return isFinite(value) ? value : '0';
                    case 'function':
                        return value();
                    default:
                        return '';
                }
            }
        }
    });

})(zn);

/**
 * Created by yangyxu on 2016/4/5.
 * Queue: Queue
 */
(function (zn){

    var __slice = Array.prototype.slice,
        __toString = Object.prototype.toString;
    var TASK_STATE = {
        PENDING: 0,
        DOING: 1,
        FINISHED: 3
    };

    /**
     * TaskProcessor: TaskProcessor
     * @class TaskProcessor
     **/
    var TaskProcessor = zn.Class({
        events: ['stop', 'error', 'finished'],
        properties: {
            status: null
        },
        methods: {
            init: function (events) {
                this._status = TASK_STATE.PENDING;
                if(events && typeof events == 'object'){
                    for(var key in events){
                        this.on(key, events[key]);
                    }
                }
            },
            doTask: function (task, argv){
                var _argv = argv || [];
                if(__toString.call(_argv) != '[object Array]') {
                    _argv = [ _argv ];
                }
                task.done = this.done.bind(this);
                task.processor = this;
                _argv.unshift(task);
                try {
                    this._status = TASK_STATE.DOING;
                    var _return = task.handler.apply(task.context, _argv);
                    if(_return === false){
                        this._status = TASK_STATE.FINISHED;
                        this.fire('stop', _argv);
                    }
                    if(_return != null) {
                        task.done(_return);
                    }
                } catch (err) {
                    this._status = TASK_STATE.FINISHED;
                    this.fire('error', [err, task]);
                }
            },
            done: function (){
                this._status = TASK_STATE.FINISHED;
                this.fire('finished', __slice.call(arguments));
            }
        }
    });

    /**
     * Queue: Queue
     * @class Queue
     **/
    var Queue = zn.Class({
        events: [
            'clear',
            'insert',
            'pause',
            'resume',
            'error',
            'stop',
            'every',
            'destroy',
            'finally'
        ],
        methods: {
            init: function (inArgs, events) {
                this._tasks = [];
                this._taskProcessors = [];
                this._lastTask = null;
                this._data = [];
                this._max = (inArgs||{}).max || 1;
                if(events && typeof events == 'object'){
                    for(var key in events){
                        this.on(key, events[key], this);
                    }
                }
            },
            destroy: function (){
                this._tasks = null;
                delete this._tasks;
                this._taskProcessors = null;
                delete this._taskProcessors;
                this._lastTask = null;
                delete this._lastTask;
                this._data = null;
                delete this._data;
                this._max = null;
                delete this._max;
                this.fire('destroy', this);
                this.dispose();
            },
            size: function (){
                return this._tasks.length;
            },
            clear: function (){
                this._tasks = [];
                this._data = [];
                this._lastTask = null;
                return this.fire('clear'), this;
            },
            pause: function (maxWaitTime){
                this._paused = true;
        		if(maxWaitTime > 0) {
        			this._pauseTimer = setTimeout(this.resume, maxWaitTime);
                }
                
                return this.fire('pause', maxWaitTime), this;
            },
            resume: function (){
                if(this._pauseTimer){
                    clearTimeout(this._pauseTimer);
                }
                this._paused = false;
                this.doTask();

                return this.fire('resume', this), this;
            },
            onError: function (handler, context){
                return this.on('error', handler, context || this), this;
            },
            onStop: function (handler, context){
                return this.on('stop', handler, context || this), this;
            },
            onEvery: function (handler, context){
                return this.on('every', handler, context || this), this;
            },
            onFinally: function (handler, context){
                return this.on('finally', handler, context || this), this;
            },
            unshift: function (handler, context){
                return this.insert(handler, context, 0), this;
            },
            push: function (handler, context){
                return this.insert(handler, context, -1), this;
            },
            inserts: function (handlers, context, index){
                var _tasks = handlers||[],
                    _index = index || 0,
                    _first = this._tasks[0],
                    _last = null,
                    _task = null;
                _tasks = _tasks.map(function (handler){
                    _task = {
                        handler: handler,
                        context: context || this
                    };

                    if(_last){
                        _task.previous = _last;
                        _last.next = _task;
                    }
                    _last = _task;

                    return _task;
                }.bind(this));

                if(_first){
                    _last.next = _first;
                    _first.previous = _last;
                }

                _tasks.unshift(0);
                _tasks.unshift(_index);

                return this._tasks.splice.apply(this._tasks, _tasks), this;
            },
            insert: function (handler, context, index){
                var _task = {
                    handler: handler,
                    context: context || this
                }, _index = index || -1;

                switch (_index) {
                    case -1:
                        if(this._lastTask){
                            _task.previous = _task;
                            this._lastTask.next = _task;
                        }

                        this._lastTask = _task;
                        this._tasks.push(_task);
                        break;
                    case 0:
                        var _first = this._tasks[0];

                        if(_first){
                            _task.next = _first;
                            _first.previous = _task;
                        }

                        this._tasks.unshift(_task);
                        break;
                    default :
                        this._tasks.splice(_index, 0, _task);
                        break;
                }

                return this.fire('insert', _task), this;
            },
            getTaskProcessor: function (){
                var _tp = null, 
                    _len = this._taskProcessors.length;

                if(!_len){
                    return this.createTaskProcessor();
                }
                for (var i = 0; i < _len; i++) {
                    _tp = this._taskProcessors[i];
                    if(_tp.status == TASK_STATE.FINISHED || _tp.status == TASK_STATE.PENDING){
                        return _tp;
                    }
                }
                if(this._max > _len){
                    return this.createTaskProcessor();
                }
            },
            createTaskProcessor: function (){
                var _processor = new TaskProcessor({
                    finished: this.__onProcessorFinished.bind(this),
                    stop: this.__onProcessorStop.bind(this),
                    error: this.__onProcessorError.bind(this)
                });
                return this._taskProcessors.push(_processor), _processor;
            },
            start: function (){
                return this._data = [], this.doTask();
            },
            doTask: function (data){
                if(!this._tasks) return this;
                var _task = this._tasks.shift();
                if(_task){
                    if(this._paused) return this;
                    var _taskProcessor = this.getTaskProcessor();
                    if(_taskProcessor){
                        if(data != null) {
                            _task.previousResult = data;
                        }
                        _task.queue = this;
                        _task.error = function (err, task){
                            this.error(err, task || _task);
                        }.bind(this);
                        _task.stop = this.stop.bind(this);
                        _taskProcessor.doTask(_task, data);
                    }
                }else {
                    this.finally.apply(this, data);
                }

                return this;
            },
            stop: function (){
                this.clear();
                var _data = __slice.call(arguments);
                var _return = this.fire('stop', _data, { ownerFirst: true, method: 'apply' });
                if(_return !== false){
                    this.finally.apply(this, _data)
                }

                return this;
            },
            error: function (err, task){
                var _return = this.fire('error', [ err, task ], { ownerFirst: true, method: 'apply' });
                if(_return === true && task){
                    return task.done.apply(task.processor, task.previousResult), this;
                }
                if(_return !== false){
                    this.finally(err, task);
                }

                return this;
            },
            finally: function (){
                this.fire('finally', __slice.call(arguments), { ownerFirst: true, method: 'apply' });
                return this.destroy(), this;
            },
            __onProcessorFinished: function (sender, data){
                if(this._data){
                    this._data.push(data);
                }
                var _result = this.fire('every', data || [], { ownerFirst: true, method: 'apply' });
                if(_result !== false){
                    this.doTask(data);
                }
            },
            __onProcessorStop: function (sender, data){
                this.stop.apply(this, data);
            },
            __onProcessorError: function (sender, data){
                return this.error.apply(this, data);
            }
        }
    });

    zn.queue = function(argv, events){
        return new Queue(argv, events);
    };

})(zn);

/**
 * Created by yangyxu on 5/20/17.
 */
(function (zn){

    var CHAR_CODE = {
        lower: [97, 123],
        upper: [65, 91]
    };

    zn.string = zn.Class({
        static: true,
        methods: {
            decode: function (value){
                if(value && value.length){
                    value = value.replace(/&amp;/g, "&");
                    value = value.replace(/&lt;/g, "<");
                    value = value.replace(/&gt;/g, ">");
                    value = value.replace(/&nbsp;/g, " ");
                    value = value.replace(/&#39;/g, "\'");
                    value = value.replace(/&quot;/g, "\"");
                    value = value.replace(/<br>/g, "\n");
                }

                return value;
            },
            encode: function (value){
                if(value&&value.length){
                    value = value.replace(/&/g, "&amp;");
                    value = value.replace(/</g, "&lt;");
                    value = value.replace(/>/g, "&gt;");
                    value = value.replace(/ /g, "&nbsp;");
                    value = value.replace(/\'/g, "&#39;");
                    value = value.replace(/\"/g, "&quot;");
                    //value = value.replace(/\n/g, "<br>");

                }

                return value;
            }
        }
    });

})(zn);

/**
 * Created by yangyxu on 5/20/17.
 */
(function (zn){

    zn.util = zn.Class({
        static: true,
        methods: {
            formatDate: function (x, y){
                /*
                var z = {
                    y: x.getFullYear(),
                    M: x.getMonth() + 1,
                    d: x.getDate(),
                    h: x.getHours(),
                    m: x.getMinutes(),
                    s: x.getSeconds()
                };

                return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
                    return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2));
                });*/
            },
            wordCount: function (value){
                var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/;
                var m = data.match(pattern);
                var count = 0;
                if( m === null ) return count;
                for (var i = 0; i < m.length; i++) {
                    if (m[i].charCodeAt(0) >= 0x4E00) {
                        count += m[i].length;
                    } else {
                        count += 1;
                    }
                }

                return count;
            },
            rate: function (rate){
                return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
            },
            valueExchange: function (a, b){
                a ^= b;
                b ^= a;
                a ^= b;
                return [a, b];
            },
            htmlspecialchars: function (value){
                return value.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, '&quot;');
            },
            getColorValue: function () {
                return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
            },
            humpToSeparator: function (value, separator){
                return value.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join(separator || '_').toLowerCase();
            },
            getTime: function (){
                return (new Date()).getTime();
            },
            generateCode: function (){
                return this.getTime().toString().substring(1).toString() + Math.floor((Math.random()*9+1)*100);
            },
            getRandomNumber: function (){
                return Math.floor(Math.random()*10);
            },
            getRandomNumbers: function (){
                return Math.floor((Math.random()*9+1)*1000);
            },
            getRandomChars: function (){
                return (Math.random() / +new Date()).toString(36).replace(/\d/g, '').slice(1);
            },
            randomNumbers: function (size){
                // 方法一
                // ('000000' + Math.floor(Math.random() *  999999)).slice(-6);
                // 方法二
                // Math.random().toString().slice(-6);
                // 方法三
                // Math.random().toFixed(6).slice(-6);
                // 方法四
                // '' + Math.floor(Math.random() * 999999);
                return Math.random().toString().slice(-(size||6));
            }
        }
    });

})(zn);
