import { Component, OnInit } from '@angular/core';
import { CartService } from '../servicios/carrito/carrito.service'; 
import { CarritoItems } from '../modelos/carrito.model';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../login/login.component";
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';

@Component({
    selector: 'app-carrito',
    standalone: true,
    templateUrl: './carrito.component.html',
    styleUrl: './carrito.component.css',
    imports: [CommonModule, LoginComponent, RouterLink,]
})
export class CarritoComponent implements OnInit{

  items: CarritoItems[] = [];
  total: number = 0;
  usuarioEsEmpresa: boolean=false;
  usuarioRol: string = '';
  P: any;


  constructor(
    private cartService: CartService, 
    private loginService: LoginService, 
    private router: Router

    ) {}

  ngOnInit(): void {
    
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.loginService.obtenerRol().subscribe(
      (rol)=>{
        this.usuarioRol=rol;
        this.PreparaBotones();
      }
    )
    this.escucharPago();
  }

  iniciarPago() {
    // Obtener la processUrl del backend
    const processUrl = "https://checkout.placetopay.com/spa/session/123456/90443d4926a2...";
    
    // Iniciar el Lightbox
    this.P.init(processUrl);
  }

  escucharPago() {
    // Registrar el callback para manejar la respuesta del proceso de pago
    this.P.on('response', function (response: any) {
      console.log(response);
      // Aquí puedes manejar la respuesta del proceso de pago
    });
  }


  removeFromCart(productoId: number): void {
    this.cartService.removeItemFromCart(productoId);
    this.refreshCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.refreshCart();
  }

  private refreshCart(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  cerrarSession(){
    this.loginService.cerrarSession();
    this.router.navigate(['/inicio']);
  }
//Metodo para habilitar el boton de mi empresa en el panel de navegacion
  PreparaBotones(){
    if (this.usuarioRol==='ADMIN' || this.usuarioRol ==='EMPRENDEDOR') {
      this.usuarioEsEmpresa=true;
      
    } else {
      this.usuarioEsEmpresa=false;
      
    }
  
  }
}

