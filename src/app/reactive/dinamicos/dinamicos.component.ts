import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  nuevoFavorito:FormControl = this.fb.control('', Validators.required);

  miFormulario:FormGroup=this.fb.group(
    {
      nombre:['', [Validators.required, Validators.minLength(3)]],
      favoritos:this.fb.array(
        [
          ['Metal Gear', Validators.required],
          ['Death Stranding', Validators.required]
        ],
        Validators.required
      )
    }
  )


  // miFormulario ...this.fb...{
  // nombre:....'', required, minlength 3
  // }
  constructor(private fb:FormBuilder) { }

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);

    // imprimir el valor del formulario, solo si es valido
  }

  borrar(i:number){
      this.favoritosArr.removeAt(i);
  }

  campoNoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(){
    if (this.nuevoFavorito.invalid) return;

    // this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito, Validators.required));
    this.nuevoFavorito.reset();
  }

}
