import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'The text.',
    required: true,
  })
  text: string;

  @ApiProperty({
    description: 'Indicates if the todo is completed.',
    required: true,
  })
  isCompleted: boolean;
}

export class UpdateTodoDto {
  @ApiProperty({
    description: 'The text.',
    nullable: true,
    type: String,
  })
  text?: string | null;

  @ApiProperty({
    description: 'Indicates if the todo is completed.',
    nullable: true,
    type: Boolean,
  })
  isCompleted?: boolean | null;
}

export class TodoDto {
  @ApiProperty({
    description: 'The ID.',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'The text.',
    required: true,
  })
  text: string;

  @ApiProperty({
    description: 'Indicates if the todo is completed.',
    required: true,
  })
  isCompleted: boolean;

  constructor(source?: TodoDto) {
    if (source) {
      this.id = source.id;
      this.text = source.text;
      this.isCompleted = source.isCompleted;
    }
  }
}

export class TodoDetailsDto {
  @ApiProperty({
    description: 'The ID.',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'The text.',
    required: true,
  })
  text: string;

  @ApiProperty({
    description: 'Indicates if the todo is completed.',
    required: true,
  })
  isCompleted: boolean;

  @ApiProperty({
    description: 'When the completion has been done.',
    nullable: true,
    type: String,
    format: 'date-time',
  })
  completedAt?: Date;

  constructor(source?: TodoDetailsDto) {
    if (source) {
      this.id = source.id;
      this.text = source.text;
      this.isCompleted = source.isCompleted;
      this.completedAt = source.completedAt;
    }
  }
}

export class TodosDto {
  @ApiProperty({
    description: 'The actual todos.',
    required: true,
    type: [TodoDto],
  })
  items: TodoDto[];
}
