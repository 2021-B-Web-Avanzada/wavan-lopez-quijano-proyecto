import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductoModelo} from "../../modelos/producto.modelo";
import {ProductoAPIService} from "../../servicios/api/producto/producto-api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: '[app-producto]',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  constructor(
    private readonly productoAPIService: ProductoAPIService,
    private readonly formBuilder: FormBuilder,
  ) { }

  @Input() producto?: ProductoModelo;
  @Input() index?: number;
  editable = false;

  nombreForm?: FormGroup;
  descripcionForm?: FormGroup;
  precioForm?: FormGroup;

  nombreValido = false;
  descripcionValida = false;
  precioValido = false;
  puedeActualizar = false;

  @Output() indiceABorrar = new EventEmitter<number>();
  @Output() actualizacion = new EventEmitter<{indice: number, producto: ProductoModelo}>();

  ngOnInit(): void {
    this.nombreForm = this.formBuilder.group({
      nombre: new FormControl({
        value: this.producto!.nombre,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])
    });

    this.descripcionForm = this.formBuilder.group({
      descripcion: new FormControl({
        value: this.producto!.descripcion,
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(100),
      ])
    });

    this.precioForm = this.formBuilder.group({
      precio: new FormControl({
        value: this.producto!.precio,
        disabled: false,
      }, [
        Validators.required,
        Validators.min(0.01),
        Validators.pattern('[0-9]*.[0-9]{2}'),
      ])
    });
    // Esuchar cambios
    this.escucharCambios()
  }

  escucharCambios() {
    this.nombreForm?.valueChanges.subscribe({
      next: (valor) => {
        this.nombreValido = this.nombreForm?.valid as boolean;
        this.puedeActualizar = this.nombreValido && this.precioValido && this.descripcionValida;
      }
    });
    this.descripcionForm?.valueChanges.subscribe({
      next: (valor) => {
        this.descripcionValida = this.descripcionForm?.valid as boolean;
        this.puedeActualizar = this.nombreValido && this.precioValido && this.descripcionValida;
      }
    })
    this.precioForm?.valueChanges.subscribe({
      next: (valor) => {
        this.precioValido = this.precioForm?.valid as boolean;
        this.puedeActualizar = this.nombreValido && this.precioValido && this.descripcionValida;
      }
    })
  }

  eliminarProducto() {
    Swal.fire({
      title: '¿Está seguro de querer eliminar el producto seleccionado?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoAPIService.deleteProductoPorID(this.producto!.id_producto)
          .then(resultadoEliminacion => {
            Swal.fire(
              'Producto eliminado',
              '',
              'success'
            )
            this.indiceABorrar.emit(this.index);
          })
      }
    });
  }

  actualizarProducto() {
    const productoActualizado: ProductoModelo = {
      id_producto: this.producto?.id_producto as number,
      id_negocio: this.producto?.id_negocio as number,
      nombre: this.nombreForm?.get('nombre')?.value,
      descripcion: this.descripcionForm?.get('descripcion')?.value,
      precio: this.precioForm?.get('precio')?.value,
    }
    this.productoAPIService.updateProducto(productoActualizado)
      .then(resultadoActualizacion => {
        this.actualizacion.emit({
          indice: this.index as number,
          producto: productoActualizado,
        })
      })
    this.editable = false;
  }

}
