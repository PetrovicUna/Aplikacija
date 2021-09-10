import BaseController from '../../common/BaseController';
import { Request, Response } from "express";


export default class UserController extends BaseController {
    public async getAll(req: Request, res: Response) {
        res.send(await this.services.userService.getAll());
    }

    public async getById(req: Request, res: Response) {
        const id = +(req.params.id);

        if (id <= 0) return res.status(400).send("The ID value cannot be smaller than 1.");

        const item = await this.services.userService.getById(id);

        if (item === null) return res.sendStatus(404);

        res.send(item);
    }
}
