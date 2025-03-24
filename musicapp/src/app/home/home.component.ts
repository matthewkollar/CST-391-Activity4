import { Component, OnInit } from '@angular/core';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements OnInit {
  artists: Artist[] = [];
  albums: Album[] = [];

  constructor(private service: MusicServiceService) {}

  ngOnInit(): void {
    this.service.getArtists((data: Artist[]) => {
      this.artists = data;
    });

    this.service.getAlbums((data: Album[]) => {
      this.albums = data;
    });
  }

  get artistCount(): number {
    return this.artists.length;
  }

  get albumCount(): number {
    return this.albums.length;
  }

  get featuredAlbums(): Album[] {
    return this.albums.slice(0, 3);
  }
}
