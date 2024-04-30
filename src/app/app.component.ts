import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegistroComponent } from "./registro/registro.component";
import { PlanRegistroComponent } from "./plan-registro/plan-registro.component";
import { InformacionPersonalComponent } from "./informacion-personal/informacion-personal.component";
import { BannerComponent } from './banner/banner.component';
import { ProductosComponent } from "./productos/productos.component";
import { RegistararProductoComponent } from "./registarar-producto/registarar-producto.component";
import { CarritoComponent } from "./carrito/carrito.component";
import { RouterLink } from '@angular/router';
import { VentanaFlotanteComponent } from "./ventana-carrito/ventana-carrito.component";
import { BuscadorProductosComponent } from './buscador-productos/buscador-productos.component';
import { MensajesFlotantesComponent } from "./mensajes-flotantes/mensajes-flotantes.component";
import { ChatSoporteComponent } from "./chat-soporte/chat-soporte.component";
import { SistemaServicio } from './servicios/app/sistema.service';
import { LoginService } from './servicios/login/login.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, LoginComponent, RegistroComponent, RouterLink,
        PlanRegistroComponent, InformacionPersonalComponent, BannerComponent, ProductosComponent, RegistararProductoComponent, CarritoComponent, VentanaFlotanteComponent, BuscadorProductosComponent, MensajesFlotantesComponent, ChatSoporteComponent]
})
export class AppComponent implements OnInit {

  constructor(
    private sistemaService: SistemaServicio,
  ){}
  
 
 //Activar Chat con soporte 
  mostrarChat: boolean = false
  abrirChat(){
   this.sistemaService.ObtenerActivacionChat().subscribe(
   (activacion)=>{
    this.mostrarChat=activacion;
   } 
   )
  }
  cerrarChat(){
    this.sistemaService.enviarActivacionChat(false);
  }
  //fin codigo

  ngOnInit(): void {
    this.abrirChat();

  }

  
 
  

}