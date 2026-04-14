import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-cliente.html',
  styleUrl: './cadastrar-cliente.css',
})
export class CadastrarCliente {

  http = inject(HttpClient)

  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    cpf : new FormControl('', [Validators.required]),
    logradouro : new FormControl('', [Validators.required]),
    numero : new FormControl('', [Validators.required]),
    complemento : new FormControl('', [Validators.required]),
    bairro : new FormControl('', [Validators.required]),
    cidade : new FormControl('', [Validators.required]),
    uf : new FormControl('', [Validators.required]),
    cep : new FormControl('', [Validators.required]),
  });

  cadastrar() {
    
    //capturando os dados do formulário
    const request = {
      nome: this.formulario.value.nome!,
      cpf: this.formulario.value.cpf!,
      enderecos: [
        {
          logradouro: this.formulario.value.logradouro!,
          numero: this.formulario.value.numero!,
          complelemento: this.formulario.value.complemento!,
          bairro: this.formulario.value.bairro!,
          cidade: this.formulario.value.cidade!,
          uf: this.formulario.value.uf!,
          cep: this.formulario.value.cep!


        }
      ]
    }

    //enviando os dados para o backend
    this.http.post('http://localhost:8081/api/cliente/criar', request, { responseType: 'text' })
      .subscribe({
        next : (resposta) => {
          alert(resposta);
          this.formulario.reset();
        },
        error: (e) => {
          alert('Erro: ' + e.error);
        }
      });
  }

}
