import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBooksTable1623782762973 implements MigrationInterface {
    name = 'CreateBooksTable1623782762973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "books_genre_enum" AS ENUM('FANTASY', 'SCIENCE_FICTION', 'SHORT_STORY')`);
        await queryRunner.query(`CREATE TABLE "books" ("uuid" uuid NOT NULL, "title" character varying(36) NOT NULL, "isbn" character varying(36) NOT NULL, "genre" "books_genre_enum" NOT NULL, "number_of_pages" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying(60) NOT NULL DEFAULT CURRENT_USER, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying(60) NOT NULL DEFAULT CURRENT_USER, CONSTRAINT "PK_fdfdb396ba1dcfd56c904bdfdff" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_54337dc30d9bb2c3fadebc6909" ON "books" ("isbn") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_54337dc30d9bb2c3fadebc6909"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TYPE "books_genre_enum"`);
    }

}
