/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AppBaseEntity } from '../../common/entities/base.entity';
import { Product } from '../../products/entities/product.entity';

export enum StockStatus {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}
@Entity('inventory')
export class Inventory extends AppBaseEntity {
  @ManyToOne(() => Product, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({
    type: 'enum',
    enum: StockStatus,
    default: StockStatus.OUT_OF_STOCK,
  })
  status: StockStatus;
}
