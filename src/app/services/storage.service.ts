import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {



  
  constructor() { }

  saveToken(token: any) {
    window.localStorage.setItem("token",token)
  }
  saveUserRole(role: any) {
    window.localStorage.setItem("role",role)
  }
  saveUserId(userId: any) {
    window.localStorage.setItem("userId",userId)
  }


  static hasToken() :boolean{
    if(this.getToken()===null){
      return false;
    }
    return true;
  }
  static getToken() {
     return localStorage.getItem("token")
  }

  static getUserRole(){
    return localStorage.getItem("role")
  }

  static getUser(){
    return localStorage.getItem("userId")
  }



  static isUserLoggedIn():boolean {
   if(this.getToken() ===null){
     return false;
   }
   const role =this.getUserRole();
   return role == "USER"

  }

  static isAdminLoggedIn():boolean {
    if(this.getToken() ===null){
      return false;
    }
    const role =this.getUserRole();
    return role == "ADMIN"
 
   }

   static signOut(){
     window.localStorage.removeItem("token")
     window.localStorage.removeItem("role")
     window.localStorage.removeItem("userId")
     window.localStorage.clear()
   }



}
