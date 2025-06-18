export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  coverUrl: string;
}

export type PlaybackState = 'playing' | 'paused' | 'stopped';

export interface MusicPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  playbackState: PlaybackState;
  currentTime: number;
  duration: number;
  playlist: Song[];
  currentIndex: number;
}