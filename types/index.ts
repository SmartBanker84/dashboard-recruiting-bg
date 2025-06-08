export type Role = 'recruiting' | 'manager';

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  note?: string;
  file_url?: string;
  created_by: string;
  created_at: string;
}
