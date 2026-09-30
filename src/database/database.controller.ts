import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly dbService: DatabaseService) {}

  @Delete('clear')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna un estado 204 sin cuerpo
  async clearAllData() {
    // Recuerda proteger este endpoint en producción para que nadie lo use por error
    await this.dbService.cleanDatabase();
  }
}
