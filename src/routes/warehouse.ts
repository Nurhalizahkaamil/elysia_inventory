import { Elysia, t } from 'elysia';
import { WarehousesHandler } from '../handler/warehouse';
import type { AddWarehouseDto, UpdateWarehouseDto } from '../dtos/warehouse';

export const warehousesRoutes = (app: Elysia) => (
  // Get all warehouses
  app.get('/api/warehouses', async () => {
    const result = await WarehousesHandler.getAll();
    return result.success
      ? { status: 200, body: result.data }
      : { status: 500, body: { message: result.message, error: result.error } };
  }),

  // Get warehouse by ID
  app.get('/api/warehouses/:id', async ({ params }) => {
    const warehouseId = parseInt(params.id);
    const result = await WarehousesHandler.getById(warehouseId);

    return result.success
      ? { status: 200, body: result.data }
      : result.message === 'Warehouse not found'
      ? { status: 404, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }),

  // Create a new warehouse
  app.post('/api/warehouses', async ({ body }) => {
    const warehouseData = body as AddWarehouseDto;

    const result = await WarehousesHandler.create(warehouseData);
    return result.success
      ? { status: 201, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }, {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      status: t.Boolean(),
    })
  }),

  // Update a warehouse by ID
  app.put('/api/warehouses/:id', async ({ params, body }) => {
    const warehouseId = parseInt(params.id);
    const updateData = body as UpdateWarehouseDto;

    const result = await WarehousesHandler.updateById(warehouseId, updateData);
    return result.success
      ? { status: 200, body: { message: result.message } }
      : result.message === 'Warehouse not found'
      ? { status: 404, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      description: t.Optional(t.String()),
      status: t.Optional(t.Boolean()),
    })
  }),

  // Delete a warehouse by ID
  app.delete('/api/warehouses/:id', async ({ params }) => {
    const warehouseId = parseInt(params.id);

    const result = await WarehousesHandler.deleteById(warehouseId);
    return result.success
      ? { status: 200, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  })
);
