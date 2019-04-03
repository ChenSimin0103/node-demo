
 // 此中间件用于提取 try-catch逻辑  类似工厂模式
 module.exports = function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res)
    } 
    catch (err) {
      next(err)
    }
  }
}