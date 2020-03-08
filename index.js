if(process && process.env && process.env.NODE_ENV) {
    if(process.env.NODE_ENV == 'development') {
        module.exports = require('./dist/zn.js');
    }else{
        module.exports = require('./dist/zn.minx.js');
    }
}else {
    module.exports = require('./dist/zn.minx.js');
}