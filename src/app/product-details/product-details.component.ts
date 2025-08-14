import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { ProductService,ProductDetail } from '../../services/products.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-details',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
 product: ProductDetail | undefined;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService
  ) { }
   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.fetchProductDetails(+productId); 
      } else {
        this.isLoading = false;
        this.errorMessage = 'Product ID not found.';
      }
    });
  }

  fetchProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.errorMessage = 'Failed to load product details. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
