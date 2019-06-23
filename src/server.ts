import * as Hapi from "hapi";
import * as Settings from "./settings";
import { IRequest } from "../types/User";

const server: Hapi.Server = new Hapi.Server({
    host: "localhost",
    port: Settings.envVars.PORT,
    routes: {
        cors: true
    }
});

const init = async () => {
    await server.register(require("./routes/Users"),
        {
            routes: {
                prefix: "/users"
            }
        }
    )

    // Init server.state()
    server.state(Settings.envVars.COOKIE_NAME, {
        ttl: Settings.envVars.TOKEN_EXPIRY as number || 1440,
        encoding: "base64json",
        isSecure: Settings.envVars.ENV === "production"
    })
    
    // 404 Handling
    server.route({
        method: "*",
        path: "/{any*}",
        handler: (req: IRequest, h: Hapi.ResponseToolkit) => {
            return {
                error: "404 Error! Page Not Found!"
            };
        }
    })

    await server.start();
    console.log(`Server running on %s`, server.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();