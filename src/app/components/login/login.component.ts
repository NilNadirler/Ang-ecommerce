import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm!: FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthServiceService,
    private router:Router, private toastr:ToastrService){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      username:[null,[Validators.required]],
      password:[null, [Validators.required]]
    })
  }



  login(){
    this.authService.login(this.loginForm.get(['username'])!.value,this.loginForm.get(['password']!)?.value).subscribe((res)=>{
     if(StorageService.isAdminLoggedIn()){
       this.router.navigateByUrl("/admin/dashboard")
     }else if(StorageService.isUserLoggedIn()){
      this.router.navigateByUrl("/user/dashboard")
     }
    },(responseError)=>{
        console.log(responseError.error.message)
        if(responseError.status == 403){
          this.toastr.error("Please register first")
        }
    })
  }

}
