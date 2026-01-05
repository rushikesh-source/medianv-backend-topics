import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.useGlobalFilters(new HttpExceptionFilter());

  // Setup Swagger documentation
  setupSwagger(app);

  await app.listen(process.env.APP_PORT || 3000);
  console.log(`Application is running on: http://localhost:${process.env.APP_PORT || 3000}`);
  console.log(`Swagger documentation: http://localhost:${process.env.APP_PORT || 3000}/api/docs`);
}
bootstrap();
