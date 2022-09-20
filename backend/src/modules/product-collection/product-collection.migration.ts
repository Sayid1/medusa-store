import { MigrationInterface, QueryRunner } from 'typeorm'
import { Migration } from 'medusa-extender'

@Migration()
export default class addParentIdToProductCollection1645034402086
    implements MigrationInterface
{
    name = 'addParentIdToProductCollection1645034402086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE public."product_collection" ADD COLUMN IF NOT EXISTS "parent_id" text;`,
        )
        await queryRunner.query(
            `ALTER TABLE public."product_collection" ADD COLUMN IF NOT EXISTS "thumbnail" text;`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE public."product_collection" DROP COLUMN "parent_id";`,
        )
        await queryRunner.query(
            `ALTER TABLE public."product_collection" DROP COLUMN "thumbnail";`,
        )
    }
}
