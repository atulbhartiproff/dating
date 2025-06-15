// components/SwipeOverlay.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const SwipeOverlay = ({ translateX, opacity }) => {
  const likeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value > 0 ? opacity.value : 0,
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value < 0 ? Math.abs(opacity.value) : 0,
  }));

  return (
    <>
      <Animated.View style={[styles.overlay, styles.likeOverlay, likeStyle]}>
        <Text style={styles.likeText}>LIKE</Text>
      </Animated.View>
      <Animated.View style={[styles.overlay, styles.nopeOverlay, nopeStyle]}>
        <Text style={styles.nopeText}>NOPE</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 50,
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
  },
  likeOverlay: {
    right: 20,
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  nopeOverlay: {
    left: 20,
    borderColor: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  likeText: {
    color: '#4CAF50',
    fontSize: 32,
    fontWeight: 'bold',
  },
  nopeText: {
    color: '#F44336',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default SwipeOverlay;
