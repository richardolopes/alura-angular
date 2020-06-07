import { Injectable } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserNotTakenValidatorService {
    constructor(private singUpService: SignUpService) { }

    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control.valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(user => {
                    return this.singUpService.checkUserNameTaken(user);
                }))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(first());
        }
    }
}