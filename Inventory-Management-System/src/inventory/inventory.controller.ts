/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { InventoryService } from './inventory.service';
import { AddStockDto } from './dto/add-stock.dto';
import { RemoveStockDto } from './dto/remove-stock.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/constants/roles.enum';

@ApiTags('Inventory')
@ApiBearerAuth('JWT-auth')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // ADD STOCK
  @Post('add')
  @ApiOperation({ summary: 'Add stock to inventory' })
  @ApiResponse({ status: 200, description: 'Stock added successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  addStock(@Body() dto: AddStockDto, @Req() req) {
    return this.inventoryService.addStock(dto, req.user.id);
  }

  // REMOVE STOCK
  @Post('remove')
  @ApiOperation({ summary: 'Remove stock from inventory' })
  @ApiResponse({ status: 200, description: 'Stock removed successfully' })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  removeStock(@Body() dto: RemoveStockDto, @Req() req) {
    return this.inventoryService.removeStock(dto, req.user.id);
  }

  // GET ALL INVENTORY WITH PAGINATION
  @Get()
  @ApiOperation({ summary: 'Get all inventory items with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Field to sort by (default: createdAt)' })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'], description: 'Sort order (default: DESC)' })
  @ApiResponse({ status: 200, description: 'Returns paginated inventory items' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  findAll(@Query() paginationDto: PaginationQueryDto) {
    return this.inventoryService.findAll(paginationDto);
  }

  // GET INVENTORY BY PRODUCT
  @Get('product/:productId')
  @ApiOperation({ summary: 'Get inventory by product ID' })
  @ApiParam({ name: 'productId', type: String, description: 'Product UUID' })
  @ApiResponse({ status: 200, description: 'Inventory found' })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF)
  
  getInventoryByProduct(
    @Param('productId', ParseUUIDPipe) productId: string,
  ) {
    return this.inventoryService.getInventoryByProduct(productId);
  }
}
