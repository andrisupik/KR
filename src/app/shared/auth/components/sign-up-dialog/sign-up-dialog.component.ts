import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { AuthService } from '../../services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss']
})
export class SignUpDialogComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
  })

  constructor(
      private dialogRef: MatDialogRef<SignUpDialogComponent>,
      private formBuilder: FormBuilder,
      private authService: AuthService,
  ) { }

  submit(): void {
    this.loading$.next(true);
    this.authService.signUp(this.form.get('name')?.value, this.form.get('password')?.value)
        .pipe(
            tap(() => this.closeDialog()),
            finalize(() => this.loading$.next(false)),
            untilDestroyed(this),
        )
        .subscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
