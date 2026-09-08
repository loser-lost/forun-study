import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../generated/prisma/client.js';
import * as dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;


    const adapter = new PrismaBetterSqlite3({
      url: databaseUrl || 'file:./forum.db', // erro não estou conmseguindo acessar a variável de ambiente DATABASE_URL, então estou colocando um valor padrão para o banco de dados
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}