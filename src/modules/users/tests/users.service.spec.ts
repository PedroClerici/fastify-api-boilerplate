import type { UsersRepository } from "@/repositories";
import { InMemoryUsersRepository } from "@/repositories/in-memory/users.repository";
import type { User } from "@/types/user";
import { NotFoundError } from "@/utils/errors";
import { UsersService } from "../users.service";

describe("Users Service", () => {
  let usersRepositoryInstance: UsersRepository;
  let usersServiceInstance: UsersService;
  let inMemoryUsers: User[];

  beforeAll(async () => {
    usersRepositoryInstance = new InMemoryUsersRepository();
    usersServiceInstance = new UsersService(usersRepositoryInstance);

    inMemoryUsers = await usersRepositoryInstance.getAll();
  });

  it("Must be possible to get users", async () => {
    const users = await usersServiceInstance.getUsers();

    expect(users).toBe(inMemoryUsers);
  });

  it("Must be able to get specific user", async () => {
    const [inMemoryUser] = inMemoryUsers;
    if (!inMemoryUser) {
      throw new Error("User does not exist!");
    }

    const user = await usersServiceInstance.getUserById(inMemoryUser.id);

    expect(user).toBe(inMemoryUser);
  });

  it("Must throw if user does not exist", async () => {
    const userPromise = usersServiceInstance.getUserById(crypto.randomUUID());

    expect(userPromise).rejects.toThrowError(NotFoundError);
  });
});
