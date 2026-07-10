export interface PaginatedResponseMeta {
  total: number;
  page: number;
  limit: number;
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
