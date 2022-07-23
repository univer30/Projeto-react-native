import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import MainScreen from './MainScreen';
import { CheckBoxBase } from '@react-native-community/checkbox';



export default function App() {
  return (
    <SafeAreaProvider>
          <SafeAreaView>
               <MainScreen/>
          </SafeAreaView>
          <StatusBar style="auto"/>
      </SafeAreaProvider>

  );
  

}


