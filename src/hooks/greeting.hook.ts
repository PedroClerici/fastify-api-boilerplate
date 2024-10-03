import type { FastifyReply, FastifyRequest } from "fastify";

export async function greetingHook(
  request: FastifyRequest,
  _reply: FastifyReply,
) {
  request.log.info("Hello, form greeting hook!");
}
