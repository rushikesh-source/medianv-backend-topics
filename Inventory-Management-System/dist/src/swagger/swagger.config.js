"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Inventory Management System API')
        .setDescription('API documentation for Inventory Management System. Manage products, inventory, and users with role-based access control.')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Auth', 'Authentication endpoints')
        .addTag('Users', 'User management endpoints')
        .addTag('Products', 'Product management endpoints')
        .addTag('Inventory', 'Inventory management endpoints')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
}
//# sourceMappingURL=swagger.config.js.map