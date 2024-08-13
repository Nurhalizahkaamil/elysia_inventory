import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

import type { AuthenticateDTO } from "../dtos/auth";
import { UsersRepository } from "../repositories/users";

// Pastikan JWT_SECRET didefinisikan
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined. Please set the environment variable.");
}

export async function authenticate({ email, password }: AuthenticateDTO) {
  console.log("Starting authentication process...");

  const user = await UsersRepository.getUserByEmail(email);
  if (!user) {
    console.error("User not found");
    return new Response("Invalid email or password", { status: 401 });
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    console.error("Password does not match");
    return new Response("Invalid email or password", { status: 401 });
  }

  console.log("Generating JWT token...");
  const jwtToken = jwt.sign({ sub: String(user.id), role: user.role }, JWT_SECRET!, {
    expiresIn: "1h",
  });

  console.log("Authentication successful");
  return {
    access_token: `Bearer ${jwtToken}`,
  };
}

export async function refresh(refreshToken: string) {
  console.log("Starting token refresh process...");

  if (!refreshToken) {
    console.error("No refresh token provided");
    return new Response("Refresh token is required", { status: 401 });
  }

  try {
    console.log("Verifying refresh token...");
    const decoded = jwt.verify(refreshToken, JWT_SECRET!) as { sub: string, role: string };

    if (!decoded) {
      console.error("Invalid refresh token");
      return new Response("Invalid refresh token", { status: 403 });
    }

    console.log("Generating new JWT token...");
    const jwtToken = jwt.sign({ sub: decoded.sub, role: decoded.role }, JWT_SECRET!, {
      expiresIn: "1d",
    });

    console.log("Token refresh successful");
    return {
      access_token: `Bearer ${jwtToken}`,
    };
  } catch (error) {
    console.error("Error during token refresh:", error);
    return new Response("Invalid refresh token", { status: 403 });
  }
}

export const AuthsHandler = {
  authenticate,
  refresh,
};
