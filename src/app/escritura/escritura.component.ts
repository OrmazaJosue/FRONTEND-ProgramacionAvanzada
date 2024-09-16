import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-escritura',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink],
  templateUrl: './escritura.component.html',
  styleUrls: ['./escritura.component.css']
})
export class EscrituraComponent implements OnInit {
  gestionterrenos: any[] = [];

  ngOnInit(): void {
    this.getFormulario();
  }

  async getFormulario(): Promise<void> {
    try {
      const response = await axios.get('http://localhost:3001/api/formulario/completado');
      this.gestionterrenos = response.data;
      Notiflix.Loading.remove(); // Quitar mensaje de carga
      Notiflix.Notify.success('Enviado correcto'); 
      console.log(this.gestionterrenos);
    } catch (error) {
      console.error('Error al obtener los datos', error);
      alert('Error al obtener los datos, por favor intente nuevamente más tarde.');
    }
  }

  async cambiarEstado(id: number, nuevoEstado: string): Promise<void> {
    try {
      const response = await axios.put(`http://localhost:3001/api/formulario/completado/${id}`, { estado: nuevoEstado });
      console.log('Estado actualizado', response.data);
      this.getFormulario(); // Actualizar la lista de solicitantes después de cambiar el estado
    } catch (error) {
      Notiflix.Loading.remove(); // Quitar mensaje de carga
      console.error('Error al cambiar el estado', error);
      alert('Error al cambiar el estado, por favor intente nuevamente.');
    }
  }
}