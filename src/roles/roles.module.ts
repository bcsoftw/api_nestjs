import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [RolesController],
  providers: [UsersService, RolesService, PermissionsGuard],
})
export class RolesModule {}
