// import { DataTypes } from "sequelize";
import { sequelize } from "../database/db";
import { UserStatic } from "../../types/User";

export const IDX = <UserStatic>sequelize.define("User", {
    // id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    // first_name: {
    //     type: DataTypes.STRING(100),
    //     allowNull: false,
    // },
    // last_name: {
    //     type: DataTypes.STRING(100),
    //     allowNull: false,
    // },
    // email: {
    //     type: DataTypes.STRING(255),
    //     allowNull: false,
    // },
    // password: {
    //     type: DataTypes.TEXT,
    //     allowNull: false,
    // },
    // phone: {
    //     type: DataTypes.STRING(10),
    //     allowNull: false,
    // }
});