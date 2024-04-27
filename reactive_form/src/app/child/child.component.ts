import { Component, Input, Output,EventEmitter } from '@angular/core';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  @Input('formData') dataObj


  constructor( private routes:ActivatedRoute){
 let nameVal = routes.snapshot.paramMap.get('name');

 let arr = JSON.parse(localStorage.getItem('key') || '[]')
 
 for(let i of arr)
 {
  if(i.name === nameVal)
  {
    this.dataObj = i;
    break;
  }
 }
  }
 @Input('displayArray') dataArr:any=[];
 @Output() sendData = new EventEmitter<any>();
 sendDataToShow(id:number){
this.sendData.emit(id);
 }

 previous(){
//   this.obj.registerForm.setValue({name:'',email:'',password:'',username:'',confirmPassword:''})
// this.obj.isFormValid = false
 }
}
