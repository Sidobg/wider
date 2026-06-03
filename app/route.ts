import { readFileSync } from "fs";
import { join } from "path";

export function GET() {
  const html = readFileSync(join(process.cwd(), "public/bozza.html"), "utf-8");
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
