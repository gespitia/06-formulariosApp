import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup=this.fb.group({
    nombre:     ['', [Validators.required, Validators.pattern(this.validatorServices.nombreApellidoPattern)]],
    email:      ['', [Validators.required, Validators.pattern(this.validatorServices.emailPattern)], [this.emailValidator]],
    username:   ['', [Validators.required, this.validatorServices.noPuedeSerStrider]],
    password:   ['', [Validators.required, Validators.minLength(6)]],
    password2:  ['', [Validators.required]]
  }, {
    validators:[this.validatorServices.camposIguales('password', 'password2')]
  });

  get emailErrorMsg():string{

    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'El email es obligatorio';
    } else if(errors?.pattern){
      return 'El valor ingresado no tiene formato de correo electronico';
    } else if(errors?.emailTomado){
      return 'El email ya fue tomado';
    }

    return '';
  }

  constructor(private fb:FormBuilder,
              private validatorServices:ValidatorService,
              private emailValidator:EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre:'Fernando Herrera',
      email:'test1@test.com',
      username:'fernando_her85',
      password:'123456',
      password2:'123456'
    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
