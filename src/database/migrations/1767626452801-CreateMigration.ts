import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1767626452801 implements MigrationInterface {
    name = 'CreateMigration1767626452801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'GESTOR', 'CODER')`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "email" character varying(180) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'CODER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vacancies_location_enum" AS ENUM('Medellín', 'Barranquilla', 'Bogotá', 'Cartagena')`);
        await queryRunner.query(`CREATE TYPE "public"."vacancies_modality_enum" AS ENUM('remote', 'hybrid', 'on-site')`);
        await queryRunner.query(`CREATE TABLE "vacancies" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(160) NOT NULL, "description" text NOT NULL, "technologies" text NOT NULL, "seniority" character varying(60) NOT NULL, "softSkills" text NOT NULL, "location" "public"."vacancies_location_enum" NOT NULL, "modality" "public"."vacancies_modality_enum" NOT NULL, "salaryRange" character varying(80) NOT NULL, "company" character varying(120) NOT NULL, "maxApplicants" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "applications" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appliedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "vacancyId" uuid NOT NULL, CONSTRAINT "UQ_c53ada8f86847db0cb2c0e76703" UNIQUE ("userId", "vacancyId"), CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_5707a4abd8063c6494064d22d05" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_5707a4abd8063c6494064d22d05"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
        await queryRunner.query(`DROP TYPE "public"."vacancies_modality_enum"`);
        await queryRunner.query(`DROP TYPE "public"."vacancies_location_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
