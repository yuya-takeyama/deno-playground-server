import { serve } from "https://deno.land/std/http/server.ts";

const kv = await Deno.openKv();
const keys = ['access_counter'];

serve(async function handleRequest(request: Request): Promise<Response> {
  const counter = await kv.get([keys]);
  const count = Number(counter) + 1;
  
  await kv.set(keys, count);

  return new Response(`This page has been visited ${count} times.`);
});
