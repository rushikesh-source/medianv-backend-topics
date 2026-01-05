import { Entity, Column } from 'typeorm';
import { AppBaseEntity } from 'src/common/entities/base.entity';

@Entity('products')
export class Product extends AppBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
