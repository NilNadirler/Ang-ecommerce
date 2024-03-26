import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrls: ['./post-product-faq.component.css']
})
export class PostProductFaqComponent {

  productId:number= this.activatedRoute.snapshot.params["productId"];
  faqForm:FormGroup
  
  constructor(private fb:FormBuilder, private router:Router, private toastr:ToastrService
    ,private adminService:AdminService, private activatedRoute:ActivatedRoute){}

    ngOnInit(){
      this.faqForm =this.fb.group({
        question:[null, [Validators.required]],
        answer:[null, [Validators.required]],
      })
    }

    postFAQ(){
      this.adminService.postFAQ(this.productId,this.faqForm.value).subscribe(res=>{
        if(res.id !=null){
          this.toastr.success("FAQ Posted Successfully")
        }else{
          this.toastr.error("Something went wrong")
        }
      })
    }

}
