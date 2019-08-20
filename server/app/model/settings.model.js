module.exports = (sequelize, Sequelize) => {
  const Settings = sequelize.define('settings', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    navStyle: {
      type: Sequelize.STRING,
    },
    layoutType: {
      type: Sequelize.STRING,
    },
    themeType: {
      type: Sequelize.STRING,
    },
    colorSelection: {
      type: Sequelize.STRING,
    },
  })

  return Settings
}
