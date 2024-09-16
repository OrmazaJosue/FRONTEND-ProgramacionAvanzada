import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import axios from 'axios';
import Notiflix from 'notiflix';


@Component({
  selector: 'app-solicitante',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.css'
})
export class SolicitanteComponent implements OnInit {
  solicitantes: any[] = []; // Propiedad para almacenar la lista de solicitantes

  constructor() {}

  ngOnInit(): void {
    this.getFormularioData();
  }

  async getFormularioData(): Promise<void> {
    try {
      const response = await axios.get('http://localhost:3001/api/formulario');
      this.solicitantes = response.data; // Asignar los datos recibidos a la propiedad
      Notiflix.Loading.remove(); // Quitar mensaje de carga
      Notiflix.Notify.success('Enviado correcto');
      console.log(this.solicitantes);
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }
  }
  async cambiarEstado(id: number, nuevoEstado: string): Promise<void> {
    try {
      const response = await axios.put(`http://localhost:3001/api/formulario${id}`, {
        estado: nuevoEstado
      });
      console.log('Estado actualizado', response.data);
      this.getFormularioData(); // Actualizar la lista de solicitantes
    } catch (error) {
      Notiflix.Loading.remove(); // Quitar mensaje de carga
      console.error('Error al actualizar el estado', error);
    }
  }
  openPDF(base64PDF: string): void {
    // Convertir base64 a Blob
    const byteCharacters = atob(base64PDF);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Crear una URL para el blob y abrirla en una nueva pestaña
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

}
