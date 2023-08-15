/**
 * This migration script adds the necessary tables and relationships to the database
 * for the 'users' entities. It also defines an enum type for user roles.
 * The script sets up the initial structure for the database schema.
 * @module addedUserEntity1692081383694
 */

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
    await queryRunner.query(`CREATE TABLE "users" (...)`);

    // Create indexes for the 'users' table
    await queryRunner.query(`CREATE INDEX "email_index" ON "users" (...)`);
    await queryRunner.query(`CREATE INDEX "verificationCode_index" ON "users" (...)`);

    // Create the 'posts' table
    await queryRunner.query(`CREATE TABLE "posts" (...)`);

    // Add a foreign key constraint to the 'posts' table
    await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY (...)`);
  }

  /**
   * Reverts the changes made by the 'up' migration.
   * @param queryRunner - QueryRunner object to execute SQL queries
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint from the 'posts' table
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);

    // Drop the 'posts' table
    await queryRunner.query(`DROP TABLE "posts"`);

    // Drop indexes from the 'users' table
    await queryRunner.query(`DROP INDEX "public"."verificationCode_index"`);
    await queryRunner.query(`DROP INDEX "public"."email_index"`);

    // Drop the 'users' table
    await queryRunner.query(`DROP TABLE "users"`);

    // Drop the enum type for user roles
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
