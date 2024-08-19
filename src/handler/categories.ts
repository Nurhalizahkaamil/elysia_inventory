import { AddCategoryDto, UpdateCategoryDto } from "../dtos/category";
import { CategoriesRepository } from "../repositories/categories";

async function getAll() {
    try {
        const categories = await CategoriesRepository.getCategories();
        return { success: true, data: categories };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve categories', error };
    }
}

async function getById(id: number) {
    try {
        const category = await CategoriesRepository.getCategoryById(id);
        if (!category) {
            return { success: false, message: 'Category not found' };
        }
        return { success: true, data: category };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve category', error };
    }
}

async function create(category: AddCategoryDto) {
    try {
        
        const newCategory = {
            ...category,
            createdAt: new Date(),  
            updatedAt: new Date(),  
        };

        const createdCategory = await CategoriesRepository.createCategory(newCategory);
        return { success: true, message: 'Category created successfully', data: createdCategory };
    } catch (error) {
        return { success: false, message: 'Failed to create category', error };
    }
}

async function updateById(id: number, updateData: UpdateCategoryDto) {
    try {
        const existingCategory = await CategoriesRepository.getCategoryById(id);
        if (!existingCategory) {
            return { success: false, message: 'Category not found' };
        }

        
        const updatedCategoryData = {
            ...updateData,
            updatedAt: new Date(),  
        };

        const updatedCategory = await CategoriesRepository.updateCategoryById(id, updatedCategoryData);
        return { success: true, message: 'Category updated successfully', data: updatedCategory };
    } catch (error) {
        return { success: false, message: 'Failed to update category', error };
    }
}

async function deleteById(id: number) {
    try {
        await CategoriesRepository.deleteCategoryById(id);
        return { success: true, message: 'Category deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete category', error };
    }
}

export const CategoriesHandler = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
