/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inventory, StockStatus } from './entities/inventory.entity';
import { Product } from '../products/entities/product.entity';
import { AddStockDto } from './dto/add-stock.dto';
import { RemoveStockDto } from './dto/remove-stock.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginatedResponse } from '../common/dto/pagination-response.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // ADD STOCK WITH AUDIT
  async addStock(dto: AddStockDto, userId: string) {
    const { productId, quantity } = dto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let inventory = await this.inventoryRepository.findOne({
      where: { product: { id: productId } },
      relations: ['product'],
    });

    if (!inventory) {
      inventory = this.inventoryRepository.create({
        product,
        quantity,
        status: quantity > 0 ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK,
        createdBy: userId,
        updatedBy: userId,
      });
    } else {
      inventory.quantity += quantity;
      inventory.status = inventory.quantity > 0 ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK;
      inventory.updatedBy = userId;
    }

    return this.inventoryRepository.save(inventory);
  }

  //  REMOVE STOCK WITH AUDIT

  async removeStock(dto: RemoveStockDto, userId: string) {
    const { productId, quantity } = dto;

    const inventory = await this.inventoryRepository.findOne({
      where: { product: { id: productId } },
      relations: ['product'],
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    if (inventory.quantity < quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    inventory.quantity -= quantity;
    inventory.status = inventory.quantity > 0 ? StockStatus.IN_STOCK : StockStatus.OUT_OF_STOCK;
    inventory.updatedBy = userId;

    return this.inventoryRepository.save(inventory);
  }

  // GET INVENTORY
  async getInventoryByProduct(productId: string) {
    const inventory = await this.inventoryRepository.findOne({
      where: { product: { id: productId } },
      relations: ['product'],
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }

    return inventory;
  }

  // GET ALL INVENTORY WITH PAGINATION
  async findAll(
    paginationDto?: PaginationQueryDto,
  ): Promise<PaginatedResponse<Inventory>> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'DESC',
    } = paginationDto || {};

    const skip = (page - 1) * limit;

    const [data, total] = await this.inventoryRepository.findAndCount({
      skip,
      take: limit,
      relations: ['product'],
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
}
