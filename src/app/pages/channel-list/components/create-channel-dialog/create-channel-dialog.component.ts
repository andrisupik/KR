import { BehaviorSubject, finalize, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChannelService } from '../../../../shared/channel/services';
import { Channel } from '../../../../shared/channel/models';

@UntilDestroy()
@Component({
    selector: 'app-create-channel-dialog',
    templateUrl: './create-channel-dialog.component.html',
    styleUrls: ['./create-channel-dialog.component.scss'],
    providers: [ChannelService],
})
export class CreateChannelDialogComponent {
    name = new FormControl('', [Validators.required, Validators.minLength(3)])
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private channelService: ChannelService,
        private dialogRef: MatDialogRef<CreateChannelDialogComponent>,
        private router: Router,
    ) {}

    closeDialog(): void {
        this.dialogRef.close();
    }

    submit(): void {
        this.loading$.next(true);
        this.channelService.save(this.name.value!)
            .pipe(
                tap((channel: Channel) => {
                    this.router.navigate(['channels', channel.id]);
                    this.closeDialog();
                }),
                finalize(() => this.loading$.next(false)),
                untilDestroyed(this),
            )
            .subscribe();
    }
}
