import { InventoryService } from './inventory.service';
import { AddStockDto } from './dto/add-stock.dto';
import { RemoveStockDto } from './dto/remove-stock.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    addStock(dto: AddStockDto, req: any): Promise<import("./entities/inventory.entity").Inventory>;
    removeStock(dto: RemoveStockDto, req: any): Promise<import("./entities/inventory.entity").Inventory>;
    findAll(paginationDto: PaginationQueryDto): Promise<import("../common/dto/pagination-response.dto").PaginatedResponse<import("./entities/inventory.entity").Inventory>>;
    getInventoryByProduct(productId: string): Promise<import("./entities/inventory.entity").Inventory>;
}
