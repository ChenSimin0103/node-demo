// 这是用于用户权限的中间件
const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send('不允许访问，没有提供token')

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next()
    }
    catch(err) {
        res.status(400).send('非法token')
    }
}

module.exports = auth