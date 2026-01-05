"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSuperAdminRole1767621126905 = void 0;
class AddSuperAdminRole1767621126905 {
    name = 'AddSuperAdminRole1767621126905';
    async up(queryRunner) {
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
            await queryRunner.query(`ALTER TYPE "public"."users_role_enum" ADD VALUE IF NOT EXISTS 'SUPER_ADMIN'`);
        }
    }
    async down(queryRunner) {
        console.warn('Warning: Removing enum values requires recreating the enum type. This migration down() is intentionally empty.');
    }
}
exports.AddSuperAdminRole1767621126905 = AddSuperAdminRole1767621126905;
//# sourceMappingURL=1767621126905-AddSuperAdminRole.js.map