import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    nome : new FormControl(''),
    cpf : new FormControl('')
  });

  cadastrar() {
    
    //capturando os dados do formulário
    const request = {
      nome: this.formulario.value.nome!,
      cpf: this.formulario.value.cpf!
    }

    //enviando os dados para o backend
    this.http.post('http://localhost:8080/api/cliente/criar', request, { responseType: 'text' })
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
