
function admin(req, res, next) {
    // 如果不是 admin 身份登陆
    if(!req.user.isAdmin) return res.status(403).send('你不是权限汪')

    next()
}



module.exports = admin