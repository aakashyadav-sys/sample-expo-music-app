import { Song, Playlist } from '@/types/music';

export const sampleSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    album: 'Nocturnal Vibes',
    duration: '3:45',
    coverUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    genre: 'Electronic'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Aqua Symphony',
    album: 'Deep Blue',
    duration: '4:12',
    coverUrl: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    genre: 'Ambient'
  },
  {
    id: '3',
    title: 'City Lights',
    artist: 'Urban Flow',
    album: 'Metropolitan',
    duration: '3:28',
    coverUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    genre: 'Hip Hop'
  },
  {
    id: '4',
    title: 'Forest Whispers',
    artist: 'Nature\'s Voice',
    album: 'Earth Songs',
    duration: '5:15',
    coverUrl: 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    genre: 'Nature'
  },
  {
    id: '5',
    title: 'Stellar Journey',
    artist: 'Cosmic Rider',
    album: 'Space Odyssey',
    duration: '4:33',
    coverUrl: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    genre: 'Synthwave'
  },
  {
    id: '6',
    title: 'Summer Breeze',
    artist: 'Chill Masters',
    album: 'Seasonal Moods',
    duration: '3:56',
    coverUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    genre: 'Chill'
  },
  {
    id: '7',
    title: 'Neon Nights',
    artist: 'Retro Wave',
    album: 'Synthwave Collection',
    duration: '4:01',
    coverUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    genre: 'Synthwave'
  },
  {
    id: '8',
    title: 'Mountain Echo',
    artist: 'Alpine Sounds',
    album: 'Natural Acoustics',
    duration: '3:22',
    coverUrl: 'https://images.pexels.com/photos/3694570/pexels-photo-3694570.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
    genre: 'Folk'
  }
];

export const featuredPlaylists = [
  {
    id: '1',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing and unwinding after a long day',
    coverUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    songCount: 24,
    songs: [sampleSongs[1], sampleSongs[3], sampleSongs[5]]
  },
  {
    id: '2',
    name: 'Electronic Beats',
    description: 'High-energy electronic music to get you moving',
    coverUrl: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=400',
    songCount: 18,
    songs: [sampleSongs[0], sampleSongs[4], sampleSongs[6]]
  },
  {
    id: '3',
    name: 'Nature Sounds',
    description: 'Peaceful sounds from nature for meditation and focus',
    coverUrl: 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpg?auto=compress&cs=tinysrgb&w=400',
    songCount: 12,
    songs: [sampleSongs[3], sampleSongs[7]]
  }
];

export const recentlyPlayed = sampleSongs.slice(0, 6);

export const samplePlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    songs: [sampleSongs[1], sampleSongs[3], sampleSongs[5]],
    coverUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Electronic Mix',
    songs: [sampleSongs[0], sampleSongs[4]],
    coverUrl: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export const onboardingData = [
  {
    id: '1',
    title: 'Discover Amazing Music',
    description: 'Explore millions of songs from your favorite artists and discover new ones.',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Create Your Playlists',
    description: 'Organize your music and create the perfect playlist for every moment.',
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Listen Anywhere',
    description: 'Take your music with you and enjoy high-quality streaming wherever you go.',
    image: 'https://images.pexels.com/photos/3694570/pexels-photo-3694570.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];