import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';


@Module({
  imports: [PrismaModule],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
