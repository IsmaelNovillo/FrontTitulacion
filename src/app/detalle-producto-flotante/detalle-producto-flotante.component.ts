import { Component, OnDestroy } from '@angular/core';
import { Producto } from '../modelos/productos.model';
import { Subscription } from 'rxjs';
import { DetalleProductoComponent } from "../detalle-producto/detalle-producto.component";
import { CommonModule } from '@angular/common';
import { DetalleProductoService } from '../servicios/detalle-producto/detalle-producto.service';


@Component({
    selector: 'app-detalle-producto-flotante',
    standalone: true,
    templateUrl: './detalle-producto-flotante.component.html',
    styleUrl: './detalle-producto-flotante.component.css',
    imports: [DetalleProductoComponent, CommonModule]
})

export class DetalleProductoFlotanteComponent implements OnDestroy {
  // detalle-producto.service.ts

  producto: Producto | null;
  private subscription: Subscription;

  constructor(private detalleProductoService: DetalleProductoService) {
    this.subscription = this.detalleProductoService.getDetalleProductoObservable().subscribe(producto => {
      this.producto = producto;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cerrarDetalle(): void {
    this.detalleProductoService.cerrarDetalle();
  }
}
