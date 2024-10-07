import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/pages/Home/homePage';
import Layout from './src/routes/layout';
import LoginEmail from './src/components/Login/LoginEmail';
import LoginPhone from './src/components/Login/LoginPhone';
import Signup from './src/components/Login/Signup';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  return (
    // <LoginEmail/>
    // <LoginPhone/>
    <Signup/>
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
