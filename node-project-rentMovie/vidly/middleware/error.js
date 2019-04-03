const winston = require('winston')

module.exports = function (err, req, res, next) {
    winston.error(err.message, err)


    // 打印异常
    res.status(500).send('服务端错误')
}