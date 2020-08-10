/**
 * Global Var
 */

var __isServer = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
var zn = {
    VERSION: '1.0.8',
    DEBUG: true,
    ZN_PATH: '',
    PATH: '',
    GLOBAL: (function () {
        if(__isServer){
            return global;
        }else {
            return window;
        }
    }).call(null),
    isServer: __isServer
};

zn.GLOBAL.zn = zn;

if (__isServer) {
    zn.ZN_PATH = __dirname;
    zn.PATH = process.cwd();
    //export default zn;
    module.exports = zn;
}else{
    var _zn_url = '';
    try{
        __a__ = __b__;
    }
    catch(e){
        if(e.fileName){   //firefox
            _zn_url = e.fileName;
        }
        else if(e.sourceURL){  //safair
            _zn_url = e.sourceURL;
        }
        else if(e.stacktrace){  //opera
            console.error(e.stacktrace);
        }
        else if(e.stack){  //chrome
            _zn_url = e.stack.split('\n')[1];
            _zn_url = _zn_url.replace(/\s/g,"");
            _zn_url = _zn_url.substring(2, _zn_url.length);
        }
        else {
            console.error(e.toString());
        }
    }
    if(!_zn_url){
        var _scripts = document.getElementsByTagName("script"),
            _src = '',
            _node;

        for(var i = 0 , _len = scripts.length; i < _len; i++){
            _node = scripts[i];
            if(_node.getAttribute){
                _src = _node.getAttribute('src') || '';
                if (_src.slice(-5) === 'zn.js'||_src.slice(-10) === 'zn.minx.js') {
                    _zn_url = _src;
                    break;
                }
            }
        }
    }

    if(_zn_url){
        zn.ZN_PATH = _zn_url.substring(0, _zn_url.lastIndexOf('/') + 1);
    }else {
        throw new Error('zn.js has not been included, please do it first.');
    }
}
/**
 * Builtin Functions
 */
