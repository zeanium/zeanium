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
            timestampToString: function (timestamp){
                if(zn.is(timestamp, 'string')){
                    timestamp = parseInt(timestamp);
                }
                if(!zn.is(timestamp, 'number')) {
                    throw new Error('参数不是整数');
                }
                if(!timestamp) {
                    throw new Error('参数不存在');
                }

                if(timestamp.toString().length == 10){
                    timestamp = timestamp * 1000;
                }

                var _date = new Date(timestamp);
                var _year = _date.getFullYear(), _month = _date.getMonth() + 1, _day = _date.getDate();
                var _hour = _date.getHours(), _minute = _date.getMinutes(), _second = _date.getSeconds();
                return [
                    _year, (_month < 10 ? '0' + _month : _month), (_day < 10 ? '0' + _day : _day)
                ].join('-') + ' ' + [
                    (_hour < 10 ? '0' + _hour : _hour), (_minute < 10 ? '0' + _minute : _minute), (_second < 10 ? '0' + _second : _second)
                ].join(':');
            },
            datatimeToString: function (value){
                var _date = null;
                if(zn.is(value, 'string')){
                    _date = new Date(value);
                }

                if(value instanceof Date){
                    _date = value;
                }

                if(!_date){
                    return '';
                }

                var _string = _date.toISOString();
                return _string.split('T')[1].split('Z')[0];
            },
            nowString: function (dateSep, TimeSep, value){
                var date = new Date();
                if(zn.is(value, 'string')){
                    date = new Date(value);
                }
                if(!date){
                    return '';
                }

                var _year = date.getFullYear(),
                    _month = date.getMonth() + 1,
                    _date = date.getDate();

                _month = _month < 10 ? '0' + _month : _month;
                _date = _date < 10 ? '0' + _date : _date;

                var _h = date.getHours(),
                    _m = date.getMinutes(),
                    _s = date.getSeconds(),
                    _ms = date.getMilliseconds();

                _h = _h < 10 ? '0' + _h : _h;
                _m = _m < 10 ? '0' + _m : _m;
                _s = _s < 10 ? '0' + _s : _s;
                _ms = _ms < 10 ? '0' + _ms : _ms;

                return [_year, _month, _date].join(dateSep || '-') + ' ' + [_h, _m, _s].join(TimeSep || ':');
            },
            nowDateString: function (sep, value){
                var date = new Date();
                if(zn.is(value, 'string')){
                    date = new Date(value);
                }
                if(!date){
                    return '';
                }

                var _year = date.getFullYear(),
                    _month = date.getMonth() + 1,
                    _date = date.getDate();

                _month = _month < 10 ? '0' + _month : _month;
                _date = _date < 10 ? '0' + _date : _date;

                return [_year, _month, _date].join(sep || '');
            },
            nowTimeString: function (sep, millisecond, value){
                var date = new Date();
                if(zn.is(value, 'string')){
                    date = new Date(value);
                }
                if(!date){
                    return '';
                }

                var _h = date.getHours(),
                    _m = date.getMinutes(),
                    _s = date.getSeconds(),
                    _ms = date.getMilliseconds();

                _h = _h < 10 ? '0' + _h : _h;
                _m = _m < 10 ? '0' + _m : _m;
                _s = _s < 10 ? '0' + _s : _s;
                _ms = _ms < 10 ? '0' + _ms : _ms;

                var _values = [_h, _m, _s];
                if(millisecond) {
                    _values.push(_ms);
                }

                return _values.join(sep || ':');
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
            secondString: function (value){
                var theTime = parseInt(value);// 需要转换的时间秒 
                var theTime1 = 0;// 分 
                var theTime2 = 0;// 小时 
                var theTime3 = 0;// 天
                if(theTime > 60) { 
                    theTime1 = parseInt(theTime/60); 
                    theTime = parseInt(theTime%60); 
                    if(theTime1 > 60) { 
                        theTime2 = parseInt(theTime1/60); 
                        theTime1 = parseInt(theTime1%60); 
                        if(theTime2 > 24){
                            //大于24小时
                            theTime3 = parseInt(theTime2/24);
                            theTime2 = parseInt(theTime2%24);
                        }
                    } 
                } 
                var result = '';
                if(theTime > 0){
                    result = ""+parseInt(theTime)+"秒";
                }
                if(theTime1 > 0) { 
                    result = ""+parseInt(theTime1)+"分"+result; 
                } 
                if(theTime2 > 0) { 
                    result = ""+parseInt(theTime2)+"小时"+result; 
                } 
                if(theTime3 > 0) { 
                    result = ""+parseInt(theTime3)+"天"+result; 
                }
                return result;
            },
            dateFormat: function (fmt,date){
                var o = {
                    "M+" : date.getMonth()+1,                 //月份
                    "d+" : date.getDate(),                    //日
                    "h+" : date.getHours(),                   //小时
                    "m+" : date.getMinutes(),                 //分
                    "s+" : date.getSeconds(),                 //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S"  : date.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt)){
                    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substring(4 - RegExp.$1.length));
                }
        
                for(var k in o){
                    if(new RegExp("("+ k +")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substring((""+ o[k]).length)));
                    }
                }
        
                return fmt;
            },
            asString: function (date){
                if(!date){
                    date = new Date();
                }
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
