import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { Channel } from '../../shared/channel/models';
import { ChannelService } from '../../shared/channel/services';
import { Show } from '../../shared/show/models';
import { Program } from '../../shared/program/models';
import { EditChannelDialogComponent, EditProgramDialogComponent } from './components';
import { ChannelTreeNode } from './models';
import { AuthService } from '../../shared/auth/services';
import { User, UserRole } from '../../shared/auth/models';

@UntilDestroy()
@Component({
    selector: 'app-channel-details-page',
    templateUrl: './channel-details-page.component.html',
    styleUrls: ['./channel-details-page.component.scss'],
    providers: [ChannelService, DatePipe],
})
export class ChannelDetailsPageComponent implements OnInit {
    treeControl = new NestedTreeControl<ChannelTreeNode>((node) => node.children);
    dataSource = new MatTreeNestedDataSource<ChannelTreeNode>();
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    user$: Observable<User | null> = this.authService.user$.asObservable();
    channel!: Channel;
    UserRole = UserRole;

    private channelId = +(this.activatedRoute.snapshot.paramMap.get('channelId') || '');

    constructor(
        private dateFormatter: DatePipe,
        private channelService: ChannelService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private dialog: MatDialog,
        private router: Router,
    ) { }

    hasChild(_: never, node: ChannelTreeNode): boolean {
        return !!node.children && node.children.length > 0;
    }

    ngOnInit(): void {
        this.loading$.next(true);
        this.channelService.findById(this.channelId)
            .pipe(
                tap((channel: Channel) => {
                    this.channel = channel;
                    this.dataSource.data = this.getRows(this.channel);
                }),
                finalize(() => this.loading$.next(false)),
                untilDestroyed(this),
            )
            .subscribe();
    }

    private getRows(channel: Channel): ChannelTreeNode[] {
        if (channel.programs.every((program: Program) => program.shows.length > 0)) {
            return channel.programs.map((program: Program) => ({
                id: program.id,
                name: new Date(2023, 4, program.day),
                children: program.shows.map((show: Show) => ({
                    id: show.id,
                    name: show.name,
                    startTime: show.startTime,
                    endTime: show.endTime,
                })),
            }));
        }

        return [];
    }

    editChannel(): void {
        this.dialog.open(EditChannelDialogComponent, { data: { channel: this.channel } });
    }

    deleteChannel(): void {
        this.loading$.next(true);
        this.channelService.deleteById(this.channel.id)
            .pipe(
                tap(() => this.router.navigate(['channels'])),
                finalize(() => this.loading$.next(false)),
                untilDestroyed(this),
            )
            .subscribe();
    }

    editProgram(): void {
        this.dialog.open(EditProgramDialogComponent, { data: { channel: this.channel } });
    }
}
