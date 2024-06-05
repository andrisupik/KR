import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthModule } from '../auth';

@NgModule({
    declarations: [
        NavigationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDialogModule,
        AuthModule,
    ],
    exports: [
        NavigationComponent,
    ],
})
export class NavigationModule { }
