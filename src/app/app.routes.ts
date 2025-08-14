import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [

    {path: 'product', component: ProductComponent},
    {path: 'about', component: AboutComponent},
    { path: 'products/:id', component: ProductDetailsComponent },
    {path: '**', component: ProductComponent},

];
