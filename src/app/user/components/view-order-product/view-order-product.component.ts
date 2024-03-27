import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-view-order-product',
  templateUrl: './view-order-product.component.html',
  styleUrls: ['./view-order-product.component.css']
})
export class ViewOrderProductComponent {

  orderId: any= this.activatedRoute.snapshot.params['orderId']
  orderedProductDetailsList=[];
  totalAmount:any

    constructor(private activatedRoute:ActivatedRoute, private userService:UserService){}

    ngOnInit(){
      this.getDetailByOrderID();
    }

    getDetailByOrderID(){
      this.userService.getOrderedProducts(this.orderId).subscribe(res=>{
        res.productDtoList.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64, ' +element.byteImg;
          this.orderedProductDetailsList.push(element)
          console.log(this.orderedProductDetailsList)
        });
        this.totalAmount= res.orderAmount;
      })
    }
}
