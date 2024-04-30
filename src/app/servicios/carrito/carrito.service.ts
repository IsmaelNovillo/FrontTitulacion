import { Injectable } from '@angular/core';
import { Producto, TodosLosProductos } from '../../modelos/productos.model'; 
import { CarritoItems, ElementosCarrito } from '../../modelos/carrito.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private elementos: Map<number, ElementosCarrito> = new Map<number, ElementosCarrito>();
 
  private items: Map<number, CarritoItems> = new Map<number, CarritoItems>();
 
  private carritoSubject = new BehaviorSubject<boolean>(false);

  addItemToCart(producto: Producto, cantidad: number): void {
    const item: CarritoItems = { producto, cantidad };
    const existingItem = this.items.get(producto.id);

    if (existingItem) {
      existingItem.cantidad += cantidad;
    } else {
      this.items.set(producto.id, item);
    }

    // Emitir un nuevo valor para notificar a los componentes que el carrito se ha actualizado
    this.carritoSubject.next(true);

  }

  //Metodos Adicionales

  AggElementoAlCarrito(productos: TodosLosProductos, cantidad: number): void {
    const elemento: ElementosCarrito = { productos, cantidad };
    const existenElemtnos = this.elementos.get(productos.id);

    if (existenElemtnos) {
      existenElemtnos.cantidad += cantidad;
    } else {
      this.elementos.set(productos.id, elemento);
    }

    // Emitir un nuevo valor para notificar a los componentes que el carrito se ha actualizado
    this.carritoSubject.next(true);

  }

  //Metodos Adicionales Agregados
  hayProductos(): boolean {
    return this.elementos.size > 0;
  }
 eliminarElementosCarrito(productoId: number): void {
    this.elementos.delete(productoId);
  }

  ObtenerElementosCarrito(): ElementosCarrito[] {
    return Array.from(this.elementos.values());
  }

  obtenerTotalCarrito(): number {
    return Array.from(this.items.values())
      .reduce((total, elemento) => total + elemento.producto.precio * elemento.cantidad, 0);
  }

  borrarCarrito(): void {
    this.elementos.clear();
  }
    obtenerCarritoObservado() {
    return this.carritoSubject.asObservable();
  }



  //Fin de Adicionales

  tieneProductos(): boolean {
    return this.items.size > 0;
  }

  removeItemFromCart(productoId: number): void {
    this.items.delete(productoId);
  }


  getItems(): CarritoItems[] {
    return Array.from(this.items.values());
  }

  getTotal(): number {
    return Array.from(this.items.values())
      .reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  clearCart(): void {
    this.items.clear();
  }
    getCarritoObservable() {
    return this.carritoSubject.asObservable();
  }

  
}
