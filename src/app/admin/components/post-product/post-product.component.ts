import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css']
})
export class PostProductComponent {
   
  productForm:FormGroup
  imagePreview:string | ArrayBuffer | null
  selectedFile: File;
  listOfCategories:any=[]


  constructor(private fb:FormBuilder, private router:Router, private toastr:ToastrService
    , private adminService:AdminService){}


    ngOnInit(){

      this.productForm = this.fb.group({
          categoryId:[null,[Validators.required]],
          name:[null,[Validators.required]],
          price:[null,[Validators.required]],
          description:[null,[Validators.required]],
      })
      this.getAllCategories();
    }


  onFileSelected(event:any){

    this.selectedFile= event.target.files[0];
    this.previewImage();

  }
  previewImage(){
    const reader = new FileReader();
    reader.onload= ()=>{
      this.imagePreview= reader.result;
    }

    reader.readAsDataURL(this.selectedFile)
  }

  addProduct(){
     if(this.productForm.valid){
       const formData:FormData= new FormData();
      formData.append("img", this.selectedFile);
      formData.append("categoryId", this.productForm.get("categoryId")!.value)
      formData.append("name", this.productForm.get("name")!.value)
      formData.append("description", this.productForm.get("description")!.value)
      formData.append("price", this.productForm.get("price")!.value);
      console.log(formData)
        this.adminService.addProduct(formData).subscribe((res)=>{
          console.log(res)
         if(res.id !=null){
           this.toastr.success("Product added")
           this.router.navigateByUrl("/admin/dashboard")
         }else{
           this.toastr.error(res.message)
         }
        
        })

     }
     else{
       for(const i in this.productForm.controls){
         this.productForm.controls[i].markAsDirty();
         this.productForm.controls[i].updateValueAndValidity()
       }
     }
  }

  getAllCategories(){
    this.adminService.getAllCategory().subscribe((res)=>{
      this.listOfCategories=res;
      console.log(this.listOfCategories)
    })
  }

}
