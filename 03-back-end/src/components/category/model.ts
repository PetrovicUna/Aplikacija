class CategoryModel {
    categoryId: number;
    name: string;
    imagePath: string;
    parentCategoryId: number | null = null;
    parentCategory: CategoryModel | null = null;
    subcategories: CategoryModel[] = [];
    features: [];
}

export default CategoryModel;