import type { FastifyInstance } from "fastify";
import { usersController } from "./users.controller";
import { getUserByIdSchema, getUsersSchema } from "./users.schema";

export default async function usersRouter(app: FastifyInstance) {
  app.get("", { schema: getUsersSchema }, usersController.getUsers);
  app.get("/:id", { schema: getUserByIdSchema }, usersController.getUserById);
}
