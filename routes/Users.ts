// import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { User } from "../models/User";
import * as Hapi from "hapi";

process.env.SECRET_KEY = "secret";

exports.plugin = {
    register: async (server: Hapi.Server, options: any, next: any) => {
        server.route({
            method: "POST",
            path: "/register",
            handler: (req: any, h: any) => {
                const userData = {
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
                                return { status: user.email + " Registered!"}
                            })
                            .catch((user: any) => {
                                return "error: " + err
                            })
                        })
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
            method: 'GET',
            path: '/test',
            handler: (request: any, h: any) => {

                return 'hello, world';
            }
        });

        server.route({
             method: "POST",
             path: "/test",
              handler: (request: Hapi.Request, h: any) => {
               return "This is a POST method";
              }
            });

    },
    name: "api"
}