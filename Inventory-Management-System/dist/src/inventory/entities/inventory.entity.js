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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = exports.StockStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const product_entity_1 = require("../../products/entities/product.entity");
var StockStatus;
(function (StockStatus) {
    StockStatus["IN_STOCK"] = "IN_STOCK";
    StockStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
})(StockStatus || (exports.StockStatus = StockStatus = {}));
let Inventory = class Inventory extends base_entity_1.AppBaseEntity {
    product;
    quantity;
    status;
};
exports.Inventory = Inventory;
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], Inventory.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StockStatus,
        default: StockStatus.OUT_OF_STOCK,
    }),
    __metadata("design:type", String)
], Inventory.prototype, "status", void 0);
exports.Inventory = Inventory = __decorate([
    (0, typeorm_1.Entity)('inventory')
], Inventory);
//# sourceMappingURL=inventory.entity.js.map