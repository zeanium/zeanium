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
        uuid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }).toUpperCase();
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
        deepAssign: function (target, source){
            var _tvalue = null,
                _svalue = null;
            switch(__toString.call(source)){
                case "[object Object]":    
                    for(var key in source){
                        _tvalue = target[key];
                        _svalue = source[key];
            
                        switch(__toString.call(_svalue)) {
                            case "[object Object]":
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

                _listeners.push(zn.extend({
                    owner: this,
                    handler: handler
                }, options));
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
                        } else if (_temp) {
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
            return this.__handlers__ = {}, this;
        },
        /**
         * Destroy current object.
         * @method destroy
         */
        destroy: function () {
            return this.dispose();
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
