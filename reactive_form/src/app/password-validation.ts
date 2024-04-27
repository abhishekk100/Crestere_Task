import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidation {

    constructor() { }

    static patternValidator(regEx: RegExp, error: ValidationErrors): ValidatorFn {
        return (conntrol: AbstractControl): { [key: string]: any } => {
            if (!conntrol.value)   // if the control value is empty return no error.
                return null


            const valid = regEx.test(conntrol.value)
            return valid ? null : error;
        };
    }

    static matchPasswordValidator(control:AbstractControl){

       const password = control.get('password').value;
       const confirmPassword = control.get('confirmPassword').value;

       // if the confirmPassword value is null or empty, don't return an error.
       if(!confirmPassword?.length)
       return null;

        if (confirmPassword.length < 8) {
      control.get('confirmPassword').setErrors({ minLength: true });
    }
    else
    {
        if(password !== confirmPassword)
        {
            control.get('confirmPassword').setErrors( { mismatch: true });
        }
        else{
            return null;
        }
    }
    }
}

