// types/user.ts

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export type UserRole = "recruiter" | "manager" | "admin" | "viewer";
