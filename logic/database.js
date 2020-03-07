const Sequelize = require('sequelize');
const env = require("../env.js");
const sequelize = new Sequelize(env.db_name , env.db_username, env.db_password, {
    host: env.db_host,
    dialect: 'mariadb',
    define: {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const Tags = sequelize.define('tags', {
    // attributes
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    modelName: 'tags'
});
module.exports.db = sequelize;
module.exports.Tags = Tags;