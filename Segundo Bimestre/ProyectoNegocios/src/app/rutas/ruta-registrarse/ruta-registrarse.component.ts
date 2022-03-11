import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ruta-registrarse',
  templateUrl: './ruta-registrarse.component.html',
  styleUrls: ['./ruta-registrarse.component.scss']
})
export class RutaRegistrarseComponent implements OnInit {

  formGroup?: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.prepararFormulario()
  }

  prepararFormulario(){
    this.formGroup = this.formBuilder.group({

    })
  }

  registrarse(){

  }
}
