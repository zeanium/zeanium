!function(o){var h="yyyy-MM-dd hh:mm:ss.SSS";o.date=o.Class({static:!0,methods:{format:function(){},timestampToString:function(e){var t=null;return o.is(e,"string")&&(t=new Date(e)),e instanceof Date&&(t=e),t?t.toISOString().split("T")[1].split("Z")[0]:""},nowDateString:function(e,t){var n=new Date;if(o.is(t,"string")&&(n=new Date(t)),!n)return"";var r=n.getFullYear(),i=n.getMonth()+1,s=n.getDate();return[r,i=i<10?"0"+i:i,s=s<10?"0"+s:s].join(e||"")},nowTimeString:function(e,t){var n=new Date;if(o.is(t,"string")&&(n=new Date(t)),!n)return"";var r=n.getHours(),i=n.getMinutes(),s=n.getSeconds(),a=n.getMilliseconds();return[r=r<10?"0"+r:r,i=i<10?"0"+i:i,s=s<10?"0"+s:s,a=a<10?"0"+a:a].join(e||":")},getSecond:function(e){var t=+e.substring(1,e.length);switch(e.substring(0,1)){case"s":return 1e3*t;case"h":return 60*t*60*1e3;case"d":return 24*t*60*60*1e3}},asString:function(e){e=e||new Date;var t=h;"string"==typeof e&&(t=arguments[0],e=arguments[1]);var n=this.__addZero(e.getDate()),r=this.__addZero(e.getMonth()+1),i=this.__addZero(e.getFullYear()),s=this.__addZero(e.getFullYear().toString().substring(2,4)),a=-1<t.indexOf("yyyy")?i:s,o=this.__addZero(e.getHours()),g=this.__addZero(e.getMinutes()),u=this.__addZero(e.getSeconds()),d=this.__padWithZeros(e.getMilliseconds(),3),c=this.__offset(e);return t.replace(/dd/g,n).replace(/MM/g,r).replace(/y{1,4}/g,a).replace(/hh/g,o).replace(/mm/g,g).replace(/ss/g,u).replace(/SSS/g,d).replace(/O/g,c)},__padWithZeros:function(e,t){for(var n=e+"";n.length<t;)n="0"+n;return n},__addZero:function(e){return this.__padWithZeros(e,2)},__offset:function(e){var t=Math.abs(e.getTimezoneOffset()),n=String(Math.floor(t/60)),r=String(t%60);return 1==n.length&&(n="0"+n),1==r.length&&(r="0"+r),e.getTimezoneOffset()<0?"+"+n+r:"-"+n+r}}})}(zn);