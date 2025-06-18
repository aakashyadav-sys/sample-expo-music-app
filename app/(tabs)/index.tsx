import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, TrendingUp, Clock, Star } from 'lucide-react-native';
import { sampleSongs, featuredPlaylists, recentlyPlayed } from '@/data/sampleMusic';
import MusicCard from '@/components/MusicCard';
import PlaylistCard from '@/components/PlaylistCard';
import { useAuth } from '@/contexts/AuthContext';
import { useMusic } from '@/contexts/MusicContext';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();
  const { setPlaylist, playSong } = useMusic();
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('trending');

  React.useEffect(() => {
    setPlaylist(sampleSongs);
  }, []);

  const sections = [
    { id: 'trending', title: 'Trending', icon: TrendingUp },
    { id: 'recent', title: 'Recent', icon: Clock },
    { id: 'featured', title: 'Featured', icon: Star },
  ];

  const renderMusicCard = ({ item, index }) => (
    <View style={[styles.cardContainer, { marginLeft: index === 0 ? theme.spacing.md : 0 }]}>
      <MusicCard song={item} />
    </View>
  );

  const renderPlaylistCard = ({ item, index }) => (
    <View style={[styles.playlistContainer, { marginLeft: index === 0 ? theme.spacing.md : 0 }]}>
      <PlaylistCard playlist={item} />
    </View>
  );

  const renderQuickPlayButton = () => (
    <TouchableOpacity
      style={[styles.quickPlayButton, { backgroundColor: theme.colors.primary, ...theme.shadows.medium }]}
      onPress={() => playSong(sampleSongs[0], sampleSongs)}
    >
      <Play size={24} color="#ffffff" fill="#ffffff" />
      <Text style={[styles.quickPlayText, { color: '#ffffff' }]}>
        Quick Play
      </Text>
    </TouchableOpacity>
  );

  const getDataForSection = () => {
    switch (activeSection) {
      case 'recent':
        return recentlyPlayed;
      case 'featured':
        return sampleSongs.slice(0, 4);
      default:
        return sampleSongs;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={theme.colors.gradient}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good evening,</Text>
            <Text style={styles.userName}>{user?.name || 'Music Lover'}</Text>
          </View>
          {renderQuickPlayButton()}
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Playlists */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Featured Playlists
          </Text>
          <FlatList
            data={featuredPlaylists}
            renderItem={renderPlaylistCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Section Tabs */}
        <View style={styles.tabContainer}>
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isActive ? theme.colors.primary : 'transparent',
                    borderColor: theme.colors.border,
                  }
                ]}
                onPress={() => setActiveSection(section.id)}
              >
                <Icon 
                  size={16} 
                  color={isActive ? '#ffffff' : theme.colors.textSecondary} 
                />
                <Text style={[
                  styles.tabText,
                  { 
                    color: isActive ? '#ffffff' : theme.colors.textSecondary,
                    fontFamily: isActive ? 'Inter-SemiBold' : 'Inter-Regular',
                  }
                ]}>
                  {section.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Dynamic Content */}
        <View style={styles.section}>
          <FlatList
            data={getDataForSection()}
            renderItem={renderMusicCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 4,
  },
  quickPlayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  quickPlayText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  tabText: {
    fontSize: 14,
  },
  horizontalList: {
    paddingRight: 24,
  },
  cardContainer: {
    marginRight: 16,
    width: width * 0.4,
  },
  playlistContainer: {
    marginRight: 16,
    width: width * 0.7,
  },
  bottomSpacing: {
    height: 120,
  },
});