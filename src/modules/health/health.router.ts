import { greetingHook } from "@/hooks/greeting.hook";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

export default async function usersRouter(app: FastifyInstance) {
  app.get(
    "",
    {
      schema: {
        tags: ["Health"],
        response: {
          200: z.object({ message: z.literal("Service is healthy.") }),
        },
      },
      onRequest: [greetingHook],
    },
    async (_request, reply) => {
      reply.status(200).send({ message: "Service is healthy." });
    },
  );
}
