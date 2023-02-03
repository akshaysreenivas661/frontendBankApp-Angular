import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  withdrawForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
user="";

  acno="";
  pswd="";
  amount="";

  acno1="";
  pswd1="";
  amount1="";

  //date and time
SystemDate:any;

//dlt proprty
acno2="";
 

  constructor(private fb:FormBuilder,private ds:DataService, private router:Router) { 
    this.user=this.ds.currentUser
    this.SystemDate= new Date();// (Indian standard time)
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser')|| '')
    }
   
    console.log(localStorage);
    
  }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert("Please login first");
      this.router.navigateByUrl('');
    }
  }

  deposit(){
    var acno=this.depositForm.value.acno;
    var pswd=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;
    if(this.depositForm.valid){
    this.ds.deposit(acno,pswd,amount)
   .subscribe((result:any)=>{
    alert(result.message);
   },
   result=>{
    alert(result.error.message);
   })
  }
  else{
    alert("Invalid form")
  }
   
    // if(result){
    //   alert(` ${amount} is credited... balance: ${result}`);
    // }

  }

  withdraw(){
    var acno=this.withdrawForm.value.acno;
    var pswd=this.withdrawForm.value.pswd;
    var amount=this.withdrawForm.value.amount;
    if(this.withdrawForm.valid){
    this.ds.withdraw(acno,pswd,amount)
    .subscribe((result:any)=>{
      alert(result.message);
     },
     result=>{
      alert(result.error.message);
     })
    }
    else{
      alert("Invalid form")
    }
    // if(result){
    //   alert(` ${amount} is debited... balance: ${result}`);
    // }
  }

  logout(){
    //remove username 
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('token');

    //navigate to login page
    this.router.navigateByUrl('');
  }

  delete(){
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')
  }

  onCancel(){
    this.acno="";
  }

  onDelete(event:any){
// alert(event)
this.ds.deleteAcc(event)
.subscribe((result:any)=>{
  alert(result.message);
  this.logout()
},
result=>{
  alert(result.error.message);
})
  }
 
}
