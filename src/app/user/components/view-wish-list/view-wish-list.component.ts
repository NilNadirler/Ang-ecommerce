import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-view-wish-list',
  templateUrl: './view-wish-list.component.html',
  styleUrls: ['./view-wish-list.component.css']
})
export class ViewWishListComponent {
  
  products:any[]=[]

  constructor(private userService:UserService){}

  ngOnInit(){
    this.getWishListByUserId();
  }

  getWishListByUserId(){
    this.userService.getWishListByUserId().subscribe(res=>{
      res.forEach(element=>{
        element.processedImg ='data:image/jpeg;base64, '+element.returnedImg;
        this.products.push(element);
      })
    })
  }


}
