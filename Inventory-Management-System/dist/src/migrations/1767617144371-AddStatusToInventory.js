"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStatusToInventory1767617144371 = void 0;
class AddStatusToInventory1767617144371 {
    name = 'AddStatusToInventory1767617144371';
    async up(queryRunner) {
        const enumExists = await queryRunner.query(`SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'inventory_status_enum'
      )`);
        if (!enumExists[0].exists) {
            await queryRunner.query(`CREATE TYPE "public"."inventory_status_enum" AS ENUM('IN_STOCK', 'OUT_OF_STOCK')`);
        }
        const columnExists = await queryRunner.query(`SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'inventory' AND column_name = 'status'
      )`);
        if (!columnExists[0].exists) {
            await queryRunner.query(`ALTER TABLE "inventory" ADD "status" "public"."inventory_status_enum" NOT NULL DEFAULT 'OUT_OF_STOCK'`);
            await queryRunner.query(`UPDATE "inventory" SET "status" = 'IN_STOCK' WHERE "quantity" > 0`);
            await queryRunner.query(`UPDATE "inventory" SET "status" = 'OUT_OF_STOCK' WHERE "quantity" = 0`);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_status_enum"`);
    }
}
exports.AddStatusToInventory1767617144371 = AddStatusToInventory1767617144371;
//# sourceMappingURL=1767617144371-AddStatusToInventory.js.map