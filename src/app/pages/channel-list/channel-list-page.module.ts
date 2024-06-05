import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedLoaderModule } from '../../shared/loader';
import { CreateChannelDialogComponent, ChannelListItemComponent } from './components';
import { ChannelListPageComponent } from './channel-list-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../../shared/auth';

@NgModule({
    declarations: [
        ChannelListPageComponent,
        ChannelListItemComponent,
        CreateChannelDialogComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        SharedLoaderModule,
        ReactiveFormsModule,
        AuthModule,
        RouterModule.forChild([
            { path: '', component: ChannelListPageComponent },
        ]),
    ],
})
export class ChannelListPageModule { }
