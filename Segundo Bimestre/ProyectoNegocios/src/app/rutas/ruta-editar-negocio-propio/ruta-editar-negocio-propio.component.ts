import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NegocioModelo} from "../../modelos/negocio.modelo";
import {NegocioAPIService} from "../../servicios/api/negocio/negocio-api.service";
import {ProductoModelo} from "../../modelos/producto.modelo";
import {ProductoAPIService} from "../../servicios/api/producto/producto-api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriaModelo} from "../../modelos/categoria.modelo";
import {ProvinciaModelo} from "../../modelos/provincia.modelo";
import {ProvinciaAPIService} from "../../servicios/api/provincia/provincia-api.service";
import {CategoriaAPIService} from "../../servicios/api/categoria/categoria-api.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ruta-editar-negocio-propio',
  templateUrl: './ruta-editar-negocio-propio.component.html',
  styleUrls: ['./ruta-editar-negocio-propio.component.scss']
})
export class RutaEditarNegocioPropioComponent implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly negocioAPIService: NegocioAPIService,
    private readonly productoAPIService: ProductoAPIService,
    private readonly formBuilder: FormBuilder,
    private readonly provinciaAPIService: ProvinciaAPIService,
    private readonly categoriaAPIService: CategoriaAPIService,
    private readonly router:Router
  ) { }

  negocio?: NegocioModelo;
  productos?: ProductoModelo[];
  formGroup?: FormGroup;
  listaProvincias?: ProvinciaModelo[]
  listaCategorias?: CategoriaModelo[]

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    params.subscribe((params) => {
      const id_negocio = params['id_negocio'];
      // Consultar negocio
      this.negocioAPIService.readNegocioPorID(id_negocio)
        .then(queryNegocio => {
          this.negocio = queryNegocio.data as NegocioModelo;
          // Consultar productos
          return this.productoAPIService.readProductos(this.negocio.id_negocio);
        })
        .then(queryProductos => {
          this.productos = queryProductos.data as ProductoModelo[];
          // Consultar Provincias
          return this.provinciaAPIService.readProvincias();
        })
        .then(queryProvincias => {
          this.listaProvincias = queryProvincias.data as ProvinciaModelo[];
          // Consultar Categorias
          return this.categoriaAPIService.readCategorias();
        })
        .then(queryCategorias => {
          this.listaCategorias = queryCategorias.data as CategoriaModelo[];
        })
        .then(()=>{
          this.prepararFormulario();

        })
    })
  }


  borrarFilaProducto(indiceABorrar: number) {
    // Eliminar fila de la tabla
    this.productos?.splice(indiceABorrar, 1);
  }

  actualizarProducto(info: {indice: number, producto: ProductoModelo}) {
    this.productos![info.indice] = info.producto;
  }
  prepararFormulario(){
    this.formGroup = this.formBuilder.group({
      nombre_negocio: new FormControl({
        value: this.negocio?.nombre,
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(5)
      ]),
      descripcion_negocio: new FormControl({
        value: this.negocio?.descripcion,
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(20)
      ]),
      longitud: new FormControl({
        value: this.negocio?.longitud,
        disabled: false
      }, [
        Validators.required
      ]),
      provincia: new FormControl({
        value: this.negocio?.id_provincia,
        disabled: false
      }, [
        Validators.required
      ]),
      enlace_facebook: new FormControl({
        value: this.negocio?.enlace_facebook,
        disabled: false
      }, [
        Validators.required
      ]),
      enlace_instagram: new FormControl({
        value: this.negocio?.enlace_instagram,
        disabled: false
      }, [
        Validators.required
      ]),
      enlace_sitio_web: new FormControl({
        value: this.negocio?.enlace_sitio_web,
        disabled: false
      }, [
        Validators.required
      ]),
      latitud: new FormControl({
        value: this.negocio?.latitud,
        disabled: false
      }, [
        Validators.required
      ]),
      categorias: new FormControl({
        value: this.negocio?.id_categoria,
        disabled: false
      }, [
        Validators.required
      ]),
      telefono_fijo: new FormControl({
        value: this.negocio?.telefono_fijo,
        disabled: false
      },[
        Validators.required,
        Validators.minLength(7)
      ]),
      telefono_movil: new FormControl({
        value: this.negocio?.telefono_movil,
        disabled: false
      }, [
        Validators.required,
        Validators.minLength(9)
      ])
    })
  }

  guardarInformacionNegocio(){
    const nombre_negocio = this.formGroup?.get('nombre_negocio')?.value;
    const descripcion_negocio = this.formGroup?.get('descripcion_negocio')?.value;
    const longitud = this.formGroup?.get('longitud')?.value;
    const provincia = this.formGroup?.get('provincia')?.value;
    const enlace_facebook = this.formGroup?.get('enlace_facebook')?.value;
    const enlace_instagram = this.formGroup?.get('enlace_instagram')?.value;
    const enlace_sitio_web = this.formGroup?.get('enlace_sitio_web')?.value;
    const latitud = this.formGroup?.get('latitud')?.value;
    const categorias = this.formGroup?.get('categorias')?.value;
    const telefono_fijo = this.formGroup?.get('telefono_fijo')?.value;
    const telefono_movil = this.formGroup?.get('telefono_movil')?.value;

    const negocioActualizar : NegocioModelo ={
      id_negocio: this.negocio?.id_negocio as number,
      id_categoria: categorias as number,
      id_provincia: provincia,
      nombre: nombre_negocio,
      descripcion: descripcion_negocio,
      latitud: latitud,
      longitud: longitud,
      enlace_facebook: enlace_facebook,
      enlace_instagram: enlace_instagram,
      enlace_sitio_web: enlace_sitio_web,
      telefono_fijo: telefono_fijo,
      telefono_movil: telefono_movil,
    }

    this.negocioAPIService.updateNegocio(negocioActualizar)
      .then(
        (queryNegocio) => {
          if( queryNegocio.error === null ){
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: 'Negocio actualizado exitosamente'
            })
            this.router.navigate(['misNegocios']);
          }
        }
      )
  }
}
