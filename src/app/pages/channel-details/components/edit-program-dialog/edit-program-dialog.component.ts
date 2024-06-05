import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { Channel } from '../../../../shared/channel/models';
import { ChannelService } from '../../../../shared/channel/services';
import { Program } from '../../../../shared/program/models';
import { Show } from '../../../../shared/show/models';

@UntilDestroy()
@Component({
    selector: 'app-edit-program-dialog',
    templateUrl: './edit-program-dialog.component.html',
    styleUrls: ['./edit-program-dialog.component.scss'],
    providers: [ChannelService],
})
export class EditProgramDialogComponent {
    form: FormGroup = this.getInitialProgram();
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { channel: Channel },
        private dialogRef: MatDialogRef<EditProgramDialogComponent>,
        private formBuilder: FormBuilder,
        private router: Router,
        private channelService: ChannelService,
    ) { }

    get programs(): FormArray {
        return this.form.get('programs') as FormArray;
    }

    addProgram(): void {
        const program = this.formBuilder.group({
            channelId: this.data.channel.id,
            day: this.programs.length + 1,
            shows: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
        });
        if (this.programs.length !== 7) {
            this.programs.push(program);
        }
    }

    removeProgram(index: number): void {
        this.programs.removeAt(index);
    }

    getShowArray(program: AbstractControl): FormArray {
        return program.get('shows') as FormArray;
    }

    addShow(program: AbstractControl): void {
        const show = this.formBuilder.group({
            name: ['', Validators.required],
            startTime: ['', Validators.required,],
            endTime: ['', Validators.required,],
        }, { validators: [this.timeValidator] });

        this.getShowArray(program).push(show);
    }

    timeValidator: ValidatorFn = (control: AbstractControl) => {
      const startTime = control.value['startTime'];
      const endTime = control.value['endTime'];

      return this.compareTimes(startTime, endTime) ? { error: true } : null;
    }

  compareTimes(time1: string, time2: string) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const date1 = new Date();
    date1.setHours(hours1, minutes1, 0, 0);

    const date2 = new Date();
    date2.setHours(hours2, minutes2, 0, 0);

    return date1 > date2
  }

    removeShow(program: AbstractControl, showIndex: number): void {
        this.getShowArray(program).removeAt(showIndex);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    submit(): void {
        this.loading$.next(true);
        this.channelService.updatePrograms(this.data.channel.id, this.form.value)
            .pipe(
                tap(() => {
                    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                    this.router.onSameUrlNavigation = 'reload';
                    this.router.navigate(['channels', this.data.channel.id]);
                    this.closeDialog();
                }),
                finalize(() => this.loading$.next(false)),
                untilDestroyed(this),
            )
            .subscribe();
    }

    private getInitialProgram(): FormGroup {
        return this.formBuilder.group({
            programs: this.formBuilder.array(
                this.data.channel.programs.map((program: Program) => {
                    return this.formBuilder.group({
                        channelId: this.data.channel.id,
                        day: program.day,
                        shows: this.formBuilder.array(
                            program.shows.map((show: Show) => {
                                return this.formBuilder.group({
                                    name: [show.name, Validators.required],
                                    startTime: [show.startTime, Validators.required],
                                    endTime: [show.endTime, Validators.required],
                                });
                            }), [Validators.required, Validators.minLength(1)]),
                    });
                }),
            ),
        });
    }
}
