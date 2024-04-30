import { Component } from '@angular/core';
import { InformacionPersonalComponent } from '../informacion-personal/informacion-personal.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { PlanRegistroComponent } from '../plan-registro/plan-registro.component';
import { RegistroComponent } from '../registro/registro.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../servicios/login/login.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [InformacionPersonalComponent, CommonModule, LoginComponent, PlanRegistroComponent, RegistroComponent, RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  componenteActual: string = 'componenteUno'; // Valor por defecto

  constructor( private loginService: LoginService, private router: Router){  }

  // ...

  mostrarComponente(componente: string): void {
    this.componenteActual = componente;
  }

  cerrarSession(){
    this.loginService.cerrarSession();
    this.router.navigate(['/inicio']);
    
  }

}
// ...

