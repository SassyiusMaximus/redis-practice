export interface User {
  id: string;
  username: string;
  password: string;
  isSuperAdmin: boolean;
}

export interface RegisterBody {
  username: string;
  password: string;
}

export interface LoginBody {
  username: string;
  password: string;
}