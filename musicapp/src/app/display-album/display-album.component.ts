import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../models/album.model';
import { MusicServiceService } from '../service/music-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-display-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-album.component.html',
  styleUrls: ['./display-album.component.css']
})
export class DisplayAlbumComponent implements OnInit {
  album: Album | null = null;
  tracks: any[] = [];
  albumId: number = 0;

  constructor(private route: ActivatedRoute, private service: MusicServiceService) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getAlbumById(this.albumId, (album: Album) => {
      this.album = album;
      console.log('Loaded album:', this.album); //
    });

    this.service.getTracksByAlbum(this.albumId, (tracks: any[]) => {
      console.log('Tracks from service:', tracks);
      this.tracks = tracks;
    });
  }
}
