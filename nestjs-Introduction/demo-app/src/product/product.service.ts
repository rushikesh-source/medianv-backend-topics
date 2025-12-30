import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    { id: 1, title: 'tablet', price: 1000 },
    { id: 2, title: 'mobile', price: 3000 },
    { id: 3, title: 'computer', price: 10000 },
  ];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
