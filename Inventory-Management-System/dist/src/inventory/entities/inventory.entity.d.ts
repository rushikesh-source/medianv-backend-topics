import { AppBaseEntity } from '../../common/entities/base.entity';
import { Product } from '../../products/entities/product.entity';
export declare enum StockStatus {
    IN_STOCK = "IN_STOCK",
    OUT_OF_STOCK = "OUT_OF_STOCK"
}
export declare class Inventory extends AppBaseEntity {
    product: Product;
    quantity: number;
    status: StockStatus;
}
