import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddStatusToInventory1767617144371 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
