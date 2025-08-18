import { getToken } from './auth';

export const API_BASE: string =
  (process.env.EXPO_PUBLIC_API_URL as string) || 'http://127.0.0.1:8000/api';

export type ApiResult<T = any> = {
  ok: boolean;
  status: number;
  data?: T;
  raw?: any;
  message?: string;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T = any>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
    withAuth?: boolean;
  } = {}
): Promise<ApiResult<T>> {
  const { method = 'GET', body, headers = {}, withAuth = true } = options;
  try {
    const authHeader: Record<string, string> = {};
    if (withAuth) {
      const token = await getToken();
      if (token) authHeader['Authorization'] = token;
    }

    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        'Accept': 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...authHeader,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    let json: any = null;
    try {
      json = await response.json();
    } catch (_) {
      // ignore JSON parse errors, keep json as null
    }

    const ok = response.ok && (json?.success !== false);
    return {
      ok,
      status: response.status,
      data: json?.data ?? json,
      raw: json,
      message: json?.message || (!ok ? 'Request failed' : undefined),
    } as ApiResult<T>;
  } catch (e: any) {
    return {
      ok: false,
      status: 0,
      message: e?.message || 'Network error',
    };
  }
}

export const api = {
  get: <T = any>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'GET', headers }),
  post: <T = any>(path: string, body?: any, headers?: Record<string, string>) =>
    request<T>(path, { method: 'POST', body, headers }),
  put: <T = any>(path: string, body?: any, headers?: Record<string, string>) =>
    request<T>(path, { method: 'PUT', body, headers }),
  delete: <T = any>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: 'DELETE', headers }),
  raw: request,
};


