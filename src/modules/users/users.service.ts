import type { UsersRepository } from "@/repositories";
import { InMemoryUsersRepository } from "@/repositories/in-memory/users.repository";
import { NotFoundError } from "@/utils/errors";

export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository = new InMemoryUsersRepository(),
  ) {}

  getUsers = async () => {
    const users = await this.usersRepository.getAll();

    return users;
  };

  getUserById = async (id: string) => {
    const user = await this.usersRepository.getById(id);
    if (!user)
      throw new NotFoundError(`couldn't find resource with id '${id}'`);

    return user;
  };
}

export const usersService = new UsersService();
