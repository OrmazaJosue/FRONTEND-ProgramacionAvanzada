
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from './solicitante/solicitante.component';
import { EscrituraComponent } from './escritura/escritura.component';
import { GmailComponent } from './gmail/gmail.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { AprobadoComprobanteComponent } from './gmail/aprobado-comprobante/aprobado-comprobante.component';
import { DenegadoComprobanteComponent } from './gmail/denegado-comprobante/denegado-comprobante.component';
import { EnvioEscrituraComponent } from './gmail/envio-escritura/envio-escritura.component';
import { DenegadoSolicitudComponent } from './gmail/denegado-solicitud/denegado-solicitud.component';
import { GestionTerrenosComponent } from './gestion-terrenos/gestion-terrenos.component';
import { UplaodComprobanteComponent } from './uplaod-comprobante/uplaod-comprobante.component';
import { FormComponent } from './form/form.component';
import { RegisterComponentComponent } from './register-component/register-component.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FontAwesomeModule,
     PropertyCardComponent,  GmailComponent,
     EscrituraComponent, CommonModule, NgbModule,
     FormsModule,
     SolicitanteComponent, LoginComponent,
     NavComponent, DenegadoSolicitudComponent,
    DenegadoComprobanteComponent,
    AprobadoComprobanteComponent,
    EnvioEscrituraComponent,
    GestionTerrenosComponent,
    FormComponent,UplaodComprobanteComponent,RegisterComponentComponent,  HttpClientModule,RouterModule ],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //template: '<router-outlet></router-outlet>'

})
export class AppComponent {

  title = 'Avanzada_GP6';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/nav']);
    }
  }
}
