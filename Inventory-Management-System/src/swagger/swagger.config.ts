import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: any): void {
  const config = new DocumentBuilder()
    .setTitle('Inventory Management System API')
    .setDescription(
      'API documentation for Inventory Management System. Manage products, inventory, and users with role-based access control.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Products', 'Product management endpoints')
    .addTag('Inventory', 'Inventory management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}
