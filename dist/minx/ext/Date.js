!function(e){var c="yyyy-MM-dd hh:mm:ss.SSS";e.date=e.Class({static:!0,methods:{format:function(){},timestampToString:function(e){return new Date(e).toISOString().split("T")[1].split("Z")[0]},nowDateString:function(e,t){var n=new Date;null!=t&&null!=t&&(n=new Date(t));var r=n.getFullYear(),a=n.getMonth()+1,i=n.getDate();return[r,a=a<10?"0"+a:a,i=i<10?"0"+i:i].join(e||"")},nowTimeString:function(e,t){var n=new Date;null!=t&&null!=t&&(n=new Date(t));var r=n.getHours(),a=n.getMinutes(),i=n.getSeconds(),s=n.getMilliseconds();return[r=r<10?"0"+r:r,a=a<10?"0"+a:a,i=i<10?"0"+i:i,s=s<10?"0"+s:s].join(e||":")},getSecond:function(e){var t=+e.substring(1,e.length);switch(e.substring(0,1)){case"s":return 1e3*t;case"h":return 60*t*60*1e3;case"d":return 24*t*60*60*1e3}},asString:function(e){var t=c;"string"==typeof e&&(t=arguments[0],e=arguments[1]);var n=this.__addZero(e.getDate()),r=this.__addZero(e.getMonth()+1),a=this.__addZero(e.getFullYear()),i=this.__addZero(e.getFullYear().toString().substring(2,4)),s=-1<t.indexOf("yyyy")?a:i,o=this.__addZero(e.getHours()),g=this.__addZero(e.getMinutes()),l=this.__addZero(e.getSeconds()),u=this.__padWithZeros(e.getMilliseconds(),3),d=this.__offset(e);return t.replace(/dd/g,n).replace(/MM/g,r).replace(/y{1,4}/g,s).replace(/hh/g,o).replace(/mm/g,g).replace(/ss/g,l).replace(/SSS/g,u).replace(/O/g,d)},__padWithZeros:function(e,t){for(var n=e+"";n.length<t;)n="0"+n;return n},__addZero:function(e){return this.__padWithZeros(e,2)},__offset:function(e){var t=Math.abs(e.getTimezoneOffset()),n=String(Math.floor(t/60)),r=String(t%60);return 1==n.length&&(n="0"+n),1==r.length&&(r="0"+r),e.getTimezoneOffset()<0?"+"+n+r:"-"+n+r}}})}(zn);