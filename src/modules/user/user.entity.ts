import { User } from '@prisma/client';

export class UserEntity {
  constructor(
    public username: string,
    public password: string,
    public name: string,
    public token: string | null
  ) {}

  static fromPrisma(data: User): UserEntity {
    return new UserEntity(
      data.username,
      data.password,
      data.name,
      data.token
    );
  }

  toResponse(): import('./user.dto').UserResponseDTO {
    return {
      username: this.username,
      name: this.name,
    };
  }

  toLoginResponse(): import('./user.dto').LoginResponseDTO {
    return {
      username: this.username,
      name: this.name,
      token: this.token!,
    };
  }
}
