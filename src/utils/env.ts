import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.success === false) {
  console.error(parsedEnv.error.format(), "Invalid environment variables.");

  throw new Error("Invalid environment variables.");
}

export const env = Object.freeze(parsedEnv.data);
