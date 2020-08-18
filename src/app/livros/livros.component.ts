import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/model/livro';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  itens : any[] = [];

  constructor(private firestore: AngularFirestore) {
    
  }

  ngOnInit(): void {
    this.firestore.collection('livro').snapshotChanges().subscribe(data=>{
      data.map(a=>{
        let livro : Livro = a.payload.doc.data() as Livro;
        livro.id = a.payload.doc.id as string;
        this.itens.push(livro);
      })
      console.log(this.itens);
    })

 /*
    this.firestore.collection('livro').valueChanges().subscribe(data=>{
      this.itens = data;
      data.forEach(i=>{
        console.log(i);
      })
    });
    
  
    this.firestore.collection('livro').get().subscribe(data =>{
      console.log(data);
    })*/
   
  }

  

}