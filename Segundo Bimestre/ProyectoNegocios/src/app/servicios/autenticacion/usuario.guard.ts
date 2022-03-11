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
    const esUsuario = this._authService.esUsuario();
    if(!esUsuario){
      this._router.navigate(['/login']);
    }
    return esUsuario;
  }

}
