import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/products.service';
import { DecimalPipe,TitleCasePipe,NumberFormatStyle } from '@angular/common';
import { NgIf,NgFor } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, TitleCasePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [DecimalPipe]
})
export class ProductComponent implements OnInit {
 products: Product[] = [];
  isLoading = true; 
  errorMessage = '';


  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false; 
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }
   viewProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
}
