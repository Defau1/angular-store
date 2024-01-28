import {Component, OnInit, OnDestroy} from '@angular/core';
import {Products} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Products[];
  productsSubscription: Subscription;
  basket: Products[];
  basketSubscription: Subscription;
  canView: boolean = false;
  canEdit: boolean = false
  constructor(private ProductsService: ProductsService,
              public dialog: MatDialog) {}
  ngOnInit(): void {
    this.canEdit = true
    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data
    })
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data
    })
  }
  postData(data: Products) {
    this.ProductsService.postProduct(data).subscribe((data) => this.products.push(data))
  }
  openDialog(product?: Products): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px'
    dialogConfig.disableClose = true
    dialogConfig.data = product
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id)
          this.updateData(data)
        else
          this.postData(data)
      }
    })
  }
  updateData(product: Products) {
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map( (product) => {
        if (product.id === data.id) return data
        else return product
      })
    })
  }
  deleteItem(id: number) {
    this.ProductsService.deleteProduct(id).subscribe(() => this.products.find( (item) => {
      if (id === item.id) {
        let idx = this.products.findIndex( (data) => data.id === id )
        this.products.splice(idx, 1)
      }
    }))
  }
  addToBasket(product: Products) {
    product.quantity = 1
    let findItem;
    if (this.basket.length > 0) {
      findItem = this.basket.find( (item) => item.id === product.id)
      if (findItem) this.updateToBasket(findItem)
      else this.postToBasket(product)
    } else this.postToBasket(product)
      // console.log(data)
  }
  postToBasket(product: Products) {
    this.ProductsService.postProductToBasket(product).subscribe( (data) =>
      this.basket.push(data)
    );
  }
  updateToBasket(product: Products) {
    product.quantity += 1
    this.ProductsService.updateProductToBasket(product).subscribe((data) => {
    })
  }
  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }
}
