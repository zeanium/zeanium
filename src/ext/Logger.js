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
