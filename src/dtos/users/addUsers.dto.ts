export enum UserRole {
  ADMINGUDANG = "ADMINGUDANG",
  APOTEKER = "APOTEKER"
}

export interface AddUsersDto {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export interface UpdateUsersDto {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
