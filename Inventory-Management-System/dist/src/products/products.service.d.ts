import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginatedResponse } from '../common/dto/pagination-response.dto';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    create(dto: CreateProductDto, userId: string): Promise<Product>;
    findAll(paginationDto?: PaginationQueryDto): Promise<PaginatedResponse<Product>>;
    findOne(id: string): Promise<Product>;
    update(id: string, dto: UpdateProductDto, userId: string): Promise<Product>;
    remove(id: string): Promise<void>;
}
