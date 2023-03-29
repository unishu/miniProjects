const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class user extends Model {}

//Sequelize will create this table if it doesn't exist on startup
user.init({
 firstName: { type: DataTypes.STRING, allowNull: false, required: true },
 lastName: { type: DataTypes.STRING, allowNull: false, required: true },
 emailId: { type: DataTypes.STRING, allowNull: false, required: true, unique: true },
 password: { type: DataTypes.STRING, allowNull: false, required: true}
}, {sequelize: sequelizeInstance, modelName: 'user',
timestamps: true, freezeTableName: true})

module.exports = user;