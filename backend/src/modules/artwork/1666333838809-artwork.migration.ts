import { MigrationInterface, QueryRunner } from 'typeorm'
import { Migration } from 'medusa-extender'

@Migration()
export class ArtworkMigration1666333838809 implements MigrationInterface {
    name = 'ArtworkMigration1666333838809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS public.artwork
        (
            id character varying COLLATE pg_catalog."default" NOT NULL,
            name character varying COLLATE pg_catalog."default",
            phone character varying COLLATE pg_catalog."default",
            email character varying COLLATE pg_catalog."default",
            describe character varying COLLATE pg_catalog."default",
            artwork_files character varying COLLATE pg_catalog."default",
            CONSTRAINT artwork_pkey PRIMARY KEY (id)
        )`
        await queryRunner.query(query)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const query = ''
        await queryRunner.query(query)
    }
}