(function (zn) {
    var __toString = Object.prototype.toString;

    var __builtin__ = {
        isNull: function (value){
            return value === null || value === undefined;
        },
        isNotNull: function (value){
            return value !== null && value !== undefined;
        },
        idle: function (){
            // empty handler
        },
        idleArray: function () {
            return [];
        },
        idleObject: function () {
            return {};
        },
        format: function (){
            var _argv = arguments,
                _value = null,
                _values = null;
            if(_argv.length<2){
                return _argv[0];
            }else {
                _value = _argv[0];
                _value = _value.toString?_value.toString():_value;
                _values = _argv[1];
                __builtinZNObject__.each(_values, function (value, index){
                    if(value!==null&&value!==undefined){
                        value = (__builtinZNObject__.is(value, 'object')?JSON.stringify(value):(value.toString?value.toString():value));
                        _value = _value.replace(new RegExp('\\{'+index+'\\}', 'gi'), value);
                    }
                });
            }

            return _value;
        },
        uuid: function (options) {
            var _value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            if(options && options.ifUpperCase){
                _value = _value.toUpperCase();
            }

            return _value;
        },
        fix: function (target){
            var _target = target||{};
            for (var i = 1, _len = arguments.length; i < _len; i++) {
                var _fix = arguments[i];
                for (var _key in _fix) {
                    if (_fix.hasOwnProperty(_key) && typeof _target[_key] !== 'function') {
                        _target[_key] = _fix[_key];
                    }
                }
            }

            return _target;
        },
        extend: function (target){
            var _target = target||{};
            for (var i = 1, _len = arguments.length; i < _len; i++) {
                var _args = arguments[i];
                for (var _key in _args) {
                    if (_args.hasOwnProperty(_key)) {
                        _target[_key] = _args[_key];
                    }
                }
            }

            return _target;
        },
        isJson: function (obj) {
            return (typeof(obj) == "object" && __toString.call(obj).toLowerCase() == "[object object]" && obj.constructor.toString() == 'function Object() { [native code] }');
        },
        deepAssign: function (target, source){
            var _tvalue = null,
                _svalue = null;
            switch(__toString.call(source)){
                case "[object Object]":
                    if(!__builtin__.isJson(source)) {
                        return target;
                    }
                    for(var key in source){
                        _tvalue = target[key];
                        _svalue = source[key];
                        if(!source.hasOwnProperty(key)){
                            continue;
                        }
            
                        switch(__toString.call(_svalue)) {
                            case "[object Object]":
                                if(!__builtin__.isJson(_svalue)) {
                                    continue;
                                }
                                _svalue = this.deepAssign({}, _svalue);
                                if(__toString.call(_tvalue) == "[object Object]"){
                                    target[key] = this.deepAssign(_tvalue, _svalue);
                                } else {
                                    target[key] = _svalue;
                                }
                                break;
                            case "[object Array]":
                                if(__toString.call(_tvalue) == "[object Array]"){
                                    target[key] = target[key].concat(_svalue);
                                } else {
                                    target[key] = _svalue;
                                }
                                break;
                            case "[object Null]":
                            case "[object Boolean]":
                            case "[object Function]":
                            case "[object Number]":
                            case "[object String]":
                                target[key] = _svalue;
                                break;
                            case "[object Undefined]":
                            default:
                                break;
                        }
                    }
                    break;
                case "[object Array]":    
                    source.unshift(target);
                    __builtin__.deepAssigns.apply(this, source);
                    break;
            }
            
            return target;
        },
        callOnce: function (fun){
            var _called = false;
            return function() {
                if (!_called) {
                    _called = true;
                    fun.apply(this, arguments);
                }
            }
        },
        deepAssigns: function (){
            var _target = arguments[0];
            for(var i = 1, _len = arguments.length; i < _len; i++){
                __builtin__.deepAssign(_target, arguments[i]);
            }
    
            return _target;
        },
        convertArrayArgv: function (argv, options){
            var _env = [],
                _options = zn.extend({ prefix: '--' }, options),
                _prefix = _options.prefix,
                _keys = {},
                _key = '',
                _value = null,
                _counter = {},
                _started = false;
            for(var i = 0, _len = argv.length; i < _len; i++){
                _value = argv[i];
                if(_value.indexOf(_prefix) !== -1){
                    _key = _value.replace(_prefix, '');
                    _keys[_key] = true;
                    _counter[i+1] = _key;
                    if(!_started) {
                        _started = true;
                    }
                }else{
                    if(_started){
                        if(_counter[i]) {
                            _keys[_counter[i]] = _value;
                        }else{
                            var _i = i - 1;
                            while (!_counter[_i] && _i > 0) {
                                _i = _i - 1;
                            }
                            if(_counter[_i]){
                                var _keyValue = _keys[_counter[_i]];
                                if(_keyValue != null){
                                    if(typeof _keyValue === 'string'){
                                        _keys[_counter[_i]] = [_keyValue, _value];
                                    } else if(typeof _keyValue === 'object'){
                                        _keys[_counter[_i]].push(_value);
                                    }
                                }else {
                                    _keys[_counter[_i]] = _value;
                                }
                            }
                        }
                    }else {
                        _env.push(_value);
                    }
                }
            }
    
            return {
                env: _env,
                argv: _keys
            };
        },
        overwrite: function (target){
            var _target = target||{};
            for(var i = 1, _len = arguments.length; i < _len; i++){
                var _args = arguments[i];
                for(var _key in _args){
                    if(_args.hasOwnProperty(_key) && _target[_key]===undefined){
                        _target[_key] = _args[_key];
                    }
                }
            }

            return _target;
        },
        path: function (target, path, value) {
            var _result = target||{};
            if (path) {
                var _tokens = path.split('.'),
                    _token,
                    _len = _tokens.length,
                    i = 0;

                if (arguments.length < 3) {
                    for (; _result && i < _len; i++) {
                        _token = _tokens[i];
                        if (_result.__get__) {
                            _result = _result.__get__(_token);
                        } else {
                            _result = _result[_token];
                        }
                    }
                } else {
                    _len -= 1;
                    for (; _result && i < _len; i++) {
                        _token = _tokens[i];
                        if (_result.__get__) {
                            _result = _result.__get__(_token);
                        } else {
                            _result = _result[_token] = _result[_token] || {};
                        }
                    }

                    _token = _tokens[i];
                    if (_result) {
                        if (_result.__set__) {
                            _result.__set__(_token, value);
                        } else {
                            _result[_token] = value;
                        }

                        _result = value;
                    }
                }
            }

            return _result;
        },
        invoke: function (target, path, args) {
            if (target && path) {
                var _index = path.lastIndexOf('.'),
                    _context,
                    _method;

                if (_index > 0) {
                    _context = zn.path(target, path.substring(0, _index));
                    if (_context) {
                        _method = _context[path.substring(_index + 1)];
                    }
                } else {
                    _context = target;
                    _method = target[path];
                }

                if (_method) {
                    _method.apply(_context, args);
                }
            }
        },
        deepEachObject: function (data, handler, context){
            if(__builtinZNObject__.is(data, 'object')){
                var _value = null,
                    _result;
            	for(var key in data){
            		_value = data[key];
                    if(__builtinZNObject__.is(_value, 'object')){
                        this.deepEachObject(_value, handler, context);
                    }else {
                        _result = handler && handler.call(context, _value, key, data);
                        if(_result!==undefined&&_result!==null){
                            data[key] = _result;
                        }
                    }
            	}
            }

        	return data;
        },
        arrayValueToObject: function (data, handler, context){
            if(__builtinZNObject__.is(data, 'array')){
                var _value = null,
                    _data = {},
                    _result;
                for(var i = 0, _len = data.length; i < _len; i++){
                    _value = data[i];
                    _result = handler && handler.call(context, _value, i, data, _data);
                    if(_result!==undefined&&_result!==null){
                        _data[_value] = _result;
                    }
                }
                data = _data;
            }

        	return data;
        }
    };

    var __builtinZNObject__ = {
        toString: function (target){
            if(target&&target.toString){
                return target.toString();
            } else {
                return __toString.call(target);
            }
        },
        each: function (target, callback, context) {
            if (target && callback) {
                if(target.__each__){
                    target.__each__(callback, context);
                } else {
                    var _len = target.length,
                        _callBackValue = null;
                    if (_len > 0 && __toString.call(target) === '[object Array]') {
                        for (var i = 0; i < _len; i++) {
                            _callBackValue = callback.call(context, target[i], i);
                            if(_callBackValue===false){
                                return false;
                            }
                            if(_callBackValue===-1){
                                continue;
                            }
                        }
                    } else {
                        for (var _key in target) {
                            if (target.hasOwnProperty(_key)) {
                                _callBackValue = callback.call(context, target[_key], _key);
                                if(_callBackValue===false){
                                    return false;
                                }
                                if(_callBackValue===-1){
                                    continue;
                                }
                            }
                        }
                    }
                }
            }
        },
        clone: function (target) {
            if (target) {
                if (target.__clone__){
                    return target.__clone__();
                } else {
                    if (zn.is(target, 'array')) {
                        return target.slice(0);
                    } else {
                        var _result = {};
                        for (var key in target) {
                            if (target.hasOwnProperty(key)) {
                                _result[key] = target[key];
                            }
                        }

                        return _result;
                    }
                }
            } else {
                return target;
            }
        },
        type: function (target) {
            if (target && target.__type__) {
                return target.__type__;
            } else {
                return __toString.call(target).slice(8, -1).toLowerCase();
            }
        },
        is: function (target, type) {
            if (target && target.__is__) {
                return target.__is__(type);
            } else {
                if (typeof type === 'string') {
                    switch (type.toLowerCase()) {
                        case 'plain':
                            return target && target.constructor === Object;
                        default:
                            return this.type(target) === type;
                    }
                } else if (typeof type === 'function') {
                    return target instanceof type;
                }
            }
        },
        may: function (target, name) {
            if (target) {
                if (target.__may__) {
                    return target.__may__(name);
                } else {
                    return target.hasOwnProperty('on' + name);
                }
            } else {
                return false;
            }
        },
        can: function (target, name) {
            if (target) {
                if (target.__can__) {
                    return target.__can__(name);
                } else {
                    return typeof target[name] === 'function';
                }
            } else {
                return false;
            }
        },
        has: function (target, name) {
            if (target) {
                if (target.__has__) {
                    return target.__has__(name);
                } else {
                    return target.hasOwnProperty(name);
                }
            } else {
                return false;
            }
        },
        get: function (target, name) {
            if (target) {
                if (target.__get__) {
                    return target.__get__(name);
                } else {
                    return target[name];
                }
            }
        },
        set: function (target, name, value) {
            if (target) {
                if (target.__set__) {
                    target.__set__(name, value);
                } else {
                    target[name] = value;
                }
            }
        },
        gets: function (target) {
            if (target) {
                if (target.__gets__) {
                    return target.__gets__();
                } else {
                    var _values = {};
                    for (var _key in target) {
                        if (target.hasOwnProperty(_key)) {
                            _values[_key] = target[_key];
                        }
                    }

                    return _values;
                }
            }
        },
        sets: function (target, values) {
            if (target && values) {
                if (target.__sets__) {
                    target.__sets__(values);
                } else {
                    for (var _key in values) {
                        if (values.hasOwnProperty(_key)) {
                            target[_key] = values[_key];
                        }
                    }
                }
            }
        }
    };

    __builtin__.extend(zn, __builtin__);
    __builtin__.extend(zn, __builtinZNObject__);

})(zn);

