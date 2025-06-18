import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Play, Pause, Heart } from 'lucide-react-native';
import { Song } from '@/types/music';
import { useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

interface MusicCardProps {
  song: Song;
  onPlay?: () => void;
}

export default function MusicCard({ song, onPlay }: MusicCardProps) {
  const { playerState, playSong, playPause } = useMusic();
  const { theme } = useTheme();
  const isCurrentSong = playerState.currentSong?.id === song.id;
  const isPlaying = isCurrentSong && playerState.isPlaying;

  const handlePlayPress = () => {
    if (isCurrentSong) {
      playPause();
    } else {
      playSong(song);
    }
    onPlay?.();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface, ...theme.shadows.small }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: song.coverUrl }} style={styles.coverImage} />
        <TouchableOpacity 
          style={[styles.playButton, { backgroundColor: theme.colors.primary }]} 
          onPress={handlePlayPress}
        >
          {isPlaying ? (
            <Pause size={18} color="#ffffff" fill="#ffffff" />
          ) : (
            <Play size={18} color="#ffffff" fill="#ffffff" />
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={[styles.artist, { color: theme.colors.textSecondary }]} numberOfLines={1}>
          {song.artist}
        </Text>
        <View style={styles.metadata}>
          <Text style={[styles.duration, { color: theme.colors.textSecondary }]}>
            {song.duration}
          </Text>
          <TouchableOpacity style={styles.heartButton}>
            <Heart size={14} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <View style={[styles.genreTag, { backgroundColor: theme.colors.primary + '20' }]}>
          <Text style={[styles.genre, { color: theme.colors.primary }]}>
            {song.genre}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  coverImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  playButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  info: {
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  artist: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  duration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  heartButton: {
    padding: 4,
  },
  genreTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  genre: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
});