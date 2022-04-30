import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product, CreateProducto, UpdateProducto } from '../../interfaces/producto.interface';

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
        // Guardamos el nuevo producto, en el Array de productos junto con los otros.
        this.productos.push(p);
      });
  }

  updateProduct(idProduct: number): void {
    const body: UpdateProducto = {
      name: 'Nuevo nombre del producto',
    };
    this.apiService.updateProductPATCH(idProduct, body)
      .subscribe(p => {
        // Reemplazamos el producto actualizado en el Array de productos
        const index = this.productos.findIndex(product => product.id === p.id);
        this.productos[index] = p;
      });
  }

  deleteProduct(idProduct: number): void {
    this.apiService.deleteProduct(idProduct)
      .subscribe(p => {
        if (p) {
          // Borramos el producto del Array de productos
          const index = this.productos.findIndex(product => product.id === idProduct);
          this.productos.splice(index, 1);
        }
      });
  }

}
