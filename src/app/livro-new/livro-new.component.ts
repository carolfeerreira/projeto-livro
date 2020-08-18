import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-livros-new',
  templateUrl: './livro-new.component.html',
  styleUrls: ['./livro-new.component.css']
})
export class LivroNewComponent implements OnInit {

  formGroup : FormGroup;
  msg : string = null;

  constructor(
    private formBuilder : FormBuilder)  {
      this.iniciarForm();
    }
  

  ngOnInit(): void {}

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
  
    
  }

}