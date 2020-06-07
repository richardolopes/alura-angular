import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  signupFrom: FormGroup

  constructor(private formBuilder: FormBuilder, private userNotTakenValidator: UserNotTakenValidatorService, private signupService: SignUpService, private router: Router) { }

  ngOnInit(): void {
    this.signupFrom = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      fullName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]],
      userName: ['',
        [
          Validators.required,
          LowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidator.checkUserNameTaken()
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14)
      ]],
    })
  }

  singup() {
    const newUser = this.signupFrom.getRawValue() as NewUser;
    this.signupService.signup(newUser).subscribe(
      () => {
        this.router.navigate(['']);
      }
    )

  }
}
