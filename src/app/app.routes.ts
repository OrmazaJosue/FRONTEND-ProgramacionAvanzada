import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SolicitanteComponent } from './solicitante/solicitante.component';
import { EscrituraComponent } from './escritura/escritura.component';
import { GmailComponent } from './gmail/gmail.component';
import { DenegadoSolicitudComponent } from './gmail/denegado-solicitud/denegado-solicitud.component';
import { DenegadoComprobanteComponent } from './gmail/denegado-comprobante/denegado-comprobante.component';
import { AprobadoComprobanteComponent } from './gmail/aprobado-comprobante/aprobado-comprobante.component';
import { EnvioEscrituraComponent } from './gmail/envio-escritura/envio-escritura.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { GestionTerrenosComponent } from './gestion-terrenos/gestion-terrenos.component';
import { UplaodComprobanteComponent } from './uplaod-comprobante/uplaod-comprobante.component';
import { NavSolicutdCatalogoComponent } from './nav-solicutd-catalogo/nav-solicutd-catalogo.component';
import { FormComponent } from './form/form.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
//import { UserGuard } from './UserGuard';
//import { AdminGuard } from './AdminGuard';


export interface RouteData {
  template?: string;
  // Puedes agregar más propiedades aquí si es necesario
}

export const routes: Routes = [
  // Ruta predeterminada

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'nav', component: NavComponent },
  { path: 'catalogo', component: NavSolicutdCatalogoComponent },
  { path: 'formulario', component: FormComponent },
  { path: 'escritura', component: EscrituraComponent },
  { path: 'solicitante', component: SolicitanteComponent},
  { path: 'property-card', component: PropertyCardComponent},
  { path: 'comprador', component: RegisterComponentComponent},
  { path: 'gestion-terrenos', component: GestionTerrenosComponent},
  { path: 'uplaod-comprobante', component: UplaodComprobanteComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'gmail', component: GmailComponent, children: [
      { path: 'denegado-solicitud', component: DenegadoSolicitudComponent },
      { path: 'denegado-comprobante', component: DenegadoComprobanteComponent },
      { path: 'aprobado-comprobante', component: AprobadoComprobanteComponent },
      { path: 'envio-escritura', component: EnvioEscrituraComponent }
    ]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
/*
//export const routes: Routes = [];
export interface RouteData {
  template?: string;
  // Puedes agregar más propiedades aquí si es necesario
}

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponentComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'nav', component: NavComponent },
  { path: 'catalogo', component: NavSolicutdCatalogoComponent, canActivate: [UserGuard] },
  { path: 'formulario', component: FormComponent, canActivate: [UserGuard] },
  { path: 'escritura', component: EscrituraComponent, canActivate: [AdminGuard] },
  { path: 'solicitante', component: SolicitanteComponent, canActivate: [AdminGuard] },
  { path: 'property-card', component: PropertyCardComponent, canActivate: [AdminGuard] },
  { path: 'gestion-terrenos', component: GestionTerrenosComponent, canActivate: [AdminGuard] },
  { path: 'uplaod-comprobante', component: UplaodComprobanteComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'gmail', component: GmailComponent, canActivate: [AdminGuard], children: [
      { path: 'denegado-solicitud', component: DenegadoSolicitudComponent },
      { path: 'denegado-comprobante', component: DenegadoComprobanteComponent },
      { path: 'aprobado-comprobante', component: AprobadoComprobanteComponent },
      { path: 'envio-escritura', component: EnvioEscrituraComponent }
    ]
  }
];*/


