import { AddProductDto, UpdateProductDto } from "../dtos/products";
import { ProductsRepository } from "../repositories/products";

async function getAll() {
    try {
        const products = await ProductsRepository.getProducts();
        return { success: true, data: products };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve products', error };
    }
}

async function getById(id: string) {
    try {
        const product = await ProductsRepository.getProductById(id);
        if (!product) {
            return { success: false, message: 'Product not found' };
        }
        return { success: true, data: product };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve product', error };
    }
}

async function create(product: AddProductDto) {
    try {
        await ProductsRepository.createProduct(product);
        return { success: true, message: 'Product created successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to create product', error };
    }
}

async function updateById(id: string, updateData: UpdateProductDto) {
    try {
        const existingProduct = await ProductsRepository.getProductById(id);
        if (!existingProduct) {
            return { success: false, message: 'Product not found' };
        }

        await ProductsRepository.updateProductById(id, updateData);
        return { success: true, message: 'Product updated successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to update product', error };
    }
}

async function deleteById(id: string) {
    try {
        await ProductsRepository.deleteProductById(id);
        return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete product', error };
    }
}

export const ProductsHandler = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
