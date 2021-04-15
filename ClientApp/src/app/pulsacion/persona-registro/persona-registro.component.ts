import { PersonaService } from './../../service/persona.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';


@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css']
})
export class PersonaRegistroComponent implements OnInit {
  persona: Persona;
  mensaje: string;
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.persona = new Persona;
  }

  add() {
    let validador:boolean=false;
    validador=this.ValidarDatos();
    if(validador) {
      
      this.personaService.post(this.persona).subscribe(p=>{
        if (p!=null){
          this.mensaje="Se guardaron satisfactoriamente los datos de:"+p.nombre
        }
        else{
          this.mensaje="Error al Guardar"
        }
      });
    }else {
      this.mensaje="Digite los datos"
    }
  
  }

  ValidarDatos():boolean{
    if (this.persona.identificacion!=null && this.persona.nombre!=null && this.persona.edad!=null && this.persona.sexo!= null )
      return true
  }
 
}
