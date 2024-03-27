import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-review-ordered-product',
  templateUrl: './review-ordered-product.component.html',
  styleUrls: ['./review-ordered-product.component.css']
})
export class ReviewOrderedProductComponent {

   productId: number= this.activatedRoute.snapshot.params["productId"];
 
   reviewForm:FormGroup
   selectedFile: File | null
   imagePreview: string | ArrayBuffer | null

  constructor(private userService:UserService,private fb:FormBuilder,
    private toastr:ToastrService, public activatedRoute:ActivatedRoute,private router:Router){}
 
    ngOnInit(){
      this.reviewForm = this.fb.group({
        rating: [null, [Validators.required]],
        description:[null,[Validators.required]]
      })
      console.log(this.productId)
    }

    onFileSelected(event:any){
      this.selectedFile = event.target.files[0];
      this.priviewImage();
    }


    priviewImage(){
      const reader = new FileReader();
      reader.onload =()=>{
        this.imagePreview = reader.result;
      }

      reader.readAsDataURL(this.selectedFile);
        
      }
       submitForm(){
         const formData:FormData = new FormData();
         formData.append('img', this.selectedFile)
         formData.append('productId', this.productId.toString());
         formData.append('userId', StorageService.getUser().toString());
         formData.append('description', this.reviewForm.get('description').value);
         formData.append('rating', this.reviewForm.get('rating').value);
            console.log(formData)
         this.userService.giveReview(formData).subscribe(res=>{

           if(res.id !=null){
             this.toastr.success("Review Posted Succesfully")
             this.router.navigateByUrl('/user/my_orders');
           }else{
             this.toastr.error("Something went wrong")
           }
         })
       }


    }


