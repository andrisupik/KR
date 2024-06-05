export interface ChannelTreeNode {
    id: number;
    name: string | Date;
    startTime?: string;
    endTime?: string;
    children?: ChannelTreeNode[];
}
