import { Answer } from "../../generated/prisma/client.js";
import { Question } from "../../questions/entities/question.entity.js";

export class AnswerEntity implements Answer {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  questionId: number;
  userId: number;
  questions: Question;
}