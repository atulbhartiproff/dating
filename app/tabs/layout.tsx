import { View, Text, StyleSheet, StatusBar, TouchableOpacity  } from "react-native";

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
        {/* Home Icon */}
  <TouchableOpacity style={styles.tabButton}><Text style={styles.title}>H</Text>
    {/* <Icon name="home" size={24} color="#666" /> */}
  </TouchableOpacity>
  
  {/* Heart/Favorites Icon */}
  <TouchableOpacity style={styles.tabButton}><Text style={styles.title}>H</Text>
    {/* <Icon name="heart" size={24} color="#666" /> */}
  </TouchableOpacity>
  
  {/* Play/Send Icon (Active) */}
  <TouchableOpacity style={styles.tabButton}><Text style={styles.title}>H</Text>
    {/* <Icon name="play" size={24} color="white" /> */}
  </TouchableOpacity>
  
  {/* Profile Icon */}
  <TouchableOpacity style={styles.tabButton}>
    {/* <Icon name="user" size={24} color="#666" /> */}
    <Text style={styles.title}>H</Text>
  </TouchableOpacity>
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
    color: "#A1BF",
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
    flexDirection: 'row',
    justifyContent: 'space-around', // Evenly distributes the 4 icons
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderRadius:20,
    backgroundColor: '#1a1a1a',
    paddingBottom: 20, 
    paddingTop: 10,
  },
  
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#FFF",
    width: 50,
    height: 50,
  },
  
  activeTab: {
    backgroundColor: '#FF1493', 
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Layout;
