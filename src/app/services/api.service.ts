import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Product, CreateProducto, UpdateProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }


  /* ********** POST ********** */

  createProduct(body: CreateProducto): Observable<Product> {
    return this.http.post<Product>(`https://example.com/api/productos`, body);
  }


  /* ********** GET ********** */

  getProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>(`https://example.com/api/productos`);
    return of([
      {
        id: 1,
        name: 'Automobil de juguete',
        precio: 100,
        description: 'Lorem ipsum...',
        image: 'https://static3.depositphotos.com/1000865/118/i/600/depositphotos_1183767-stock-photo-toy-car.jpg'
      },
      {
        id: 2,
        name: 'Muñeca de trapo',
        precio: 180,
        description: 'Lorem ipsum...',
        image: 'https://kinuma.com/8869-home_default/muneca-de-trapo-mali.jpg'
      },
      {
        id: 3,
        name: 'Pelota de futbol',
        precio: 120,
        description: 'Lorem ipsum...',
        image: 'https://media.istockphoto.com/photos/soccer-ball-isolated-3d-rendering-picture-id1257575611?k=20&m=1257575611&s=612x612&w=0&h=g530fFJspT42xFGY7HycLvpBKLXpJ2XAkKCRyY-SK80='
      },
      {
        id: 4,
        name: 'Castillo',
        precio: 220,
        description: 'Lorem ipsum...',
        image: 'https://i.imgur.com/44nzvkQ.jpg'
      }
    ])
  }

  getProduct(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`https://example.com/api/productos/${idProduct}`)
      .pipe(
        retry(2)
      );
  }

  getProductsParams(offset: number, limit: number): Observable<any> {
    return this.http.get<Product[]>(`https://example.com/api/productos`, { params: { offset, limit } });
  }


  /* ********** PUT & PATCH ********** */

  updateProductPUT(idProduct: number, body: UpdateProducto): Observable<Product> {
    return this.http.put<Product>(`https://example.com/api/productos`, body);
  }

  updateProductPATCH(idProduct: number, body: UpdateProducto): Observable<Product> {
    return this.http.patch<Product>(`https://example.com/api/productos`, body);
  }


  /* ********** DELETE ********** */

  deleteProduct(idProduct: number): Observable<boolean> {
    return this.http.delete<boolean>(`https://example.com/api/productos/${idProduct}`);
  }

}
