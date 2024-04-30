// detalle-producto.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto, TodosLosProductos } from '../../modelos/productos.model';


@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {


  private detalleProductoSubject = new BehaviorSubject<Producto | null>(null);
  private detallesProductosSubject = new BehaviorSubject<TodosLosProductos | null>(null);

  getDetalleProductoObservable(): Observable<Producto | null> {
    return this.detalleProductoSubject.asObservable();
  }

  mostrarDetalle(producto: Producto): void {
    this.detalleProductoSubject.next(producto);
  }

  cerrarDetalle(): void {
    this.detalleProductoSubject.next(null);
  }

  //Metodos Nuevos a Implementarse
  obtenerDetalleProductoObservable(): Observable<TodosLosProductos | null> {
    return this.detallesProductosSubject.asObservable();
  }

  mostrarDetalleProducto(productos: TodosLosProductos): void {
    this.detallesProductosSubject.next(productos);
  }

  cerrarDetalleProducto(): void {
    this.detallesProductosSubject.next(null);
  }

}

