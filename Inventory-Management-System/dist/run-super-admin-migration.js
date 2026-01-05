"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("tsconfig-paths/register");
const data_source_1 = require("./data-source");
const _1767621126905_AddSuperAdminRole_1 = require("./src/migrations/1767621126905-AddSuperAdminRole");
async function runSuperAdminMigration() {
    try {
        console.log('Initializing database connection...');
        await data_source_1.AppDataSource.initialize();
        console.log('Running AddSuperAdminRole migration...');
        const queryRunner = data_source_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const migration = new _1767621126905_AddSuperAdminRole_1.AddSuperAdminRole1767621126905();
            await migration.up(queryRunner);
            await queryRunner.commitTransaction();
            console.log('✅ Migration completed successfully!');
            console.log('SUPER_ADMIN role has been added to the database.');
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
        await data_source_1.AppDataSource.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error('Error running migration:', error);
        await data_source_1.AppDataSource.destroy();
        process.exit(1);
    }
}
runSuperAdminMigration();
//# sourceMappingURL=run-super-admin-migration.js.map