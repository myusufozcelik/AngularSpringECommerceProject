import { CartService } from './../../../services/cart.service';
import { CartItem } from './../../../common/cart-item';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId = 1;
  searchMode = false;
  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  previusCategoryId = 1;
  previousKeyword: string = null;

  constructor(private productService: ProductService, private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProducts();
    });
  }

  getProducts(): any {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchProducts();
    }

    else {
      this.handleListProducts();
    }
  }

  // tslint:disable-next-line: typedef
  handleSearchProducts() {
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    // if we have a different keyword than previos then set thePageNumber to 1
    // tslint:disable-next-line: triple-equals
      if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
      this.previousKeyword = theKeyword;
      this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword)
      .subscribe(this.processResult());
      // now search for the products using keyword
      this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  // tslint:disable-next-line: typedef
  handleListProducts() {
    // id ye sahip mi?
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
  }
  else {
    this.currentCategoryId = 1;
  }

    // tslint:disable-next-line: triple-equals
    if (this.previusCategoryId != this.currentCategoryId) {
    this.thePageNumber = 1;
  }

    this.previusCategoryId = this.currentCategoryId;

 // thePageNumber-1 = based page (pages are 0 based)
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
  .subscribe(this.processResult());
  }
  // tslint:disable-next-line: typedef
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageSize = data.page.size;
      this.thePageNumber = data.page.number + 1;
      this.theTotalElements = data.page.totalElements;
    };
  }

  // tslint:disable-next-line: typedef
  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.getProducts();
  }

  // tslint:disable-next-line: typedef
  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);

  }

}
