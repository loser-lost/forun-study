import { forwardRef, Module } from '@nestjs/common';
import { AnswerService } from './answer.service.js';
import { AnswerController } from './answer.controller.js';
import { DatabaseModule } from '../database/database.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
