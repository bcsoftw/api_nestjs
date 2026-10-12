import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}

  async cleanDatabase() {
    // Lista de tablas que quieres vaciar
    const tablenames = ['Permission', 'Role', 'User'];

    for (const table of tablenames) {
      try {
        // Ejecuta TRUNCATE reiniciando IDs y borrando en cascada
        await this.prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE;`
        );
      } catch (error) {
        console.error(`Error al vaciar la tabla ${table}:`, error);
      }
    }
  }
}
