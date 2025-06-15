// components/ProfileCard.js
import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Dimensions, 
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileCard = ({ profile, style, children, isInteractive = true, gestureActive }) => {
  const router = useRouter();
  const touchStart = useRef({ x: 0, y: 0, time: 0 });
  const TAP_THRESHOLD = 10; // Maximum movement for tap
  const TAP_TIME_THRESHOLD = 300; // Maximum time for tap (ms)

  const handleTouchStart = (event) => {
    if (!isInteractive) return;
    
    const { pageX, pageY } = event.nativeEvent;
    touchStart.current = {
      x: pageX,
      y: pageY,
      time: Date.now()
    };
  };

  const handleTouchEnd = (event) => {
    if (!isInteractive) return;
    
    // Check if gesture is currently active (swiping)
    if (gestureActive && gestureActive.value) {
      return;
    }

    const { pageX, pageY } = event.nativeEvent;
    const { x: startX, y: startY, time: startTime } = touchStart.current;
    
    const deltaX = Math.abs(pageX - startX);
    const deltaY = Math.abs(pageY - startY);
    const deltaTime = Date.now() - startTime;
    
    // Only navigate if it's a genuine tap (minimal movement and quick)
    const isTap = deltaX < TAP_THRESHOLD && 
                  deltaY < TAP_THRESHOLD && 
                  deltaTime < TAP_TIME_THRESHOLD;
    
    if (isTap) {
      router.push({
        pathname: '../tabs/profileDetail',
        params: {
          profile: JSON.stringify(profile)
        }
      });
    }
  };

  const CardContent = (
    <View style={[styles.card, style]}>
      <Image 
        source={{ uri: profile.photos[0] }} 
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      >
        <View style={styles.info}>
          <Text style={styles.name}>{profile.name}, {profile.age}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          <Text style={styles.distance}>{profile.distance} km away</Text>
        </View>
      </LinearGradient>
      {children}
    </View>
  );

  return isInteractive ? (
    <TouchableWithoutFeedback
      onPressIn={handleTouchStart}
      onPressOut={handleTouchEnd}
    >
      {CardContent}
    </TouchableWithoutFeedback>
  ) : (
    CardContent
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.65,
    maxHeight: 500,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  distance: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default ProfileCard;
