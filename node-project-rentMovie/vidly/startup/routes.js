const express = require('express')
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

const error = require('../middleware/error')

module.exports = function (app) {
    // 添加中间件函数
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    // 错误处理中间件
    app.use(error)
}