// home.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeableCardStack from '../components/swipeableCardStack';
import useProfileStore from '../store/profileStore';
import GestureErrorBoundary from '../components/gestureErrorBoundary';
import mockProfiles from '../Data/mockprofiles.json';

const HomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const router = useRouter();

  const { 
    profiles, 
    currentIndex, 
    isLoading,
    swipeProfile, 
    initializeProfiles,
    resetProfiles,
    hasMoreProfiles,
    getCurrentProfile,
    getNextProfile
  } = useProfileStore();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();

    // Initialize profiles with mock data
    initializeProfiles();
  }, [initializeProfiles]);

  const handleMenu = () => {
    router.push('/tabs/app');
  };

  const handleSwipe = (direction: string) => {
    const currentProfile = getCurrentProfile();
    if (!currentProfile) {
      console.warn('No profile available to swipe.');
      return;
    }
    console.log(`Swiped ${direction} on profile:`, currentProfile.name);
    swipeProfile(direction);
  };

  const handleNotifications = () => {
    // router.push('/notifications');
    console.log("Noti pushed");
  };

  const handleRefresh = () => {
    resetProfiles();
  };

  return (
    <View style={styles.container}>
    <GestureHandlerRootView>
              
        {/* Header*/}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity onPress={handleMenu} style={styles.headerButton}>
            <Ionicons name="menu-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity onPress={handleNotifications} style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* Card Stack Container - Constrained below header */}
        <Animated.View
          style={[
            styles.cardContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {profiles.length === 0 && !isLoading ? (
            <View style={styles.errorState}>
              <Text style={styles.errorText}>Failed to load profiles. Please try again.</Text>
              <TouchableOpacity 
                style={styles.refreshButton}
                onPress={handleRefresh}
              >
                <Text style={styles.refreshText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : hasMoreProfiles() ? (
            <GestureErrorBoundary>
              <SwipeableCardStack
                profiles={profiles}
                currentIndex={currentIndex}
                onSwipe={handleSwipe}
              />
              {isLoading && (
                <View style={styles.loadingIndicator}>
                  <Text style={styles.loadingText}>Loading profiles...</Text>
                </View>
              )}
            </GestureErrorBoundary>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={80} color="#FF69B4" />
              <Text style={styles.emptyTitle}>Loading More Profiles</Text>
              <Text style={styles.emptySubtitle}>
                Going throught the itty gritty lands to find more.
              </Text>
              
              <TouchableOpacity 
                style={styles.refreshButton}
                onPress={handleRefresh}
              >
                <Text style={styles.refreshText}>Start Over</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        {/* Debug Info (remove in production) */}
        {/* {__DEV__ && (
          <View style={styles.debugInfo}>
            <Text style={styles.debugText}>
              Profile {currentIndex + 1} of {profiles.length}
            </Text>
            <Text style={styles.debugText}>
              Current: {getCurrentProfile()?.name || 'No profiles loaded'}
            </Text>
            <Text style={styles.debugText}>
              Next: {getNextProfile()?.name || 'No profiles available'}
            </Text>
          </View>
        )} */}

    </GestureHandlerRootView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    zIndex: 1000, // Ensure header stays above cards
    backgroundColor: '#000', // Solid background to prevent bleed-through
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerButton: {
    padding: 8, // Larger touch area
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Inter',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Add space below header
    paddingBottom: 40, // Add bottom padding
    zIndex: 1, // Lower z-index than header
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
    flex: 1,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    fontFamily: 'Inter',
  },
  refreshButton: {
    backgroundColor: '#FF69B4',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  refreshText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  debugInfo: {
    position: 'absolute',
    top: 120,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
    zIndex: 999,
  },
  debugText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter',
  },
  errorState: {
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: 'Inter',
  },
});

export default HomeScreen;

initializeProfiles:() => {
  try {
    if (!get().isInitialized) {
      set({
        profiles: [...mockProfiles], // Load profiles from JSON file
        currentIndex: 0,
        isInitialized: true,
      });
    }
  } catch (error) {
    console.error('Failed to initialize profiles:', error);
  }
};