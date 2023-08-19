/**
 * Represents the User entity in the application's database.
 * This class extends the Model abstract base class to inherit common fields like id, created_at, and updated_at.
 */

import crypto from 'crypto';
import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends Model {
  @Column()
  name!: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType.USER | RoleEnumType.ADMIN;

  @Column()
  password!: string;

  @Column({
    default: false,
  })
  verified: boolean;

  @Index('verificationCode_index')
  @Column({
    type: 'text',
    nullable: true,
  })
  verificationCode!: string | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  static createVerificationCode() {
    const verificationCode = crypto.randomBytes(32).toString('hex');

    const hashedVerificationCode = crypto.createHash('sha256').update(verificationCode).digest('hex');

    return { verificationCode, hashedVerificationCode };
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
      verified: undefined,
      verificationCode: undefined,
    };
  }
}
