import * as Hapi from "hapi";
import * as Settings from "./settings";

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
    await server.start();
    console.log(`Server running on %s`, server.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();