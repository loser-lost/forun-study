import { forwardRef, Module } from '@nestjs/common';
import { QuestionsService } from './questions.service.js';
import { QuestionsController } from './questions.controller.js';
import { AuthModule } from '../auth/auth.module.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
