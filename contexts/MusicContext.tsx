import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Song, MusicPlayerState, PlaybackState } from '@/types/music';

interface MusicContextType {
  playerState: MusicPlayerState;
  playSong: (song: Song, playlist?: Song[]) => void;
  playPause: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setCurrentTime: (time: number) => void;
  setPlaylist: (songs: Song[]) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const initialPlayerState: MusicPlayerState = {
  currentSong: null,
  isPlaying: false,
  playbackState: 'stopped',
  currentTime: 0,
  duration: 0,
  playlist: [],
  currentIndex: -1,
};

export function MusicProvider({ children }: { children: ReactNode }) {
  const [playerState, setPlayerState] = useState<MusicPlayerState>(initialPlayerState);

  const playSong = (song: Song, playlist?: Song[]) => {
    const newPlaylist = playlist || [song];
    const index = newPlaylist.findIndex(s => s.id === song.id);
    
    setPlayerState(prev => ({
      ...prev,
      currentSong: song,
      isPlaying: true,
      playbackState: 'playing',
      playlist: newPlaylist,
      currentIndex: index,
      currentTime: 0,
    }));
  };

  const playPause = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
      playbackState: prev.isPlaying ? 'paused' : 'playing',
    }));
  };

  const nextSong = () => {
    if (playerState.playlist.length === 0) return;
    
    const nextIndex = (playerState.currentIndex + 1) % playerState.playlist.length;
    const nextSong = playerState.playlist[nextIndex];
    
    setPlayerState(prev => ({
      ...prev,
      currentSong: nextSong,
      currentIndex: nextIndex,
      currentTime: 0,
      isPlaying: true,
      playbackState: 'playing',
    }));
  };

  const previousSong = () => {
    if (playerState.playlist.length === 0) return;
    
    const prevIndex = playerState.currentIndex === 0 
      ? playerState.playlist.length - 1 
      : playerState.currentIndex - 1;
    const prevSong = playerState.playlist[prevIndex];
    
    setPlayerState(prev => ({
      ...prev,
      currentSong: prevSong,
      currentIndex: prevIndex,
      currentTime: 0,
      isPlaying: true,
      playbackState: 'playing',
    }));
  };

  const setCurrentTime = (time: number) => {
    setPlayerState(prev => ({
      ...prev,
      currentTime: time,
    }));
  };

  const setPlaylist = (songs: Song[]) => {
    setPlayerState(prev => ({
      ...prev,
      playlist: songs,
    }));
  };

  return (
    <MusicContext.Provider value={{
      playerState,
      playSong,
      playPause,
      nextSong,
      previousSong,
      setCurrentTime,
      setPlaylist,
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}