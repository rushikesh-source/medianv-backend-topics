/* src/user/entities/user.entity.ts */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Table name in DB
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
