import { MigrationInterface, QueryRunner } from 'typeorm'

export default class productCollectionRelation1613146953073
    implements MigrationInterface
{
    name = 'productCollectionRelation1613146953073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "product_collection_relation" ("id" character varying NOT NULL, "product_id" character varying NOT NULL, "product_collection_id" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_49d4394c77d3aed46c835c558ac" PRIMARY KEY ("id"))`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product_collection_relation"`)
    }
}
