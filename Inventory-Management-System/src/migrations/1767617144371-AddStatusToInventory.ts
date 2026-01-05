import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusToInventory1767617144371 implements MigrationInterface {
  name = 'AddStatusToInventory1767617144371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if enum type already exists, create if not
    const enumExists = await queryRunner.query(
      `SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'inventory_status_enum'
      )`,
    );

    if (!enumExists[0].exists) {
      await queryRunner.query(
        `CREATE TYPE "public"."inventory_status_enum" AS ENUM('IN_STOCK', 'OUT_OF_STOCK')`,
      );
    }

    // Check if status column already exists
    const columnExists = await queryRunner.query(
      `SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inventory' AND column_name = 'status'
      )`,
    );

    if (!columnExists[0].exists) {
      // Add the status column with default value
      await queryRunner.query(
        `ALTER TABLE "inventory" ADD "status" "public"."inventory_status_enum" NOT NULL DEFAULT 'OUT_OF_STOCK'`,
      );

      // Update existing records: set IN_STOCK if quantity > 0, otherwise OUT_OF_STOCK
      await queryRunner.query(
        `UPDATE "inventory" SET "status" = 'IN_STOCK' WHERE "quantity" > 0`,
      );
      await queryRunner.query(
        `UPDATE "inventory" SET "status" = 'OUT_OF_STOCK' WHERE "quantity" = 0`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the status column
    await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "status"`);

    // Drop the enum type
    await queryRunner.query(`DROP TYPE "public"."inventory_status_enum"`);
  }
}
