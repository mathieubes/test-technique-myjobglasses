import { StatusBar } from 'expo-status-bar';
import { CharacterListScreen } from './src/screens/CharacterListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ApiProvider } from './src/Api';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/constants/colors';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <ApiProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerLargeTitle: true,
          }}
        >
          <Stack.Screen
            name="CharacterList"
            component={CharacterListScreen}
            options={{ title: 'Characters' }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </ApiProvider>
  );
};

export default App;
