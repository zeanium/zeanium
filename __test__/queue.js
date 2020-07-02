require('../index');

var queue = zn.queue({});

queue.push(function (task){
    console.log('1');
    throw new Error('xxx');
}).push(function (task, a, b, c){
    console.log('push: 2');
    //console.log(a, b, c);
    //throw new Error('xxxx');
    task.done(4, 5, 6);
}).finally(function (queue, a, b, c){
    console.log('finally');
    console.log(a, b, c);
}).stop(function (queue, data){
    console.log('stop: ', data);
}).catch(function (queue, err){
    console.log('error: ', err);
    return false;
}).start();

