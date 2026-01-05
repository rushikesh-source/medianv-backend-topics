"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("tsconfig-paths/register");
const data_source_1 = require("./data-source");
async function runMigrations() {
    try {
        console.log('Initializing database connection...');
        await data_source_1.AppDataSource.initialize();
        console.log('Running migrations...');
        await data_source_1.AppDataSource.runMigrations();
        console.log('Migrations completed successfully!');
        await data_source_1.AppDataSource.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error('Error running migrations:', error);
        await data_source_1.AppDataSource.destroy();
        process.exit(1);
    }
}
runMigrations();
//# sourceMappingURL=run-migration.js.map