import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
  private host = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) {}

  public getArtists(callback: (artists: Artist[]) => void): void {
    this.http.get<Artist[]>(this.host + "/artists")
      .subscribe((artists: Artist[]) => {
        callback(artists);
      });
  }

  public getAlbums(callback: (albums: Album[]) => void): void {
    this.http.get<Album[]>(this.host + "/albums")
      .subscribe((albums: Album[]) => {
        callback(albums);
      });
  }

  public getAlbumsOfArtist(artistName: string, callback: (albums: Album[]) => void): void {
    let request = this.host + `/albums/${artistName}`;
    this.http.get<Album[]>(request)
      .subscribe((albums: Album[]) => {
        callback(albums);
      });
  }

  public createAlbum(album: Album, callback: () => void): void {
    this.http.post(this.host + "/albums", album)
      .subscribe(() => callback());
  }

  public updateAlbum(album: Album, callback: () => void): void {
    this.http.put(this.host + "/albums", album)
      .subscribe(() => callback());
  }

  public deleteAlbum(id: number, callback: () => void): void {
    this.http.delete(this.host + "/albums/" + id)
      .subscribe(() => callback());
  }

  public getAlbumById(id: number, callback: (album: Album) => void): void {
    this.http.get<Album>(this.host + "/albums/" + id)
      .subscribe((album: Album) => {
        callback(album);
      });
  }

  public getTracksByAlbum(albumId: number, callback: (tracks: any[]) => void): void {
    this.http.get<any[]>(this.host + "/tracks/" + albumId)
      .subscribe((tracks: any[]) => {
        callback(tracks);
      });
  }
}
