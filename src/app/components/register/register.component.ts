import { ConstantPool } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  validateForm!: FormGroup;

   constructor(private fb:FormBuilder, private authService:AuthServiceService){}

    ngOnInit(){
      this.validateForm = this.fb.group({
        name:[null, [Validators.required]],
        email:[null, [Validators.required]],
        password:[null, [Validators.required, Validators.email]],
        confirmPassword: [null, [Validators.required]],
    }, { validator: this.passwordMatchValidator })
      
    }

    passwordMatchValidator(formGroup:FormGroup){
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      if (password != confirmPassword) {
        formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      } else {
        formGroup.get('confirmPassword')?.setErrors(null);
      }
    }

    register(){
      this.authService.register(this.validateForm.value).subscribe(
        (res)=>{
        
        }, responseError=>{
          console.log(responseError.error)
        }
      )
    }

}
