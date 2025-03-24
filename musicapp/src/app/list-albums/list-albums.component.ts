import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicServiceService } from '../service/music-service.service';
import { Album } from '../models/album.model';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-list-albums',
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 Add RouterModule here
  templateUrl: './list-albums.component.html',
  styleUrls: ['./list-albums.component.css']
})
export class ListAlbumsComponent implements OnInit {
  albums: Album[] = [];

  constructor(private service: MusicServiceService) {}

  ngOnInit(): void {
    this.service.getAlbums((data: Album[]) => {
      this.albums = data;
    });
  }
}
