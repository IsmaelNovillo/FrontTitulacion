import { Producto, TodosLosProductos } from "./productos.model";

export interface CarritoItems {
    producto: Producto;
    cantidad: number;
  }
  export interface ElementosCarrito{
    productos: TodosLosProductos;
    cantidad: number;
  }