export interface Paginated<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export interface User {
  id: string;
  username: string;
}
