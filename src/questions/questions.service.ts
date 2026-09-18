import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto.js';
import { UpdateQuestionDto } from './dto/update-question.dto.js';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class QuestionsService {

   @Inject()
      private readonly prisma: PrismaService;// injeção de dependência do prisma service para o user service

  async create(createQuestionDto: CreateQuestionDto, req: any) {
    return await this.prisma.question.create({
      data: { ...createQuestionDto, userId: req.sub },
    })
  }

  async findAll() {
    return await this.prisma.question.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.question.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.question.delete({
      where: { id },
    });
  }
}
