import { Component, Input } from '@angular/core';
import { Channel } from '../../../../shared/channel/models';

@Component({
  selector: 'app-channel-list-item',
  templateUrl: './channel-list-item.component.html',
  styleUrls: ['./channel-list-item.component.scss']
})
export class ChannelListItemComponent {
  @Input() channel!: Channel;
}
