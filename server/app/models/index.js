const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.actor = require("./actor.model")(sequelize, DataTypes);
db.movie = require("./movie.model")(sequelize, DataTypes);
db.actor.belongsToMany(db.movie, {
  through: 'actor_movie',
  timestamps: false,
  as :"movies",
  foreignKey:'actor_id'
});
db.movie.belongsToMany(db.actor, {
  through: 'actor_movie',
  timestamps: false,
  as: "actors",
  foreignKey: "movie_id"
});
module.exports=db;
