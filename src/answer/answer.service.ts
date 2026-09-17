import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto.js';
import { UpdateAnswerDto } from './dto/update-answer.dto.js';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class AnswerService {

   @Inject()
    private readonly prisma: PrismaService;// injeção de dependência do prisma service para o user service


  create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    
    const newAswer = {
      content: createAnswerDto.content,
      userId: userId,
      questionId: questionId
    } 
    return this.prisma.answer.create({
      data: newAswer
    });
  }

  findAll() {
    return this.prisma.answer.findMany();
  }

  findOne(id: number) {
    return this.prisma.answer.findUnique({
      where: { id }
    });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.answer.update({
      where: { id },
      data: updateAnswerDto
    });
  }

  remove(id: number) {
    return this.prisma.answer.delete({
      where: { id }
    });
  }
}
