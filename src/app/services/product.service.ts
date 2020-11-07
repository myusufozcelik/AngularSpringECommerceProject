import { ProductCategory } from './../common/product-category';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  url: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.url}/products/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProduct(theProductId: number): Observable<Product> {

    const productUrl = `${this.url}/products/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(`${searchUrl}`)
      .pipe(
        map(data => data._embedded.products)
      );
  }

  getProductCategories(): Observable<ProductCategory[]> {
      return this.httpClient.get<GetResponseProductCategories>(`${this.url}/product-category`)
      .pipe(map(response => response._embedded.productCategory));
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.url}/products/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponseProducts>(`${searchUrl}`)
    .pipe(
      map(data => data._embedded.products)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
