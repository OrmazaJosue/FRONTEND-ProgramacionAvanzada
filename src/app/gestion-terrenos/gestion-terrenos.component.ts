import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


interface Terreno {
  id: number;
  Cedula: string;
  firstName: string;
  lastName: string;
  City: string;
  Email: string;
  Document: string;
  terreno: string[]; // Nuevo campo para los terrenos escogidos
  status: 'Pendiente' | 'Aprobado' | 'Desaprobado'; // Nuevo campo para el estado


}

@Component({
  selector: 'app-gestion-terrenos',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule,  RouterLink],
  templateUrl: './gestion-terrenos.component.html',
  styleUrl: './gestion-terrenos.component.css'
})
export class GestionTerrenosComponent implements OnInit{

  subject: string = '';
  message: string = '';

  terreno: Terreno[] = [
    {
      id: 1,
      Cedula: '12345678',
      firstName: 'Juan',
      lastName: 'Perez',
      City: 'Buenos Aires',
      Email: 'juan.perez@example.com',
      Document: 'Documento.pdf',
      terreno: ['Terreno 1', 'Terreno 2'],
      status: 'Pendiente'
    },
    {
      id: 2,
      Cedula: '87654321',
      firstName: 'Maria',
      lastName: 'Gomez',
      City: 'Montevideo',
      Email: 'maria.gomez@example.com',
      Document: 'Plano.jpg',
      terreno: ['Terreno 3', 'Terreno 4'],
      status: 'Pendiente'
    }
  ];

  newTerreno: Terreno= {
    id: 0,
    Cedula: '',
    firstName: '',
    lastName: '',
    City: '',
    Email: '',
    Document: '',
    terreno: [],
    status: 'Pendiente',
  };
  // Propiedades para el formulario de enviar correo
  terrenoSeleccionado: Terreno| null = null; // Para almacenar la terrenoa seleccionada

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Lógica de inicialización, si es necesaria
  }

  isRedirecting: boolean = false; // Bandera para controlar la redirección

  approveTerreno(terreno: Terreno) {
    if (!this.isRedirecting) {
      this.isRedirecting = true;
      terreno.status = 'Aprobado';
      setTimeout(() => {
        this.router.navigate(['/gmail/aprobado-comprobante']);
        this.isRedirecting = false; // Reiniciar la bandera después de la redirección
      }, 1000);
    }
  }

  dessaproveTerreno(terreno: Terreno) {
    if (!this.isRedirecting) {
      this.isRedirecting = true;
      terreno.status = 'Desaprobado';
      setTimeout(() => {
        this.router.navigate(['/gmail/denegado-comprobante']);
        this.isRedirecting = false; // Reiniciar la bandera después de la redirección
      }, 1000);
    }
  }
  verDocumentoAdjunto() {
    // Aquí defines la URL del documento adjunto
    const url = 'ruta/al/documento-adjunto.png';
    // Abre una nueva ventana con el documento adjunto
    window.open(url, '_blank');
  }

  goBack() {
    this.router.navigate(['/nav']); // Navega a la página principal
  }
}
