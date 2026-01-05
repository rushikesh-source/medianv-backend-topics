import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSuperAdminRole1767621126905 implements MigrationInterface {
  name = 'AddSuperAdminRole1767621126905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if SUPER_ADMIN already exists in the enum
    const enumCheck = await queryRunner.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'SUPER_ADMIN' 
        AND enumtypid = (
          SELECT oid FROM pg_type WHERE typname = 'users_role_enum'
        )
      )
    `);

    if (!enumCheck[0].exists) {
      // Add SUPER_ADMIN to the existing enum type
      await queryRunner.query(
        `ALTER TYPE "public"."users_role_enum" ADD VALUE IF NOT EXISTS 'SUPER_ADMIN'`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Note: PostgreSQL doesn't support removing enum values directly
    // You would need to recreate the enum type, which is complex
    // For safety, we'll leave this empty or you can implement a full enum recreation
    console.warn(
      'Warning: Removing enum values requires recreating the enum type. This migration down() is intentionally empty.',
    );
  }
}
