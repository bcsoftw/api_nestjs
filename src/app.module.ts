import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core'
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en todo el proyecto
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // Tiempo de vida en milisegundos (1 segundo)
        limit: 3, // Máximo 3 peticiones por segundo
      },
      {
        name: 'medium',
        ttl: 60000, // 1 minuto
        limit: 100, // Máximo 100 peticiones por minuto
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      // Esto aplica el Guard de forma global a todos los controladores
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
