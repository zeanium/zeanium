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
