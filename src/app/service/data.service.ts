import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';


//global http headers
const options={
  headers: new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})


export class DataService {

currentUser:any;//login name display

currentAcno:any;//login accno display

  userDetails:any={
    1000:{acno:1000,username:'Gopik',password:1000,balance:10000, transaction:[]},
    1001:{acno:1001,username:'Soja',password:1001,balance:10000,transaction:[]},
    1002:{acno:1002,username:'Abhijith',password:1002,balance:10000,transaction:[]}
  }


  constructor(private http:HttpClient) { 
    // this.getDetails()
  } //dependency injection

  //saveDetails() - To store data in local storage

  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('dataBase',JSON.stringify(this.userDetails));
    }
    if (this.currentAcno) {
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno));
    }
    if (this.currentUser) {
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
  }
}

//getDetails() -to get the data from local storage
// getDetails(){
//   if(localStorage.getItem('dataBase')){
//     this.userDetails=JSON.parse(localStorage.getItem('dataBase') || '');
//   }

// } 
// getcurrentUser(){
//   if(localStorage.getItem('currentUser')){
//     this.userDetails=JSON.parse(localStorage.getItem('currentUser') || '');
//   }
// }
// getcurrentAcno(){
//   if(localStorage.getItem('currentAcno')){
//     this.userDetails=JSON.parse(localStorage.getItem('currentAcno') || '');
//   }
// }


//register api request
Register(acno:any, username:any, password:any, ){
  const data={
    acno,
    username,
    password
  }
  return this.http.post('http://localhost:3000/Register', data)



  // let userDetails=this.userDetails;
  // if(acno in userDetails){
  //   return false;
  // }
  // else{
  //   userDetails[acno]={
  //     acno,
  //     username,
  //     password,
  //     balance:0,
  //     transaction:[],
  //   }
  //   console.log(userDetails);
  //   this.saveDetails();//function call

  //   return true;
  // }
}

//login api req
Login(acno:any,pswd:any){
  const data={
    acno,
    pswd
  }
  return this.http.post('http://localhost:3000/Login', data)

  // let userDetails=this.userDetails;
  // if(acno in userDetails){
  //   if(pswd==userDetails[acno]['password']){
  //     this.currentUser=this.userDetails[acno]['username']
  //     this.currentAcno=acno;
  //     this.saveDetails();
  //     return true;
  //   }
  //  else{
  //   alert('Incorrect password');
  //   return false;
  //  }
  // }
  // else{
  //   alert('Invalid user')
  //   return false;
  // }
}

getToken(){
  //fetch the token from localstorage
  const token = JSON.parse(localStorage.getItem('token') || '')
  //generate request header
  let headers= new HttpHeaders()
  //append token inside the headers
  if(token){
    options.headers=headers.append('x-access-token',token)
  }
  return options
}

//deposit api req
deposit(acno:any, pswd:any, amount:any){
  const data={
    acno,
    pswd,
    amount
  }
  return this.http.post('http://localhost:3000/deposit', data, this.getToken())

  // var userDetails=this.userDetails;
  // var amount=parseInt(amt);
  // if(acno in userDetails){
  //  if(pswd==userDetails[acno]['password']){
  //   userDetails[acno]['balance']+=amount;
  //   userDetails[acno]['transaction'].push({
  //     type:'Credit',
  //     amount
  //   })
  //   console.log(userDetails);
  //   this.saveDetails();
  //   return userDetails[acno]['balance'];
  //  }
  //  else{
  //   alert('incorrect password')
  //   return false;
  //  }
  // }
  //  else{
  //   alert('ivalid user')
  //   return false;
  //  }
  }

  withdraw(acno:any, pswd:any, amount:any){
    const data={
      acno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/withdraw', data, this.getToken())
  


    // var userDetails=this.userDetails;
    // var amount=parseInt(amt);
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     if(userDetails[acno]['balance']>amount){
    //       userDetails[acno]['balance']-=amount;
    //       userDetails[acno]['transaction'].push({
    //         type:'Debit',
    //         amount
    //       })
    //       console.log(userDetails);
    //       this.saveDetails();
    //       return userDetails[acno]['balance'];
          
    //     }
    //     else{
    //       alert('insufficient balance');
    //       return false;
    //     }
    //   }
    //   else{
    //     alert('incorrect password');
    //     return false;
    //   }
    // }
    // else{
    //   alert('invalid user');
    //   return false;
    // }

  }

  getTransaction(acno:any){
    const data={
      acno
    }
    return this.http.post('http://localhost:3000/transaction', data, this.getToken())
  
    // return this.userDetails[acno]['transaction']
  }

  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }
}





