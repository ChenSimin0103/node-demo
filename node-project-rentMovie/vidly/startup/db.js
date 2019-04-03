const winston = require('winston')
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
        .then(() => {winston.info('Connected to MongoDB...');console.log('数据库已连接')})
        // 屏蔽.catch能使 连接不到数据库时 抛出错误
        // .catch(err => console.error('Could not connect to MongoDB...'));
}