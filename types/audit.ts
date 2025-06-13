// types/audit.ts

export type EventLog = {
  id: string;
  timestamp: string;
  user_email: string;
  action: string;
  details?: string;
};
