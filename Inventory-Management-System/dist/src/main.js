"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const swagger_config_1 = require("./swagger/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api");
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    (0, swagger_config_1.setupSwagger)(app);
    await app.listen(process.env.APP_PORT || 3000);
    console.log(`Application is running on: http://localhost:${process.env.APP_PORT || 3000}`);
    console.log(`Swagger documentation: http://localhost:${process.env.APP_PORT || 3000}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map