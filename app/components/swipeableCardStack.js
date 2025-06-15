import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  runOnJS, 
} from 'react-native-reanimated';
import ProfileCard from './profileCard';
import SwipeOverlay from './swipeOverlay';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.3;

const SwipeableCardStack = ({ profiles, currentIndex, onSwipe }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const handleSwipeComplete = (direction) => {
    onSwipe(direction);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      opacity.value = interpolate(
        Math.abs(event.translationX),
        [0, SWIPE_THRESHOLD],
        [0, 1]
      );
    })
    .onEnd((event) => {
      const shouldSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD;
      
      if (shouldSwipe) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        
        translateX.value = withTiming(
          event.translationX > 0 ? screenWidth : -screenWidth,
          { duration: 300 }
        );
        translateY.value = withTiming(event.translationY, { duration: 300 });
        
        translateX.value = withTiming(0, { duration: 0 }, () => {
          translateY.value = 0;
          opacity.value = 0;
          scale.value = 1;
        });
        
        runOnJS(handleSwipeComplete)(direction);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        opacity.value = withSpring(0);
      }
      
      scale.value = withSpring(1);
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-screenWidth, 0, screenWidth],
      [-30, 0, 30]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale: scale.value },
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    const nextScale = interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0.9, 1]
    );

    return {
      transform: [{ scale: nextScale }],
    };
  });

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  return (
    <View style={styles.container}>
      {/* Next card (background) */}
      {nextProfile && (
        <Animated.View style={[styles.cardContainer, nextCardStyle]}>
          <ProfileCard profile={nextProfile} />
        </Animated.View>
      )}
      
      {/* Current card (foreground) */}
      {currentProfile && (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.cardContainer, cardStyle]}>
            <ProfileCard profile={currentProfile}>
              <SwipeOverlay translateX={translateX} opacity={opacity} />
            </ProfileCard>
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    position: 'absolute',
  },
});

export default SwipeableCardStack;
