!function(t){var e=[97,123],n=[65,91];t.char=t.Class({static:!0,methods:{getRandomChar:function(){return this.getUppercaseLetters()[Math.floor(26*Math.random())]},lowercase:function(r){return t.is(r,"string")?r.replace(/[A-Z]/g,function(r){return String.fromCharCode(32|r.charCodeAt(0))}):r},uppercase:function(r){return t.is(r,"string")?r.replace(/[a-z]/g,function(r){return String.fromCharCode(-33&r.charCodeAt(0))}):r},toUnicode:function(r){for(var t=[],e=0,n=r.length;e<n;e++)t.push(r.charCodeAt(e));return t},toChar:function(r,t){for(var e=[],n=r;n<t;n++)e.push(String.fromCharCode(n));return e},getLowercaseLetters:function(){var r=e;return this.toChar(r[0],r[1])},getUppercaseLetters:function(){var r=n;return this.toChar(r[0],r[1])},getStringFromChar:function(r,t){for(var e=r||"A",n=t||26,o=[],a=0;a<n;a++)o.push(String.fromCharCode(e.charCodeAt(0)+a));return o.join("")}}})}(zn);