import db from "../database/db";
import type { AddUsersDto } from "../dtos/users";

async function getUsers() {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return users;
}

async function getUserById(id: number) {
  const user = await db.user.findFirstOrThrow({
    where: {
      id,
    },
  });

  return user;
}

async function getUserByEmail(email: string) {
  const user = await db.user.findFirstOrThrow({
    where: {
      email,
    },
  });

  return user;
}

async function createUser(data: AddUsersDto) {
  const { email, name, password, role } = data;
  return await db.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
}

async function deleteUserById(id: number) {
  return await db.user.delete({
    where: {
      id,
    },
  });
}

export const UsersRepository = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUserById,
};
