import * as Hapi from "hapi";
import IDXController from "./plugins/IDXHandler";

exports.plugin = {
    register: async (server: Hapi.Server, options: any, next: any) => {

        server.route({
            method: "GET",
            path: "/login",
            handler: new IDXController().login
        });

        // server.route({
        //     method: "GET",
        //     path: "/profile",
        //     handler: new IDXController().profile 
        // });
        
        // server.route({
        //     method: "GET",
        //     path: "/logout",
        //     handler: new IDXController().logout 
        // });
    },
    name: "idx"
}