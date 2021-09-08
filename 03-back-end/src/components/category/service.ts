import CategoryModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';

class CategoryModelAdapterOptions {
    loadParentCategory: boolean = false;
    loadSubcategories: boolean = false;
    loadFeatures: boolean = false;
}

class CategoryService {
    protected async adaptModel(
        row: any,
        options: Partial<CategoryModelAdapterOptions> = { }
    ): Promise<CategoryModel> {
        const item: CategoryModel = new CategoryModel();

        item.categoryId = +(row?.category_id);
        item.name = row?.name;
        item.imagePath = row?.image_path;
        item.parentCategoryId = row?.parent__category_id;

        if (options.loadParentCategory && item.parentCategoryId !== null) {
            const data = await this.getById(item.parentCategoryId);

            if (data instanceof CategoryModel) {
                item.parentCategory = data;
            }
        }

        if (options.loadSubcategories) {
            const data = await this.getAllByParentCategoryId(
                item.categoryId,
                {
                    loadSubcategories: options.loadSubcategories,
                    loadFeatures: options.loadFeatures,
                }
            );

            if (Array.isArray(data)) {
                item.subcategories = data;
            }
        }

        if (options.loadFeatures) {
            item.features = await this.services.featureService.getAllByCategoryId(item.categoryId);
        }

        return item;
    }
}


export default CategoryService;
