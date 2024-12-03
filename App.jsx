import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/pages/Home/homePage';
import Layout from './src/routes/layout';
import LoginPhone from './src/components/LoginPhone';
import LoginEmail from './src/components/LoginEmail';
import Signup from './src/components/Signup';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  return (
    <Signup />
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
