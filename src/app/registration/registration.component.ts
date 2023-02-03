import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

// uname="";
// acno="";
// pswd="";

//register model
registerForm=this.fb.group({
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  //control goes to register.html
})

  constructor(private fb:FormBuilder, private ds:DataService, private router:Router) { }

  ngOnInit(): void {
  }

  Register(){
    // alert("Submitted");
    console.log(this.registerForm);
    if(this.registerForm.valid){
     // validation for submit button
    var uname=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;

    const result=this.ds.Register(acno, uname, pswd,)
    .subscribe((result:any)=>{
      alert(result.message);
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message);
      this.router.navigateByUrl('Register')
    })

  //   if(result){
  //     alert("successfully registered");
  //     this.router.navigateByUrl('')
  //   }
  //   else{
  //     alert("something went wrong")
  //   }
  // }
  // else{
  //   console.log(this.registerForm.get('uname')?.errors);
    
   }
   }
  }
