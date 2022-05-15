import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product, CreateProducto, UpdateProducto } from 'src/app/interfaces/producto.interface';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
      }, err => {
        alert(err);
      });
  }

  // Obtener datos con paginación
  getProductsParams(): void {
    this.apiService.getProductsParams(0, 10)
      .subscribe(res => {
        this.productos = res;
      });
  }

  // Agregar producto al carrito
  addProductToCart(p: Product): void {
    this.shoppingCart.push(p);
    this.total += p.precio;
  }

  // ALta de producto
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

  // Modificar producto
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

  // Borrar producto
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


  readAndUpdate(): void {
    // 1. Ejemplo de callback hell
    this.apiService.getProduct(1)
      .subscribe(res => {
        this.apiService.updateProductPATCH(1, { name: 'Nuevo nombre' })
          .subscribe(res2 => {
            // Producto actualizado
          });
      });


    // 2. Solución callback hell
    this.apiService.getProduct(1)
      .pipe(
        switchMap(products => this.apiService.updateProductPATCH(1, { name: 'Nuevo nombre' }) )
      )
      .subscribe(res => {
        // Producto actualizado
      });


    // 3. Agrupando observables en un mismo subscribe
    zip(
      this.apiService.getProduct(1),
      this.apiService.updateProductPATCH(1, { name: 'Nuevo nombre' })
    )
    .subscribe(res => {
      const get = res[0];
      const update = res[1];
    });
  }

}
