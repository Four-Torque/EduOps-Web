export function createEventSource(path: string): EventSource {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const cleanApiUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const sseUrl = `${cleanApiUrl}${cleanPath}`;

  return new EventSource(sseUrl, {
    withCredentials: true,
  });
}
