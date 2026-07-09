import axios, { AxiosError } from 'axios';
import type { ApiError } from './api-error';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; code?: string }>) => {
    const normalized: ApiError = normalizeError(error);

    notifyError(normalized);

    return Promise.reject(normalized);
  },
);

function normalizeError(error: AxiosError<{ message?: string; code?: string }>): ApiError {
  // Network error (no response received)
  if (!error.response) {
    return {
      message: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
      code: 'NETWORK_ERROR',
    };
  }

  // Timeout
  if (error.code === 'ECONNABORTED') {
    return {
      message: 'A requisição demorou demais para responder.',
      code: 'TIMEOUT',
    };
  }

  const { status, data } = error.response;

  return {
    message: data?.message ?? fallbackMessageByStatus(status),
    status,
    code: data?.code,
  };
}

function fallbackMessageByStatus(status: number): string {
  switch (status) {
    case 400:
      return 'Requisição inválida.';
    case 404:
      return 'Recurso não encontrado.';
    case 409:
      return 'Conflito ao processar a solicitação.';
    case 500:
      return 'Erro interno do servidor.';
    default:
      return 'Ocorreu um erro inesperado.';
  }
}

function notifyError(error: ApiError) {
  // Integração com sistema de notificação da aplicação (toast, sonner, etc.)
  // Mantido desacoplado aqui de propósito — troque a implementação sem tocar no interceptor.
  console.error('[API Error]', error);
}
