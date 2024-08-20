import { Elysia, t } from 'elysia';
import { CategoriesHandler } from '../handler/categories';
import type { AddCategoryDto, UpdateCategoryDto } from '../dtos/category';

export const categoriesRoutes = (app: Elysia) => (

  app.get('/api/categories', async () => {
    const result = await CategoriesHandler.getAll();
    return result.success
      ? { status: 200, body: JSON.stringify(result.data) }
      : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
  }),


  app.get('/api/categories/:id', async ({ params }) => {
    const categoryId = parseInt(params.id);
    const result = await CategoriesHandler.getById(categoryId);

    return result.success
      ? { status: 200, body: JSON.stringify(result.data) }
      : result.message === 'Category not found'
      ? { status: 404, body: JSON.stringify({ message: result.message }) }
      : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
  }),


  app.post('/api/categories', async ({ body }) => {
    const categoryData = body as unknown as AddCategoryDto;

    const result = await CategoriesHandler.create(categoryData);
    return result.success
      ? { status: 201, body: JSON.stringify({ message: result.message }) }
      : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
  }, {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      status: t.String(),
    })
  }),

  
  app.put('/api/categories/:id', async ({ params, body }) => {
    const categoryId = parseInt(params.id);
    const updateData = body as UpdateCategoryDto;

    const result = await CategoriesHandler.updateById(categoryId, updateData);
    return result.success
      ? { status: 200, body: JSON.stringify({ message: result.message }) }
      : result.message === 'Category not found'
      ? { status: 404, body: JSON.stringify({ message: result.message }) }
      : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      description: t.Optional(t.String()),
      status: t.Optional(t.String()),
    })
  }),


  app.delete('/api/categories/:id', async ({ params }) => {
    const categoryId = parseInt(params.id);

    const result = await CategoriesHandler.deleteById(categoryId);
    return result.success
      ? { status: 200, body: JSON.stringify({ message: result.message }) }
      : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
  })
);