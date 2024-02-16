import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
   
  categoryForm:FormGroup
       
  constructor(private fb:FormBuilder,private router:Router,private toastr:ToastrService,
    private adminService:AdminService){}

      
    ngOnInit():void{
     this.categoryForm = this.fb.group({
       name:[null,[Validators.required]],
       description:[null,[Validators.required]]
           })
    }


    addCategory(){
      if(this.categoryForm.valid){
        this.adminService.addCategory(this.categoryForm.value).subscribe(
          (res)=>{
            if(res.id !=null){
              this.toastr.success("Category added Successfully")
            }
          }
        )
      }else{
        this.categoryForm.markAllAsTouched();
      }
    }
}
