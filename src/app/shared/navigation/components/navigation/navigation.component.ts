import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialogComponent, SignUpDialogComponent } from '../../../auth/components';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { AuthService } from '../../../auth/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    user$: Observable<User | null> = this.authService.user$.asObservable();

    constructor(
        private dialog: MatDialog,
        private authService: AuthService,
        private router: Router,
    ) {}

    signIn(): void {
        this.dialog.open(SignInDialogComponent);
    }

    signUp(): void {
        this.dialog.open(SignUpDialogComponent);
    }

    signOut() {
        localStorage.removeItem('jwtToken');
        this.authService.user$.next(null);
        this.router.navigate(['home']);
    }
}
