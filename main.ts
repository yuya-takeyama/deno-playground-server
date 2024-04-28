import { serve } from "https://deno.land/std/http/server.ts";

const kv = await Deno.openKv();
const keys = ['access_counter'];

serve(async function handleRequest(request: Request): Promise<Response> {
  const counter = await kv.get(keys);
  console.log(`counter: ${JSON.stringify(counter)}`);
  console.log(`counter.value: ${JSON.stringify(counter.value)}`);
  const count = Number(counter.value) || 0;
  const newCount = count + 1;
  console.log(`newCount: ${JSON.stringify(newCount)}`);
  
  await kv.set(keys, newCount);

  return new Response(`This page has been visited ${count} times.`);
});
