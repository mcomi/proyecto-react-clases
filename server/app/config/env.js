const env = {
  database: 'react_proyecto1_clases',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'mysql',
  //port: 14792,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

module.exports = env
