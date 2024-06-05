import { Program } from '../../program/models';

export interface Channel {
    id: number;
    name: string;
    programs: Program[];
    shows?: number;
}
