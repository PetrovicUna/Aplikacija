import {Request, Response, NextFunction} from "express";
import BaseController from '../../common/BaseController';
import CategoryService from "./service";
import CategoryModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';

class CategoryController extends BaseController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const categories = await this.services.categoryService.getAll({
            loadSubcategories: true,
            loadFeatures: true,
        });

        res.send(categories);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id: string = req.params.id;

        const categoryId: number = +id;

        if (categoryId <= 0) {
            res.sendStatus(400);
            return;
        }

        const data: CategoryModel|null|IErrorResponse = await this.services.categoryService.getById(
            categoryId,
            {
                loadSubcategories: true,
                loadFeatures: true,
            }
        );

        if (data === null) {
            res.sendStatus(404);
            return;
        }

        if (data instanceof CategoryModel) {
            res.send(data);
            return;
        }

        res.status(500).send(data);
    }
}

export default CategoryController;
