import * as Hapi from "hapi";
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
    new(values?: object, options?: BuildOptions): Users;
}

export interface ICredentials extends Hapi.AuthCredentials {
    id: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
    credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
    auth: IRequestAuth;
}

export interface ILoginRequest extends IRequest {
    payload: {
        email: string;
        password: string;
    }
}

export interface IRegisterRequest extends IRequest {
    payload: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        phone: string;
    }
}