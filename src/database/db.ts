import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("hapilogin", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

// module.exports = sequelize;