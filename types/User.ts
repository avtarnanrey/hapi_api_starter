import { Model, BuildOptions } from "sequelize";

export class Users extends Model {
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

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Users;
}

export interface AddUserRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
}