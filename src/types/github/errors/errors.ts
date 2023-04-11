export interface ErrorResonse {
  message: string;
  errors?: ErrorResult[];
  documentation_url?: string;
}

export interface ErrorResult {
  resource: string;
  field: string;
  code: string;
}
