import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

uname="";
acno="";
pswd="";

//register model
registerForm=this.fb.group({
  uname:[''],
  acno:[''],
  pswd:['']
})

  constructor(private fb:FormBuilder, private ds:DataService, private router:Router) { }

  ngOnInit(): void {
  }

  Register(){
    // alert("Submitted");

    var uname=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;

    const result=this.ds.Register(acno, uname, pswd,)

    if(result){
      alert("successfully registered");
      this.router.navigateByUrl('')
    }
    else{
      alert("something went wrong")
    }
    
  }
}
