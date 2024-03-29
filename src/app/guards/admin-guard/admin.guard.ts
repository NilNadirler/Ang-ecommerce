import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router:Router, private toastr:ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(StorageService.isUserLoggedIn()){
      this.router.navigateByUrl("/user/dashboard")
      this.toastr.error("You dont access of this page")
      return false;
    }else if(!StorageService.hasToken()){
      StorageService.signOut();
      this.router.navigateByUrl("/login");
      this.toastr.error("You are not logged in. Please login first")
    }else if(StorageService.expireToken()){
      StorageService.signOut();
      this.router.navigateByUrl("/login");
      this.toastr.error("You are not logged in. Please login first")
    }

    return true;
  }
  
}
