import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!:NgForm;

  initForm = {
    producto: 'RTX 4080ti',
    precio:10,
    existencias:10
  }

  constructor() { }

  ngOnInit(): void {
  }

  // guardar(miFormulario:NgForm){
  guardar(){
    console.log('Posteo correcto');
    this.miFormulario.resetForm({
      producto:'algo',
      precio:0,
      existencias:0
    });
    
  }

  nombreValido():boolean{
    return this.miFormulario?.controls.producto?.invalid 
            && this.miFormulario?.controls.producto?.touched;
  }
  precioValido():boolean{
    return this.miFormulario?.controls.precio?.invalid 
            && this.miFormulario?.controls.precio?.touched;
  }

}
