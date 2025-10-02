import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { GuardDecryp } from '../models/Guard/guard.decryp';

export const authorizeGuard: CanActivateChildFn = (childRoute, state) => {
  const localServi = inject(LocalStorageService);
  const router = inject(Router);

  var token = localServi.getItem('token');
  var url = (state.url).split('/')[2] ?? '/intranet';

  if (token) {
    const decoded = jwtDecode<GuardDecryp>(token);
    decoded.permisos = typeof decoded.permisos === 'string' ? JSON.parse(decoded.permisos) : decoded.permisos;
    var permisoFiltrado = decoded.permisos.find(n => n.Ruta === url)

    if (permisoFiltrado === null || permisoFiltrado === undefined) {
      router.navigate(['/intranet']);
      return true
    }
    return true
  } else {
    router.navigate(['/']);
    return true;
  }
};
