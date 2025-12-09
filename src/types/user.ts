export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  website?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  id: number;
  name: string;
  email: string;
}
