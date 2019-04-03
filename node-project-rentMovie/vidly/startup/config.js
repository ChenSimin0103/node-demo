const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = function () {
    // 验证环境变量是否定义
    if (!config.get('jwtPrivateKey')) {
        throw new Error('jwtPrivateKey 未定义！')
        console.log('jwtPrivateKey 未定义！');
        // 用于退出进程，0代表成功处理（正常），其他数字代表有问题
        process.exit(1)
    }
}