import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { PasswordValidation } from '../password-validation';
import { User } from '../User';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  isFormValid = false;
  submitted = false;
  userDataArr: User[];
  user: User;
  constructor(private router: Router, private routes: ActivatedRoute) {
    this.user = new User();
    this.userDataArr = JSON.parse(localStorage.getItem('key') || '[]');

  }
  updateId
  showUpdateBtn = false
  ngOnInit(): void {
    this.updateId = this.routes.snapshot.paramMap.get('id');
    //  console.log(this.updateId);
    if (this.updateId !== 'id') {
      this.updateUser(this.updateId)

      this.showUpdateBtn = true
    }

  }


  registerForm = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z].*$')]),
    email: new FormControl(null, [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9_.+-]$'), Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.pattern('[(a-z)(A-Z)(0-9)(!@#)]*'), Validators.required]),
    password: new FormControl(null,
      Validators.compose([
        Validators.required, Validators.minLength(8),
        PasswordValidation.patternValidator(new RegExp("(?=.*[0-9])"), { requiresDigit: true }),
        PasswordValidation.patternValidator(new RegExp("(?=.*[A-Z])"), { requiresUppercase: true }),
        PasswordValidation.patternValidator(new RegExp("(?=.*[a-z])"), { requiresLowercase: true }),
        PasswordValidation.patternValidator(new RegExp("(?=.*[$@^!&*?#])"), { requireSpecialchar: true })
      ])
    ),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8),]),
  },
    {
      validators: PasswordValidation.matchPasswordValidator
    }
    );

  // isRequired = this.name.hasValidator(Validators.required)

  get f() {
    return this.registerForm.controls;
  }

  get passwordValid() {
    return this.registerForm.controls["password"].errors === null;
  }

  get requiredValid() {
    return !this.registerForm.controls["password"].hasError("required");
  }

  get minLengthValid() {
    return !this.registerForm.controls["password"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.registerForm.controls["password"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.registerForm.controls["password"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.registerForm.controls["password"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.registerForm.controls["password"].hasError("requiresSpecialChars");
  }
  public get name(): AbstractControl {
    return this.registerForm.controls['name']
  }

  public get email() {
    return this.registerForm.controls['email']
  }


  onSubmit() {
    this.submitted = true
    if (this.registerForm.valid) {
      this.isFormValid = true;

      this.user.name = this.registerForm.value.name
      this.user.email = this.registerForm.value.email
      this.user.username = this.registerForm.value.username
      this.user.password = this.registerForm.value.password

      let userId = 0;

      if (this.userDataArr == null) {
        this.user.id = userId
        this.userDataArr.push(this.user);
        localStorage.setItem('key', JSON.stringify(this.userDataArr));
        alert('Form Submitted succesfully!!!\n Check the values in browser console.');
        console.log(this.registerForm.value);

      }
      else if (this.updateId !== 'id') {
        console.log(this.updateId + " updated id ")

        let oldRecord = JSON.parse(localStorage.getItem('key') || '[]');
        // let index:number = oldRecord.find((us:User) => {
        //   if(us.id == this.updateId)
        //   return oldRecord.indexOf(us);
        // })
        let id = parseInt(this.updateId)
        this.user.id = id;
        let size = oldRecord.length
        for (let i = 0; i < size; i++) {
          if (oldRecord[i].id == this.updateId) {
            // console.log("index of user "+ i)
            oldRecord.splice(i, 1, this.user)
            break;
          }
        }
        // oldRecord.splice(index.valueOf(), 1, this.user);
        localStorage.setItem('key', JSON.stringify(oldRecord));
        alert('Form Updated succesfully!!!\n Check the values in browser console.');
        console.log("Updated User \n" + JSON.stringify(this.user));
        this.router.navigate(['/home']);
      }
      else {

        
        let oldRecord = JSON.parse(localStorage.getItem('key') || '[]');
        
         this.user.id =  this.checkId(oldRecord)

        oldRecord.push(this.user);
        localStorage.setItem('key', JSON.stringify(oldRecord));
        alert('Form Submitted succesfully!!!\n Check the values in browser console.');
        this.router.navigate(['/home']);
        console.log(this.registerForm.value);
      }

    }
  }

  value: User = new User();
  updateUser(updateId) {
    this.value = this.userDataArr.find(m => m.id == updateId)
    this.registerForm.controls['name'].setValue(this.value.name);
    this.registerForm.controls['email'].setValue(this.value.email);
    this.registerForm.controls['username'].setValue(this.value.username);
    this.registerForm.controls['password'].setValue(this.value.password);}


 checkId(oldRecord: User[]) {
let max = 0;
  oldRecord.forEach(us => {
    if(us.id > max)
    max = us.id;
  })
  return max+1;
  
}

}

