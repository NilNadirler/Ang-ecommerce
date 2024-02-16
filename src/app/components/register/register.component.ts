import { ConstantPool } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  validateForm!: FormGroup;

   constructor(private fb:FormBuilder, private authService:AuthServiceService, 
    private toastr:ToastrService, private router:Router ){}

    ngOnInit(){
      this.validateForm = this.fb.group({
        name:[null, [Validators.required]],
        email:[null, [Validators.required, Validators.email]],
        password:[null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
    },)

      
    }


    register(){
      
    const password = this.validateForm.get('password')?.value;
    const confirmPassword = this.validateForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.toastr.error("Password is not match")
      return;
    }
      this.authService.register(this.validateForm.value).subscribe(
        (res)=>{
              this.router.navigateByUrl("/login")
        }, responseError=>{
          this.toastr.error(responseError.error)
        }
      )
    }

}
