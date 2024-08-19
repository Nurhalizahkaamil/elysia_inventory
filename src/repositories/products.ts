import db from "../database/db";
import type { AddProductDto, UpdateProductDto } from "../dtos/products";

async function getProducts() {
    return await db.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            expiry_date: true,
            status: true,
            category_id: true,
            supplier_id: true,
        },
    });
}

async function getProductById(id: number) {
    return await db.product.findFirstOrThrow({
        where: { id },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            expiry_date: true,
            status: true,
            category_id: true,
            supplier_id: true,
        },
    });
}

async function createProduct(data: AddProductDto) {
    return await db.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            expiry_date: data.expiry_date,
            status: data.status,
            category_id: data.category_id,
            supplier_id: data.supplier_id,
        },
    });
}

async function updateProductById(id: number, data: UpdateProductDto) {
    return await db.product.update({
        where: { id },
        data,
    });
}

async function deleteProductById(id: number) {
    return await db.product.delete({
        where: { id },
    });
}

export const ProductsRepository = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
