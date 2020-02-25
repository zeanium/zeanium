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
