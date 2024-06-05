import { BehaviorSubject, finalize, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChannelService } from '../../../../shared/channel/services';
import { Channel } from '../../../../shared/channel/models';

@UntilDestroy()
@Component({
    selector: 'app-edit-channel-dialog',
    templateUrl: './edit-channel-dialog.component.html',
    styleUrls: ['./edit-channel-dialog.component.scss'],
    providers: [ChannelService],
})
export class EditChannelDialogComponent {
    control = new FormControl(this.data.channel.name, [Validators.required, Validators.minLength(3)])
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: { channel: Channel },
        private channelService: ChannelService,
        private dialogRef: MatDialogRef<EditChannelDialogComponent>,
        private router: Router,
    ) { }

    closeDialog(): void {
        this.dialogRef.close();
    }

    submit(): void {
        this.loading$.next(true);
        this.channelService.updateName(this.data.channel.id, this.control.value!)
            .pipe(
                tap((channel: Channel) => {
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigate(['channels', channel.id]);
                    this.closeDialog();
                }),
                finalize(() => this.loading$.next(false)),
                untilDestroyed(this),
            )
            .subscribe();
    }
}
