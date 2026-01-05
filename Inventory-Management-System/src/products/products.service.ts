/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginatedResponse } from '../common/dto/pagination-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto, userId: string): Promise<Product> {
    const existing = await this.productRepository.findOne({
      where: { sku: dto.sku },
    });
    console.log(userId);
    
    if (existing) {
      throw new ConflictException('Product with this SKU already exists');
    }

    const product = this.productRepository.create({
      ...dto,
      createdBy: userId,
      updatedBy: userId,
    });
    console.log(product)
    return this.productRepository.save(product);
  }

  async findAll(
    paginationDto?: PaginationQueryDto,
  ): Promise<PaginatedResponse<Product>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'DESC',
    } = paginationDto || {};

    const skip = (page - 1) * limit;

    const [data, total] = await this.productRepository.findAndCount({
      skip,
      take: limit,
      order: {
        [sortBy]: order,
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(
    id: string,
    dto: UpdateProductDto,
    userId: string,
  ): Promise<Product> {
    const product = await this.findOne(id);

    Object.assign(product, dto, {
      updatedBy: userId,
    });

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
