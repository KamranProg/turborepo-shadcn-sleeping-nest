import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Sleeps example')
    .setDescription('The sleeps API description')
    .setVersion('1.0')
    .addTag('sleeps')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log(`API server is running on: http://localhost:3000/api`);
  console.log(`Swagger docs is runing on http://localhost:3000/docs`);

}
bootstrap();