/**
 * Define Class
 */
(function (zn) {
    /* *
    * Class and Instance member named format splicity:
    *
    * 1: class member format: _member_,
    *   you can get class member by this._member_, such as this._id_
    * 2: instance member format: __member__,
    *   you can get instance member by this.__member__, such as this.__id__
    *
    * */

    var GLOBAL = zn.GLOBAL,
        MEMBER_PREFIX = '@',
        __slice = Array.prototype.slice,
        _id_ = 1,  /*class id var*/
        __id__ = 1;  /*instance id var*/

    var __define = {
        /**
         * Get target's constructor
         * @param target
         * @returns {*}
         */
        fixTargetCtor: function (target){
            return ( target instanceof ZNObject ) ? target.constructor: target;
        },
        /**
         * Get member key by name.
         * @param name
         * @returns {string}
         */
        fixTargetKey: function (name){
            return MEMBER_PREFIX + name;
        },
        /**
         * Define an event for target
         * @param target
         * @param name
         * @param meta
         * @returns {boolean}
         */
        defineEvent: function (target, name, meta){
            var _ctor = __define.fixTargetCtor(target),
                _key = __define.fixTargetKey(name),
                _exist = _key in _ctor,
                _descriptor = {};

            if(!_exist){
                _descriptor = Object.defineProperty(target, 'on' + name.toLowerCase(), {
                    get: function () {
                        var _listeners = this.__handlers__[name];
                        if (_listeners) {
                            return _listeners[0].handler;
                        }
                        else {
                            return null;
                        }
                    },
                    set: function (value) {
                        var _handlers = this.__handlers__;
                        var _listeners = _handlers[name] = _handlers[name] || [];

                        _listeners[0] = {
                            owner: this,
                            handler: value,
                            context: null
                        };
                    }
                });
            }
            _ctor[_key] = {
                name: name,
                type: 'event',
                meta: meta,
                descriptor: _descriptor
            };

            return _exist;
        },
        /**
         * Define a property for target
         * @param target
         * @param name
         * @param meta
         * @returns {boolean}
         */
        defineProperty: function (target, name, meta){
            var _ctor = __define.fixTargetCtor(target),
                _key = __define.fixTargetKey(name),
                _exist = _key in _ctor,
                _descriptor = {};
            var _getter, _setter;

            if ('value' in meta) {
                var _value = meta.value,
                    _field = '_' + name,
                    _get = meta.get,
                    _set = meta.set;

                _getter = _get || function () {
                    if (_field in this) {
                        return this[_field];
                    }
                    else {
                        return zn.is(_value, 'function') ? _value.call(this) : _value;
                    }
                };
                _setter = meta.readonly ?
                    function (value, options) {
                        if (options && options.force) {
                            this[_field] = value;
                        }
                        else {
                            return false;
                        }
                    } :
                    (_set ||function (value) {
                        this[_field] = value;
                    });
            } else {
                _getter = meta.get || function () {
                    return undefined;
                };
                _setter = meta.set || function () {
                    return false;
                };
            }

            if (_exist) {
                _getter.__super__ = _ctor[_key].getter;
                _setter.__super__ = _ctor[_key].setter;
            }

            /*
            if(!_exist){
                _descriptor = Object.defineProperty(target, name, {
                    get: _getter,
                    set: _setter,
                    configurable : true
                });
            }*/


            _descriptor = Object.defineProperty(target, name, {
                get: _getter,
                set: _setter,
                configurable : true
            });

            _ctor[_key] = {
                name: name,
                type: 'property',
                meta: meta,
                getter: _getter,
                setter: _setter,
                descriptor: _descriptor
            };

            return _exist;
        },
        /**
         * Define a method for target
         * @param target
         * @param name
         * @param meta
         * @returns {boolean}
         */
        defineMethod: function (target, name, meta){
            var _ctor = __define.fixTargetCtor(target),
                _key = __define.fixTargetKey(name),
                _exist = _key in _ctor;

            _ctor[_key] = {
                name: name,
                type: 'method',
                meta: meta
            };

            if (name in target) {
                if(!meta.value){
                    meta.value = function (){

                    };
                }

                meta.value.__super__ = target[name];
            }

            target[name] = meta.value;

            return _exist;
        }
    };

    var sharedMethods = {
        __handlers__: {},

        /**
         * Get specified member.
         * @param name
         * @returns {*}
         */
        member: function (name, target) {
            var _ctor = __define.fixTargetCtor(target||this),
                _member = _ctor[__define.fixTargetKey(name)];

            if(!_member&&_ctor!==ZNObject){
                return this.member(name, _ctor._super_);
            }

            return _member;
        },
        /**
         * Check whether current object has specified event.
         * @method may
         * @param name {String}
         * @returns {Boolean}
         */
        may: function (name) {
            var _member = this.member(name);
            return _member && _member.type == 'event';
        },
        /**
         * Check whether current object has specified property.
         * @method has
         * @param name {String}
         * @returns {Boolean}
         */
        has: function (name) {
            var _member = this.member(name);
            return _member && _member.type == 'property';
        },
        /**
         * Check whether current object has specified method.
         * @method can
         * @param name {String}
         * @returns {Boolean}
         */
        can: function (name) {
            var _member = this.member(name);
            return _member && _member.type == 'method';
        },
        /**
         * Get specified property value.
         * @method get
         * @param name {String}
         * @param [options] {Any}
         * @returns {*}
         */
        get: function (name, options) {
            var _member = this.member(name);
            if(_member && _member.getter){
                return _member.getter.call(this, options);
            }

            return undefined;
        },
        /**
         * Set specified property value.
         * @method set
         * @param name {String}
         * @param value {*}
         * @param [options] {Any}
         */
        set: function (name, value, options) {
            var _member = this.member(name);
            if (_member && _member.setter) {
                _member.setter.call(this, value, options);
            }

            return this;
        },
        /**
         * Get all properties.
         * @method gets
         * @returns {Object}
         * @param [options] {Any}
         */
        gets: function (options) {
            var _values = {},
                _properties = __define.fixTargetCtor(this)._properties_;
            zn.each(_properties, function (name) {
                _values[name] = this.get(name, options);
            }, this);

            return _values;
        },
        /**
         * Set a bunch of properties.
         * @method sets
         * @param dict {Object}
         * @param [options] {Any}
         */
        sets: function (values, options, callback) {
            if (values) {
                var _value = null;
                for (var _name in values) {
                    if (values.hasOwnProperty(_name)) {
                        _value = values[_name];
                        if((callback && callback(_value, _name, options))!==false){
                            this.set(_name, _value, options);
                        }
                    }
                }
            }

            return this;
        },
        each: function (callback, context){
            var _properties = __define.fixTargetCtor(this)._properties_;
            for(var i= 0, _len = _properties.length; i<_len; i++){
                var _property = _properties[i];
                var _callback = callback.call(context, _property, i, this.member(_property), this.get(_property));
                if(_callback === false){
                    return false;
                }
                if(_callback === -1){
                    continue;
                }
            }

            return this;
        },
        __may__: function (name) {
            return this.may(name);
        },
        __has__: function (name) {
            return this.has(name);
        },
        __can__: function (name) {
            return this.can(name);
        },
        __get__: function (name) {
            return this.get(name);
        },
        __gets__: function () {
            return this.gets();
        },
        __set__: function (name, value) {
            this.set(name, value);
        },
        __sets__: function (values) {
            this.sets(values);
        },
        __each__: function (callback, context){
            return this.each(callback, context);
        }
    };

    var classMethods = {
        toString: function (){
            return JSON.stringify({
                ClassName: this._name_ || 'Anonymous',
                ClassID: this._id_
            });
        },
        createSelf: function (){
            return new this.constructor.apply(this, Array.prototype.slice.call(arguments));
        },
        getProperties: function(handler, context){
            var _props = {};
            if(!this.getMeta || this._name_ == 'ZNObject'){
                return _props;
            }

            var _super = this._super_,
                _mixins = this._mixins_;

            if(_super){
                zn.extend(_props, _super.getProperties(handler, context));
            }

            if(_mixins && _mixins.length){
                zn.each(_mixins, function (mixin){
                    if(!mixin) return;
                    zn.extend(_props, mixin.getProperties(handler, context));
                });
            }

            zn.each(this.getMeta('properties'), function (prop, name){
                var _callback = handler && handler.call(context || this, prop, name, _props);
                if(_callback === false || _callback === -1){
                    return _callback;
                }

                if(!prop.hidden){
                    _props[name] = prop;
                }
            }, this);

            return _props;
        },
        getProperty: function (name){
            var _prop = null;
            if(name){
                this.getProperties(function (prop, key){
                    if(name == key){
                        _prop = field;
                    }
                    return -1;
                });
            }

            return _prop;
        },
        existProperty: function (name){
            return !!this.getProperty(name);
        },
        /**
         * Get the meta data of the class.
         * @param name
         * @returns {*}
         */
        getMeta: function (name) {
            return name ? this._meta_[name]: this._meta_;
        },
        /**
         * Get the meta data of the class.
         * @param name
         * @param value
         * @returns {*}
         */
        setMeta: function (name, value) {
            if(name && value){
                this._meta_[name] = value;
            }

            return this;
        },
        /**
         * Define an event.
         * @method defineEvent
         * @static
         * @param name {String}
         * @param [meta] {Object}
         * @param [target] {Object}
         */
        defineEvent: function (name, meta, target) {
            if (!__define.defineEvent(target || this.prototype, name, meta)) {
                this._events_.push(name);
            }

            return this;
        },
        /**
         * Define a property.
         * @method defineProperty
         * @static
         * @param name {String}
         * @param [meta] {Object}
         * @param [target] {Object}
         */
        defineProperty: function (name, meta, target) {
            if (!__define.defineProperty(target || this.prototype, name, meta)) {
                this._properties_.push(name);
            }

            return this;
        },
        /**
         * Define a method.
         * @method defineMethod
         * @static
         * @param name {String}
         * @param meta {Object}
         * @param [target] {Object}
         */
        defineMethod: function (name, meta, target) {
            if (!__define.defineMethod(target || this.prototype, name, meta)) {
                this._methods_.push(name);
            }

            return this;
        }
    };

    var instanceMethods = {
        /**
         * Instance Object to string value.
         * @returns {string}
         */
        toString: function (){
            var _info = {
                ClassName: (this.__name__ || 'Anonymous'),
                InstanceID: this.__id__,
                Meta: this.constructor._meta_
            };
            return JSON.stringify(_info);
        },
        /**
         * Instance Object to json value.
         * @returns {json}
         */
        toJson: function (){
            var _json = {};
            zn.each(this.constructor.getProperties(), function (field, key){
                _json[key] = this.get(key);
            }, this);

            return _json;
        },
        getProperties: function (){
            return this.constructor.getProperties.apply(this, arguments);
        },
        getPropertie: function (name){
            return this.constructor.getPropertie(name);
        },
        /**
         * Add a single event handler.
         * @method upon
         * @param name {String}
         * @param handler {Function}
         * @param [options] {Object}
         */
        upon: function (name, handler, options) {
            if (handler) {
                var _handlers = this.__handlers__;
                var _listeners = _handlers[name] = _handlers[name] || [];

                _listeners[0] = zn.extend({
                    owner: this,
                    handler: handler
                }, options);
            }

            return this;
        },
        /**
         * Add an event handler.
         * @method on
         * @param name {String}
         * @param handler {Function}
         * @param [options] {Object}
         */
        on: function (name, handler, options) {
            if (handler) {
                var _handlers = this.__handlers__;
                var _listeners = _handlers[name] = _handlers[name] || [
                    {
                        owner: null,
                        handler: null,
                        context: null
                    }
                ];
                if(_listeners.push && typeof _listeners.push == 'function') {
                    _listeners.push(zn.extend({
                        owner: this,
                        handler: handler
                    }, options));
                }
            }

            return this;
        },
        /**
         * Add an event handler.
         * @method on
         * @param name {String}
         * @param handler {Function}
         * @param [options] {Object}
         */
        hasEventHandler: function (name) {
            return !!(this.__handlers__[name]||[]).length;
        },
        /**
         * Remove an event handler.
         * @method off
         * @param name {String}
         * @param [handler] {Function}
         * @param [options] {Object}
         */
        off: function (name, handler, options) {
            var _listeners = this.__handlers__[name]||[], _listener;
            var _context = options && options.context;
            if (handler) {
                for (var i = _listeners.length - 1; i >= 0; i--) {
                    _listener = _listeners[i];
                    if (_listener.handler === handler && (!_context || _listener.context === _context )) {
                        this.__handlers__[name].splice(i, 1);
                    }
                }
            }
            else {
                this.__handlers__[name] = [
                    {
                        owner: null,
                        handler: null,
                        context: null
                    }
                ];
            }

            return this;
        },
        offs: function (names) {
            var _names = Array.prototype.slice.call(arguments);
            if(_names.length){
                zn.each(_names, function (name){
                    if(this.__handlers__[name]){
                        this.__handlers__[name] = [
                            {
                                owner: null,
                                handler: null,
                                context: null
                            }
                        ];
                    }
                }.bind(this));
            }else {
                this.__handlers__ = {};
            }

            return this;
        },
        /**
         * Trigger an event.
         * @method fire
         * @param name {String}
         * @param [data] {*}
         * @param [options] {Object}
         */
        fire: function (name, data, options) {
            var _listeners = this.__handlers__[name],
                _listener,
                _result = null,
                _temp = null;
            if (_listeners) {
                for (var i = 0, length = _listeners.length; i < length; i++) {
                    _listener = _listeners[i];
                    if (_listener && _listener.handler) {
                        if (options && options.method == 'apply') {
                            if(options.ownerFirst){
                                data = Array.from(data);
                                data.unshift(_listener.owner);
                            }
                            _temp = _listener.handler.apply(_listener.context || _listener.owner, data);
                        } else {
                            _temp = _listener.handler.call(_listener.context || _listener.owner, _listener.owner, data, options);
                        }
                        if (_temp === false) {
                            return false;
                        }
                        if (_temp === -1) {
                            continue;
                        }
                        if (options && options.overwrite) {
                            _result = _temp;
                        } else if (_temp != null) {
                            return _temp;
                        }
                    }
                }
            }

            return _result;
        },
        /**
         * Trigger an event.
         * @method fireApply
         * @param name {String}
         * @param [arguments] {*}
         */
        fireApply: function () {
            var _argv = __slice.call(arguments),
                _name = _argv.shift();
            if(!_name){
                return this;
            }

            var _listeners = this.__handlers__[_name],
                _listener,
                _result = null,
                _temp = null;
            if (_listeners) {
                for (var i = 0, length = _listeners.length; i < length; i++) {
                    _listener = _listeners[i];
                    if (_listener && _listener.handler) {
                        _temp = _listener.handler.apply(_listener.context || _listener.owner, _argv);
                        if (_temp === false) {
                            return false;
                        }
                        if (_temp === -1) {
                            continue;
                        }
                        if (_temp != null) {
                            return _temp;
                        }
                    }
                }
            }

            return _result;
        },
        /**
         * Dispose current object.
         * @method dispose
         */
        dispose: function () {
            this.__id__ = null;
            delete this.__id__;
            for(var key in this.__handlers__) {
                this.__handlers__[key] = null;
                if(this.__handlers__[key] && this.__handlers__[key].length) {
                    this.__handlers__[key].forEach(function (handler, index){
                        this.__handlers__[key][index] = null;
                        delete this.__handlers__[key][index];
                    });
                }
                delete this.__handlers__[key];
            }
            this.__handlers__ = null;
            delete this.__handlers__;
            this.__initializing__ = null;
            delete this.__initializing__;
            this.__super__ = null;
            delete this.__super__;
            this.__afters__ = null;
            delete this.__afters__;
        },
        /**
         * Destroy current object.
         * @method destroy
         */
        destroy: function () {
            this.dispose();
        },
        /**
         * Call overridden method from super class
         * @method super
         */
        super: function () {
            var _superMethod = this.super.caller.__super__;
            if (_superMethod) {
                return _superMethod.apply(this, arguments);
            }
        },
        /**
         * Check whether current object is specified type.
         * @method is
         * @param type {String|Function}
         * @returns {Boolean}
         */
        is: function (type) {
            if (typeof type === 'string') {
                type = zn.path(GLOBAL, type);
            }

            if (type) {
                if (this instanceof type) {
                    return true;
                } else {
                    var _mixins = this.constructor._mixins_;
                    for (var i = 0, _len = _mixins.length; i < _len; i++) {
                        var _mixin = _mixins[i];
                        if (type === _mixin) {
                            return true;
                        }
                    }
                }
            }

            return false;
        },
        __is__: function (type) {
            return this.is(type);
        },
        __clone__: function (){

        }
    };

    /**
     * The default super class for all classes defined in znJS.
     * @private
     */
    function ZNObject() { }

    zn.extend(ZNObject, sharedMethods, classMethods, {
        _id_: 0,
        _name_: 'ZNObject',
        _statics_: {},
        _events_: [],
        _properties_: [],
        _methods_: [],
        _mixins_: [],
        _meta_: {}
    });

    zn.extend(ZNObject.prototype, sharedMethods, instanceMethods);

    zn.isZNObject = function (value) {
        return value instanceof ZNObject;
    };

    var __class = {
        _arguments: function (){
            var _args = arguments,
                _argsLength = _args.length,
                _args0 = _args[0],
                _name, _super, _meta;

            var CLASS_KEYS = {
                'static': false,
                statics: [],
                partial: false,
                abstract: false,
                final: false,
                mixins: [],
                events: [],
                properties: [],
                methods: []
            };

            if (_argsLength === 3) {
                _name = _args0;
                _super = _args[1];
                _meta = _args[2];

                if (!zn.is(_super, 'function')) {
                    throw new Error('Invalid _super class.');
                }

            } else if (_argsLength === 2) {
                if (zn.is(_args0, 'string')) {
                    _name = _args0;
                    _super = null;
                } else if (zn.is(_args0, 'function')) {
                    _name = null;
                    _super = _args0;
                } else {
                    throw new Error('Invalid _super class.');
                }

                _meta = _args[1];

            } else if (_argsLength === 1) {
                _name = null;
                _super = null;
                _meta = _args0;

                if (!zn.is(_meta, 'object')) {
                    throw new Error('The meta argument must be an object.');
                }

            } else {
                throw new Error('Invalid arguments.');
            }

            _name = _name || '';
            _meta = zn.overwrite(_meta || {}, CLASS_KEYS);
            _super = _super || ZNObject;

            return { name: _name, super: _super, meta: _meta };
        },
        _meta: function (_Class, _args){
            var _name = _args.name,
                _super = _args.super,
                _meta = _args.meta;

            zn.extend(_Class, sharedMethods, classMethods, {
                _id_: _id_++,
                _name_: _name,
                _super_: _super,
                _partial_: _meta.partial,
                _abstract_: _meta.abstract,
                _static_: _meta.static,
                _final_: _meta.final,
                _statics_: zn.extend({}, _super._statics_, _meta.statics),
                _events_: _super._events_.slice(0),
                _properties_: _super._properties_.slice(0),
                _methods_: _super._methods_.slice(0),
                _mixins_: _super._mixins_.concat(_meta.mixins),
                _meta_: _meta
            });


            zn.extend(_Class, _Class._statics_);

            if (_meta.static) {
                zn.each(_meta.events, function (event) {
                    _Class.defineEvent(event, {}, _Class);
                });

                zn.each(_meta.properties, function (value, key) {
                    _Class.defineProperty(key, zn.is(value, 'object') ? value : { value: value }, _Class);
                });

                zn.each(_meta.methods, function (value, key) {
                    _Class.defineMethod(key, zn.is(value, 'function') ? { value: value } : value, _Class);
                });

                if (_meta.methods.init) {
                    _meta.methods.init.call(_Class, _Class);
                }
            } else {
                zn.each(_meta.mixins, function (mixin) {
                    if(!mixin) {
                        return;
                    }
                    var _mixinPrototype = mixin.prototype;
                    zn.each(mixin._events_, function (name) {
                        _Class.defineEvent(name, _mixinPrototype.member(name).meta);
                    });

                    zn.each(mixin._properties_, function (name) {
                        _Class.defineProperty(name, _mixinPrototype.member(name).meta);
                    });

                    zn.each(mixin._methods_, function (name) {
                        if (!sharedMethods[name] && !instanceMethods[name]) {
                            _Class.defineMethod(name, _mixinPrototype.member(name).meta);
                        }
                    });
                });

                zn.each(_meta.events, function (event) {
                    _Class.defineEvent(event, {});
                });

                zn.each(_meta.properties, function (value, key) {
                    _Class.defineProperty(key, zn.is(value, 'object') ? value : { value: value });
                });

                zn.each(_meta.methods, function (value, key) {
                    _Class.defineMethod(key, zn.is(value, 'function') ? { value: value } : value);
                });
            }

            return _Class;
        }
    };

    var __execSuperCtor = function (__super__, __context__, __arguments__){
        if(__super__ && __super__ !== ZNObject){
            var _superCtor = __super__.member('init'),
                _mixins = __super__._mixins_,
                _mixinCtor = null;

            if(_superCtor && _superCtor.meta.after){
                __context__.__afters__.push({
                    context: __context__,
                    handler: _superCtor.meta.after
                });
            }

            if(_mixins.length){
                zn.each(_mixins, function (mixin){
                    if(!mixin) return;
                    if(mixin['@init']){
                        _mixinCtor = mixin['@init'].meta;
                        _mixinCtor = zn.is(_mixinCtor, 'function') ? _mixinCtor : _mixinCtor.value;
                        //TODO: This will not working in es6.
                        __execSuperCtor(mixin.prototype.__super__, mixin.prototype, __arguments__);
                        if (_mixinCtor) {
                            _mixinCtor.call(__context__);
                        }
                    }
                });
            }

            if(_superCtor && _superCtor.meta.auto){
                _superCtor.meta.value.apply(__context__, __arguments__);
            }
            //TODO: This will not working in es6.
            return arguments.callee(__super__._super_, __context__);
        }
    };

    /**s
     * Define a class
     * @method define
     * @param [name] {String}
     * @param [super] {Function}
     * @param meta {Object}
     * @returns {Function}
     */
    function define () {
        var _args = __class._arguments.apply(this, arguments);
        var _name = _args.name,
            _super = _args.super,
            _meta = _args.meta,
            _init = _meta.methods.init;

        _meta.properties = _meta.properties || _meta.props;
        _meta.props = null;
        delete _meta.props;

        var ZNClass, _SuperClass, _prototype;

        if (_super._static_) {
            throw new Error('Static class cannot be inherited.');
        }

        if (_super._final_) {
            throw new Error('Final class cannot be inherited.');
        }

        if (_name && _meta.partial) {
            ZNClass = zn.path(GLOBAL, _name);
        }

        if (_meta.static) {
            if (ZNClass) {
                if (!ZNClass._static_) {
                    throw new Error('Partial class "' + _name + '" must be static.');
                }
            } else {
                ZNClass = function () {
                    throw new Error('Cannot instantiate static class.');
                };
            }

            _prototype = ZNClass.prototype;
        } else {
            if (ZNClass) {
                if (ZNClass._static_) {
                    throw new Error('Partial class "' + _name + '" must not be static.');
                }

                if (ZNClass._super_ !== _super && ZNClass._super_ !== ZNObject) {
                    throw new Error('Partial class "' + _name + '" must have consistent super class.');
                }

            } else {
                ZNClass = _meta.abstract ?
                    function () {
                        throw new Error('Cannot instantiate abstract class.');
                    } :
                    function () {
                        var _mixins = ZNClass._mixins_ || [],
                            _ctors = ZNClass._ctors_ || [],
                            _ctor_ = null,
                            _arguments = arguments;

                        this.__id__ = __id__++;
                        this.__handlers__ = {};
                        this.__initializing__ = true;
                        this.__afters__ = [];

                        var _mixin = null,
                            _ctor = null;

                        for (var i = 0, _len = _mixins.length; i < _len; i++) {
                            _mixin = _mixins[i];
                            if(!_mixin) continue;
                            if(_mixin['@init']){
                                _ctor = _mixin['@init'].meta;
                                _ctor = zn.is(_ctor, 'function') ? _ctor : _ctor.value;
                                __execSuperCtor(_mixin.prototype.__super__, this, _arguments);
                                if (_ctor) {
                                    _ctor.call(this);
                                }
                            }else {
                                __execSuperCtor(_mixin.prototype.__super__, this, _arguments);
                            }
                        }

                        __execSuperCtor(this.__super__, this, _arguments);

                        for (var j = 0, _ctorLen = _ctors.length; j < _ctorLen; j++) {
                            _ctor_ = _ctors[j];
                            _ctor_ = zn.is(_ctor_, 'function') ? _ctor_ : _ctor_.value;
                            if (_ctor_) {
                                _ctor_.apply(this, _arguments);
                            }
                        }

                        while(this.__afters__.length>0){
                            var _after = this.__afters__.pop();
                            _after.handler.apply(_after.context, _arguments);
                        }

                        this.__afters__ = null;
                        delete this.__afters__;


                        this.__initializing__ = false;
                    };

                ZNClass._ctors_ = [];
            }

            if (ZNClass._super_ !== _super) {
                _SuperClass = function () { };
                _SuperClass.prototype = _super.prototype;
                _prototype = new _SuperClass();
                _prototype.constructor = ZNClass;
                _prototype.__type__ = _name || 'Anonymous';
                _prototype.__super__ = _super;


                ZNClass.prototype = _prototype;
            } else {
                _prototype = ZNClass.prototype;
            }

            _prototype.class = _prototype.constructor;

            if (_init) {
                ZNClass._ctors_.push(_init);
                if(!_prototype.__ctor__){
                    _prototype.__ctor__ = _init;
                }
            }

        }

        __class._meta(ZNClass, _args);

        if (_prototype.__define__) {
            _prototype.__define__.call(ZNClass);
        }

        if(_name){
            zn.path(GLOBAL, _name, ZNClass);
        }

        return ZNClass;
    }

    zn.Class = define;

})(zn);

