import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import Router from './router';
import CategoryRouter from './components/category/router';
import CategoryService from './components/category/service';
import IApplicationResources from './common/IApplicationResources.interface';
import * as mysql2 from "mysql2/promise";

const application : express.Application = express();

application.use(cors({
    origin: "http://localhost:3000",
    credential: true,
}));

application.use(
    Config.server.static.route,
    express.static(Config.server.static.path, {
        index: Config.server.static.index,
        cacheControl: Config.server.static.cacheControl,
        maxAge: Config.server.static.maxAge,
        etag: Config.server.static.etag,
        dotfiles: Config.server.static.dotfiles,
    }),
);
const resources: IApplicationResources = {
    databaseConnection: await mysql2.createConnection({
        host: Config.database.host,
        port: Config.database.port,
        user: Config.database.user,
        password: Config.database.password,
        database: Config.database.database,
        charset: Config.database.charset,
        timezone: Config.database.timezone,
        supportBigNumbers: true,
    }),
}

resources.databaseConnection.connect();

resources.services = {
    categoryService:  new CategoryService(resources),

};

Router.setupRoutes(application, resources, [
    new CategoryRouter(),
    // ...
]);

application.use((req, res) => {
    res.sendStatus(404);
});

application.use((err, req, res, next) => {
    res.status(err.status).send(err.type);
});

