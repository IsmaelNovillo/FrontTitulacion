import { Component, OnInit, } from '@angular/core';
import { SliderHomeComponent } from "../slider-home/slider-home.component";
import { ProductosComponent } from "../productos/productos.component";
import { MensajesFlotantesComponent } from "../mensajes-flotantes/mensajes-flotantes.component";
import { BuscadorProductosComponent } from "../buscador-productos/buscador-productos.component";
import { ProductoService } from '../servicios/productos/productos.service';
import { LoginService } from '../servicios/login/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriasFlotantesComponent } from "../categorias-flotantes/categorias-flotantes.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        SliderHomeComponent,
        ProductosComponent,
        MensajesFlotantesComponent,
        BuscadorProductosComponent, FormsModule,
        CommonModule, RouterLink,
        CategoriasFlotantesComponent
    ]
})
export class HomeComponent implements OnInit{

    idempresa: number | null = null;
    username: string | null = null;
    rolUsuario: string| null = null;
    usuarioEsEmpresa: boolean =false;
//Creamos un arrey de imagenes, o un constructor 

imagen=[
    {src: 'assets/slider1.png', route: '/productos'},
    {src: 'assets/slider2.png', route:'/login'},
    {src: 'assets/slider3.png', route:'/login'},
    {src: 'assets/slider4.png', route:'/login'},
    {src: 'assets/slider5.png', route:'/login'},
    {src: 'assets/slider6.png', route:'/login'}
]

constructor( 
  private productosService: ProductoService, 
  private loginService: LoginService,
  ) {}

ngOnInit(): void {

          this.LogicaBotonPerfilEmpresa();
      

    if (this.loginService.haIniciadoSesionUsuario()===false) {
     this.elimiandoDatosUsuario();
    }

    this.recuperandoSession();
}

recuperandoSession(){
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    this.username=user;
    this.loginService.establecerSesionIniciada(true);
    this.rolUsuario=localStorage.getItem('rol');
    this.LogicaBotonPerfilEmpresa();
  }
}
 
LogicaBotonPerfilEmpresa(){
  const rol = localStorage.getItem('rol');
    if (rol ==='ADMIN' || rol === 'EMPRENDEDOR') { 
      this.usuarioEsEmpresa = true;
    } else{
    }
  }

  elimiandoDatosUsuario(){
    this.username='';
    this.idempresa=null;
    this.rolUsuario='';
    this.usuarioEsEmpresa=false;
  }

}


