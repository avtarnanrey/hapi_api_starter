import * as bcrypt from "bcrypt";
import * as Hapi from "hapi";
import { IRegisterRequest, IRequest, ILoginRequest } from "../../../types/User";
import { User } from "../../models/User";
import * as Settings from "../../settings";
import * as jwt from "jsonwebtoken";

export default class UserController {

    public async registerUser(req: IRegisterRequest, h: Hapi.ResponseToolkit) {
        const userData = {
            first_name: req.payload.first_name,
            last_name: req.payload.last_name,
            email: req.payload.email,
            password: req.payload.password,
            phone: req.payload.phone
        }
        console.log(User);
        return User.findOne({
            where: {
                email: req.payload.email
            }
        })
            .then((user: any) => {
                if (!user) {
                    bcrypt.hash(req.payload.password, 10, (err, hash) => {
                        userData.password = hash;
                        return User.create(userData)
                            .then((user: any) => {
                                return true;
                            })
                            .catch((user: any) => {
                                return "error: " + err
                            })
                    })
                    return { status: userData.email + " Registered!" }
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
                        let token = jwt.sign(user.dataValues, Settings.envVars.SECRET_KEY, {
                            expiresIn: Settings.envVars.TOKEN_EXPIRY
                        })
                        return h.response({
                            message: "Login successful"
                        }).state((Settings.envVars.COOKIE_NAME), { token: token });
                    } else {
                        return;
                    }
                } else {
                    return { error: "User does not exist" };
                }
            })
            .catch(err => {
                return { error: err };
            })
    }

    public async profile(req: IRequest, h: Hapi.ResponseToolkit) {
        if (req.state[Settings.envVars.COOKIE_NAME] && req.state[Settings.envVars.COOKIE_NAME].token) {
            var decoded = jwt.verify(
                req.state[Settings.envVars.COOKIE_NAME].token,
                Settings.envVars.SECRET_KEY
            );

            return User.findOne({
                where: {
                    id: (decoded as any).id
                }
            })
                .then(user => {
                    if (user) {
                        return user;
                    } else {
                        return { error: "User does not exist" };
                    }
                })
                .catch(err => {
                    return { error: err };
                });
        } else {
            return {
                error: "User not logged in!"
            }
        }
    }

    public async logout(req: IRequest, h: Hapi.ResponseToolkit) {
        return h.response("User logged out!").unstate(Settings.envVars.COOKIE_NAME).code(200);
    }
}