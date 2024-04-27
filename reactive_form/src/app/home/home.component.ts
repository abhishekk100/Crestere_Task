import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDataArr: User[] = [];

  constructor(private router: Router, routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.userDataArr = JSON.parse(localStorage.getItem('key') || '[]');
  }
  delete(name:string) {
let size = this.userDataArr.length;
    for (let i = 0; i < size; i++) {
      
      if (this.userDataArr[i].name === name) {
        this.userDataArr.splice(i, 1)
        localStorage.setItem('key', JSON.stringify(this.userDataArr));
        alert('Form Deleted succesfully!!!');
        this.ngOnInit();
      }
    }
  }

  update(id: number) {
    // console.log('update'+" "+ id)
    this.router.navigate(['/reactive-form', id]);

  }
}
