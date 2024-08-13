import { Elysia, t } from "elysia";
import { ProductsHandler } from "../handler/products";


export const ProductRoutes = (app: Elysia) => {
    app.get("/products", async () => {
        const response = await ProductsHandler.getAll();
        return new Response(JSON.stringify(response), {
            status: response.success ? 200 : 500,
            headers: { "Content-Type": "application/json" },
        });
    });

    app.get("/products/:id", async (req) => {
        const { id } = req.params;
        const response = await ProductsHandler.getById(parseInt(id));
        return new Response(JSON.stringify(response), {
            status: response.success ? 200 : 404,
            headers: { "Content-Type": "application/json" },
        });
    });

    app.post(
        "/products",
        async (req) => {
        const { name, description, price, expiry_date, status, category_id, supplier_id } = req.body;
        if (!name) {
            throw new Error("Name is required");
        }
        if (!price) {
            throw new Error("Price is required");
        }   
        if (!expiry_date) {
            throw new Error("Expiry date is required");
        }
        if (!status) {
            throw new Error("Status is required");
        }
        if (!category_id) {
            throw new Error("Category is required");
        }
        if (!supplier_id) {
            throw new Error("Supplier is required");
        }
            const response = await ProductsHandler.create({
                name,
                description,
                price,
                expiry_date,
                status,
                category_id,
                supplier_id,
            });
            return new Response(JSON.stringify(response), {
                status: response.success ? 201 : 400,
                headers: { "Content-Type": "application/json" },
            });
        },
        {
            body: t.Object({
                name: t.String(),
                description: t.String().optional(),
                price: t.Number(),
                expiry_date: t.Date(),
                status: t.String(),
                category_id: t.Number(),
                supplier_id: t.Number(),
            }),
        }
    ),

    app.delete("/products/:id", async (req) => {
        const { id } = req.params;
        const response = await ProductsHandler.deleteById(parseInt(id));
        return new Response(JSON.stringify(response), {
            status: response.success ? 204 : 400,
            headers: { "Content-Type": "application/json" },
        });
    })
};
