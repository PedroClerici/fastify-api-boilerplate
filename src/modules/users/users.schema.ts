import { userSchema } from "@/modules/shared/users.schema";
import type { FastifySchema } from "fastify";
import { z } from "zod";

export const userResponseSchema = userSchema.omit({
  password: true,
});

export type getUserByIdParams = z.infer<typeof getUserByIdSchema.params>;
export const getUserByIdSchema = {
  tags: ["Users"],
  params: userSchema.pick({ id: true }),
  response: { 200: userResponseSchema },
} satisfies FastifySchema;

export const getUsersSchema = {
  tags: ["Users"],
  response: { 200: z.array(userResponseSchema) },
} satisfies FastifySchema;
