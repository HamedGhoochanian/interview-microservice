import {
  IsDateString,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserCreateDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsDateString()
  readonly birthday: string;
}
