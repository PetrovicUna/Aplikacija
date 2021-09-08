import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import CategoryController from './components/category/controller';
import CategoryService from './components/category/service';

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

const categoryService: CategoryService = new CategoryService();
const categoryController: CategoryController = new CategoryController(categoryService);

application.get("/category", categoryController.getAll.bind(categoryController));
application.get("category/:id/subcategories/:sortOrder")

application.use((req, res) => {
    res.sendStatus(404);
});

application.use((err, req, res, next) => {
    res.status(err.status).send(err.type);
});

