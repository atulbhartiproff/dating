import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './home';
import ChatScreen from './chat';
import ProfileScreen from './profile';

const { width } = Dimensions.get('window');

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleValues = useRef([
    new Animated.Value(1.1),
    new Animated.Value(0.9),
    new Animated.Value(0.9),
  ]).current;

  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Chats', icon: 'chatbubble-outline', activeIcon: 'chatbubble' },
    { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  const handleTabPress = (index) => {
    if (index === activeTab) return;

    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(index);
      
      // Animate tab transitions
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: index * (width / 3),
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        // Scale animations for tabs
        ...scaleValues.map((scale, i) =>
          Animated.spring(scale, {
            toValue: i === index ? 1.1 : 0.9,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          })
        ),
      ]).start();
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <HomeScreen />;
      case 1:
        return <ChatScreen />;
      case 2:
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Content with fade animation */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {renderContent()}
      </Animated.View>

      {/* Animated Tab Bar */}
      <View style={styles.tabBar}>
        {/* Active Tab Indicator */}
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />

        {/* Tab Items */}
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          
          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  {
                    transform: [{ scale: scaleValues[index] }],
                  },
                ]}
              >
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={isActive ? 28 : 24}
                  color={isActive ? '#FF69B4' : '#8E8E93'}
                />
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isActive ? '#FF69B4' : '#8E8E93',
                      fontWeight: isActive ? '600' : '400',
                    },
                  ]}
                >
                  {tab.name}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    paddingBottom: 20,
    paddingTop: 15,
    position: 'relative',
    // borderTopWidth: 1,
    // borderTopColor: '#333',
    borderRadius:28,
    overflow:"hidden",
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: width / 3,
    height: 3,
    backgroundColor: '#FF69B4',
    borderRadius: 2,
    marginHorizontal:4,
  },
});

export default App;
