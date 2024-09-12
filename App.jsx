import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FirstScreen from './src/Screens/homePage.jsx';
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <View style={stylesApp.containerApp}>
      <FirstScreen />
    </View>
  );
}

const stylesApp = StyleSheet.create({
  containerApp: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
    borderWidth: 1
  },
});
