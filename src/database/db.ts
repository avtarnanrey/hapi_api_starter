import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("hapi_app_starter", "root", "", {
    host: "localhost",
    dialect: "mysql"
});