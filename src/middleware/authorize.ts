// middleware/authorize.ts
import jwt from "jsonwebtoken";
import type { UserRole } from "../dtos/users";

interface TokenPayload {
  sub: string;
  role: UserRole;
}

export const authorize = async (context: { headers: any; request: any; }) => {
  const { headers, request } = context;
  const token = headers.authorization;

  // Allow /auth and /auth/refresh without Authorization header
  if (request.url.startsWith('/auth')) {
    return;
  }

  if (!token) {
    console.log('Authorization token is missing');
    return new Response('Authorization token is required', { status: 401 });
  }

  try {
    const tokenValue = token.split(" ")[1];
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET) as TokenPayload;

    if (!decoded) {
      console.log('Token verification failed');
      return new Response('Invalid token', { status: 401 });
    }

    // Attach user role to context
    context.headers.role = decoded.role;
  } catch (error) {
    console.log('Error in token verification:', error);
    return new Response('Invalid token', { status: 401 });
  }
};
