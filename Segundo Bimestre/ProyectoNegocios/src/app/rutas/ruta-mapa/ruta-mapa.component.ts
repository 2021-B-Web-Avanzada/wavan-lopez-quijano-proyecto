import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ruta-mapa',
  templateUrl: './ruta-mapa.component.html',
  styleUrls: ['./ruta-mapa.component.scss']
})
export class RutaMapaComponent implements OnInit {

  constructor(
    private readonly router: Router,
  ) { }

  categoriaSeleccionada = 'Categoría';
  provinciaSeleccionada = 'Provincia';

  centroMapa = {
    lat: -0.16176268339680047,
    lng: -78.48471581154494,
  }

  // TODO Poner estos arreglos en otro lado?

  negocios = [];

  marcadores: any[] = [];

  categorias = [
    'Restaurante', 'Ferretería',
  ];

  provincias = [
    'Azuay', 'Bolivar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi',
    'El Oro', 'Esmeraldas', 'Galápagos', 'Guayanas', 'Imbabura', 'Loja',
    'Los Ríos', 'Manabí', 'Morona Santiago', 'Napo', 'Sucumbíos', 'Pastaza',
    'Pinchincha', 'Santa Elena', 'Santo Domingo', 'Francisco De Orellana', 'Tungurahua', 'Zamora Chinchipe',
  ];

  ngOnInit(): void {
    this.restablecerMarcadores();
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaSeleccionada = categoria;
    if (this.categoriaSeleccionada == 'Categoría') {
      this.restablecerMarcadores();
    } else {
      this.marcadores = this.marcadores.filter((marcador) => {
        return marcador.categoria == categoria;
      });
    }
  }

  filtrarPorProvincia(provincia: string) {
    this.provinciaSeleccionada = provincia;
    if (this.provinciaSeleccionada == 'Provincia') {
      this.restablecerMarcadores();
    } else {
      this.marcadores = this.marcadores.filter((marcador) => {
        return marcador.provincia == provincia;
      });
    }
  }

  verNegocio(id_negocio: number) {
    const url = ['/negocio', id_negocio];
    this.router.navigate(url);
  }

  restablecerMarcadores() {
    this.marcadores = [];
    // TODO: this.negocios.forEach( (negocio) => {
    this.marcadores.push({
      id_negocio: 1, // TODO: id_negocio: negocio.id_negocio,
      posicion: {
        // TODO: lat: negocio.latitud,
        lat: this.centroMapa.lat,
        // TODO: lat: negocio.longitud,
        lng: this.centroMapa.lng,
      },
      label: {
        color: 'red',
        // TODO: text: negocio.nombre,
        text: 'Marker label ' + (this.marcadores.length + 1),
      },
      // TODO: text: negocio.nombre,
      title: 'Marker title ' + (this.marcadores.length + 1),
      // TODO: Sera de dejar esta animacion
      // options: { animation: google.maps.Animation.BOUNCE },
    })
    // TODO: });
  }

}
