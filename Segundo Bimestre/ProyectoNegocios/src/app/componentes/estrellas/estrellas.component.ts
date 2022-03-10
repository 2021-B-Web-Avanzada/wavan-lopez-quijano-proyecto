import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.scss']
})
export class EstrellasComponent implements OnInit {

  constructor() { }

  @Input() puntaje?: number;

  ngOnInit(): void {
  }

  displayEstrellas(puntaje: number): boolean[] {
    return Array(5).fill(false).map( (value, index) => {
      return index <= puntaje - 1;
    });
  }

}
