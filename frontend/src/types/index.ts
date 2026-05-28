export interface User {
  id: string;
  email: string;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  error: string;
  details?: Record<string, string>;
}
