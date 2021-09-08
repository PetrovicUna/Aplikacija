import {Request, Response, NextFunction} from "express";
import BaseController from '../../common/BaseController';

class CategoryController extends BaseController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        const categories = await this.services.categoryService.getAll({
            loadSubcategories: true,
            loadFeatures: true,
        });

        res.send(categories);
    }
}

export default CategoryController;
