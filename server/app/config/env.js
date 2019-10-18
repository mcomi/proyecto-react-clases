const env = {
  database: 'react',
  username: 'root',
  password: 'pase14792',
  host: 'localhost',
  dialect: 'mysql',
  port: 14792,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

module.exports = env
