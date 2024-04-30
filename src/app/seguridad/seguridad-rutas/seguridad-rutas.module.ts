// seguridad-rutas.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlanRegistroComponent } from '../../plan-registro/plan-registro.component';
import { RegistroComponent } from '../../registro/registro.component';
import { LoginComponent } from '../../login/login.component';
import { RegistroEmpresaComponent } from '../../registro-empresa/registro-empresa.component';
import { AuthGuard, EmpresaGuard } from '../../guardianes/protector-sesion.guard';
import { AcercaDeNosotrosComponent } from '../../acerca-de-nosotros/acerca-de-nosotros.component';
import { ReseteoContrasenaComponent } from '../../reseteo-contrasena/reseteo-contrasena.component';

export const routes: Routes = [
  { path: 'plan-registro', component: PlanRegistroComponent, canActivate: [AuthGuard, EmpresaGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login-user',  component: LoginComponent},
  { path: 'registro-empresa', component: RegistroEmpresaComponent, canActivate: [AuthGuard, EmpresaGuard],},
  {path: 'acerca-de', component: AcercaDeNosotrosComponent},
  {path: 'reseteo-contrasena', component: ReseteoContrasenaComponent},
];

@NgModule({
  declarations: [ ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CommonModule, RouterModule,],
})
export class SeguridadRutasModule {}
