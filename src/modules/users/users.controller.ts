import { NotFoundError } from "@/utils/errors";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { getUserByIdParams } from "./users.schema";
import { usersService } from "./users.service";

class UsersController {
  getUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
    const users = await usersService.getUsers();

    reply.status(200).send(users);
  };

  getUserById = async (
    request: FastifyRequest<{ Params: getUserByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const user = await usersService.getUserById(id);
    if (!user)
      throw new NotFoundError(`Couldn't find resource with id '${id}'.`);

    reply.status(200).send(user);
  };
}

export const usersController = new UsersController();
