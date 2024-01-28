import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Products} from "../models/products";

@Injectable({
  providedIn: "root"
})

export class ProductsService {

  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Products[]>(this.url);
  }

  getProduct(id: number) {
    return this.http.get<Products>(`${this.url}/${id}`);
  }

  postProduct(product: Products) {
    return this.http.post<Products>(this.url, product)
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  updateProduct(product: Products) {
    return this.http.put<Products>(`${this.url}/${product.id}`, product);
  }

  postProductToBasket(product: Products) {
    return this.http.post<Products>(this.urlBasket, product)
  }

  getProductFromBasket() {
    return this.http.get<Products[]>(this.urlBasket);
  }

  updateProductToBasket(product: Products) {
    return this.http.put<Products>(`${this.urlBasket}/${product.id}`, product);
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete<any>(`${this.urlBasket}/${id}`)
  }
}
