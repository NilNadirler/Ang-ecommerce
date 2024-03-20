import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';



const BASIC_URL="http://localhost:9091/api/customer/"

@Injectable({
  providedIn: 'root'
})


export class UserService {




  constructor(private http:HttpClient) { }

  
  getAllProduct():Observable<any>{
     
    return this.http.get(BASIC_URL +"products",{
         headers:this.createAuthorizationHeader()
    })
  }



 
  getAllProductByName(name:any):Observable<any>{
    return this.http.get(BASIC_URL +`search/${name}`,{
      headers:this.createAuthorizationHeader()
    })

  }

  addToCart(id:any):Observable<any>{
     const cartDto ={
       productId : id,
       userId : StorageService.getUser()
     }

     return this.http.post(BASIC_URL+"cart", cartDto,{
      headers:this.createAuthorizationHeader()
     })
    
  }

  getCartByUserId():Observable<any>{
    const userId = StorageService.getUser();
    return this.http.get(BASIC_URL+`cart/${userId}`,{
      headers: this.createAuthorizationHeader()
    })
  }



  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      "Authorization", "Bearer " +StorageService.getToken()
    )
  }
}
