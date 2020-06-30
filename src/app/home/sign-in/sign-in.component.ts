import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  public loginForm: FormGroup;
  url: string;

  @ViewChild('userName') userInput: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private platform: PlatformDetectorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute
      .queryParams
      .subscribe(params => this.url = params['urlAfterLogin']);

    this.loginForm = this.formBuilder.group({
      user: [
        '', Validators.required
      ],
      password: [
        '', Validators.required
      ]
    });
  }

  login(): void {
    const user = this.loginForm.get('user').value;
    const password = this.loginForm.get('password').value;

    this.auth.authenticate(user, password).subscribe(
      () => {
        if (this.url) {
          this.router.navigateByUrl(this.url);
        } else {
          this.router.navigate(['user', user]);
        }
      },
      () => {
        this.loginForm.reset();
        this.platform.isPlatformBrowser() && this.userInput.nativeElement.focus();
        alert('Invalid user or password');
      }
    );
  }

}
