import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductosComponent } from './productos/productos.component';
import { CommonModule } from '@angular/common';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { HomeComponent } from './home/home.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { VerificarCuentaComponent } from './verificar-cuenta/verificar-cuenta.component';
export const routes: Routes = [

{path: 'productos', component: ProductosComponent,   },
{path: '', pathMatch:'full', redirectTo:'inicio'},
{path: 'resultados-busqueda', component: ResultadosBusquedaComponent },
{path: 'inicio', component: HomeComponent},
{path: 'empresas', component: ListaEmpresasComponent},
{path: 'verify-account', component: VerificarCuentaComponent },

{ path: 'seguridad', 
loadChildren: () => import('./seguridad/seguridad-rutas/seguridad-rutas.module').then(m => m.SeguridadRutasModule) 
},

{path: 'paneles',
loadChildren: () => import('./seguridad/banners/banners.module').then(m=>m.BannersModule)
},

{path:'admin-fenix' ,
loadChildren: () => import('./seguridad/control-admin/admin-rutas.module').then(m=>m.AdminRutasModule)
},

 

 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule, CommonModule ],
  })
  export class AppRoutingModule {}
