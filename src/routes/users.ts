import { Elysia, t } from "elysia";
import { UserRole } from "../dtos/users";
import { UsersHandler } from "../handler/users";

export const usersRoutes = (elysia: Elysia) => (
  elysia.guard({
    beforeHandle: ({ request, headers }) => {
      // Allow /users POST request without role header
      if (request.url === '/users' && request.method === 'POST') {
        return;
      }
    }
  }, app => (
    app.get("/users", async () => {
      const response = await UsersHandler.getAll();
      return new Response(JSON.stringify(response), {
        status: response.success ? 200 : 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }),

    app.get("/users/:id", async (req) => {
      const { id } = req.params; // id sekarang dianggap string, tidak perlu parseInt
      const response = await UsersHandler.getById(id);
      return new Response(JSON.stringify(response), {
        status: response.success ? 200 : 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }),

    app.post(
      "/users",
      async (req) => {
        const { email, name, password, role } = req.body;

        // Ensure role is not null and is a valid enum value
        if (!role || !Object.values(UserRole).includes(role)) {
          return new Response('Invalid role', { status: 400 });
        }

        const response = await UsersHandler.create({ email, name, password, role });
        return new Response(JSON.stringify(response), {
          status: response.success ? 201 : 400,
          headers: { 'Content-Type': 'application/json' }
        });
      },
      {
        body: t.Object({
          email: t.String(),
          name: t.String(),
          password: t.String(),
          role: t.Enum(UserRole),
        }),
      }
    ),

    app.delete("/users/:id", async (req) => {
      const { id } = req.params; // id sekarang dianggap string, tidak perlu parseInt
      const response = await UsersHandler.deleteById(id);
      return new Response(JSON.stringify(response), {
        status: response.success ? 204 : 400,
        headers: { 'Content-Type': 'application/json' }
      });
    })
  ))
);
