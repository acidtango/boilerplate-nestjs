import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1671816610924 implements MigrationInterface {
    name = 'migration1671816610924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "domain_events_succeed" ("eventId" uuid NOT NULL, "eventName" character varying NOT NULL, "aggregateId" character varying NOT NULL, "subscriber" character varying NOT NULL, "ocurredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "actor" jsonb NOT NULL, "payload" jsonb NOT NULL, CONSTRAINT "PK_168434f8942435d2bf626bd6eb6" PRIMARY KEY ("eventId"))`);
        await queryRunner.query(`CREATE TABLE "domain_events_failed" ("eventId" uuid NOT NULL, "eventName" character varying NOT NULL, "aggregateId" character varying NOT NULL, "ocurredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "actor" jsonb NOT NULL, "subscriber" character varying NOT NULL, "failReason" character varying, "payload" jsonb NOT NULL, CONSTRAINT "PK_322bb6a79d473330295a66bea60" PRIMARY KEY ("eventId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_af0a71ac1879b584f255c49c99a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_af0a71ac1879b584f255c49c99a"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "domain_events_failed"`);
        await queryRunner.query(`DROP TABLE "domain_events_succeed"`);
    }

}
