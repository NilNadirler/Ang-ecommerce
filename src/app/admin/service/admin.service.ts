import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';


const BASIC_URL = "http://localhost:9091/api/admin/"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  addCategory(categoryDto:any):Observable<any>{
     
    return this.http.post(BASIC_URL +"category", categoryDto,{
         headers:this.createAuthorizationHeader()
    })
  }

  addProduct(product:any):Observable<any>{
     
    return this.http.post(BASIC_URL +"product", product,{
         headers:this.createAuthorizationHeader()
    })
  }

  addCoupon(coupon:any):Observable<any>{
     
    return this.http.post(BASIC_URL +"coupons", coupon,{
         headers:this.createAuthorizationHeader()
    })
  }

  
  getAllCoupons():Observable<any>{
     
    return this.http.get(BASIC_URL +"coupons",{
         headers:this.createAuthorizationHeader()
    })
  }

    
  getPlacedOrder():Observable<any>{
     
    return this.http.get(BASIC_URL +"placedOrders",{
         headers:this.createAuthorizationHeader()
    })
  }

  getAllProduct():Observable<any>{
     
    return this.http.get(BASIC_URL +"products",{
         headers:this.createAuthorizationHeader()
    })
  }



  getAllCategory():Observable<any>{
     
    return this.http.get(BASIC_URL +"categories",{
         headers:this.createAuthorizationHeader()
    })
  }

  getAllProductByName(name:any):Observable<any>{
    return this.http.get(BASIC_URL +`search/${name}`,{
      headers:this.createAuthorizationHeader()
    })
  }



  changeOrderStatus(orderId: number, status: string):Observable<any> {
    return this.http.get(BASIC_URL+`order/${orderId}/${status}`,{
      headers:this.createAuthorizationHeader()
    }) 
  }
    

  postFAQ(productId:any, faqDto:any):Observable<any>{
     console.log(faqDto)
    return this.http.post(BASIC_URL +`faq/${productId}`,faqDto,{
         headers:this.createAuthorizationHeader()
    })
  }



  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      "Authorization", "Bearer " +StorageService.getToken()
    )
  }
}
