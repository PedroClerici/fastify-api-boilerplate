import type { User } from "@/types/user";
import type { UsersRepository } from "..";

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [
    {
      id: crypto.randomUUID(),
      username: "John_Doe",
      email: "john.doe@example.com",
      password: "randomHash",
    },
    {
      id: crypto.randomUUID(),
      username: "Joe_Shmoe",
      email: "joe.shmoe@example.com",
      password: "anotherRandomHash",
    },
  ];

  async create(data: Omit<User, "id">): Promise<User> {
    const newUser = { ...data, id: crypto.randomUUID() };
    this.users.push(newUser);
    return newUser;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: string): Promise<User | undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    return index !== -1 ? this.users[index] : undefined;
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async update(id: string, data: Partial<User>) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...data } : user,
    );

    return this.users[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
