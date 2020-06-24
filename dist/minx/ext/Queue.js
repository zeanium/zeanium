!function(t){var s=Array.prototype.slice,i=0,n=3,r=t.Class({events:["init","finished"],properties:{status:{value:i,get:function(){return this._status}}},methods:{init:function(t){},doTask:function(t,s){var i;t&&((i=s||[]).unshift(this),t.handler.apply(t.context,i))},done:function(){this._status=n,this._data=s.call(arguments),this.fire("finished",this._data),this.off("finished")}}}),e=t.Class({events:["clear","insert","pause","resume","exception","every","finally"],properties:{count:{get:function(){return this._tasks.length}}},methods:{init:function(t){this._exceptions=[],this._finallys=[],this._everys=[],this._tasks=[],this._taskProcessor=[],this._lastTask=null,this._data=[],this._max=(t||{}).max||1},destroy:function(){this._everys=[],this._tasks=[],this._taskProcessor=[],this.fire("finally",this._data,{method:"apply"}),this.super()},clear:function(){this._tasks=[]},pause:function(t){return this._paused=!0,0<t&&(this._pauseTimer=setTimeout(function(){this.resume()}.bind(this),t)),this.fire("pause"),this},resume:function(){return this._pauseTimer&&clearTimeout(this._pauseTimer),this._paused=!1,this.fire("resume"),this.doTask(),this},exception:function(t,s){return this.on("exception",t,s||this),this},catch:function(t){return this.fire("exception",t),this},finally:function(t,s){return this.on("finally",t,s||this),this},every:function(t,s){return this.on("every",t,s||this),this},unshift:function(t,s){return this.insert(t,s,0),this},push:function(t,s){return this.insert(t,s,-1),this},inserts:function(t,s,i){var e=t||[],n=i||0,r=this._tasks[0],h=null,a=null,e=e.map(function(t){return a={handler:t,context:s||this},h&&((a.previous=h).next=a),h=a}.bind(this));return r&&((h.next=r).previous=h),e.unshift(0),e.unshift(n),this._tasks.splice.apply(this._tasks,e),this},insert:function(t,s,i){var e={handler:t,context:s||this},n=i||-1;switch(n){case-1:this._lastTask&&(e.previous=e,this._lastTask.next=e),this._lastTask=e,this._tasks.push(e);break;case 0:var r=this._tasks[0];r&&((e.next=r).previous=e),this._tasks.unshift(e);break;default:this._tasks.splice(n,0,e)}return this.fire("insert",e),this},getTaskProcessor:function(){for(var t=null,s=this._taskProcessor.length,i=0;i<s;i++)if((t=this._taskProcessor[i]).status==n)return t;if(!t&&this._max>s){var e=new r;return e.queue=this,e.on("finished",this.__onProcessorFinished.bind(this),this),e}},start:function(){return this._data=[],this.doTask()},doTask:function(t){var s,i=this._tasks.shift();return i?(s=this.getTaskProcessor())&&(i.previousResult=t,s.doTask(i,t)):this.destroy(),this},__onProcessorFinished:function(t,s){this._data.push(s),this.fire("every",s,{method:"apply"}),this.doTask(s)}}});t.queue=function(t){return new e(t)}}(zn);