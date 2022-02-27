// 用户管理模块
const router = require('koa-router')()
const User = require('../models/userSchema')
const util = require('../utils/util')
const jwt = require('jsonwebtoken')
router.prefix('/users')

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body
     /* 返回数据库指定字段,有三种方式  
    1.'userId userName userEmail state role deptId roleList'
    2.{userId:1,userName:1,userEmail:0} 1是返回0不返回
    3.select('userId')
    */
    const res = await User.findOne({
    userName,
    userPwd
    },'userId userName userEmail state role deptId roleList')
    const data = res._doc

    const token = jwt.sign({
      data
    }, 'qiyu', { expiresIn: '1d' })
    
    if (res) {
      data.token = token
      ctx.body = util.success(data)
  } else {
      ctx.body = util.fail('账号或密码不正确')
  }
  } catch (error) {
      ctx.body = util.fail(error.msg)
  }
 
})
module.exports = router
