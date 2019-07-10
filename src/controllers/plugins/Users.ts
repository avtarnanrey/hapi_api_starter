import * as bcrypt from "bcrypt";
import * as Hapi from "@hapi/hapi";
import { IRegisterRequest, IRequest, ILoginRequest } from "../../types";
import { User } from "../../models/user";
import * as Settings from "../../settings";
import { generateToken } from "../../utils";

export class UserController {

    public async registerUser(req: IRegisterRequest, h: Hapi.ResponseToolkit) {
        const payload = {
            first_name: req.payload.first_name,
            last_name: req.payload.last_name,
            email: req.payload.email,
            password: req.payload.password,
            phone: req.payload.phone
        }
        return User.findOne({
            where: {
                email: req.payload.email
            }
        })
            .then((user: any) => {
                if (!user) {
                    bcrypt.hash(req.payload.password, 10, (err, hash) => {
                        payload.password = hash;
                        return User.create(payload)
                            .then((user: any) => {
                                return true;
                            })
                            .catch((user: any) => {
                                return "error: " + err
                            })
                    })
                    return { status: payload.email + " Registered!" }
                } else {
                    return { error: "User already exists" }
                }
            })
            .catch((err: any) => {
                return "error: " + err;
            })
    };

    public async login(req: ILoginRequest, h: Hapi.ResponseToolkit) {
        return User.findOne({
            where: {
                email: req.payload.email
            }
        })
            .then((user: any) => {
                if (user) {
                    if (bcrypt.compareSync(req.payload.password, user.password)) {
                        let tokenUser = {
                            id: user.dataValues.id,
                            first_name: user.dataValues.first_name,
                            last_name: user.dataValues.last_name,
                            email: user.dataValues.email,
                            useExp: new Date().getTime() + 1000 * 60 * 30
                        }
                        let token = generateToken(tokenUser)
                        return h.response({
                            message: "Login successful"
                        }).header("Authenticate", JSON.stringify("JWT " + token), {override: true});
                    } else {
                        return {
                            error: "Password did not match!"
                        };
                    }
                } else {
                    return { error: "User does not exist" };
                }
            })
            .catch((err: any) => {
                return { error: err };
            })
    }

    public async profile(req: IRequest, h: Hapi.ResponseToolkit) {
        return User.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((user: any) => {
                if (user) {
                    if (delete user.dataValues.password) {
                        return user;
                    }
                } else {
                    return { error: "User does not exist" };
                }
            })
            .catch((err: any) => {
                return { error: err };
            });
    }

    public async logout(req: IRequest, h: Hapi.ResponseToolkit) {
        return h.response("User logged out!").unstate(Settings.envVars.COOKIE_NAME).code(200);
    }
}