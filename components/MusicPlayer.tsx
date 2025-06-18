import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, SkipBack, SkipForward, Heart, MoveHorizontal as MoreHorizontal, ChevronUp, Shuffle, Repeat } from 'lucide-react-native';
import { useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function MusicPlayer() {
  const { playerState, playPause, nextSong, previousSong } = useMusic();
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  if (!playerState.currentSong) {
    return null;
  }

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const MiniPlayer = () => (
    <TouchableOpacity
      style={[styles.miniPlayer, { backgroundColor: theme.colors.surface, ...theme.shadows.large }]}
      onPress={() => setIsExpanded(true)}
    >
      <View style={styles.miniPlayerContent}>
        <Image 
          source={{ uri: playerState.currentSong.coverUrl }} 
          style={styles.miniCoverImage} 
        />
        <View style={styles.miniTextInfo}>
          <Text style={[styles.miniTitle, { color: theme.colors.text }]} numberOfLines={1}>
            {playerState.currentSong.title}
          </Text>
          <Text style={[styles.miniArtist, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {playerState.currentSong.artist}
          </Text>
        </View>
        <TouchableOpacity onPress={playPause} style={styles.miniPlayButton}>
          {playerState.isPlaying ? (
            <Pause size={24} color={theme.colors.text} fill={theme.colors.text} />
          ) : (
            <Play size={24} color={theme.colors.text} fill={theme.colors.text} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const FullPlayer = () => (
    <Modal
      visible={isExpanded}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <LinearGradient
        colors={theme.colors.gradient}
        style={styles.fullPlayerContainer}
      >
        <View style={styles.fullPlayerHeader}>
          <TouchableOpacity 
            onPress={() => setIsExpanded(false)}
            style={styles.collapseButton}
          >
            <ChevronUp size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.fullPlayerTitle}>Now Playing</Text>
          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.fullPlayerContent}>
          <View style={styles.albumArtContainer}>
            <Image 
              source={{ uri: playerState.currentSong.coverUrl }} 
              style={styles.fullCoverImage} 
            />
          </View>

          <View style={styles.songInfo}>
            <Text style={styles.fullTitle} numberOfLines={1}>
              {playerState.currentSong.title}
            </Text>
            <Text style={styles.fullArtist} numberOfLines={1}>
              {playerState.currentSong.artist}
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { backgroundColor: '#ffffff' }]} />
            </View>
            <View style={styles.timeLabels}>
              <Text style={styles.timeText}>1:23</Text>
              <Text style={styles.timeText}>{playerState.currentSong.duration}</Text>
            </View>
          </View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              onPress={() => setIsShuffled(!isShuffled)}
              style={[styles.secondaryControl, { opacity: isShuffled ? 1 : 0.6 }]}
            >
              <Shuffle size={20} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={previousSong} style={styles.controlButton}>
              <SkipBack size={28} color="#ffffff" fill="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={playPause} style={styles.playButtonLarge}>
              {playerState.isPlaying ? (
                <Pause size={32} color="#ffffff" fill="#ffffff" />
              ) : (
                <Play size={32} color="#ffffff" fill="#ffffff" />
              )}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={nextSong} style={styles.controlButton}>
              <SkipForward size={28} color="#ffffff" fill="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={toggleRepeat}
              style={[styles.secondaryControl, { opacity: repeatMode > 0 ? 1 : 0.6 }]}
            >
              <Repeat size={20} color="#ffffff" />
              {repeatMode === 2 && (
                <View style={styles.repeatOneBadge}>
                  <Text style={styles.repeatOneText}>1</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.bottomControl}>
              <Heart size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );

  return (
    <>
      <MiniPlayer />
      <FullPlayer />
    </>
  );
}

const styles = StyleSheet.create({
  miniPlayer: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  miniPlayerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  miniCoverImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  miniTextInfo: {
    flex: 1,
  },
  miniTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  miniArtist: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  miniPlayButton: {
    padding: 8,
  },
  fullPlayerContainer: {
    flex: 1,
  },
  fullPlayerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  collapseButton: {
    padding: 8,
  },
  fullPlayerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  moreButton: {
    padding: 8,
  },
  fullPlayerContent: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  albumArtContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  fullCoverImage: {
    width: width - 80,
    height: width - 80,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  songInfo: {
    alignItems: 'center',
    marginVertical: 40,
  },
  fullTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  fullArtist: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
    textAlign: 'center',
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    width: '30%',
    borderRadius: 2,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  secondaryControl: {
    padding: 12,
    position: 'relative',
  },
  controlButton: {
    padding: 12,
  },
  playButtonLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatOneBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatOneText: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#667eea',
  },
  bottomControls: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  bottomControl: {
    padding: 12,
  },
});