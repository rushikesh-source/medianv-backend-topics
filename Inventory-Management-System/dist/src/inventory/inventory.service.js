"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("./entities/inventory.entity");
const product_entity_1 = require("../products/entities/product.entity");
let InventoryService = class InventoryService {
    inventoryRepository;
    productRepository;
    constructor(inventoryRepository, productRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
    }
    async addStock(dto, userId) {
        const { productId, quantity } = dto;
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        let inventory = await this.inventoryRepository.findOne({
            where: { product: { id: productId } },
            relations: ['product'],
        });
        if (!inventory) {
            inventory = this.inventoryRepository.create({
                product,
                quantity,
                status: quantity > 0 ? inventory_entity_1.StockStatus.IN_STOCK : inventory_entity_1.StockStatus.OUT_OF_STOCK,
                createdBy: userId,
                updatedBy: userId,
            });
        }
        else {
            inventory.quantity += quantity;
            inventory.status = inventory.quantity > 0 ? inventory_entity_1.StockStatus.IN_STOCK : inventory_entity_1.StockStatus.OUT_OF_STOCK;
            inventory.updatedBy = userId;
        }
        return this.inventoryRepository.save(inventory);
    }
    async removeStock(dto, userId) {
        const { productId, quantity } = dto;
        const inventory = await this.inventoryRepository.findOne({
            where: { product: { id: productId } },
            relations: ['product'],
        });
        if (!inventory) {
            throw new common_1.NotFoundException('Inventory not found');
        }
        if (inventory.quantity < quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        inventory.quantity -= quantity;
        inventory.status = inventory.quantity > 0 ? inventory_entity_1.StockStatus.IN_STOCK : inventory_entity_1.StockStatus.OUT_OF_STOCK;
        inventory.updatedBy = userId;
        return this.inventoryRepository.save(inventory);
    }
    async getInventoryByProduct(productId) {
        const inventory = await this.inventoryRepository.findOne({
            where: { product: { id: productId } },
            relations: ['product'],
        });
        if (!inventory) {
            throw new common_1.NotFoundException('Inventory not found');
        }
        return inventory;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = 'createdAt', order = 'DESC', } = paginationDto || {};
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
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map