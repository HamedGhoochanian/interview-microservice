import { RpcException } from '@nestjs/microservices';
import { GrpcStatus } from '../enum/grpc-status.enum';

export class ValidationException extends RpcException {
  constructor(messages: string[]) {
    super({ code: GrpcStatus.INVALID_ARGUMENT, message: messages });
  }
}
