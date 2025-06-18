import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Play, Shuffle, Download } from 'lucide-react-native';
import { useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Song } from '@/types/music';
import { sampleSongs } from '@/data/sampleMusic';

export default function FavoritesScreen() {
  const { playSong, setPlaylist } = useMusic();
  const { theme } = useTheme();
  const [favorites] = useState<Song[]>(sampleSongs.slice(0, 4)); // Mock favorites

  const playAllFavorites = () => {
    if (favorites.length > 0) {
      setPlaylist(favorites);
      playSong(favorites[0], favorites);
    }
  };

  const shuffleFavorites = () => {
    if (favorites.length > 0) {
      const shuffled = [...favorites].sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
      playSong(shuffled[0], shuffled);
    }
  };

  const renderFavoriteItem = ({ item, index }: { item: Song; index: number }) => (
    <TouchableOpacity
      style={[styles.favoriteItem, { borderBottomColor: theme.colors.border }]}
      onPress={() => playSong(item, favorites)}
    >
      <View style={styles.itemLeft}>
        <Text style={[styles.itemNumber, { color: theme.colors.textSecondary }]}>
          {index + 1}
        </Text>
        <Image source={{ uri: item.coverUrl }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={[styles.itemTitle, { color: theme.colors.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.itemArtist, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={20} color={theme.colors.error} fill={theme.colors.error} />
        </TouchableOpacity>
        <Text style={[styles.itemDuration, { color: theme.colors.textSecondary }]}>
          {item.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={[theme.colors.error, theme.colors.primary]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Heart size={40} color="#ffffff" fill="#ffffff" />
          </View>
          <Text style={styles.headerTitle}>Liked Songs</Text>
          <Text style={styles.headerSubtitle}>
            {favorites.length} song{favorites.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </LinearGradient>

      <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: theme.colors.primary, ...theme.shadows.medium }]}
            onPress={playAllFavorites}
          >
            <Play size={24} color="#ffffff" fill="#ffffff" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.colors.surface }]}
            onPress={shuffleFavorites}
          >
            <Shuffle size={20} color={theme.colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.colors.surface }]}
          >
            <Download size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={64} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              No Liked Songs
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
              Songs you like will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 24,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 16,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 120,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    width: 24,
    textAlign: 'center',
    marginRight: 16,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  itemArtist: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heartButton: {
    padding: 4,
  },
  itemDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    minWidth: 40,
    textAlign: 'right',
  },
});