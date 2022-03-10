import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {

  constructor() { }

  // TODO: Definir estructura del comentario
  @Input() comentario?: {
    titulo: string,
    mensaje: string,
    fecha: string,
    puntaje: number,
  };

  ngOnInit(): void {
  }

}
