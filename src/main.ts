import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // Crucial para que @Type(() => Number) funcione en los Query Params
    }),
  );

  // Configuración de metadatos de Swagger
  const config = new DocumentBuilder()
    .setTitle("NestJS BackendAPI with JWT")
    .setDescription(
      "Backend API application included with Authentication Module. It's included with JWT authentication and Swagger API format.",
    )
    .setVersion("1.0")
    .setContact(
      "Brayan Colina",
      "https://bcsoftw.github.io/",
      "bcolina88@gmail.com",
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "access-token", //This reference name must match the decorator used in controllers
    )
    .build();

  // Crear y montar la documentacion
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // SwaggerModule.setup(':version/swagger', app, document, {
  //   patchDocumentOnRequest: (req, _res, doc) => {
  //     const copyDocument = JSON.parse(JSON.stringify(doc));
  //     const version = (req as any).params.version; // ej: 'v1' o 'v2'

  //     for (const route in doc.paths) {
  //       // Si la ruta no empieza con la versión solicitada, se elimina del mapa
  //       if (!route.startsWith(`/${version}`)) {
  //         delete copyDocument.paths[route];
  //       }
  //     }
  //     return copyDocument;
  //   },
  // });

  await app.listen(port);

  app.enableCors();

}
bootstrap();
