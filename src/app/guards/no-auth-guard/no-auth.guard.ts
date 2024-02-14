import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

   constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
   if(StorageService.hasToken() && StorageService.isUserLoggedIn()){
     this.router.navigateByUrl("/user/dashboard")
  
   }else if(StorageService.hasToken() && StorageService.isAdminLoggedIn()){
    this.router.navigateByUrl("/admin/dashboard")
   }
   return true; 
  }
  
}
