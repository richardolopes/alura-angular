import { ValidatorFn, FormGroup } from '@angular/forms';

export const userPasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
    const user = formGroup.get('userName').value;
    const password = formGroup.get('password').value;

    if (user.trim() + password.trim()) {
        return user != password
            ? null
            : { userPassword: true }
    } else {
        return null;
    }
}