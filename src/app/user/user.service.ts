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

  applyCoupon(code: any):Observable<any> {
    const userId = StorageService.getUser();
     return this.http.get(BASIC_URL+`applyCoupon/${userId}/${code}`,{
      headers:this.createAuthorizationHeader()
     }
     )}


  getCartByUserId():Observable<any>{
    const userId = StorageService.getUser();
    return this.http.get(BASIC_URL+`cart/${userId}`,{
      headers: this.createAuthorizationHeader()
    })
  }

  increaseQuantity(productId: any):Observable<any> {
    const cartDto ={
      productId : productId,
      userId : StorageService.getUser()
    }

    return this.http.post(BASIC_URL+"increaseQuantity", cartDto,{
     headers:this.createAuthorizationHeader()
    })  ;
  }

  decreaseQuantity(productId: any):Observable<any> {
    const cartDto ={
      productId : productId,
      userId : StorageService.getUser()
    }

    return this.http.post(BASIC_URL+"decreaseQuantity", cartDto,{
     headers:this.createAuthorizationHeader()
    })  ;
  }

  placeOrder(orderDto: any):Observable<any> {
    orderDto.userId = StorageService.getUser();
    console.log(orderDto)
     return this.http.post(BASIC_URL+`placeOrder`,orderDto, {
      headers:this.createAuthorizationHeader()
     }
     )}
   

     getOrderByUserId():Observable<any>{
      const userId = StorageService.getUser();
      return this.http.get(`http://localhost:9091/api/admin/myOrders/${userId}`,{
        headers: this.createAuthorizationHeader()
      })
    }

    getOrderedProducts(orderId:any):Observable<any>{
      return this.http.get(BASIC_URL + `ordered-product/${orderId}`,{
        headers: this.createAuthorizationHeader()
      })
    }

    getProductById(productId:any):Observable<any>{
      return this.http.get(BASIC_URL + `product/${productId}`,{
        headers: this.createAuthorizationHeader()
      })
    }


    
  giveReview(reviewDto: FormData):Observable<any> {
    console.log(reviewDto)
     return this.http.post(BASIC_URL+`review`,reviewDto, {
      headers:this.createAuthorizationHeader()
     }
     )}

     addProductToWishList(wishListDto: any):Observable<any> {
       return this.http.post(BASIC_URL+`wishList`,wishListDto, {
        headers:this.createAuthorizationHeader()
       }
       )}

       getWishListByUserId():Observable<any>{
        const userId = StorageService.getUser();
        return this.http.get(BASIC_URL+`wishList/${userId}`,{
          headers: this.createAuthorizationHeader()
        })
      }
   
  

  private createAuthorizationHeader():HttpHeaders{
    return new HttpHeaders().set(
      "Authorization", "Bearer " +StorageService.getToken()
    )
  }
}
