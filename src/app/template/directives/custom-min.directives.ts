import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector:'[customMin][ngModel]',
    providers:[{
        provide:NG_VALIDATORS,
        useExisting: CustonMinDirectve,
        multi:true
    }]
})
export class CustonMinDirectve implements Validator{

    @Input() minimo!:number;

    constructor(){ }

    validate(control:FormControl){
        const inputValide = control.value;
        return (inputValide<this.minimo)?{'custonMin':true}:null;
    }

}