import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruta-negocio',
  templateUrl: './ruta-negocio.component.html',
  styleUrls: ['./ruta-negocio.component.scss']
})
export class RutaNegocioComponent implements OnInit {

  constructor() { }

  // TODO: Recibir informacion de la BDD en el ngOnInit
  negocio = {
    enlace_facebook: 'https://www.facebook.com/',
    enlace_instagram: 'https://www.instagram.com/',
    enlace_sitio_web: 'https://www.wikipedia.com/',
    telefono_fijo: '2325128',
    telefono_movil: '0999999999',
  }
  productos = [
    {nombre: 'Producto1', descripcion: 'descripcion1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt', precio: 15.99,},
    {nombre: 'Producto2', descripcion: 'descripcion2', precio: 16.99,},
    {nombre: 'Producto3', descripcion: 'descripcion3', precio: 16.99,},
    {nombre: 'Producto4', descripcion: 'descripcion4', precio: 16.99,},
    {nombre: 'Producto5', descripcion: 'descripcion5', precio: 16.99,},
    {nombre: 'Producto6', descripcion: 'descripcion6', precio: 16.99,},
    {nombre: 'Producto7', descripcion: 'descripcion7', precio: 16.99,},
    {nombre: 'Producto8', descripcion: 'descripcion8', precio: 16.99,},
    {nombre: 'Producto9', descripcion: 'descripcion9', precio: 16.99,},
  ];
  comentarios = [
    {titulo: "Titulo 1", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      fecha: '31-12-9999', puntaje: Math.floor(Math.random() * 4) + 1},
    {titulo: "Titulo 2", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      fecha: '31-12-9999', puntaje: Math.floor(Math.random() * 4) + 1},
    {titulo: "Titulo 3", mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      fecha: '31-12-9999', puntaje: Math.floor(Math.random() * 4) + 1},
  ];



  puntajePromedio?: number;
  cantidadComentarios?: number;

  ngOnInit(): void {
    // TODO: Obtener datos del negocio

    // Calcular estrellas
    this.puntajePromedio = this.calcularPuntajePromerio();

    // TODO: Obtener lista de comentarios
    this.comentarios = this.comentarios;
    this.cantidadComentarios = this.comentarios.length;

    // TODO
  }

  calcularPuntajePromerio(): number {
    // TODO: Implementar
    return 4;
  }

}
