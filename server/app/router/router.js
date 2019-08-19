const verifySignUp = require('./verifySignUp')
const authJwt = require('./verifyJwtToken')

module.exports = function(app) {
  const controller = require('../controller/controller.js')

  app.post(
    '/auth/signup',
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup,
  )

  app.post('/auth/login', controller.signin)

  //app.get('/auth/me', [authJwt.verifyToken], controller.userContent)

  app.post('/auth/me', [authJwt.verifyToken], controller.userContent)

  app.get(
    '/test/pm',
    [authJwt.verifyToken, authJwt.isPmOrAdmin],
    controller.managementBoard,
  )

  app.get(
    '/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard,
  )
}
