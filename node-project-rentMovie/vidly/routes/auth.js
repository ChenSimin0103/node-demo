// 登陆接口
const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // 登陆逻辑：
    // 验证请求是否符合规范
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    // 由邮箱获得用户数据
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('邮箱或密码错误 ！')
    // 验证密码
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('邮箱或密码错误 ！')

    // 使用 jwt 计算出 token，使用存在环境变量里的key
    const token = jwt.sign({_id:user._id,isAdmin: user.isAdmin}, config.get('jwtPrivateKey'))

    // 验证通过
    res.send(token)
});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router