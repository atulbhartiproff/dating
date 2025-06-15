import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  // const emptyStateAnim = useRef(new Animated.Value(0)).current;
  // const bounceAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
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

  // Empty state Check
  const onlineUsers = [];

  const recentChats = [];

  // Non Empty state Check
  /*
  const onlineUsers = [
    { id: 1, name: 'Alex', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Cynthia', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, name: 'Mike', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Elizabeth', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 5, name: 'You', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ];

  const recentChats = [
    {
      id: 1,
      name: 'Martin',
      message: 'Have a good day!)',
      time: '5 min ago',
      image: 'https://randomuser.me/api/portraits/men/6.jpg',
      unread: 3,
    },
    {
      id: 2,
      name: 'John',
      message: 'Oh, it\'s amazing',
      time: '10:35 AM',
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
      unread: 2,
    },
    {
      id: 3,
      name: 'Bella',
      message: 'you look so beautiful 💜',
      time: '11:23 AM',
      image: 'https://randomuser.me/api/portraits/women/8.jpg',
      unread: 0,
    },
    {
      id: 4,
      name: 'Amanda',
      message: 'Love you!',
      time: 'Yesterday',
      image: 'https://randomuser.me/api/portraits/women/9.jpg',
      unread: 0,
    },
    {
      id: 5,
      name: 'Maria',
      message: 'Maybe tomorrow?',
      time: 'Yesterday',
      image: 'https://randomuser.me/api/portraits/women/10.jpg',
      unread: 0,
    },
    {
      id: 6,
      name: 'Laura',
      message: 'Have a good day!)',
      time: '10/10/24',
      image: 'https://randomuser.me/api/portraits/women/11.jpg',
      unread: 0,
    },
  ];
  */

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateArt}>
        <Ionicons name="people-outline" size={80} color="#333" />
        <View style={styles.heartContainer}>
          <Ionicons
            name="heart"
            size={20}
            color="#FF6B6B"
            style={styles.floatingHeart}
          />
        </View>
      </View>

      <Text style={styles.emptyStateTitle}>No Friends Yet</Text>
      <Text style={styles.emptyStateSubtitle}>
        It's your time to make new friends! 🌟{"\n"}
        Start conversations and build connections
      </Text>

      <TouchableOpacity style={styles.addFriendsButton}>
        <Ionicons name="person-add" size={20} color="#FF69B4" />
        <Text style={styles.addFriendsText}>Find Friends</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOnlineUser = ({ item, index }) => (
    <Animated.View
      style={[
        styles.onlineUserContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 30],
                outputRange: [0, 30],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity style={styles.onlineUser}>
        <Image source={{ uri: item.image }} style={styles.onlineUserImage} />
        <View style={styles.onlineIndicator} />
        <Text style={styles.onlineUserName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderChatItem = ({ item, index }) => (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 30],
                outputRange: [0, 30],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity style={styles.chatItem}>
        <Image source={{ uri: item.image }} style={styles.chatAvatar} />
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName}>{item.name}</Text>
            <Text style={styles.chatTime}>{item.time}</Text>
          </View>
          <View style={styles.chatMessageRow}>
            <Text style={styles.chatMessage} numberOfLines={1}>
              {item.message}
            </Text>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
            {item.unread === 0 && (
              <Ionicons name="checkmark-done" size={16} color="#007AFF" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

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
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {onlineUsers.length === 0 && recentChats.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {/* Online Users Section */}
            {onlineUsers.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Online now</Text>
                <FlatList
                  data={onlineUsers}
                  renderItem={renderOnlineUser}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.onlineUsersList}
                />
              </View>
            )}

            {/* Recent Chats Section */}
            {recentChats.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent</Text>
                <FlatList
                  data={recentChats}
                  renderItem={renderChatItem}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                />
              </View>
            )}
          </>
        )}
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
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 15,
    fontFamily: "Inter",
  },
  onlineUsersList: {
    paddingRight: 20,
  },
  onlineUserContainer: {
    marginRight: 15,
  },
  onlineUser: {
    alignItems: "center",
  },
  onlineUserImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  onlineIndicator: {
    position: "absolute",
    top: 45,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#00FF00",
    borderWidth: 2,
    borderColor: "#000",
  },
  onlineUserName: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "Inter",
  },
  chatItem: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Inter",
  },
  chatTime: {
    fontSize: 12,
    color: "#8E8E93",
    fontFamily: "Inter",
  },
  chatMessageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatMessage: {
    fontSize: 14,
    color: "#8E8E93",
    flex: 1,
    marginRight: 10,
    fontFamily: "Inter",
  },
  unreadBadge: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  // Empty State Styles
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyStateArt: {
    position: "relative",
    marginBottom: 30,
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#333",
    borderStyle: "dashed",
  },
  heartContainer: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  floatingHeart: {
    opacity: 0.8,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#8E8E93",
    marginBottom: 15,
    fontFamily: "Inter",
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    fontFamily: "Inter",
  },
  addFriendsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(0, 0, 0)",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FF69B4",
  },
  addFriendsText: {
    color: "#FF69B4",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    fontFamily: "Inter",
  },
});

export default ChatScreen;
