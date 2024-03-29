import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

   constructor(private router:Router,private toastr:ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
   if(StorageService.hasToken() && StorageService.isUserLoggedIn()){
     this.router.navigateByUrl("/user/dashboard")
  
   }else if(StorageService.hasToken() && StorageService.isAdminLoggedIn()){
    this.router.navigateByUrl("/admin/dashboard")
   }if(!StorageService.expireToken){
    StorageService.signOut();
    this.router.navigateByUrl("/login");
    this.toastr.error("You are not logged in. Please login first")
  }
   return true; 
  }
  
}
