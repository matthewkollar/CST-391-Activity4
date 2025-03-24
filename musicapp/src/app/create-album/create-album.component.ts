import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../models/album.model';
import { Artist } from '../models/artist.model';
import { MusicServiceService } from '../service/music-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {
  album: Album = {
    id: 0,
    album_title: '',
    artist_id: 0,
    artist: '',
    year: new Date().getFullYear(),
    image_name: '',
    description: '',
    tracks_ID: 0
  };

  tracksRaw: string = '';
  artists: Artist[] = [];
  wasSubmitted: boolean = false;

  constructor(private service: MusicServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getArtists((data: Artist[]) => {
      this.artists = data;
    });
  }

  onSubmit(): void {
    // Convert tracksRaw (multiline string) into number of tracks
    const lines = this.tracksRaw.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    this.album.tracks_ID = lines.length;

    this.service.createAlbum(this.album, () => {
      this.wasSubmitted = true;
      this.router.navigate(['/albums']);
    });
  }
}
