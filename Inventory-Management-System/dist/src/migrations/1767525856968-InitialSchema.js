"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1767525856968 = void 0;
class InitialSchema1767525856968 {
    name = 'InitialSchema1767525856968';
    async up(queryRunner) {
        const statusEnumExists = await queryRunner.query(`SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_status_enum')`);
        if (!statusEnumExists[0].exists) {
            await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        }
        const roleEnumExists = await queryRunner.query(`SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum')`);
        if (!roleEnumExists[0].exists) {
            await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'STAFF')`);
        }
        const tableExists = await queryRunner.query(`SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users')`);
        if (!tableExists[0].exists) {
            await queryRunner.query(`CREATE TABLE "users" ("status" "public"."users_status_enum" NOT NULL DEFAULT 'ACTIVE', "createdBy" integer, "updatedBy" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    }
}
exports.InitialSchema1767525856968 = InitialSchema1767525856968;
//# sourceMappingURL=1767525856968-InitialSchema.js.map