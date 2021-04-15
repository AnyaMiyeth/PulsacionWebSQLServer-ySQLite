import { HttpClient } from '@angular/common/http';

import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Persona } from '../Pulsacion/models/persona';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  baseUrl: string;
  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
      this.baseUrl = baseUrl;
     }
  get(): Observable<Persona[]> {
    /*let personas: Persona[] = [];
    personas = JSON.parse(localStorage.getItem('datos'));*/
    return this.http.get<Persona[]>(this.baseUrl + 'api/persona')
    .pipe(
      tap(_ => { }), 
      catchError(result => 
        { 
          console.log("Error al Consultar"+result); 
          return of(result as Persona[]) 
        }));

  }

  post(persona: Persona): Observable<Persona> {
    /*let personas: Persona[] = [];
    let storageDatos = localStorage.getItem('datos');
    if (storageDatos != null) {
      personas = JSON.parse(storageDatos);
    }
    personas.push(persona);

    localStorage.setItem('datos', JSON.stringify(personas));*/
    return this.http.post<Persona>(this.baseUrl+'api/persona',persona)
    .pipe(
      tap(_ => console.log("registrar")),
      catchError(result => {
        console.log("Error al registrar")
        return of(result as Persona)
      })
    );

  }

}
