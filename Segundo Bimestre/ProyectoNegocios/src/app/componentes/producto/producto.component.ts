import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductoModelo} from "../../modelos/producto.modelo";
import {ProductoAPIService} from "../../servicios/api/producto/producto-api.service";

@Component({
  selector: 'tr[app-producto]',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  constructor(
    private readonly productoAPIService: ProductoAPIService,
  ) { }

  @Input() producto?: ProductoModelo;
  @Input() index?: number;
  editable = false;

  @Output() indiceABorrar = new EventEmitter<number>();

  ngOnInit(): void {

  }

  eliminarProducto() {
    // TODO: Alerta => Esta seguro?
    this.productoAPIService.deleteProductoPorID(this.producto!.id_producto)
      .then(resultadoEliminacion => {
        this.indiceABorrar.emit(this.index);
      })
  }

  actualizarProducto() {


    this.editable = false;
  }

}
