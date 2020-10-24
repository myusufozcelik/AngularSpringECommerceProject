import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
      this.getProducts();
  }

  getProducts() {
    this.productService.getProductList().subscribe(data => {
      this.products = data;
    });
  }

}
