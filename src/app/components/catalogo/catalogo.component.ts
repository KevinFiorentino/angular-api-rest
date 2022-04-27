import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product, CreateProducto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  public shoppingCart: Product[] = [];
  public total = 0;

  public productos: Product[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getProducts()
      .subscribe(res => {
        this.productos = res;
      });
  }

  addProductToCart(p: Product): void {
    this.shoppingCart.push(p);
    this.total += p.precio;
  }

  createProduct(): void {
    const body: CreateProducto = {
      name: 'Nuevo producto',
      precio: 100,
      description: 'Descripción del producto',
      image: 'https://example.com/image',
      idCategory: '1'
    };
    this.apiService.createProduct(body)
      .subscribe(p => {
        // ...
      });
  }

}
