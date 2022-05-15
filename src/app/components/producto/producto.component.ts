import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  @Input() producto!: Product;
  @Output() addProduct = new EventEmitter<Product>();

  constructor() { }

  addToShoppingCart(p: Product): void {
    this.addProduct.emit(p);
  }

}
