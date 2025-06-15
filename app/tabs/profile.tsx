import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {


  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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
  }, []);

  const userStats = [
    { label: "Posts", value: "127" },
    { label: "Followers", value: "2.4K" },
    { label: "Following", value: "892" },
  ];

  const userImages = [
    "https://picsum.photos/200/200?random=1",
    "https://picsum.photos/200/200?random=2",
    "https://picsum.photos/200/200?random=3",
    "https://picsum.photos/200/200?random=4",
    "https://picsum.photos/200/200?random=5",
    "https://picsum.photos/200/200?random=6",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <Animated.View
          style={[
            styles.profileSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/32/34/15/32341520a16765f08e3b7c854ed6cd8a.jpg",
              }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={16} color="#FF69B4" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>Atul Bharti</Text>
          <Text style={styles.profileBio}>
            Your friendly little nerd{"\n"}
            Messing things up every second.
          </Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.statItem,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, 50 + index * 10],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Animated.View>
            ))}
          </View>

          {/* Action Buttons */}
          <Animated.View
            style={[
              styles.actionButtons,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={20} color="#FF69B4" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* User Images Grid */}
        <Animated.View
          style={[
            styles.imagesSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: fadeAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>My Photos</Text>
          <View style={styles.imageGrid}>
            {userImages.map((image, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.imageContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        scale: scaleAnim.interpolate({
                          inputRange: [0.8, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity>
                  <Image source={{ uri: image }} style={styles.gridImage} />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Inter",
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FF69B4",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    fontFamily: "Inter",
  },
  profileBio: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    fontFamily: "Inter",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
    fontFamily: "Inter",
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
    fontFamily: "Inter",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  editProfileButton: {
    backgroundColor: "#FF69B4",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  editProfileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  shareButton: {
    backgroundColor: "#1C1C1E",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  imagesSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
    fontFamily: "Inter",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "31%",
    marginBottom: 10,
  },
  gridImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
  },
});

export default ProfileScreen;
