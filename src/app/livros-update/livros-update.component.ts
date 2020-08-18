import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Livro } from '../model/livro';

@Component({
  selector: 'app-livros-update',
  templateUrl: './livros-update.component.html',
  styleUrls: ['./livros-update.component.css']
})
export class LivrosUpdateComponent implements OnInit {
  
  msg : string = null
  formGroup: FormGroup;
  

  constructor(private formBuilder : FormBuilder, 
    private firestore : AngularFirestore,
    private route : ActivatedRoute) { 
      this.iniciarForm();
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data=>{
      let id = data.get('id');
      this.firestore.collection('livro').doc(id).snapshotChanges().subscribe(data=>{
        let livro : Livro = data.payload.data() as Livro;
        this.formGroup.controls['titulo'].setValue(livro.titulo);
        this.formGroup.controls['autor'].setValue(livro.autor);
        this.formGroup.controls['editora'].setValue(livro.editora);
        this.formGroup.controls['preco'].setValue(livro.preco);
        this.formGroup.controls['resumo'].setValue(livro.resumo);
          console.log(this.formGroup.value);
      })
    })
  }

  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      titulo : ['',[Validators.required] ],
      autor: ['',[Validators.required] ],
      editora: ['',[Validators.required] ],
      preco: ['',[Validators.required] ],
      resumo: ['',[Validators.required] ],
    })
  }

  onSubmit(){
    this.route.paramMap.subscribe(data=>{
      let id = data.get('id');
      this.firestore.collection('livro').doc(id).set(this.formGroup.value).then(()=>{
        this.msg="Atulizado com sucesso!";
      })
  })

}

}
