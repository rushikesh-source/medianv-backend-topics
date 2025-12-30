/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Param, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
     constructor(private readonly productService: ProductService) { }

     @Get()
     getProducts() {
          return this.productService.getAllProducts();
     }

     @Get(':id')
     getProductByID(@Param('id') id: string) {
          return this.productService.getProductById(Number(id));
     }
}
