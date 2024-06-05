import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedLoaderModule } from '../../shared/loader';
import { EditChannelDialogComponent, EditProgramDialogComponent } from './components';
import { ChannelDetailsPageComponent } from './channel-details-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../../shared/auth';

@NgModule({
    declarations: [
        ChannelDetailsPageComponent,
        EditProgramDialogComponent,
        EditChannelDialogComponent
    ],
    imports: [
        CommonModule,
        MatTreeModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        SharedLoaderModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: ChannelDetailsPageComponent },
        ]),
        AuthModule,
    ],
})
export class ChannelDetailsPageModule { }
