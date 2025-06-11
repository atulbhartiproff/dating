import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';

const RemoteBackgroundScreen = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/43/2e/6c/432e6ccc44fc949351f5dde74ea8258f.jpg' }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* <View style={styles.overlay}>
        <Text style={styles.title}>Welcome</Text>
      </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default RemoteBackgroundScreen;