import * as express from "express";
import * as cors from "cors";

const application : express.Application = express();

application.use(cors({
    origin: "http://localhost:3000",
    credential: true,
}));

application.use((req, res) => {
    res.sendStatus(404);
});

application.use((err, req, res, next) => {
    res.status(err.status).send(err.type);
});

