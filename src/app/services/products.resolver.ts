import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, EMPTY, Observable, of} from "rxjs";
import {Products} from "../models/products";
import {ProductsService} from "./products.service";

@Injectable({
  providedIn: "root"
})

export class ProductsResolver implements Resolve<Products> {
  constructor(private ProductsService: ProductsService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Products> {
    return this.ProductsService.getProduct(route.params?.['id'])
      .pipe(
        catchError( () => {
          this.router.navigate(['products']);
          return EMPTY
        })
      )
  }
}
