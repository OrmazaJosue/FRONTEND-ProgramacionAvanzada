import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cargar {
  private apiUrl = 'http://localhost:3001/api/cargar';
  constructor(private http: HttpClient) { }

  // Método para obtener todos los solicitantes
  getAllSolicitantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para obtener un solicitante por ID
  getSolicitanteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener solicitantes por estado
  getSolicitantesByEstado(estado: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estado/${estado}`);
  }
}
