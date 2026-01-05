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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const inventory_service_1 = require("./inventory.service");
const add_stock_dto_1 = require("./dto/add-stock.dto");
const remove_stock_dto_1 = require("./dto/remove-stock.dto");
const pagination_query_dto_1 = require("../common/dto/pagination-query.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_enum_1 = require("../common/constants/roles.enum");
let InventoryController = class InventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    addStock(dto, req) {
        return this.inventoryService.addStock(dto, req.user.id);
    }
    removeStock(dto, req) {
        return this.inventoryService.removeStock(dto, req.user.id);
    }
    findAll(paginationDto) {
        return this.inventoryService.findAll(paginationDto);
    }
    getInventoryByProduct(productId) {
        return this.inventoryService.getInventoryByProduct(productId);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Post)('add'),
    (0, swagger_1.ApiOperation)({ summary: 'Add stock to inventory' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stock added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found' }),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.MANAGER, roles_enum_1.Role.STAFF),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_stock_dto_1.AddStockDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "addStock", null);
__decorate([
    (0, common_1.Post)('remove'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove stock from inventory' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stock removed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inventory not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Insufficient stock' }),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.MANAGER, roles_enum_1.Role.STAFF),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_stock_dto_1.RemoveStockDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "removeStock", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all inventory items with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, type: String, description: 'Field to sort by (default: createdAt)' }),
    (0, swagger_1.ApiQuery)({ name: 'order', required: false, enum: ['ASC', 'DESC'], description: 'Sort order (default: DESC)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns paginated inventory items' }),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.MANAGER, roles_enum_1.Role.STAFF),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get inventory by product ID' }),
    (0, swagger_1.ApiParam)({ name: 'productId', type: String, description: 'Product UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inventory found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inventory not found' }),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.MANAGER, roles_enum_1.Role.STAFF),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getInventoryByProduct", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Inventory'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('inventory'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map