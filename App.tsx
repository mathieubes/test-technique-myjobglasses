import { StatusBar } from 'expo-status-bar';
import { CharacterListScreen } from './src/screens/CharacterListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ApiProvider } from './src/Api';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { CharacterDetailScreen } from './src/screens/CharacterDetailScreen';
import { ICharacter } from './src/models/character.model';
import { COLORS } from './src/constants/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  FilterContext,
  FilterContextProvider,
} from './src/contexts/FilterContext';

export type CharacterStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { character: ICharacter };
};

const CharacterStack = createNativeStackNavigator<CharacterStackParamList>();

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApiProvider>
        <FilterContextProvider>
          <NavigationContainer>
            <CharacterStack.Navigator
              screenOptions={characterStackStyles.global}
            >
              <CharacterStack.Screen
                name="CharacterList"
                component={CharacterListScreen}
                options={characterStackStyles.characterList}
              />

              <CharacterStack.Screen
                name="CharacterDetail"
                component={CharacterDetailScreen}
                options={({ route }) => ({
                  title: route.params.character.name,
                })}
              />
            </CharacterStack.Navigator>
          </NavigationContainer>
        </FilterContextProvider>

        <StatusBar style="auto" />
      </ApiProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const characterStackStyles: { [key: string]: NativeStackNavigationOptions } = {
  global: {
    headerStyle: { backgroundColor: COLORS.offWhite },
    headerTintColor: COLORS.primary,
    headerTitleStyle: { color: COLORS.dark },
    headerBackTitleVisible: false,
    headerLargeTitle: true,
    headerLargeTitleShadowVisible: false,
    headerLargeStyle: { backgroundColor: COLORS.offWhite },
    headerLargeTitleStyle: { color: COLORS.dark },
  },
  characterList: {
    title: 'Characters',
  },
};
