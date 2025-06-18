import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Moon, Sun, Download, Bell, Shield, CircleHelp as HelpCircle, ChevronRight, CreditCard as Edit3, Music, Heart, Clock } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const stats = [
    { label: 'Songs Played', value: '1,234', icon: Music },
    { label: 'Favorites', value: '89', icon: Heart },
    { label: 'Hours Listened', value: '156', icon: Clock },
  ];

  const menuItems = [
    { 
      title: 'Account Settings', 
      icon: Settings, 
      onPress: () => console.log('Account Settings') 
    },
    { 
      title: 'Notifications', 
      icon: Bell, 
      onPress: () => console.log('Notifications') 
    },
    { 
      title: 'Downloads', 
      icon: Download, 
      onPress: () => console.log('Downloads') 
    },
    { 
      title: 'Privacy & Security', 
      icon: Shield, 
      onPress: () => console.log('Privacy') 
    },
    { 
      title: 'Help & Support', 
      icon: HelpCircle, 
      onPress: () => console.log('Help') 
    },
  ];

  const renderStat = (stat, index) => {
    const Icon = stat.icon;
    return (
      <View key={index} style={[styles.statItem, { backgroundColor: theme.colors.surface }]}>
        <Icon size={24} color={theme.colors.primary} />
        <Text style={[styles.statValue, { color: theme.colors.text }]}>
          {stat.value}
        </Text>
        <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
          {stat.label}
        </Text>
      </View>
    );
  };

  const renderMenuItem = (item, index) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        key={index}
        style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
        onPress={item.onPress}
      >
        <View style={styles.menuItemLeft}>
          <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.surface }]}>
            <Icon size={20} color={theme.colors.primary} />
          </View>
          <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
            {item.title}
          </Text>
        </View>
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={theme.colors.gradient}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.name || 'Music Lover'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map(renderStat)}
        </View>

        {/* Theme Toggle */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.background }]}>
                {isDark ? (
                  <Sun size={20} color={theme.colors.primary} />
                ) : (
                  <Moon size={20} color={theme.colors.primary} />
                )}
              </View>
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Text>
            </View>
            <View style={[
              styles.toggleSwitch,
              { backgroundColor: isDark ? theme.colors.primary : theme.colors.border }
            ]}>
              <View style={[
                styles.toggleThumb,
                { 
                  backgroundColor: '#ffffff',
                  transform: [{ translateX: isDark ? 20 : 2 }]
                }
              ]} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
          {menuItems.map(renderMenuItem)}
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
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  bottomSpacing: {
    height: 120,
  },
});