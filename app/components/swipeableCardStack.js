// components/SwipeableCardStack.js
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
  cancelAnimation,
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
  const isGestureActive = useSharedValue(false);
  const isAnimating = useSharedValue(false);

  // Safe gesture state setter
  const setGestureActive = (active) => {
    'worklet';
    try {
      isGestureActive.value = active;
    } catch (error) {
      console.warn('Error setting gesture state:', error);
    }
  };

  // Safe swipe handler
  const handleSwipeComplete = (direction) => {
    setTimeout(() => {
      try {
        onSwipe(direction);
      } catch (error) {
        console.error('Error in swipe handler:', error);
      }
    }, 350);
  };

  // Reset all animations safely
  const resetAnimations = () => {
    'worklet';
    try {
      cancelAnimation(translateX);
      cancelAnimation(translateY);
      cancelAnimation(scale);
      cancelAnimation(opacity);
      
      translateX.value = 0;
      translateY.value = 0;
      scale.value = 1;
      opacity.value = 0;
      isAnimating.value = false;
    } catch (error) {
      console.warn('Error resetting animations:', error);
    }
  };

  // CRITICAL FIX: Add runOnJS(true) to prevent crashes
  const panGesture = Gesture.Pan()
    .runOnJS(true) // Forces JavaScript thread execution
    .onStart(() => {
      'worklet';
      if (isAnimating.value) return;
      
      setGestureActive(true);
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      'worklet';
      if (isAnimating.value) return;
      
      try {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
        opacity.value = interpolate(
          Math.abs(event.translationX),
          [0, SWIPE_THRESHOLD],
          [0, 1]
        );
      } catch (error) {
        console.warn('Error in gesture update:', error);
      }
    })
    .onEnd((event) => {
      'worklet';
      if (isAnimating.value) return;
      
      const shouldSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD;
      
      if (shouldSwipe) {
        isAnimating.value = true;
        const direction = event.translationX > 0 ? 'right' : 'left';
        
        // Animate card off screen
        translateX.value = withTiming(
          event.translationX > 0 ? screenWidth : -screenWidth,
          { duration: 300 },
          (finished) => {
            'worklet';
            if (finished) {
              runOnJS(resetAnimations)();
              runOnJS(setGestureActive)(false);
              runOnJS(handleSwipeComplete)(direction);
            }
          }
        );
        translateY.value = withTiming(event.translationY, { duration: 300 });
      } else {
        // Reset position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        opacity.value = withSpring(0);
        scale.value = withSpring(1);
        
        // Delay to prevent immediate tap
        setTimeout(() => {
          setGestureActive(false);
        }, 150);
      }
    })
    .onFinalize(() => {
      'worklet';
      if (!isAnimating.value) {
        setGestureActive(false);
      }
    });

  // Animated styles with error handling
  const cardStyle = useAnimatedStyle(() => {
    'worklet';
    try {
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
    } catch (error) {
      return {};
    }
  });

  const nextCardStyle = useAnimatedStyle(() => {
    'worklet';
    try {
      const nextScale = interpolate(
        Math.abs(translateX.value),
        [0, SWIPE_THRESHOLD],
        [0.9, 1]
      );

      return {
        transform: [{ scale: nextScale }],
      };
    } catch (error) {
      return {};
    }
  });

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  return (
    <View style={styles.container}>
      {/* Next card (background) */}
      {nextProfile && (
        <Animated.View style={[styles.cardContainer, nextCardStyle]}>
          <ProfileCard profile={nextProfile} isInteractive={false} />
        </Animated.View>
      )}
      
      {/* Current card (foreground) */}
      {currentProfile && (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.cardContainer, cardStyle]}>
            <ProfileCard 
              profile={currentProfile} 
              isInteractive={true}
              gestureActive={isGestureActive}
            >
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
