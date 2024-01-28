import {Component, OnDestroy, OnInit} from '@angular/core';
import {Products} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy{

  constructor(private ProductsService: ProductsService) {}

  basket: Products[]
  basketSubscription: Subscription


  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data
    })
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }

  minusItemFromBasket(item: Products) {
    if (item.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id)
        this.basket.splice(idx, 1)
      })
    } else {
      item.quantity -= 1
      this.ProductsService.updateProductToBasket(item).subscribe((data) => {})
    }
  }

  plusItemFromBasket(item: Products) {
    item.quantity += 1
    this.ProductsService.updateProductToBasket(item).subscribe((data) => {})
  }

}
