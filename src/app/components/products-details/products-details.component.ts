import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Products} from "../../models/products";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit{

  product: Products;
  productSubscription: Subscription;

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe( (data) => {
      this.product = data['data']
    })
}


}
