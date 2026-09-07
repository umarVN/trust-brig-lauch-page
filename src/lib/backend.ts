/**
 * Server-side GraphQL client for the TrustBrig backend.
 *
 * Only ever called from route handlers — the browser talks to this app's own
 * `/api/*` routes, so the backend origin is never exposed and there is no CORS
 * to configure.
 */

// Matches APP_PORT / GRAPHQL_PATH in the backend's .env.
const ENDPOINT = process.env.BACKEND_GRAPHQL_URL ?? 'http://127.0.0.1:3001/graphql';
const TIMEOUT_MS = 10_000;

interface GraphQLError {
  message: string;
  extensions?: { code?: string };
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export class BackendError extends Error {
  constructor(
    message: string,
    readonly code?: string,
  ) {
    super(message);
    this.name = 'BackendError';
  }
}

export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      cache: 'no-store',
    });
  } catch (error) {
    const reason = error instanceof Error && error.name === 'AbortError' ? 'timed out' : 'failed';
    throw new BackendError(`Request to the backend ${reason}`);
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new BackendError(`Backend responded with ${response.status}`);
  }

  const body = (await response.json()) as GraphQLResponse<T>;

  if (body.errors?.length) {
    const [first] = body.errors;
    throw new BackendError(first.message, first.extensions?.code);
  }

  if (!body.data) {
    throw new BackendError('Backend returned no data');
  }

  return body.data;
}
