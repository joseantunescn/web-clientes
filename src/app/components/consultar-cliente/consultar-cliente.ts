import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consultar-cliente.html',
  styleUrl: './consultar-cliente.css',
})
export class ConsultarCliente {

    http = inject(HttpClient);




  // create a form
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  consultar (){
    const nome = this.formulario.value.nome!

    this.http.get('http://localhost:8081/api/cliente/consultar?nome=' + nome)
      .subscribe((data) => {
        console.log(data);
      })


  }

}
