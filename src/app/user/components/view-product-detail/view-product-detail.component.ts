import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.css']
})
export class ViewProductDetailComponent {

  productId:number=this.activatedRoute.snapshot.params["productId"];
  product:any;
  FAQS:any[]=[];
  reviews:any[]=[]

  constructor(private toastr:ToastrService,private userService:UserService,
    private activatedRoute:ActivatedRoute ){}

    ngOnInit(){
      this.getProductDetailById();
    }
  
    getProductDetailById(){
      this.userService.getProductById(this.productId).subscribe(res=>{
        this.product= res.productDto;
        this.FAQS=res.faqdtoList;
        this.product.processedImg ='data:image/png;base64, ' +res.productDto.byteImg;

        res.reviewDtoList.forEach(element => {
          element.processedImg='data:image/png;base64, ' + element.returnImg;
          this.reviews.push(element);
          console.log(res)
        });
      })
    }

    addToWishList(){
      const wishListDto = {
        productId: this.productId,
        userId: StorageService.getUser()
      }
       this.userService.addProductToWishList(wishListDto).subscribe(res=>{
         console.log(res)
        if(res !== null){
          this.toastr.success("Product Added WishList Successfully")
        }if(res==null){
          this.toastr.error("Already in wishList")
        }
          
        
      });
    }
}
