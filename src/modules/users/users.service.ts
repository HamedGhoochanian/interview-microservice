import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { UserCreateDTO } from './dto/user-create.dto';
import { ObjectId } from 'mongodb';
import { plainToInstance } from 'class-transformer';
import { UserListDto, UserResponseDto } from './dto/user-response.dto';
import { GrpcNotFoundException } from '../../error/grpc-not-found-exception';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  @InjectModel(User.name) private readonly userModel: Model<UserDocument>;

  public async createUser(payload: UserCreateDTO) {
    const user = await this.userModel.create({
      ...payload,
      birthday: new Date(payload.birthday),
    });
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  public async fetchUser(id: string) {
    const user = await this.userModel.findOne({
      _id: new ObjectId(id),
      isDeleted: false,
    });
    if (!user) {
      throw new GrpcNotFoundException();
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  public async listUsers(params: { skip?: number; limit?: number }) {
    const skip = params.skip || 0;
    const limit = params.limit || 20;
    const [users, count] = await Promise.all([
      this.userModel.find({ isDeleted: false }).skip(skip).limit(limit),
      this.userModel.count({ isDeleted: false }),
    ]);
    return plainToInstance(
      UserListDto,
      { data: users, count },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  public async deleteUser(id: string) {
    const user = await this.userModel.findOne({
      _id: new ObjectId(id),
      isDeleted: false,
    });
    if (!user) {
      throw new GrpcNotFoundException();
    }
    user.isDeleted = true;
    await user.save();
  }

  public async updateUser(payload: UserUpdateDto) {
    const user = await this.userModel.findOne({
      _id: new ObjectId(payload.id),
      isDeleted: false,
    });
    if (!user) {
      throw new GrpcNotFoundException();
    }
    user.name = payload.name || user.name;
    user.email = payload.email || user.email;
    if (payload.birthday) {
      user.birthday = new Date(payload.birthday);
    }
    await user.save();
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
