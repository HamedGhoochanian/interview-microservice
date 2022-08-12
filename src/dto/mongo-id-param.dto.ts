import { IsMongoId } from 'class-validator';

export class MongoIdParamDto {
  @IsMongoId({ message: 'invalid id' })
  id: string;
}
