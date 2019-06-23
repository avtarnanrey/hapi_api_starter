import * as Hapi from "hapi";
import UserController from "./plugins/UserHandler";

exports.plugin = {
    register: async (server: Hapi.Server, options: any, next: any) => {
        server.route({
            method: "POST",
            path: "/register",
            handler: new UserController().registerUser
        });

        server.route({
            method: "POST",
            path: "/login",
            handler: new UserController().login
        });

        server.route({
            method: "GET",
            path: "/profile",
            handler: new UserController().profile 
        })
    },
    name: "users"
}