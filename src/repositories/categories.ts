import db from "../database/db";
import type { AddCategoryDto, UpdateCategoryDto } from "../dtos/category";

async function getCategories() {
    return await db.category.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

async function getCategoryById(id: number) {
    return await db.category.findFirstOrThrow({
        where: { id },
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

async function createCategory(data: AddCategoryDto) {
    return await db.category.create({
        data: {
            name: data.name,
            description: data.description,
            status: data.status,
            // Pastikan field timestamps sesuai dengan schema database
            createdAt: data.createdAt,  // Nama field di DTO dan database harus konsisten
            updatedAt: data.updatedAt,
        },
    });
}

async function updateCategoryById(id: number, data: UpdateCategoryDto) {
    // Tambahkan pengelolaan updatedAt di sini
    return await db.category.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date(),  // Set updatedAt ke waktu sekarang
        },
    });
}

async function deleteCategoryById(id: number) {
    return await db.category.delete({
        where: { id },
    });
}

export const CategoriesRepository = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById,
};
