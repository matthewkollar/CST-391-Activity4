import { Component, OnInit } from '@angular/core';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artist.model';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-list-artists',
  templateUrl: './list-artists.component.html',
  styleUrls: ['./list-artists.component.css']
})
export class ListArtistsComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private service: MusicServiceService) {}

  ngOnInit(): void {
    this.service.getArtists((data: Artist[]) => {
      this.artists = data;
    });
  }
}
