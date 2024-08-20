import { Elysia, t } from 'elysia';
import { SuppliersHandler } from '../handler/suppliers'; // Pastikan path ini benar
import type { AddSupplierDto, UpdateSupplierDto } from '../dtos/suppliers';

export const suppliersRoutes = (app: Elysia) => (
    app.get('/api/suppliers', async () => {
        const result = await SuppliersHandler.getAll();
        return result.success
            ? { status: 200, body: JSON.stringify(result.data) }
            : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
    }),

    app.get('/api/suppliers/:id', async ({ params }) => {
        const supplierId = params.id; // UUID adalah string, tidak perlu parseInt
        const result = await SuppliersHandler.getById(supplierId);
        return result.success
            ? { status: 200, body: JSON.stringify(result.data) }
            : result.message === 'Supplier not found'
                ? { status: 404, body: JSON.stringify({ message: result.message }) }
                : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
    }),

    app.post('/api/suppliers', async ({ body }) => {
        const supplierData = body as AddSupplierDto;
        const result = await SuppliersHandler.create(supplierData);
        return result.success
            ? { status: 201, body: JSON.stringify({ message: result.message }) }
            : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
    }, {
        body: t.Object({
            name: t.String(),
            contact: t.String(),
            address: t.String(),
        })
    }),

    app.put('/api/suppliers/:id', async ({ params, body }) => {
        const supplierId = params.id; // UUID adalah string, tidak perlu parseInt
        const supplierData = body as UpdateSupplierDto;
        const result = await SuppliersHandler.updateById(supplierId, supplierData);
        return result.success
            ? { status: 200, body: JSON.stringify({ message: result.message }) }
            : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
    }, {
        params: t.Object({
            id: t.String(), // Pastikan tipe id adalah string sesuai dengan UUID
        }),
        body: t.Object({
            name: t.Optional(t.String()),
            contact: t.Optional(t.String()),
            address: t.Optional(t.String()),
        })
    }),

    app.delete('/api/suppliers/:id', async ({ params }) => {
        const supplierId = params.id; // UUID adalah string, tidak perlu parseInt
        const result = await SuppliersHandler.deleteById(supplierId);
        return result.success
            ? { status: 200, body: JSON.stringify({ message: result.message }) }
            : { status: 500, body: JSON.stringify({ message: result.message, error: result.error }) };
    })
);
