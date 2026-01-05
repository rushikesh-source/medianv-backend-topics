"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("tsconfig-paths/register");
const data_source_1 = require("./data-source");
const _1767617144371_AddStatusToInventory_1 = require("./src/migrations/1767617144371-AddStatusToInventory");
async function runSingleMigration() {
    try {
        console.log('Initializing database connection...');
        await data_source_1.AppDataSource.initialize();
        console.log('Running AddStatusToInventory migration...');
        const queryRunner = data_source_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const migration = new _1767617144371_AddStatusToInventory_1.AddStatusToInventory1767617144371();
            await migration.up(queryRunner);
            await queryRunner.commitTransaction();
            console.log('Migration completed successfully!');
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
runSingleMigration();
//# sourceMappingURL=run-single-migration.js.map