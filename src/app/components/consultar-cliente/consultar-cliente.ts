import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './consultar-cliente.html',
  styleUrl: './consultar-cliente.css',
})
export class ConsultarCliente {

    //atributes
    clientes = signal<any[]>([]);

    http = inject(HttpClient);

    mensagemSucesso = signal<string>('');
    mensagemErro = signal<string>('');




  // create a form
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  consultar (){
    const nome = this.formulario.value.nome!

    this.http.get('http://localhost:8081/api/cliente/consultar?nome=' + nome)
      .subscribe((data) => {
        this.clientes.set(data as any[]); 
      })




  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.http.delete('http://localhost:8081/api/cliente/excluir/' + id, { responseType: 'text' })
        .subscribe({
          next: (resposta) => {
            this.mensagemSucesso.set(resposta);
            // Remove the client from the list
            this.consultar(); // Refresh the client list after deletion
          },
          error: (erro) => {
            this.mensagemErro.set(erro);
          }
        });

    }
  }
}