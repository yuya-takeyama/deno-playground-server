import { serve } from "https://deno.land/std/http/server.ts";

const kv = await Deno.openKv();
const keys = ['access_counter'];

serve(async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const counter = await kv.get(keys);
    const count = Number(counter.value) || 0;
    const newCount = count + 1;
    await kv.set(keys, newCount);

    return new Response(`This page has been visited ${count} times.`);
  } else {
    return new Response("404 Not Found", { status: 404 });
  }
});
