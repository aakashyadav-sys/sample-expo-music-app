import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Play } from 'lucide-react-native';
import { useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songCount: number;
  songs: any[];
}

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { playSong, setPlaylist } = useMusic();
  const { theme } = useTheme();

  const handlePlayPress = () => {
    if (playlist.songs.length > 0) {
      setPlaylist(playlist.songs);
      playSong(playlist.songs[0], playlist.songs);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.colors.surface, ...theme.shadows.small }]}
      onPress={handlePlayPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: playlist.coverUrl }} style={styles.coverImage} />
        <View style={[styles.playButton, { backgroundColor: theme.colors.primary }]}>
          <Play size={20} color="#ffffff" fill="#ffffff" />
        </View>
      </View>
      
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
          {playlist.name}
        </Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
          {playlist.description}
        </Text>
        <Text style={[styles.songCount, { color: theme.colors.textSecondary }]}>
          {playlist.songCount} songs
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
    width: 40,
    height: 40,
    borderRadius: 20,
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
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  songCount: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 4,
  },
});