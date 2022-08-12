import { PartialType } from '@nestjs/mapped-types';
import { UserCreateDTO } from './user-create.dto';
import { IsMongoId } from 'class-validator';

export class UserUpdateDto extends PartialType(UserCreateDTO) {
  @IsMongoId({ message: 'invalid id' })
  id: string;
}
