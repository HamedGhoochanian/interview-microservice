import { Expose, Transform, Type } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  @Transform(({ value }: { value: Date }) => value.toISOString().split('T')[0])
  birthday: string;
  @Expose()
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: string;
}

export class UserListDto {
  @Expose()
  @Type(() => UserResponseDto)
  data: UserResponseDto[];
  @Expose()
  count: number;
}
