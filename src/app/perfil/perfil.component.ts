import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Perfil } from '../model/perfil';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formGroup : FormGroup;
  idUser : string = "";
  message : string = null;
  perfil  : Perfil = new Perfil();
  
  constructor(private formBuilder: FormBuilder,
    private auth: AngularFireAuth, //capturar o uid
    private firestore: AngularFirestore) { 
      this.iniciarForm();
    }

  ngOnInit(): void {
    this.auth.currentUser.then(data=>{
      this.idUser = data.uid;
      this.dadosPerfil();
    })
  }

  dadosPerfil(){
    this.firestore.collection('perfil').doc(this.idUser).snapshotChanges().subscribe(data=>{
      if(data.payload.data() !== undefined){
        this.perfil = data.payload.data() as Perfil;
        
        this.formGroup.controls['nome'].setValue(this.perfil.nome);
        this.formGroup.controls['cpf'].setValue(this.perfil.cpf);
        this.formGroup.controls['celular'].setValue(this.perfil.celular);
        this.formGroup.controls['dataNasc'].setValue(this.perfil.dataNasc);
      }

    })
  }

  atualiza(){
    this.firestore.collection('perfil').doc(this.idUser).set(this.formGroup.value).then(data=>{
      this.message = "Atualizado com sucesso!";
    })
  }

  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      nome : ['',[Validators.required] ],
      cpf: ['',[Validators.required] ],
      celular: ['',[Validators.required] ],
      dataNasc: ['',[Validators.required] ],
    })
  }
}
