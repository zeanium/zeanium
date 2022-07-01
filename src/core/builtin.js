/**
 * Builtin Functions
 */
(function (zn) {
    var __toString = Object.prototype.toString;

    var __builtin__ = {
        timeout: function (ms) {
            return new Promise(function(resolve){
                setTimeout(resolve, ms);
            });
        },
        truncate: function (str, maxLen) {
            if (str.length <= maxLen) {
                return '[' + str + ' '.repeat(maxLen - str.length) + ']';
            }
            var part = maxLen / 2
            return '[' + str.substring(0, part - 3) + "..." + str.substring(str.length - part) + ']';
        },
        formatFieldData: function (data, includes, excludes, dataTypes){
            var _value = null, _data = {}, _types = dataTypes || {};
            var _includes = includes || [], _excludes = excludes || [];
            for(var _key in data){
                if(_includes.length && _includes.indexOf(_key) === -1) {
                    continue;
                }
                if(_excludes.indexOf(_key) != -1){
                    continue;
                }
                _value = data[_key];
                switch(zn.type(_value)) {
                    case 'object':
                    case 'array':
                        _value = JSON.stringify(_value);
                        break;
                    case 'function':
                        _value = _value(_key, data);
                        break;
                }
    
                if(zn.is(_value, 'string')) {
                    _value = _value.replace(/'/g, "");
                    _value = _value.replace(/\n/g, "");
                }

                if(_types[_key]) {
                    switch(_types[_key]) {
                        case 'string':
                            _value = (_value).toString();
                            break;
                        case 'int':
                            _value = parseInt(_value||0);
                            break;
                        case 'float':
                            _value = (parseFloat(_value||0)).toFixed(2);
                            break;
                        case 'datetime':
                            _value = zn.date.dateFormat("yyyy-MM-dd hh:mm:ss", _value);
                            break;
                        default:
                            break;
                    }
                }
    
                _data[_key] = _value;
            }
    
            return _data;
        },
        sliceArrayData: function (arrayData, size){
            var _data = [], _ary = [], _length = arrayData.length;
            if(_length < size + 1){
                return [ arrayData ];
            }
            while(arrayData.length > 0){
                if(_ary.length == size) {
                    _data.push(_ary);
                    _ary = [];
                }
                _ary.push(arrayData.shift());
                if(arrayData.length == 0) {
                    _data.push(_ary);
                }
            }
            
            return _data;
        },
        splitArrayData: function (arrayData, size){
            var _totalLength = arrayData.length, _totalSize = Math.ceil(_totalLength / size), _ary = []; 
            for(var i = 0; i < _totalSize; i++) {
                _ary[i] = arrayData.slice(i * size, Math.min((i+1) * size, _totalLength));
            }
    
            return _ary;
        },
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
            return (typeof(obj) == "object" && __toString.call(obj).toLowerCase() == "[object object]" && obj.constructor.toString().indexOf('function Object() {') == 0);
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
                                    target[key] = __builtin__.deepAssign(_tvalue, _svalue);
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
                    __builtin__.deepAssigns.apply(__builtin__.deepAssigns, source);
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
                            if(_result.__get__(_token)) {
                                _result = _result.__get__(_token);
                            }else if(_result[_token]){
                                _result = _result[_token];
                            }
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
                        case 'function':
                            return target && (target.constructor.name == 'Function' || target.constructor.name == 'AsyncFunction');
                        case 'asyncfunction':
                            return target && (target.constructor.name == 'AsyncFunction');
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
