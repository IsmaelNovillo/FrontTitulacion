import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPlanesComponent } from '../../admin/admin-planes/admin-planes.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, SuperUserGuard } from '../../guardianes/protector-sesion.guard';
import { ImagenesControlComponent } from '../../admin/imagenes-control/imagenes-control.component';
import { AdminClientesComponent } from '../../admin/admin-clientes/admin-clientes.component';
import { AdminEmpresasComponent } from '../../admin/admin-empresas/admin-empresas.component';
import { AdminDetalleProducComponent } from '../../admin/admin-detalle-produc/admin-detalle-produc.component';

export const routes: Routes = [
  { path: 'admin-planes', component:AdminPlanesComponent, canActivate: [AuthGuard, SuperUserGuard] },
  { path: 'imagenes-control', component: ImagenesControlComponent, canActivate: [AuthGuard, SuperUserGuard]},
  { path: 'admin-clientes', component: AdminClientesComponent, canActivate: [AuthGuard, SuperUserGuard]},
  { path: 'admin-empresas', component: AdminEmpresasComponent, canActivate: [AuthGuard, SuperUserGuard]},
  { path: 'admin-detalle-productos', component: AdminDetalleProducComponent, canActivate: [AuthGuard, SuperUserGuard]}

 
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forChild(routes)],
  exports: [CommonModule, RouterModule],
})


export class AdminRutasModule { }
