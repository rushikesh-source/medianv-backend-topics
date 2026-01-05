import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { Product } from '../products/entities/product.entity';
import { AddStockDto } from './dto/add-stock.dto';
import { RemoveStockDto } from './dto/remove-stock.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginatedResponse } from '../common/dto/pagination-response.dto';
export declare class InventoryService {
    private readonly inventoryRepository;
    private readonly productRepository;
    constructor(inventoryRepository: Repository<Inventory>, productRepository: Repository<Product>);
    addStock(dto: AddStockDto, userId: string): Promise<Inventory>;
    removeStock(dto: RemoveStockDto, userId: string): Promise<Inventory>;
    getInventoryByProduct(productId: string): Promise<Inventory>;
    findAll(paginationDto?: PaginationQueryDto): Promise<PaginatedResponse<Inventory>>;
}
