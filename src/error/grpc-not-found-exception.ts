import { RpcException } from '@nestjs/microservices';
import { GrpcStatus } from '../enum/grpc-status.enum';

export class GrpcNotFoundException extends RpcException {
  constructor(message = 'Requested resource was not found.') {
    super({
      code: GrpcStatus.NOT_FOUND,
      message,
    });
  }
}
