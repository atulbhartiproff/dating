import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";

const Layout = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Text style={styles.title}>Lets see</Text>
      <View style={styles.bottombar}>
        <TouchableOpacity style={styles.button}><Text>H</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text>H</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text>H</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text>H</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 28,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 16,
  },
  button:{
    flex:1,
    marginHorizontal:9,
    borderRadius:28,
    justifyContent:"center",
    alignItems:"center",
    elevation:8,
    height:50,
    marginBottom:0,
    backgroundColor:"#FF69B4",

  },
  bottombar: {
    flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
    height: "15%",
    backgroundColor: "#f0f0f0",
  },
});

export default Layout;
