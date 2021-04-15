import { PersonaService } from './../../service/persona.service';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-consulta',
  templateUrl: './persona-consulta.component.html',
  styleUrls: ['./persona-consulta.component.css']
})
export class PersonaConsultaComponent implements OnInit {
  personas:Persona[];

  constructor(private personaService:PersonaService) { }

  ngOnInit(): void {
    
    this.get();
  }

  get(){
    this.personaService.get().subscribe(p=>this.personas=p);
  }

}
