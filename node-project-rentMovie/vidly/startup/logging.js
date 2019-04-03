const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
    // 定义打印信息的位置
    winston.add(new winston.transports.File({ filename: 'logfile.log' }))
    // 向数据库log信息
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }))

    // 使用winston 来捕获异常并存储为一个特殊的文件
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtException.log' }), 
        new winston.transports.Console({ colorize: true, prettyPrint: true })
        )
    // 捕捉异常（监听）
    process.on('uncaughtException', ex => {
        winston.error(ex.message, ex)
        // process.exit(1)
    })
    // throw new Error('a uncaughtException')
    // 捕捉未处理的promise rejections
    process.on('unhandledRejection', ex => {
        winston.error(ex.message, ex)
        process.exit(1)
    })
    // Promise.reject(new Error('a promise rejection'))
}