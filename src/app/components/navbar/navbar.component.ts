import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isUserLoggedIn:boolean=StorageService.isUserLoggedIn();
  isAdminLoggedIn:boolean= StorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit():void{
    this.router.events.subscribe(event=>{
      if(event.constructor.name=="NavigationEnd"){
        console.log(event)
 this.isUserLoggedIn=StorageService.isUserLoggedIn();
    this.isAdminLoggedIn= StorageService.isAdminLoggedIn();
      }
    })
   
  }

  logout(){
    StorageService.signOut();
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }

}