/**
 * Fix Javascript Object Functions
 */
(function (zn){

    var __slice = Array.prototype.slice,
        __hasOwnProperty = Object.prototype.hasOwnProperty,
        __toString = Object.prototype.toString;

    var __fixStringPrototype__ = {
        format: function (){
            var _argv = arguments, _self = this;
            if(_argv.length == 1 && typeof _argv[0] == 'object'){
                _argv = _argv[0];
            }
            zn.each(_argv, function (value, index){
                if(value!==null&&value!==undefined){
                    value = (zn.type(value)=='object'?JSON.stringify(value):(value.toString?value.toString():value));
                    _self = _self.replace(new RegExp('\\{'+index+'\\}', 'gi'), value);
                }
            });

            //return zn.format.call(this, this, arguments);

            return _self.toString();
        },
        firstUpperCase: function (value){
            return value.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
                return $1.toUpperCase() + $2;
            });
        }
    };

    var __fixArray__ = {
        isArray: function (target){
            /*
             * Two solution of fix Array function
             * 1, return Object.prototype.toString.call(target) === '[object Array]';
             * 2, return target&&target.constructor === Array;
             * */
            return target && zn.toString(target) === '[object Array]' && target.constructor === Array;
        }
    };

    var __fixArrayPrototype__ = {
        forEach: function (iterator, context){
            if(!iterator){ return false; }
            for(var i= 0, _len = this.length; i < _len; i++){
                iterator.call(context, this[i], i);
            }

            return this;
        },
        /*
        toJSON: function (){
            var _data = {};
            for(var i= 0, _len = this.length; i < _len; i++){
                _data[i] = this[i];
            }

            return _data;
        },*/
        indexOf: function (item){
            for(var i= 0, _len = this.length; i < _len; i++){
                if (this[i] === item){
                    return i;
                }
            }

            return -1;
        },
        lastIndexOf: function (item){
            for(var i= this.length - 1; i >= 0; i--){
                if (this[i] === item){
                    return i;
                }
            }

            return -1;
        }
    };

    /**
     * Number.prototype.format(n, x)
     *
     * @param integer n: length of decimal
     * @param integer x: length of sections
     */
    var __fixNumber__ = {
        format: function (n, x){
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
            return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
        },
        sectionThree: function (){
            return (this).toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        },
        price: function (options){
    		var _options = zn.extend({
    			unit: 10000,
    			unitText: '万',
    			prefix: '',
                decimal: 2,
                sections: 3
    		}, options);
    		if(((this/_options.unit) > 1)&&(this%100 == 0)){
                return (this/_options.unit).sectionThree() + _options.unitText;
    		}else {
    			return this.format(_options.decimal, _options.sections);
    		}
    	}
    };

    var __fixFunction__ = {
        bind: function (context){
            var _self = this;
            return function (){
                return _self.apply(context, __slice.call(arguments, 1));
            };
        }
    };

    var __fixObject__ = {
        toArray: function (target){
            return __slice.call(target);
        },
        keys: function (obj){
            if(obj !== Object(obj)){
                throw new TypeError('Object.keys called on a non-object');
            }
            var _keys = [], _property;
            for (_property in obj){
                if(__hasOwnProperty.call(obj, _property)){
                    _keys.push(_property);
                }
            }

            return _keys;
        },
        values: function (obj){
            if(obj !== Object(obj)){
                throw new TypeError('Object.keys called on a non-object');
            }
            var _values = [], _property;
            for (_property in obj){
                if(__hasOwnProperty.call(obj, _property)){
                    _values.push(obj[_property]);
                }
            }

            return _values;
        },
        create: (function (){
            var _object = function (){}, _self = this;
            return function (obj, properties){
                if (obj === null){
                    throw new Error('Cannot set a null [[Prototype]]');
                }

                if (typeof obj !== 'object'){
                    throw new TypeError('Argument must be an object');
                }
                zn.each(properties, function (property, descriptor){
                    __fixObject__.defineProperty(obj, property, descriptor);
                });
                _object.prototype = obj;
                return new _object();
            };
        })(),
        defineProperty: function (obj, property, descriptor){
            if (obj && property && descriptor && descriptor.hasOwnProperty('value')) {
                obj[property] = descriptor.value;
            }

            return obj;
        }
    };

    var __fixJSON__ = {
        parse: function (value){
            return ''; //eval('(' + value + ')');
        },
        stringify: (function () {
            var _toString = __toString;
            var _isArray = Array.isArray;
            var _escMap = {
                '"': '\\"',
                '\\': '\\\\',
                '\b': '\\b',
                '\f': '\\f',
                '\n': '\\n',
                '\r': '\\r',
                '\t': '\\t'
            };
            var _escFunc = function (m) {
                return _escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1);
            };
            var _escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
            return function stringify(value) {
                if (value == null) {
                    return 'null';
                } else if (typeof value === 'number') {
                    return isFinite(value) ? value.toString() : 'null';
                } else if (typeof value === 'boolean') {
                    return value.toString();
                } else if (typeof value === 'object') {
                    var _values;
                    if (typeof value.toJSON === 'function') {
                        return stringify(value.toJSON());
                    } else if (_isArray(value)) {
                        _values = '[';
                        for (var i = 0; i < value.length; i++){
                            _values += (i ? ', ' : '') + stringify(value[i]);
                        }
                        return _values + ']';
                    } else if (_toString.call(value) === '[object Object]') {
                        _values = [];
                        for (var key in value) {
                            if (value.hasOwnProperty(key)){
                                _values.push(stringify(key) + ': ' + stringify(value[key]));
                            }
                        }
                        return '{' + _values.join(', ') + '}';
                    }
                }

                return '"' + value.toString().replace(_escRE, _escFunc) + '"';
            };
        })()
    };

    var __fixDate__ = {
        format: function (fmt){
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)){
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o){
                if (new RegExp("(" + k + ")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }

            return fmt;
        }
    };

    zn.fix(Array, __fixArray__);
    zn.fix(Array.prototype, __fixArrayPrototype__);
    zn.fix(Function.prototype, __fixFunction__);
    //zn.fix(Object, __fixObject__);
    //zn.fix(zn.GLOBAL.JSON, __fixJSON__);
    zn.fix(String.prototype, __fixStringPrototype__);
    zn.fix(Number.prototype, __fixNumber__);
    zn.fix(Date.prototype, __fixDate__);

    /*
    try {
        Object.defineProperty({}, 'zn', {});
    }
    catch (ex) {
        Object.defineProperty = function (obj, property, descriptor) {
            return __fixObject__.defineProperty(obj, property, descriptor);
        };
    }*/

})(zn);

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
            nowDateString: function (sep, value){
                var date = new Date();
                if(value != null && value != undefined){
                    date = new Date(value);
                }
                var _year = date.getFullYear(),
                    _month = date.getMonth() + 1,
                    _date = date.getDate();

                _month = _month < 10 ? '0' + _month : _month;
                _date = _date < 10 ? '0' + _date : _date;

                return [_year, _month, _date].join(sep || '');
            },
            nowTimeString: function (sep, value){
                var date = new Date();
                if(value != null && value != undefined){
                    date = new Date(value);
                }
                var _h = date.getHours(),
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
            define: function (method, config){
                this._config.levels[method] = zn.extend({
                    color: 'cyan'
                }, config);

                var _Constructor = this.constructor;
                if(_Constructor){
                    _Constructor.defineEvent(method, {}, _Constructor);
                    _Constructor.defineMethod(method, { 
                        value: function (){
                            this.__consoleLog.call(this, method, arguments);
                        }.bind(this) 
                    }, _Constructor);
                    this[method] = function (){
                        this.__consoleLog.call(this, method, arguments);
                    }.bind(this);
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
            error: function () {
                this.__consoleLog.call(this, 'error', arguments);
            },
            ok: function () {
                this.__consoleLog.call(this, 'ok', arguments);
            },
            trace: function () {
                this.__consoleLog.call(this, 'trace', arguments);
            },
            all: function () {
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
                    _color = _level.number != null ? _level.number : _level.color;
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
