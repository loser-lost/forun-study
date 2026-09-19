import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, ParseIntPipe } from '@nestjs/common';
import { AnswerService } from './answer.service.js';
import { CreateAnswerDto } from './dto/create-answer.dto.js';
import { UpdateAnswerDto } from './dto/update-answer.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(AuthGuard)
  @Post(':questionId')
  create(@Body() createAnswerDto: CreateAnswerDto, @Request() req: any, @Param('questionId', ParseIntPipe) questionId: number,) {
    return this.answerService.create(createAnswerDto, req.sub, questionId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.answerService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.answerService.remove(id);
  }
}
