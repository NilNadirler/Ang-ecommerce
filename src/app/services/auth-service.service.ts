import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable, tap } from 'rxjs';
import { enviroment } from '../environment/enivironment';
import { StorageService } from './storage.service';

const BASIC_URL = enviroment["BASIC_URL"]

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  

  constructor(private http:HttpClient,private storageService:StorageService) { }

  register(signupDto:any):Observable<any>{
     
    return this.http.post(BASIC_URL + "sign-up", signupDto)
  }

  login(username:string, password:string):Observable<any>{
     
    return this.http.post(BASIC_URL + "authenticate", {username,password},{observe: 'response'}).pipe(
      map((res:HttpResponse<any>)=>{
         console.log(res)
        this.storageService.saveUserId(res.body.userId)
        this.storageService.saveUserRole(res.body.role);
        this.storageService.saveToken(res.body.token);
        this.storageService.validateToken(res.body.expirationDate)


      })
    )
    
  }


}
