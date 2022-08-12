import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop({ type: Date })
  birthday: Date;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ default: () => new Date() })
  createdAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
