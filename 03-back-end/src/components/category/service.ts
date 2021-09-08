import CategoryModel from './model';
import IErrorResponse from '../../common/IErrorResponse.interface';
import BaseService from '../../common/BaseService';
import IModelAdapterOptions from '../../common/IModelAdapterOptions.interface';

class CategoryModelAdapterOptions implements IModelAdapterOptions {
    loadParentCategory: boolean = false;
    loadSubcategories: boolean = false;
    loadFeatures: boolean = false;
}

class CategoryService extends BaseService<CategoryModel> {
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

        return item;
    }

    public async getAll(
        options: Partial<CategoryModelAdapterOptions> = { },
    ): Promise<CategoryModel[]|IErrorResponse> {
        return await this.getAllByFieldNameFromTable<CategoryModelAdapterOptions>(
            'category',
            'parent__category_id',
            null,
            options,
        );
    }

    public async getAllByParentCategoryId(
        parentCategoryId: number,
        options: Partial<CategoryModelAdapterOptions> = { },
    ): Promise<CategoryModel[]|IErrorResponse> {
        return await this.getAllByFieldNameFromTable<CategoryModelAdapterOptions>(
            'category',
            'parent__category_id',
            parentCategoryId,
            options,
        );
    }

    public async getById(
        categoryId: number,
        options: Partial<CategoryModelAdapterOptions> = { },
    ): Promise<CategoryModel|null|IErrorResponse> {
        return await this.getByIdFromTable<CategoryModelAdapterOptions>(
            "category",
            categoryId,
            options,
        );
    }
}
export default CategoryService;
