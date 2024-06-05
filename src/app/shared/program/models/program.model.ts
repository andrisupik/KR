import { Show } from '../../show/models';

export interface Program {
    id: number,
    day: number,
    shows: Show[]
}
