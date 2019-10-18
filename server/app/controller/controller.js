const db = require('../config/db.config.js')
const config = require('../config/config.js')
const User = db.user
const Role = db.role
const Settings = db.settings
const Password = require('node-php-password')

const Op = db.Sequelize.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  // Save User to Database
  console.log('Processing func -> SignUp')

  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(user => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      })
        .then(roles => {
          user.setRoles(roles).then(() => {
            res.status(200).send({ok: true})
          })
        })
        .catch(err => {
          res.status(500).send('Error -> ' + err)
        })
    })
    .catch(err => {
      res.status(500).send('Fail! Error -> ' + err)
    })
}

exports.signin = (req, res) => {
  var hash = '$2y$10$5I7nsbjyPibVdqJ.KR0W1.viFbE12C75bu0vPT9YapmNGS6PWAQJS'

  if (Password.verify('mateo2553', hash)) {
    console.log('si sirvio') //Authentication OK
  } else {
    console.log('fallo') //Authentication FAILED
  }
  console.log('Sign-In')
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).send('User Not Found.')
      }

      var passwordIsValid = Password.verify(req.body.password, user.password)
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({auth: false, accessToken: null, reason: 'Invalid Password!'})
      }

      var token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      })

      res.status(200).send({auth: true, accessToken: token})
    })
    .catch(err => {
      res.status(500).send('Error -> ' + err)
    })
}

exports.userContent = (req, res) => {
  console.log('Buscando info usuario: ' + req)
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'username', 'email', 'direccion', 'telefono'],
    // include: [
    //   {
    //     model: Role,
    //     attributes: ['id', 'name'],
    //     through: {
    //       attributes: ['userId', 'roleId'],
    //     },
    //   },
    // ],
  })
    .then(user => {
      res.status(200).json({
        description: 'User Content Page',
        user: user,
      })
    })
    .catch(err => {
      res.status(500).json({
        description: 'Can not access User Page',
        error: err,
      })
    })
}

exports.getSettings = (req, res) => {
  Settings.findOne({
    where: {user_id: req.userId},
  })
    .then(settings => {
      res.status(200).json({
        settings,
      })
    })
    .catch(err => {
      res.status(500).json({
        description: 'No encontre settings',
        error: err,
      })
    })
}

exports.adminBoard = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'username', 'email'],
    include: [
      {
        model: Role,
        attributes: ['id', 'name'],
        through: {
          attributes: ['userId', 'roleId'],
        },
      },
    ],
  })
    .then(user => {
      res.status(200).json({
        description: 'Admin Board',
        user: user,
      })
    })
    .catch(err => {
      res.status(500).json({
        description: 'Can not access Admin Board',
        error: err,
      })
    })
}

exports.managementBoard = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'username', 'email'],
    include: [
      {
        model: Role,
        attributes: ['id', 'name'],
        through: {
          attributes: ['userId', 'roleId'],
        },
      },
    ],
  })
    .then(user => {
      res.status(200).json({
        description: 'Management Board',
        user: user,
      })
    })
    .catch(err => {
      res.status(500).json({
        description: 'Can not access Management Board',
        error: err,
      })
    })
}
