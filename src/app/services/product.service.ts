import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }


  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(`${this.url}`)
    .pipe(
      map(data => data._embedded.products)
    )
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}