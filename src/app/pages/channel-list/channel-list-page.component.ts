import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Channel } from '../../shared/channel/models';
import { ChannelService } from '../../shared/channel/services';
import { Show } from '../../shared/show/models';
import { CreateChannelDialogComponent } from './components';
import { Program } from '../../shared/program/models';
import { AuthService } from '../../shared/auth/services';
import { User, UserRole } from 'src/app/shared/auth/models';

@UntilDestroy()
@Component({
    selector: 'app-channel-list-page',
    templateUrl: './channel-list-page.component.html',
    styleUrls: ['./channel-list-page.component.scss'],
    providers: [ChannelService],
})
export class ChannelListPageComponent implements OnInit {
    user$: Observable<User | null> = this.authService.user$.asObservable();
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    channels!: Channel[];
    UserRole = UserRole;

    constructor(
        private channelService: ChannelService,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.loading$.next(true);
        this.channelService.findAll()
            .pipe(
                tap((channels: Channel[]) => this.channels = channels.map((channel: Channel) => ({
                        ...channel,
                        shows: channel.programs.reduce(
                            (acc: Set<number>, program: Program) => {
                                program.shows.forEach((show: Show) => acc.add(show.id));
                                return acc;
                            },
                            new Set()).size,
                    })),
                ),
                finalize(() => this.loading$.next(false)),
                untilDestroyed(this),
            )
            .subscribe();
    }

    openChannelDetails(id: number): void {
        this.router.navigate(['channels', id]);
    }

    createChannel(): void {
        this.dialog.open(CreateChannelDialogComponent);
    }

    sort(order: boolean) {
        this.channels.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return order ? comparison : -comparison;
        });
    }
}


