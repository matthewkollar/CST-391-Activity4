import { Track } from './tracks.model';

export interface Album {
  id: number;
  album_title: string;
  artist_id: number;
  artist: string;
  year: number;
  image_name: string;
  description: string;
  tracks_ID: number;
}

