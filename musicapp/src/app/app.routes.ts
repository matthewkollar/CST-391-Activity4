import { Routes } from '@angular/router';
import { ListArtistsComponent } from './list-artists/list-artists.component';
import { ListAlbumsComponent } from './list-albums/list-albums.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { DisplayAlbumComponent } from './display-album/display-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { DeleteAlbumComponent } from './delete-album/delete-album.component';

export const routes: Routes = [
  { path: 'list-artists', component: ListArtistsComponent },
  { path: 'list-albums', component: ListAlbumsComponent },
  { path: 'create', component: CreateAlbumComponent },
  { path: 'display/:id', component: DisplayAlbumComponent },
  { path: 'edit/:artist/:id', component: EditAlbumComponent },
  { path: 'delete/:artist/:id', component: DeleteAlbumComponent },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  }
];
