import { hash } from "bcryptjs";
import { UserRole, type AddUsersDto } from "../dtos/users";
import { UsersRepository } from "../repositories/users";

async function getAll() {
  try {
    const users = await UsersRepository.getUsers();
    return { success: true, data: users };
  } catch (error) {
    return { success: false, message: 'Failed to retrieve users', error };
  }
}

async function getById(id: number) {
  try {
    const user = await UsersRepository.getUserById(id);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, data: user };
  } catch (error) {
    return { success: false, message: 'Failed to retrieve user', error };
  }
}

async function create({ password, role, ...rest }: AddUsersDto) {
  try {
    // Ensure role is valid before proceeding
    if (!role || !Object.values(UserRole).includes(role)) {
      return { success: false, message: 'Invalid role' };
    }

    const hashedPassword = await hash(password, 10);

    await UsersRepository.createUser({
      ...rest,
      password: hashedPassword,
      role,  // Include role in the createUser method
    });

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to create user', error };
  }
}

async function deleteById(id: number) {
  try {
    await UsersRepository.deleteUserById(id);
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete user', error };
  }
}

export const UsersHandler = {
  getAll,
  getById,
  create,
  deleteById,
};
