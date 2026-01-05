import { Entity, Column } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';

@Entity('users')
export class User extends AppBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
