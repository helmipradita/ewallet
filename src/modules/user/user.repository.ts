import { prisma } from '../../database/prisma/client';
import { UserEntity } from './user.entity';
import { RegisterUserRequest, UpdateUserRequest } from './user.dto';
import { v4 as uuid } from 'uuid';

export interface IUserRepository {
  findByUsername(username: string): Promise<UserEntity | null>;
  findByToken(token: string): Promise<UserEntity | null>;
  create(data: RegisterUserRequest): Promise<UserEntity>;
  update(username: string, data: UpdateUserRequest): Promise<UserEntity>;
  updateToken(username: string, token: string | null): Promise<UserEntity>;
}

export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user ? UserEntity.fromPrisma(user) : null;
  }

  async findByToken(token: string): Promise<UserEntity | null> {
    const user = await prisma.user.findFirst({
      where: { token },
    });
    return user ? UserEntity.fromPrisma(user) : null;
  }

  async create(data: RegisterUserRequest): Promise<UserEntity> {
    const user = await prisma.user.create({
      data,
    });
    return UserEntity.fromPrisma(user);
  }

  async update(username: string, data: UpdateUserRequest): Promise<UserEntity> {
    const user = await prisma.user.update({
      where: { username },
      data,
    });
    return UserEntity.fromPrisma(user);
  }

  async updateToken(username: string, token: string | null): Promise<UserEntity> {
    const user = await prisma.user.update({
      where: { username },
      data: { token },
    });
    return UserEntity.fromPrisma(user);
  }
}
