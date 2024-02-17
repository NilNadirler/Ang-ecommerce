import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  products:any[]=[];
  searchProductForm:FormGroup

  constructor(private  userService:UserService,private fb:FormBuilder,private toastr:ToastrService){};

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm= this.fb.group({
      title:[null]
    })
  }

   getAllProducts(){
     this.products=[];
      this.userService.getAllProduct().subscribe(res=>{
        console.log(res)
          res.forEach(element=> {
            console.log(element)
            element.processedImg = 'data:image/jpeg;base64,'+ element.byteImg
             this.products.push(element);
          });
      })

   }

   submitForm(){
    this.products=[];
    const title = this.searchProductForm.get("title")!.value
    if(title == ''){
      this.getAllProducts()
    }
    this.userService.getAllProductByName(title).subscribe(res=>{
      console.log(res)
        res.forEach(element=> {
          console.log(element)
          element.processedImg = 'data:image/jpeg;base64,'+ element.byteImg
           this.products.push(element);
        });
    })
   }

   addToCart(id:any){
      this.userService.addToCart(id).subscribe(res=>{
        console.log(res)
        this.toastr.success("Product added successfully")
      })
   }
}
