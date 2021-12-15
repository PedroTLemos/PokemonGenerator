import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-pokemon-gen',
  templateUrl: './pokemon-gen.component.html',
  styleUrls: ['./pokemon-gen.component.scss']
})
export class PokemonGenComponent implements OnInit {

  model = null;
  vazio = true;
  valido = false;
  quantidade;
  modalAberto = false;


  constructor() { }

  async ngOnInit() {
    this.model = await tf.loadLayersModel('https://pedrotlemos.github.io/assets/models/model.json');
  }

  async generateBatch() {
    for (let i = 0; i < this.quantidade; i++) {
      await this.generate();
    }
  }

  async generate() {
    const output = tf.randomNormal([1, 100]);
    let outputimagem = this.model.predict(output);
    // tslint:disable-next-line:only-arrow-functions
    outputimagem = tf.reshape(outputimagem, [32, 32, 3]).arraySync();
    for (let i = 0; i < outputimagem.length; i++) {
      for (let j = 0; j < outputimagem[i].length; j++) {
        for (let k = 0; k < outputimagem[i][j].length; k++) {
          const valorInicial = outputimagem[i][j][k];
          outputimagem[i][j][k] = (0.5 * valorInicial + 0.5);
        }
      }
    }
    outputimagem = tf.tensor(outputimagem);
    const app = document.getElementById('imagens');
    const can = document.createElement('canvas');
    await tf.browser.toPixels(outputimagem, can);
    can.id = 'picture';
    can.style.height = '100px';
    can.style.margin = '0.3rem';
    can.style.border = '1px solid rgba(0,0,0,0.8)';
    // tslint:disable-next-line:only-arrow-functions
    app?.appendChild(can);
  }

  mostrarConteudo() {
    this.vazio = false;
    console.log(this.vazio);
  }

  checagemValidade(texto: string) {
    if (!isNaN(Number(texto.trim())) && texto !== ''){
      this.valido = true;
      this.quantidade = Number(texto.trim());
    }
    else {
      this.valido = false;
    }
  }
}
