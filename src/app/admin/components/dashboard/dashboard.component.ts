import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  products:any[]=[];
  searchProductForm:FormGroup

  constructor(private adminService:AdminService,private fb:FormBuilder){};

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm= this.fb.group({
      title:[null]
    })
  }

   getAllProducts(){
     this.products=[];
      this.adminService.getAllProduct().subscribe(res=>{
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
    this.adminService.getAllProductByName(title).subscribe(res=>{
      console.log(res)
        res.forEach(element=> {
          console.log(element)
          element.processedImg = 'data:image/jpeg;base64,'+ element.byteImg
           this.products.push(element);
        });
    })
   }

}
