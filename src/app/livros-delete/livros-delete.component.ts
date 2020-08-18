import { Component, OnInit } from '@angular/core';
import { Livro } from '../model/livro';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-livros-delete',
  templateUrl: './livros-delete.component.html',
  styleUrls: ['./livros-delete.component.css']
})
export class LivrosDeleteComponent implements OnInit {

  livro : Livro = new Livro();

  constructor(private firestore : AngularFirestore, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(resp=>{

      let id = resp.get('id');

      this.firestore.collection('livro').doc(id).snapshotChanges().subscribe(data=>{
        this.livro = data.payload.data() as Livro;
        this.livro.id = data.payload.id;
        console.log(this.livro);
      })
    })

  }

  excluir(){
    this.firestore.collection('livro').doc(this.livro.id).delete().then(()=>{
      this.router.navigate(['/livros'])
    }).catch(()=>{

    })
  }

}
