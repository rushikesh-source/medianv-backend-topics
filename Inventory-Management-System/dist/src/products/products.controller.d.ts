import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto, req: any): Promise<import("./entities/product.entity").Product>;
    findAll(paginationDto: PaginationQueryDto): Promise<import("../common/dto/pagination-response.dto").PaginatedResponse<import("./entities/product.entity").Product>>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(id: string, dto: UpdateProductDto, req: any): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
