import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignUpService } from './sign-up.service';
import { LowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { userPasswordValidator } from './user-password.validator';

@Component({
  templateUrl: './sign-up.component.html',
  providers: [
    UserNotTakenValidatorService
  ]
})
export class SignUpComponent implements OnInit {
  signupFrom: FormGroup

  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder, private userNotTakenValidator: UserNotTakenValidatorService, private signupService: SignUpService, private router: Router, private platform: PlatformDetectorService) { }

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
    }, {
      validators: userPasswordValidator
    });
  }

  singup() {
    if (this.signupFrom.valid && !this.signupFrom.pending) {
      const newUser = this.signupFrom.getRawValue() as NewUser;
      this.signupService.signup(newUser).subscribe(
        () => {
          this.router.navigate(['']);
        }
      )
    }
  }
}
