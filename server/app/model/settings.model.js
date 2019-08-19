module.exports = (sequelize, Sequelize) => {
  const Settings = sequelize.define('settings', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
  })

  return Settings
}
