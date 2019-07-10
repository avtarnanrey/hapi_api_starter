import * as Hapi from "@hapi/hapi";
import { UserController } from "./plugins/Users";

exports.plugin = {
    register: async (server: Hapi.Server, options: any, next: any) => {
        server.route({
            method: "POST",
            path: "/register",
            options: { auth: false },
            handler: new UserController().registerUser
        });

        server.route({
            method: "POST",
            path: "/login",
            options: { auth: false },
            handler: new UserController().login
        });

        server.route({
            method: "GET",
            path: "/profile/{id}",
            options: { auth: "jwt" },
            handler: new UserController().profile 
        });
        
        server.route({
            method: "GET",
            path: "/logout",
            options: { auth: "jwt" },
            handler: new UserController().logout 
        });
    },
    name: "users"
}