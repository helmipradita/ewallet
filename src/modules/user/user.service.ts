import { RegisterUserRequest, LoginUserRequest, UpdateUserRequest } from './user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { Validation } from '../../common/validation/validation';
import { UserValidation } from './user.validation';
import { ResponseError } from '../../common/error/response-error';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserEntity> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request) as RegisterUserRequest;

    const totalUserWithSameUsername = await UserRepository.countByUsername(registerRequest.username);
    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, 'Username already exists');
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await UserRepository.create(registerRequest);
    return UserEntity.fromPrisma(user);
  }

  static async login(request: LoginUserRequest): Promise<UserEntity> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request) as LoginUserRequest;

    let user = await UserRepository.findByUsername(loginRequest.username);
    if (!user) {
      throw new ResponseError(401, 'Username or password is wrong');
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
      throw new ResponseError(401, 'Username or password is wrong');
    }

    user = await UserRepository.updateToken(user.username, uuid());

    return UserEntity.fromPrisma(user);
  }

  static async get(user: UserEntity): Promise<UserEntity> {
    return user;
  }

  static async update(user: UserEntity, request: UpdateUserRequest): Promise<UserEntity> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request) as UpdateUserRequest;

    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const result = await UserRepository.update(user.username, { name: user.name, password: user.password });
    return UserEntity.fromPrisma(result);
  }

  static async logout(user: UserEntity): Promise<boolean> {
    await UserRepository.updateToken(user.username, null);
    return true;
  }
}
