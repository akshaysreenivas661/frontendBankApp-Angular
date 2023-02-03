import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { //3rd execution

  aim='Your perfect banking partner';
  accounts="Enter ur Acno here";

  // acno='';
  // pswd='';

  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private fb:FormBuilder, private router:Router, private ds:DataService) { } //first execution
  //dependency injection

  ngOnInit(): void { //life cycle hooks - initial process // 2md execution
  }
  userDetails:any={
    1000:{acno:1000,username:'Gopik',password:1000,balance:10000},
    1001:{acno:1001,username:'Soja',password:1001,balance:10000},
    1002:{acno:1002,username:'Abhijith',password:1002,balance:10000}
  }

//userdefined function()//4th execution

// acnoChange(event:any){
//   //console.log(event);
//   console.log(event.target.value);
//   this.acno=event.target.value;
// }
// pswdChange(event:any){
//   console.log(event.target.value);
//   this.pswd=event.target.value;
// }

Login(){
  // alert('Login clicked')
  // console.log(this.loginForm);
  if(this.loginForm.valid){
  
  var acno=this.loginForm.value.acno;
  var pswd=this.loginForm.value.pswd;
  this.ds.Login(acno,pswd)
  .subscribe((result:any)=>{
    localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
    localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
    localStorage.setItem('token',JSON.stringify(result.token))
    alert(result.message);
    this.router.navigateByUrl('Dashboard');
  },
  result=>{
  alert(result.error.message);
  this.router.navigateByUrl('');
  })
//   if(result){
//     alert("Login successfull");
//     this.router.navigateByUrl('Dashboard');

//   }
//   // else{
//   //   alert("Something went wrong")
//   // }
// }
// else{
//   console.log(this.loginForm.get('acno')?.errors);
  
// }
}
}


// Login(a:any,p:any){
//   // alert('Login clicked')

//   var acno=a.value;
//   var pswd=p.value;

//   var userDetails=this.userDetails;

//   if(acno in userDetails){
//     if(pswd==userDetails[acno]['password']){
//       alert("login successfull");
//     }
//     else{
//       alert("incorrect password");
//     }
//   }
//   else{
//     alert("user does not exist")
//   }
// }
}