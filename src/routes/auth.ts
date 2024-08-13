import { Elysia, t } from "elysia";
import { AuthsHandler } from "../handler/auth";

export const authRoutes = (app: Elysia) => (
  app.post("/auth", async (req) => {
    const { email, password } = req.body;

    return AuthsHandler.authenticate({ email, password });
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    })
  }),

  app.post("/auth/refresh", async (req) => {
    const { refresh_token } = req.body;

    return AuthsHandler.refresh(refresh_token);
  }, {
    body: t.Object({
      refresh_token: t.String(),
    })
  })
);
