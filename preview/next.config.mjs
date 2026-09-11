/** @type {import('next').NextConfig} */
const nextConfig = {
  // Repo ini monorepo-lite (root = library, preview/ = app Next.js ini) —
  // tanpa ini Next.js salah menebak root workspace karena ada package.json
  // ganda (root & preview/).
  outputFileTracingRoot: new URL('..', import.meta.url).pathname,
}

export default nextConfig
