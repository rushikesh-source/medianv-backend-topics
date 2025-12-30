/* src/app.module.ts */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    // 🔹 Global DB connection (hardcoded)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'rushikesh01@mediaNV',
      database: 'backend-app',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    EmployeeModule,
  ],
})
export class AppModule {}
