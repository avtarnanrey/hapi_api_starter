import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from "../models/User";
import * as Hapi from "hapi";
import { AddUserRequest } from "../../types/User";
import * as Settings from "../settings";

exports.plugin = {
    register: async (server: Hapi.Server, options: any, next: any) => {
        server.route({
            method: "POST",
            path: "/register",
            handler: (req: any, h: any) => {
                const userData: AddUserRequest = {
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
                    if(!user) {
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
                        return { status: userData.email + " Registered!"}
                    } else {
                        return { error: "User already exists" }
                    }
                    return user;
                })
                .catch((err: any) => {
                    return "error: " + err;
                })
            }
        });

        server.route({
            method: "POST",
            path: "/login",
            handler: (req: any, h: any) => {
                return User.findOne({
                    where: {
                        email: req.payload.email
                    }
                })
                .then((user: any) => {
                    if (user) {
                        if (bcrypt.compareSync(req.payload.password, user.password)) {
                            let token = jwt.sign(user.dataValues, Settings.envVars.SECRET_KEY, {
                                expiresIn: 1440
                            })
                            return token
                        } else {
                            return;
                        }
                    } else {
                        return { error: "User does not exist"};
                    }
                })
                .catch(err => {
                    return { error: err };
                })
            }
        });

        server.route({
            method: "GET",
            path: "/profile",
            handler: (req: any, h: any) => {
                var decoded = jwt.verify(
                    req.headers["authorization"],
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
                        return { error: "User does not exist"};
                    }
                })
                .catch ( err => {
                    return { error: err };
                })
            }
        })
    },
    name: "users"
}