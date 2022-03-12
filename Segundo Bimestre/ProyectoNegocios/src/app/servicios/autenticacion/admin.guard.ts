import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../autenticacion/autenticacion.service";

@Injectable()
export class EsAdministradorGuard implements CanActivate{

  // Inyección de dependencias
  constructor(
    private readonly _authService:AuthService,
    private readonly _router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let esAdministrador = this._authService.esAdministrador();
    if (esAdministrador){
      return true
    } else {
      return  new Observable<boolean>((observer) => {
        setTimeout(() =>{
          esAdministrador = this._authService.esUsuario()
          if(!esAdministrador){
            this._router.navigate(['/login']);
          }
          observer.next(esAdministrador)
          observer.complete()
        }, 1000*3 )
      })
    }
  }

}
