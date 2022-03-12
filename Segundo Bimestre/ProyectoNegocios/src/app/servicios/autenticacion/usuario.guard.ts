import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./autenticacion.service";

@Injectable()
export class EsUsuarioGuard implements CanActivate{

  // Inyección de dependencias
  constructor(
    private readonly _authService:AuthService,
    private readonly _router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let esUsuario = this._authService.esUsuario();
    if (esUsuario){
      return true
    } else {
      return  new Observable<boolean>((observer) => {
        setTimeout(() =>{
          esUsuario = this._authService.esUsuario()
          if(!esUsuario){
            this._router.navigate(['/login']);
          }
          observer.next(esUsuario)
          observer.complete()
        }, 1000*3 )
      })
    }
  }

}
