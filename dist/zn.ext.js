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
            nowDateString: function (sep){
                var date = new Date(),
                    _year = date.getFullYear(),
                    _month = date.getMonth() + 1,
                    _date = date.getDate();

                _month = _month < 10 ? '0' + _month : _month;
                _date = _date < 10 ? '0' + _date : _date;

                return [_year, _month, _date].join(sep || '');
            },
            nowTimeString: function (sep){
                var date = new Date(),
                    _h = date.getHours(),
                    _m = date.getMinutes(),
                    _s = date.getSeconds();

                _h = _h < 10 ? '0' + _h : _h;
                _m = _m < 10 ? '0' + _m : _m;
                _s = _s < 10 ? '0' + _s : _s;

                return [_h, _m, _s].join(sep || ':');
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
                    _value = __builtin__.path(data, _match[1].trim());
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

    var TYPES = ['INFO', 'DEBUG', 'WARN', 'ERROR', 'TRACE', 'ALL'];
    var COLORS_VALUE = ['#100000', '#2125a0', '#a82c2c', '#c045b7', '1cb131', '#100000'];
    var COLORS = [38, 34, 35, 31, 32, 36, 33];
    var LEVELS = {
        INFO: 0,
        DEBUG: 1,
        WARN: 2,
        ERROR: 3,
        TRACE: 4,
        ALL: 6
    };

    /**
     * Logger: Logger
     * @class Logger
     * @namespace zn
     **/
    var Logger = zn.Class({
        events: [
            'info',
            'debug',
            'warn',
            'error',
            'trace',
            'all'
        ],
        methods: {
            init: function (){
                this._config = {
                    only: null,
                    levels: ['info', 'debug', 'warn', 'error', 'trace', 'all']
                };
            },
            config: function (value){
                this._config = zn.overwrite(value, this._config);
            },
            info: function () {
                this.__log.call(this, LEVELS.INFO, arguments);
            },
            debug: function () {
                this.__log.call(this, LEVELS.DEBUG, arguments);
            },
            warn: function () {
                this.__log.call(this, LEVELS.WARN, arguments);
            },
            trace: function () {
                this.__log.call(this, LEVELS.TRACE, arguments);
            },
            error: function (obj) {
                this.__log.call(this, LEVELS.ERROR, arguments);
            },
            all: function (obj) {
                this.__log.call(this, LEVELS.ALL, arguments);
            },
            __getDateString: function (date) {
                return zn.date.asString(date||new Date());
            },
            __getPosition: function (){
                try {
                    throw new Error();
                } catch(e) {
                    if(zn.DEBUG && zn.CONSOLE_ERROR){
                        console.log(e.stack);
                    }

                    return e.stack.split('\n')[5].replace(/\(/g, '').replace(/\)/g, '').split('/').pop();
                }
            },
            __formatLog4Server: function (log, color) {
                var _tag = '', _head = '', _foot = '';
                if (color) {
                    _head = '\x1B[';
                    _foot = '\x1B[0m';
                    _tag = COLORS[5]+'m';
                    color = COLORS[log.type]+'m';
                }

                return [
                    log.time,
                    ' [',
                    _head,
                    color,
                    TYPES[log.type],
                    _foot,
                    '] [',
                    _head,
                    _tag,
                    log.pos,
                    _foot,
                    '] ',
                    log.message
                ].join('');
            },
            __formatLog4Client: function (log, color) {
                return [
                    '%c'+log.time,
                    ' [',
                    TYPES[log.type],
                    //'] [', //'] [',
                    //log.pos,
                    '] '
                ].join('');
            },
            __log: function (type, argv) {
                var _argv = Array.prototype.slice.call(argv),
                    _data = _argv.slice(0),
                    _type = TYPES[type].toLowerCase(),
                    _time = this.__getDateString(),
                    _pos = this.__getPosition();

                _data.unshift(_pos);
                _data.unshift(_type);
                _data.unshift(_time);
                if (typeof module !== 'undefined' && module.exports){
                    _argv.unshift(this.__formatLog4Server({
                        type: type,
                        time: _time,
                        pos: _pos
                    }, true));
                }else {
                    _argv.unshift('color:' + COLORS_VALUE[type]);
                    _argv.unshift(this.__formatLog4Client({
                        type: type,
                        time: _time,
                        pos: _pos
                    }, true));
                }

                if(this.__isOk(_type)){
                    var _result = this.fire(_type, _data, _argv);
                    if(_result !== false){
                        console.log.apply(this, _argv);
                    }
                }
            },
            __isOk: function (type){
                if(this._config.only){
                    if(this._config.only === type){
                        return true;
                    }
                }else {
                    var _include = (this._config.levels.indexOf(type) !== -1 );
                    if(_include){
                        return true;
                    }
                }

                return false;
            }
        }
    });

    zn.logger = new Logger();

    var __console = {
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

    var __slice = Array.prototype.slice;

    //__slice.call(arguments);

    var TASK_STATE = {
        PENDING: 0,
        CANCLE: 1,
        PAUSE: 2,
        FINISHED: 3
    };

    /**
     * TaskProcessor: TaskProcessor
     * @class TaskProcessor
     **/
    var TaskProcessor = zn.Class({
        events: ['init', 'finished'],
        properties: {
            status: {
                value: TASK_STATE.PENDING,
                get: function (){
                    return this._status;
                }
            }
        },
        methods: {
            init: function (inArgs) {

            },
            doTask: function (task, argv){
                if(task){
                    var _argv = argv||[];
                    _argv.unshift(this);
                    task.handler.apply(task.context, _argv);
                }
            },
            done: function (){
                this._status = TASK_STATE.FINISHED;
                this._data = __slice.call(arguments);
                this.fire('finished', this._data);
                this.off('finished');
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
            'exception',
            'every',
            'finally'
        ],
        properties: {
            count: {
                get: function (){
                    return this._tasks.length;
                }
            }
        },
        methods: {
            init: function (inArgs) {
                this._exceptions = [];
                this._finallys = [];
                this._everys = [];
                this._tasks = [];
                this._taskProcessor = [];
                this._lastTask = null;
                this._data = [];
                this._max = (inArgs||{}).max || 1;
            },
            destroy: function (){
                this._everys = [];
                this._tasks = [];
                this._taskProcessor = [];
                this.fire('finally', this._data, { method: 'apply' });
                this.super();
            },
            clear: function (){
                this._tasks = [];
            },
            pause: function (maxWaitTime){
                this._paused = true;
        		if(maxWaitTime > 0) {
        			this._pauseTimer = setTimeout(function() {
        				this.resume();
        			}.bind(this), maxWaitTime);
        		}
                this.fire('pause');
                return this;
            },
            resume: function (){
                if(this._pauseTimer){
                    clearTimeout(this._pauseTimer);
                }
                this._paused = false;
                this.fire('resume');
                this.doTask();

                return this;
            },
            exception: function (handler, context){
                return this.on('exception', handler, context || this), this;
            },
            catch: function (exception){
                return this.fire('exception', exception), this;
            },
            finally: function (handler, context){
                return this.on('finally', handler, context || this), this;
            },
            every: function (handler, context){
                return this.on('every', handler, context || this), this;
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
                var _tp = null, _len = this._taskProcessor.length;
                for (var i = 0; i < _len; i++) {
                    _tp = this._taskProcessor[i];
                    if(_tp.status == TASK_STATE.FINISHED){
                        return _tp;
                    }
                }
                if(!_tp&&this._max > _len){
                    var _processor = new TaskProcessor();
                    _processor.queue = this;
                    _processor.on('finished', this.__onProcessorFinished.bind(this), this);
                    return _processor;
                }
            },
            start: function (){
                this._data = [];
                return this.doTask();
            },
            doTask: function (data){
                var _task = this._tasks.shift();
                if(_task){
                    var _taskProcessor = this.getTaskProcessor();
                    if(_taskProcessor){
                        _task.previousResult = data;
                        _taskProcessor.doTask(_task, data);
                    }
                }else {
                    this.destroy();
                }

                return this;
            },
            __onProcessorFinished: function (sender, data){
                this._data.push(data);
                this.fire('every', data, { method: 'apply' });
                this.doTask(data);
            }
        }
    });

    zn.queue = function(argv){
        return new Queue(argv);
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
