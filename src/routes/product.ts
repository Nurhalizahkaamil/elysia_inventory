import { Elysia, t } from 'elysia';
import { ProductsHandler } from '../handler/products';
import type { AddProductDto, UpdateProductDto } from '../dtos/products';

export const productsRoutes = (app: Elysia) => (
  // Get all products
  app.get('/api/products', async () => {
    const result = await ProductsHandler.getAll();
    return result.success
      ? { status: 200, body: result.data }
      : { status: 500, body: { message: result.message, error: result.error } };
  }),

  // Get product by ID
  app.get('/api/products/:id', async ({ params }) => {
    const productId = parseInt(params.id);
    const result = await ProductsHandler.getById(productId);

    return result.success
      ? { status: 200, body: result.data }
      : result.message === 'Product not found'
      ? { status: 404, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }),

  // Create a new product
  app.post('/api/products', async ({ body }) => {
    const productData = body as AddProductDto;

    const result = await ProductsHandler.create(productData);
    return result.success
      ? { status: 201, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }, {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      price: t.Number(),
      expiry_date: t.Date(),
      status: t.String(),
      category_id: t.Number(),
      supplier_id: t.Number(),
    })
  }),

  // Update a product by ID
  app.put('/api/products/:id', async ({ params, body }) => {
    const productId = parseInt(params.id);
    const updateData = body as UpdateProductDto;

    const result = await ProductsHandler.updateById(productId, updateData);
    return result.success
      ? { status: 200, body: { message: result.message } }
      : result.message === 'Product not found'
      ? { status: 404, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      description: t.Optional(t.String()),
      price: t.Optional(t.Number()),
      expiry_date: t.Optional(t.Date()),
      status: t.Optional(t.String()),
      category_id: t.Optional(t.Number()),
      supplier_id: t.Optional(t.Number()),
    })
  }),

  // Delete a product by ID
  app.delete('/api/products/:id', async ({ params }) => {
    const productId = parseInt(params.id);

    const result = await ProductsHandler.deleteById(productId);
    return result.success
      ? { status: 200, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  })
);
