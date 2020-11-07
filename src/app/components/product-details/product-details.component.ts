import { Product } from 'src/app/common/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = null;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId(): any {
    this.activatedRoute.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails(): any {
    // Get the id param string. convert string to a number usign the "+" symbol
    const theProductId: number = +this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
        console.log(this.product)
      }
    );
  }

}
