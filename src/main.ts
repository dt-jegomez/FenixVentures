import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuración de Swagger
    const config = new DocumentBuilder()
        .setTitle('Fenix Ventures API')
        .setDescription('API para gestión de tareas')
        .setVersion('1.0')
        .addTag('tasks')
        .addBearerAuth() // Añadimos autenticación Bearer a Swagger
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Otras configuraciones
    app.use(helmet());
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
        })
    );
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
}
bootstrap();