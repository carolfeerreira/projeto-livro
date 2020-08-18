import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   //login : Login;
   formGroup : FormGroup;
   message : string = null;
 
   constructor(private formBuilder : FormBuilder,
     private router : Router,
     public auth: AngularFireAuth) {
     this.iniciarForm();
   }
 
  ngOnInit(): void {
  }

  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      username : ['',[Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
  }
  
  tryRegister(){

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;
   //console.log(user+pass);

    this.message = null;

    this.auth.signInWithEmailAndPassword(user,pass).then(data=>{
      //this.message = "Usuário ok";
      console.log(data.user.email);
      this.router.navigate(['livros']);
    }).catch(data=>{
      console.log("error log");
      this.message = "Login inválido";
    })
  }
}
