import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/c6/10/72/c6107263c5051a70acaa03e364e130ac.jpg",
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0.1)",
            "rgba(0,0,0,0.35)",
            "rgba(0,0,0,0.85)",
            "rgba(0,0,0,1.0)",
          ]}
          locations={[0, 0.2, 0.4, 0.6, 1]}
          style={styles.overlay}
        />

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Heart Logo */}
          <View style={styles.logoContainer}></View>

          {/* Main Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Radical and Bizarre.</Text>
            <Text style={styles.subtitle}>
              Connect with people tackling the same levels as you.
            </Text>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => console.log("Next pressed")}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginPrompt}>Already have an account?</Text>
            <TouchableOpacity onPress={() => console.log("Login pressed")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  logoContainer: {
    marginBottom: 60,
    alignItems: "center",
  },
  heartContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 2,
    borderColor: "rgba(255, 182, 193, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  heartIcon: {
    fontSize: 40,
    color: "#FFB6C1",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontFamily: "Fredoka-VariableFont_wdth,wght", // Your custom Fredoka font
    fontWeight: "700",
    fontSize: 28,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "Fredoka-VariableFont_wdth,wght", // Your custom Fredoka font
    fontWeight: "400",
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  nextButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#FF69B4",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#FF69B4",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    fontFamily: "Fredoka-VariableFont_wdth,wght", // Your custom Fredoka font
    fontWeight: "600",
    fontSize: 18,
    color: "#FFFFFF",
  },
  loginContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  loginPrompt: {
    fontFamily: "Fredoka-VariableFont_wdth,wght", // Your custom Fredoka font
    fontWeight: "400",
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  loginLink: {
    fontFamily: "Fredoka-VariableFont_wdth,wght", // Your custom Fredoka font
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
    textDecorationLine: "underline",
  },
  // Your original Fredoka styles maintained
  fredokaLight: {
    fontFamily: "Fredoka-VariableFont_wdth,wght",
    fontWeight: "300",
    fontSize: 24,
  },
  fredokaRegular: {
    fontFamily: "Fredoka-VariableFont_wdth,wght",
    fontWeight: "400",
    fontSize: 24,
  },
  fredokaBold: {
    fontFamily: "Fredoka-VariableFont_wdth,wght",
    fontWeight: "700",
    fontSize: 24,
  },
});

export default OnboardingScreen;
