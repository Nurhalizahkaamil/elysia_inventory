import { Elysia, t } from 'elysia';
import { TransactionsHandler } from '../handler/transactions';
import type { AddTransactionsDto, UpdateTransactionsDto } from '../dtos/transactions';

export const transactionsRoutes = (app: Elysia) => (
  // Get all transactions
  app.get('/api/transactions', async () => {
    const result = await TransactionsHandler.getAll();
    return result.success
      ? { status: 200, body: result.data }
      : { status: 500, body: { message: result.message, error: result.error } };
  }),

  // Get transaction by ID
  app.get('/api/transactions/:id', async ({ params }) => {
    const transactionId = parseInt(params.id);
    const result = await TransactionsHandler.getById(transactionId);

    return result.success
      ? { status: 200, body: result.data }
      : result.message === 'Transaction not found'
      ? { status: 404, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }),

  // Create a new transaction
  app.post('/api/transactions', async ({ body }) => {
    const transactionData = body as unknown as AddTransactionsDto;

    const result = await TransactionsHandler.create(transactionData);
    return result.success
      ? { status: 201, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }, {
    body: t.Object({
      product_id: t.Number(),
      quantity: t.Number(),
      total_price: t.Number(),
      transaction_date: t.Date(),
      user_id: t.Number(),
    })
  }),

  // Update a transaction by ID
  app.put('/api/transactions/:id', async ({ params, body }) => {
    const transactionId = parseInt(params.id);
    const updateData = body as UpdateTransactionsDto;

    const result = await TransactionsHandler.updateById(transactionId, updateData);
    return result.success
      ? { status: 200, body: { message: result.message } }
      : result.message === 'Transaction not found'
      ? { status: 404, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  }, {
    body: t.Object({
      product_id: t.Optional(t.Number()),
      quantity: t.Optional(t.Number()),
      total_price: t.Optional(t.Number()),
      transaction_date: t.Optional(t.Date()),
      user_id: t.Optional(t.Number()),
    })
  }),

  // Delete a transaction by ID
  app.delete('/api/transactions/:id', async ({ params }) => {
    const transactionId = parseInt(params.id);

    const result = await TransactionsHandler.deleteById(transactionId);
    return result.success
      ? { status: 200, body: { message: result.message } }
      : { status: 500, body: { message: result.message, error: result.error } };
  })
);
