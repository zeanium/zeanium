!function(e){e.string=e.Class({static:!0,methods:{decode:function(e){return e&&e.length&&(e=(e=(e=(e=(e=(e=(e=e.replace(/&amp;/g,"&")).replace(/&lt;/g,"<")).replace(/&gt;/g,">")).replace(/&nbsp;/g," ")).replace(/&#39;/g,"'")).replace(/&quot;/g,'"')).replace(/<br>/g,"\n")),e},encode:function(e){return e&&e.length&&(e=(e=(e=(e=(e=(e=e.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/ /g,"&nbsp;")).replace(/\'/g,"&#39;")).replace(/\"/g,"&quot;")),e}}})}(zn);