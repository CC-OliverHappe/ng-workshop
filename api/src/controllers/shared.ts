import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class ValidationErrorItemDto {
  @ApiProperty({
    description: 'The full property path.',
    required: true,
  })
  property: string;

  @ApiProperty({
    description: 'The violated constraints',
    required: true,
  })
  constraints: Record<string, string>;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'The error details.',
    required: true,
  })
  message: any;

  @ApiProperty({
    description: 'The error itself.',
    required: true,
  })
  error: string;

  @ApiProperty({
    description: 'The status code.',
    required: true,
  })
  statusCode: number;
}

export function ApiDefaultResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    }),
  );
}
