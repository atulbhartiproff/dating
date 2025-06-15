import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileCard = ({ profile, style, children }) => {
  return (
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
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.7,
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
