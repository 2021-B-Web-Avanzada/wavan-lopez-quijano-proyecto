import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {NegocioModelo} from "../../modelos/negocio.modelo";
import {CategoriaAPIService} from "../../servicios/api/categoria/categoria-api.service";
import {CategoriaModelo} from "../../modelos/categoria.modelo";
import {ProvinciaAPIService} from "../../servicios/api/provincia/provincia-api.service";
import {ProvinciaModelo} from "../../modelos/provincia.modelo";
import {AuthService} from "../../servicios/autenticacion/autenticacion.service";

@Component({
  selector: 'app-ruta-mapa',
  templateUrl: './ruta-mapa.component.html',
  styleUrls: ['./ruta-mapa.component.scss']
})
export class RutaMapaComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly negocioAPIService: NegocioAPIService,
    private readonly catgoriaAPIService: CategoriaAPIService,
    private readonly provinciaAPIService: ProvinciaAPIService,
    private readonly autenticacion: AuthService
  ) { }

  // Sin filtros
  TODAS_CATEGORIAS = { id_categoria: 0, nombre: 'Categorías'};
  TODAS_PROVINCIAS = { id_provincia: 0, nombre: 'Provincias'};
  categoriaSeleccionada = this.TODAS_CATEGORIAS;
  provinciaSeleccionada = this.TODAS_PROVINCIAS;

  centroMapa = {
    lat: -0.16176268339680047,
    lng: -78.48471581154494
  }

  negocios: NegocioModelo[] = [];
  categorias: CategoriaModelo[] = [];
  provincias: ProvinciaModelo[] = [];

  marcadores: any[] = [];

  ngOnInit(): void {
    this.negocioAPIService.readNegocios().then(queryNegocios => {
      // Obtener negocios en la BD
      this.negocios = queryNegocios.data as NegocioModelo[];
      // Obtener marcadores
      this.restablecerMarcadores(this.negocios);
      // Consultar categorias
      return this.catgoriaAPIService.readCategorias();
    }).then(queryCategorias => {
      // Obtener categorias
      this.categorias = queryCategorias.data as CategoriaModelo[];
      // Cnsultar provincias
      return this.provinciaAPIService.readProvincias();
    }).then(queryProvincias => {
      // Obtener provincias
      this.provincias = queryProvincias.data as ProvinciaModelo[];
    });
    //TODO: MANERA DE OBTENER INFO
    console.log(this.autenticacion.id_usuario)
  }

  seleccionarCategoria(categoria: any) {
    this.categoriaSeleccionada = categoria;
    this.filtrarMarcadores();
  }

  seleccionarProvincia(provincia: any) {
    // TODO: Que al seleccionar una provincia se cambie la posicion del mapa
    // TODO: Esto se puede hacer si en la tabla de la BD se ponen 2 columnas
    // TODO: de LAT y LNG para guardar con que datos cambiar el centroMapa{}
    // TODO: También se debería ajustar un zoom adecuado para el tamaño de una provincia
    this.provinciaSeleccionada = provincia;
    this.filtrarMarcadores();
  }

  filtrarMarcadores() {
    this.marcadores.length = 0;
    let negociosFiltrados: NegocioModelo[] = Object.assign([], this.negocios);
    const filtrarPorCategoria = this.categoriaSeleccionada != this.TODAS_CATEGORIAS;
    const filtrarPorProvincia = this.provinciaSeleccionada != this.TODAS_PROVINCIAS;
    // Filtrar por categoria
    if (filtrarPorCategoria) {
      negociosFiltrados = negociosFiltrados.filter(negocio => {
        return negocio.id_categoria == this.categoriaSeleccionada.id_categoria;
      });
    }
    if (filtrarPorProvincia) {
      negociosFiltrados = negociosFiltrados.filter(negocio => {
        return negocio.id_provincia == this.provinciaSeleccionada.id_provincia;
      });
    }
    this.restablecerMarcadores(negociosFiltrados);
  }

  verNegocio(id_negocio: number) {
    const url = ['/negocio', id_negocio];
    this.router.navigate(url);
  }

  restablecerMarcadores(negociosFiltrados: NegocioModelo[]) {
    this.marcadores = [];
    negociosFiltrados.forEach( (negocio) => {
      console.log(negocio.longitud, negocio.longitud);
      this.marcadores.push({
        id_negocio: negocio.id_negocio,
        posicion: {
          lat: negocio.latitud,
          lng: negocio.longitud,
        },
        label: {
          color: 'white',

          text: negocio.nombre,
        },
        title: negocio.nombre,
        options: { animation: google.maps.Animation.BOUNCE },
      })
    });
  }

}
