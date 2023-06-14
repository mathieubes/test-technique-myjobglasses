import { StatusBar } from 'expo-status-bar';
import { CharacterListScreen } from './src/screens/CharacterListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ApiProvider } from './src/Api';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharacterDetailScreen } from './src/screens/CharacterDetailScreen';
import { ICharacter } from './src/models/character.model';

export type CharacterStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { character: ICharacter };
};

const Stack = createNativeStackNavigator<CharacterStackParamList>();

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
          <Stack.Screen
            name="CharacterDetail"
            component={CharacterDetailScreen}
            options={{
              headerTitle: '',
              headerLargeTitle: false,
              headerTransparent: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </ApiProvider>
  );
};

export default App;
