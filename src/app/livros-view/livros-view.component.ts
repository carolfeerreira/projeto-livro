import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/model/livro';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livros-view',
  templateUrl: './livros-view.component.html',
  styleUrls: ['./livros-view.component.css']
})
export class LivrosViewComponent implements OnInit {
  livro : Livro = new Livro();
  constructor(private firestore: AngularFirestore,private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit(): void {

    this.route.paramMap.subscribe(resp=>{

      let id = resp.get('id');

      this.firestore.collection('livro').doc(id).snapshotChanges().subscribe(data=>{
        this.livro = data.payload.data() as Livro;
        this.livro.id = data.payload.id;
        
      })
    })

    
  }

}
