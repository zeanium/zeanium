require('../index');

var queue = zn.queue({});

queue.push(function (task){
    console.log('1');
    task.stop(new Error('yangyxu error'));
    //throw new Error('xxx');
}).push(function (task, a, b, c){
    console.log('push: 2');
    //console.log(a, b, c);
    //throw new Error('xxxx');
    task.done(4, 5, 6);
}).push(function (task, a, b, c){
    console.log('push: 3');
    //console.log(a, b, c);
    //throw new Error('xxxx');
    task.done(7, 8, 9);
}).onFinally(function (queue, a, b, c){
    console.log('finally');
    console.log(a);
    //console.log(a, b, c);
}).onError(function (queue, err){
    //console.log('error: ', err);
    //return true;
}).start();

