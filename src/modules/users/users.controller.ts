import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { MongoIdParamDto } from '../../dto/mongo-id-param.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('users')
export class UsersController {
  @Inject() private readonly userService: UsersService;

  @GrpcMethod('UserService', 'createUser')
  async createUser(data: UserCreateDTO) {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', 'fetchUser')
  async fetchUser(data: MongoIdParamDto) {
    return this.userService.fetchUser(data.id);
  }

  @GrpcMethod('UserService', 'deleteUser')
  async deleteUser(data: MongoIdParamDto) {
    return this.userService.deleteUser(data.id);
  }

  @GrpcMethod('UserService', 'listUsers')
  async listUsers(data) {
    return this.userService.listUsers(data);
  }

  @GrpcMethod('UserService', 'updateUser')
  async updateUser(data: UserUpdateDto) {
    return this.userService.updateUser(data);
  }
}
