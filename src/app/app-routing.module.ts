import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtAuthGuard } from './shared/auth/guards';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'channels',
    loadChildren: () => import('./pages/channel-list/channel-list-page.module').then(m => m.ChannelListPageModule),
    canActivate: [JwtAuthGuard],
  },
  {
    path: 'channels/:channelId',
    loadChildren: () => import('./pages/channel-details/channel-details-page.module').then(m => m.ChannelDetailsPageModule),
    canActivate: [JwtAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
