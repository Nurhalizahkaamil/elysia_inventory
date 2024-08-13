import db from "../database/db";
import type { AddProductDto, UpdateProductDto } from "../dtos/products";

async function getProducts() {
  const products = await db.product.findMany({
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

  return products;
}

async function getProductById(id: number) {
  const product = await db.product.findFirstOrThrow({
    where: {
      id,
    },
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

  return product;
}

async function createProduct(data: AddProductDto) {
  const { name, description, price, expiry_date, status, category_id, supplier_id } = data;
  return await db.product.create({
    data: {
      name,
      description,
      price,
      expiry_date,
      status,
      category_id,
      supplier_id,
    },
  });
}

async function updateProductById(id: number, data: UpdateProductDto) {
  return await db.product.update({
    where: {
      id,
    },
    data,
  });
}

async function deleteProductById(id: number) {
  return await db.product.delete({
    where: {
      id,
    },
  });
}

export const ProductsRepository = {
  getProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
