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
                    }else {
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
                        this.on(key, events[key]);
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
                        _task.error = function (err){
                            this.error(err, _task)
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
                var _return = this.fire('error', err);
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
                this._data.push(data);
                var _result = this.fire('every', Array.from(data || []), { ownerFirst: true, method: 'apply' });
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

    zn.queue = function(argv){
        return new Queue(argv);
    };

})(zn);
