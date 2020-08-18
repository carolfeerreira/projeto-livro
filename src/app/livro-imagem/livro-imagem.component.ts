import { Component, OnInit } from '@angular/core';
import { Livro } from '../model/livro';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-livro-imagem',
  templateUrl: './livro-imagem.component.html',
  styleUrls: ['./livro-imagem.component.css']
})
export class LivroImagemComponent implements OnInit {

  livro : Livro = new Livro();
  urlImage : string = "";
  message : string = null;

  constructor(private firestore : AngularFirestore,private route: ActivatedRoute, private stg : AngularFireStorage) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(resp=>{
      
      let id = resp.get('id');

      this.firestore.collection('livro').doc(id).snapshotChanges().subscribe(data=>{
        this.livro = data.payload.data() as Livro;
        this.livro.id = data.payload.id;
        this.download();
      })
    })
  }

  upload(event){
    let img = event.srcElement.files[0];
    this.stg.storage.ref().child('livro/${this.livro.id}.jpg').put(img).then(data=>{
      this.download();
      this.message = "Atualizado com sucesso";
    })
  }

  download(){
    this.stg.storage.ref().child('livro/${this.livro.id}.jpg').getDownloadURL().then(data=>{
    this.urlImage = data;
    })
}

}
