import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';




@Injectable({
  providedIn: 'root'
})
export class StorageService {


  
  constructor(private datePipe:DatePipe) { }

  saveToken(token: any) {
    window.localStorage.setItem("token",token)
    
  }
  saveUserRole(role: any) {
    window.localStorage.setItem("role",role)
  }
  saveUserId(userId: any) {
    window.localStorage.setItem("userId",userId)
  }

   validateToken(tokenValidate: any) {
  
     window.localStorage.setItem("expirationDate", tokenValidate);
  }

  static expireToken():boolean{
  const dateString = localStorage.getItem("expirationDate");
  const tokenDate = moment(dateString).toDate();
  console.log(dateString)
  console.log(tokenDate.getTime())
  console.log(Date.now())
  console.log(Date.now()> tokenDate.getTime())

  if(Date.now()> tokenDate.getTime())
      return true;
      else{
        return false;
      }

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

  static getValidateToken(){
    return localStorage.getItem("expirationDate");
  
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

