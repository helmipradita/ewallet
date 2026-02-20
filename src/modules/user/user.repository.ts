import { prisma } from '../../database/prisma/client';
import { UserEntity } from './user.entity';
import { RegisterUserRequest, UpdateUserRequest } from './user.dto';
import { User } from '@prisma/client';

export class UserRepository {
  static async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  }

  static async findByToken(token: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { token },
    });
  }

  static async create(data: RegisterUserRequest): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  static async update(username: string, data: UpdateUserRequest | { password: string; name: string }): Promise<User> {
    return prisma.user.update({
      where: { username },
      data,
    });
  }

  static async updateToken(username: string, token: string | null): Promise<User> {
    return prisma.user.update({
      where: { username },
      data: { token },
    });
  }

  static async countByUsername(username: string): Promise<number> {
    return prisma.user.count({
      where: { username },
    });
  }
}
