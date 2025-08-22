import { getToken } from './auth';
import Constants from 'expo-constants';

const extraApiUrl = (Constants?.expoConfig as any)?.extra?.apiUrl
  || (Constants as any)?.manifest2?.extra?.apiUrl
  || (Constants as any)?.manifest?.extra?.apiUrl;

export const API_BASE: string =
  (process.env.EXPO_PUBLIC_API_URL as string)
  || (extraApiUrl as string)
  || 'http://127.0.0.1:8000/api';

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

    const url = `${API_BASE}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...authHeader,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type') || '';
    let parsedBody: any = null;
    let parseError: any = null;

    if (contentType.includes('application/json')) {
      try {
        parsedBody = await response.json();
      } catch (err) {
        parseError = err;
      }
    } else {
      // try to read as text for non-JSON responses (e.g., HTML errors)
      try {
        const text = await response.text();
        parsedBody = text;
      } catch (err) {
        parseError = err;
      }
    }

    const successFlag = typeof parsedBody === 'object' && parsedBody !== null
      ? parsedBody.success
      : undefined;
    const ok = response.ok && (successFlag !== false);

    // Extract a human-readable message
    let message: string | undefined = undefined;
    if (typeof parsedBody === 'object' && parsedBody !== null) {
      // Laravel-style { message, errors }
      const bodyMessage = parsedBody.message as string | undefined;
      const errorsObj = parsedBody.errors as Record<string, string[] | string> | undefined;
      if (errorsObj) {
        const lines: string[] = [];
        Object.entries(errorsObj).forEach(([field, msgs]) => {
          const msgArray = Array.isArray(msgs) ? msgs : [msgs];
          msgArray.forEach((m) => lines.push(`${field}: ${m}`));
        });
        message = lines.join('\n');
      } else if (bodyMessage) {
        message = bodyMessage;
      }
    } else if (typeof parsedBody === 'string') {
      // plain text response
      message = parsedBody.slice(0, 500);
    }

    if (!ok && !message) {
      // Fallback by status
      if (response.status === 0) message = 'Errore di rete';
      else if (response.status === 401) message = 'Non autorizzato';
      else if (response.status === 403) message = 'Accesso negato';
      else if (response.status === 404) message = 'Risorsa non trovata';
      else if (response.status === 422) message = 'Dati non validi';
      else if (response.status >= 500) message = 'Errore del server';
      else message = 'Richiesta fallita';
    }

    return {
      ok,
      status: response.status,
      data: typeof parsedBody === 'object' ? (parsedBody?.data ?? parsedBody) : undefined,
      raw: parsedBody ?? parseError,
      message,
    } as ApiResult<T>;
  } catch (e: any) {
    // Improve the network error message for RN/Expo
    const errMsg = typeof e?.message === 'string' ? e.message : 'Errore di rete';
    let advice = '';
    if (/Network request failed/i.test(errMsg)) {
      advice = `Impossibile raggiungere il server. Verifica connessione e la variabile EXPO_PUBLIC_API_URL (attuale: ${API_BASE}).`;
    }
    return {
      ok: false,
      status: 0,
      message: advice ? `${errMsg}. ${advice}` : errMsg,
      raw: e,
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


