import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedUserEntity1692081383694 implements MigrationInterface {
  name = 'addedUserEntity1692081383694';

  /**
   * Runs the migration to create necessary database tables and relationships.
   * @param queryRunner - QueryRunner object to execute SQL queries
   */

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create an enum type for user roles
    await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);

    // Create the 'users' table
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "photo" character varying NOT NULL DEFAULT 'default.png', "verified" boolean NOT NULL DEFAULT false, "verificationCode" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );

    // Create indexes for the 'users' table
    await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
    await queryRunner.query(`CREATE INDEX "verificationCode_index" ON "users" ("verificationCode") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."verificationCode_index"`);
    await queryRunner.query(`DROP INDEX "public"."email_index"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
