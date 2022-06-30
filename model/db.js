var Sequelize = require("sequelize");
var sequelize;

sequelize = new Sequelize("nike", "root", "8591", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: '+09:00',
    define:{
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true,
    }
})

var db = {}

db.items = require(__dirname + "/items.js")(
    sequelize,
    Sequelize.DataTypes
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;