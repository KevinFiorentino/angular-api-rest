export interface Category {
  idCategory: string;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  precio: number;
  description: string;
  image: string;
  category?: Category;
}

export interface CreateProducto extends Omit<Product, 'id' | 'category'> {
  idCategory: string;
}

export interface UpdateProducto extends Partial<CreateProducto> { }
