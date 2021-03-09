const zn = require('../dist/zn.js');

require('../dist/zn.js');

zn.logger.define('tag', {
    color: 'black'
});

var a = zn.Class({

});
var b = function (){

}

zn.debug('a: ', zn.isZNFunction(a));
zn.debug('b: ', zn.isZNFunction(b));

zn.logger.on('info');
zn.log('log: ');
zn.info('info: ');
zn.debug('debug: ');
zn.error('error: ');
zn.warn('warn: ');
zn.ok('ok: ');
zn.trace('trace: ');

zn.logger.tag('xxxx');


var queue = zn.queue({}, {
    error: function (sender, err){
        console.log('error: ', err);
        return false;
    },
    stop: function (sender, err){
        console.log('stop: ', err);
        //return false;
    },
    finally: function (sender, a, b, c){
        console.log('finally: ', a, b, c);
    }
});
queue.push(function (task){
    zn.info('1');
    //throw new Error('a');
    setTimeout(()=>task.done(2), 5000);
}).push(function (task, a){
    zn.info(a);
    task.done(a);
}).push(function (task, a){
    zn.info(a);
    setTimeout(()=>task.done(4), 5000);
}).push(function (task, a){
    zn.info(a);
    setTimeout(()=>task.done(5), 5000);
}).push(function (task, a){
    zn.info(a);
    setTimeout(()=>task.done(6), 5000);
}).push(function (task, a){
    zn.info(a);
    setTimeout(()=>task.done(7, 8, 9), 5000);
}).push(function (task, a, b, c){
    task.done(a, b, c);
}).start();

