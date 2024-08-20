import { Elysia, t } from 'elysia';
import { InventoriesHandler } from '../handler/inventories';
import type { AddInventoryDto, UpdateInventoryDto } from '../dtos/inventory';

export const inventoriesRoutes = (app: Elysia) => (
  // Get all inventories
  app.get('/api/inventories', async () => {
    const result = await InventoriesHandler.getAll();
    return result.success
      ? { status: 200, body: result.data }
      : { status: 500, body: { message: result.message, error: result.error } };
  }),

  // Get inventory by ID
  app.get('/api/inventories/:id', async ({ params }) => {
    const inventoryId = parseInt(params.id);
    const result = await InventoriesHandler.getById(inventoryId);

    return result.success
      ? { status: 200, body: result.data }
      : result.message === 'Inventory not found'
      ? { status: 404, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }),

  // Create a new inventory
  app.post('/api/inventories', async ({ body }) => {
    const inventoryData = body as AddInventoryDto;

    const result = await InventoriesHandler.create(inventoryData);
    return result.success
      ? { status: 201, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }, {
    body: t.Object({
      product_id: t.Number(),
      quantity: t.Number(),
      location: t.String(),
      warehouse_id: t.Number(),
      note: t.Optional(t.String()),
      created_by: t.String(), // UUID
    })
  }),

  // Update an inventory by ID
  app.put('/api/inventories/:id', async ({ params, body }) => {
    const inventoryId = parseInt(params.id);
    const updateData = body as UpdateInventoryDto;

    const result = await InventoriesHandler.updateById(inventoryId, updateData);
    return result.success
      ? { status: 200, body: { message: result.message } }
      : result.message === 'Inventory not found'
      ? { status: 404, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }, {
    body: t.Object({
      product_id: t.Optional(t.Number()),
      quantity: t.Optional(t.Number()),
      location: t.Optional(t.String()),
      warehouse_id: t.Optional(t.Number()),
      note: t.Optional(t.String()),
      created_by: t.Optional(t.String()), // UUID
    })
  }),

  // Delete an inventory by ID
  app.delete('/api/inventories/:id', async ({ params }) => {
    const inventoryId = parseInt(params.id);

    const result = await InventoriesHandler.deleteById(inventoryId);
    return result.success
      ? { status: 200, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  })
);
