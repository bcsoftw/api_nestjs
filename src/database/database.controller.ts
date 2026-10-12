import { Controller, Delete, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController() // Exclude this controller from Swagger documentation
@Controller('database')
export class DatabaseController {
  constructor(private readonly dbService: DatabaseService) {}

  @Version('1')
  @Delete('clear')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna un estado 204 sin cuerpo
  async clearAllData() {
    // Recuerda proteger este endpoint en producción para que nadie lo use por error
    await this.dbService.cleanDatabase();
  }
}
