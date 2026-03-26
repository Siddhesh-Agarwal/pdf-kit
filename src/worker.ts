/// <reference types="@cloudflare/workers-types" />

export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }): Promise<Response> {
    const url = new URL(request.url);

    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) return assetResponse;

    return env.ASSETS.fetch(new Request(new URL("/index.html", url.origin)));
  }
};
