> 记录

token的使用：
1. 不要再服务端存储token，在客户端存储token，在服务端做验证
2. 如果存在服务器端的token被泄露，黑客将不需要密码就能访问服务端所有接口
3. 使用https传送token
4. token 可以看作是携带一些信息（如：用户id，权限身份）的载体，加密传输

http状态码:
401：认证失败
403：禁止访问
404：未找到
500: 服务端错误

错误处理：
使用promise 要用.catch来处理未知错误 ，在async/await 里则是使用 try-catch 

用于错误处理的猴子补丁的插件：express-async-errors

log任何信息（不只是错误信息）的插件：winston
向mongoDB log并存储信息：winston-mongodb

process是node的进程，通过process.on可以监听进程启动和运行中的未预知错误 （uncaughtException , unhandledRejection）
process.exit() 用于退出进程，状态码：0为正常 ,其他数字为异常


> 测试包括：单元测试（unit-test）, 集成测试(integration) , 端到端测试(end-to-end)

测试的好处：
1. 更频繁更快的测试
2. 在部署前找到问题
3. 容易重构代码（保证重构以后不出问题）
4. 省下时间，关注代码质量

建议：
1. 偏好单元测试而不是 端到端测试
2. 使用集成测试弥补单元测试
3. 尽量少使用端到端测试，用在关键功能上

测试金字塔：                                  /\
                                            /  \
                                           /    \
                                          /      \
                                         /  E2E   \
                                        /——————————\
                                       /            \
                                      /  integration \
                                     /————————————————\
                                    /                  \
                                   /       Unit         \
                                  /______________________\
                                      