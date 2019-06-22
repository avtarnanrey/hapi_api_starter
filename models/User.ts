import { Model, DataTypes, BuildOptions } from "sequelize";
import { sequelize } from "../database/db";

class Users extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Users;
}

export const User = <UserStatic>sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
});

// module.exports = sequelize.define(
//     'users',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         first_name: {
//             type: Sequelize.STRING
//         },
//         last_name: {
//             type: Sequelize.STRING
//         },
//         email: {
//             type: Sequelize.STRING
//         },
//         password: {
//             type: Sequelize.STRING
//         },
//         phone: {
//             type: Sequelize.STRING
//         }
//     },
//     {
//         timestamps: false
//     }
// );