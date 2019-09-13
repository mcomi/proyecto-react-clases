var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-type,Accept,access-token,X-Key',
  )
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

require('./app/router/router.js')(app)

const db = require('./app/config/db.config.js')

const Role = db.role
const User = db.user
const Settings = db.settings

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: false }')
  initial()
})

//require('./app/route/project.route.js')(app);

// Create a Server
var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)
})

function initial() {
  Role.create({
    id: 1,
    name: 'USER',
  })

  Role.create({
    id: 2,
    name: 'ADMIN',
  })

  Role.create({
    id: 3,
    name: 'PM',
  })

  Settings.create({
    id: 1,
    user_id: 1,
    navStyle: 'NAV_STYLE_DRAWER',
    layoutType: 'LAYOUT_TYPE_BOXED',
    themeType: 'THEME_TYPE_LITE',
    colorSelection: 'THEME_COLOR_SELECTION_CUSTOMIZE',
  })

  User.create({
    id: 1,
    name: 'MAnuel',
    username: 'manuel',
    password: '$2a$08$AgpEFUJ3iNZoE0FJwnojIeZLL80s6W4nYKt4YXo9lcj3TsPtT4E.C',
    email: 'manuel@mail.com',
    direccion: 'Circuitoi MArio de la cueva',
    telefono: '55 56 22 48 00',
  })
}
