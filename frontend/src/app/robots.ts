// Next.js redirect for robots.txt
export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /_next
Disallow: /private

Sitemap: https://eduhunt.app/sitemap.xml
`;
  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
