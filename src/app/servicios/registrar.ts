import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class registrar {

  private apiUrl = 'http://localhost:3001/api/formulario';

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo formulario
  registerFormulario(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  // Método para obtener todos los formularios
  getAllFormularios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
