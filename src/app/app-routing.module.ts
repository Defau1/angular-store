import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseComponent} from "./components/base/base.component";
import {ProductsComponent} from "./components/products/products.component";
import {ProductsDetailsComponent} from "./components/products-details/products-details.component";
import {BasketComponent} from "./components/basket/basket.component";
import {ProductsResolver} from "./services/products.resolver";

const routes: Routes = [
  {path: '', component: BaseComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductsDetailsComponent, resolve: {
    data: ProductsResolver
    }},
  {path: 'basket', component: BasketComponent},

  {path: '**', redirectTo: '', component: BaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
