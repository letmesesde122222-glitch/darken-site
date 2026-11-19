import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("kirito-views");
  let count = parseInt((await store.get("count")) || "0", 10);

  if (req.method === "POST") {
    count += 1;
    await store.set("count", String(count));
  }

  return new Response(JSON.stringify({ count }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};

export const config = { path: "/api/views" };
