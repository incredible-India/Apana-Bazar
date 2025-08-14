import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface ProductDetail extends Product {
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

@Injectable({
  providedIn: 'root' 
})
export class ProductService {


  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductResponse>(this.apiUrl).pipe(
      map(response => response.products)
    );
  }
    getProductById(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.apiUrl}/${id}`);
  }
  
}