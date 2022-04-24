import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  public shoppingCart: Producto[] = [];
  public total = 0;

  public productos: Producto[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getProducts()
      .subscribe(res => {
        this.productos = res;
      });
  }

  addProductToCart(p: Producto): void {
    this.shoppingCart.push(p);
    this.total += p.precio;
  }

}
