import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddSuperAdminRole1767621126905 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
