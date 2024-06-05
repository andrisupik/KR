import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { AuthService } from '../../services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserCredentials } from '../../models';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss']
})
export class SignInDialogComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
  })

  constructor(
      private dialogRef: MatDialogRef<SignInDialogComponent>,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
  ) { }

  submit(): void {
    this.loading$.next(true);
    this.authService.signIn(this.form.get('name')?.value, this.form.get('password')?.value)
        .pipe(
            tap((res: UserCredentials) => {
              localStorage.setItem('jwtToken', res.token);
              this.router.navigate(['channels']);
              this.closeDialog();
            }),
            finalize(() => this.loading$.next(false)),
            untilDestroyed(this),
        )
        .subscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
