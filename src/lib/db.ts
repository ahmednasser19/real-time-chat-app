import { Redis } from "@upstash/redis";

// export const db = new Redis({
//   url: process.env.DB_UPSTASH_REDIS_REST_URL,
//   token: process.env.DB_UPSTASH_REDIS_REST_TOKEN,
// });

export const db = Redis.fromEnv();
