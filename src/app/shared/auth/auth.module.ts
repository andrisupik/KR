import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { JwtAuthGuard } from './guards';
import { SharedLoaderModule } from '../loader';
import { SignInDialogComponent, SignUpDialogComponent } from './components';
import { ValidateRolesPipe } from './pipes';

@NgModule({
    declarations: [
        SignInDialogComponent,
        SignUpDialogComponent,
        ValidateRolesPipe,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedLoaderModule,
        MatButtonModule,
    ],
    providers: [
        JwtAuthGuard,
    ],
    exports: [
        SignInDialogComponent,
        SignUpDialogComponent,
        ValidateRolesPipe,
    ],
})
export class AuthModule {}
