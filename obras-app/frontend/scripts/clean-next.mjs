import { rm } from "node:fs/promises";

// The build cache in .next can be left in a broken state by Turbopack restores.
// Remove it before every production build so Vercel starts from a clean slate.
await rm(".next", { recursive: true, force: true });
