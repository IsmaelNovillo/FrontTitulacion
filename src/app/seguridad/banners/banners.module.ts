import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from '../../banner/banner.component';
import { RegistararProductoComponent } from '../../registarar-producto/registarar-producto.component';
import { InformacionPersonalComponent } from '../../informacion-personal/informacion-personal.component';
import { CarritoComponent } from '../../carrito/carrito.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../guardianes/protector-sesion.guard';
import { ProveedoresComponent } from '../../proveedores/proveedores.component';
import { PerfilEmpresaComponent } from '../../perfil-empresa/perfil-empresa.component';
import { MisProductosComponent } from '../../mis-productos/mis-productos.component';
export const routes: Routes = [
  { path: 'panel', component: BannerComponent, canActivate: [AuthGuard]},
  { path: 'registrar-productos', component: RegistararProductoComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: InformacionPersonalComponent,canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]},
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard]},
  { path: 'mi-empresa', component: PerfilEmpresaComponent,canActivate: [AuthGuard],},
  { path: 'mis-productos', component: MisProductosComponent, canActivate:[AuthGuard]},

];
  

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, CommonModule],
})
export class BannersModule {}
