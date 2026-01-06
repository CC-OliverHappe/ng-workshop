import { Module } from '@nestjs/common';
import { TodosController } from './controllers/deployment/todos.controller';

@Module({
  imports: [],
  controllers: [TodosController],
})
export class AppModule {}
