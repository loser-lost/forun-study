
import type { User as PrismaUser } from '../../generated/prisma/client.js';
import { Question } from '../../questions/entities/question.entity.js';
import { Answer } from '../../generated/prisma/browser.js';

export class User implements PrismaUser {
    id: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    questions: Question;
    answers:   Answer;
}
