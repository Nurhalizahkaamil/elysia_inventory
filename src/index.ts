import jwt from "jsonwebtoken";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";

import { authRoutes } from "./routes/auth";
import { usersRoutes } from "./routes/users";
import type { UserRole } from "./dtos/users";
import { swaggerConfig } from "./config/swagger/swaggerConfig";
import { productsRoutes } from "./routes/product";
import { categoriesRoutes } from "./routes/categories";
import { suppliersRoutes } from "./routes/suppliers";
import { transactionsRoutes } from "./routes/transaction";
import { warehousesRoutes } from "./routes/warehouse";
import { inventoriesRoutes } from "./routes/inventories";

interface TokenPayload {
  sub: string;
  role: UserRole;
}

// Create a new Elysia instance
const app = new Elysia();

// Apply middleware and routes
app
  .use(swagger(swaggerConfig))
  .use(usersRoutes)  
  .use(productsRoutes)
  .use(categoriesRoutes)
  .use(suppliersRoutes)
  .use(transactionsRoutes)
  .use(warehousesRoutes)
  .use(inventoriesRoutes)
  .use(authRoutes)
  .guard(async (context: { headers: any; request: any; }) => {
    const { headers, request } = context;
    const token = headers.authorization;

    // Allow /users POST request without Authorization header
    if (request.url === '/users' && request.method === 'POST') {
      return;
    }

    if (!token) {
      console.log('Authorization token is missing');
      return new Response(null, { status: 401 });
    }

    try {
      const tokenValue = token.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        throw new Error("Error on sync environment variables");
      }

      const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET) as TokenPayload;

      if (!decoded) {
        console.log('Token verification failed');
        return new Response(null, { status: 401 });
      }

      // Attach role to context for later use
      context.headers.role = decoded.role;
    } catch (error) {
      console.log('Error in token verification:', error);
      return new Response(null, { status: 401 });
    }
  }, (app) => app.use(usersRoutes));

// Start the server
app.listen(3000, () => {
  console.log("🦊 Elysia is running on port 3000");
});
