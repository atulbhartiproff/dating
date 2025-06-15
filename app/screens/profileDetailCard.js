// screens/ProfileDetailScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileDetailScreen = ({ route, navigation }) => {
  const { profile } = route.params;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLike = () => {
    // Implement like functionality
    console.log('Liked:', profile.name);
    navigation.goBack();
  };

  const handlePass = () => {
    // Implement pass functionality
    console.log('Passed:', profile.name);
    navigation.goBack();
  };

  const nextPhoto = () => {
    if (profile.photos && currentPhotoIndex < profile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Photo Section */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: profile.photos[currentPhotoIndex] || profile.photos[0] }}
            style={styles.mainPhoto}
            resizeMode="cover"
          />
          
          {/* Photo navigation dots */}
          {profile.photos && profile.photos.length > 1 && (
            <View style={styles.photoDotsContainer}>
              {profile.photos.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.photoDot,
                    index === currentPhotoIndex && styles.activePhotoDot
                  ]}
                />
              ))}
            </View>
          )}

          {/* Photo navigation areas */}
          <TouchableOpacity
            style={styles.leftPhotoArea}
            onPress={prevPhoto}
            activeOpacity={1}
          />
          <TouchableOpacity
            style={styles.rightPhotoArea}
            onPress={nextPhoto}
            activeOpacity={1}
          />

          {/* Gradient overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.photoGradient}
          />
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.nameSection}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.age}>{profile.age}</Text>
          </View>
          
          <View style={styles.distanceSection}>
            <Ionicons name="location-outline" size={16} color="#8E8E93" />
            <Text style={styles.distance}>{profile.distance} km away</Text>
          </View>

          {/* Bio Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About {profile.name}</Text>
            <Text style={styles.bio}>{profile.bio}</Text>
          </View>

          {/* Interests Section */}
          {profile.interests && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.interestsContainer}>
                {profile.interests.map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailsContainer}>
              {profile.height && (
                <View style={styles.detailItem}>
                  <Ionicons name="resize-outline" size={20} color="#8E8E93" />
                  <Text style={styles.detailText}>{profile.height}</Text>
                </View>
              )}
              {profile.education && (
                <View style={styles.detailItem}>
                  <Ionicons name="school-outline" size={20} color="#8E8E93" />
                  <Text style={styles.detailText}>{profile.education}</Text>
                </View>
              )}
              {profile.occupation && (
                <View style={styles.detailItem}>
                  <Ionicons name="briefcase-outline" size={20} color="#8E8E93" />
                  <Text style={styles.detailText}>{profile.occupation}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.passButton} onPress={handlePass}>
          <Ionicons name="close" size={30} color="#F44336" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Ionicons name="heart" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  photoContainer: {
    height: screenHeight * 0.6,
    position: 'relative',
  },
  mainPhoto: {
    width: '100%',
    height: '100%',
  },
  photoDotsContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  photoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 3,
  },
  activePhotoDot: {
    backgroundColor: '#fff',
  },
  leftPhotoArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
  },
  rightPhotoArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
  },
  photoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  profileInfo: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  age: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '300',
  },
  distanceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  distance: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  bio: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    color: '#fff',
    fontSize: 14,
  },
  detailsContainer: {
    gap: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 30,
    backgroundColor: '#000',
  },
  passButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProfileDetailScreen;
