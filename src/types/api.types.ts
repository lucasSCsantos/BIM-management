export interface PaginatedResponseMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface DefaultListResponse<T> {
  data: T[];
}

export interface DefaultGetResponse<T> {
  data: T;
}

export interface DefaultCreateResponse<T> {
  data: T;
  success: boolean;
}

export interface PaginatedResponse<T> extends DefaultListResponse<T> {
  meta: PaginatedResponseMeta;
}
