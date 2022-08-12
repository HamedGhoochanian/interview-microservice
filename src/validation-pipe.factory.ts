import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from './error/validation-exception';

export default function validationPipeFactory() {
  return new ValidationPipe({
    transform: true,
    exceptionFactory: (errors) =>
      new ValidationException(
        errors.map((e) => Object.values(e.constraints)).flat(),
      ),
  });
}
