import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApiProvider } from './src/Api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultCharacterNavigation } from './src/navigation/DefaultCharacterNavigation';
import { CharacterListFavoriteScreen } from './src/screens/CharacterListFavoriteScreen';
import { FavoriteContextProvider } from './src/contexts/FavoriteContext';
import { COLORS } from './src/constants/colors';

const BottomTab = createBottomTabNavigator();

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApiProvider>
        <FavoriteContextProvider>
          <NavigationContainer>
            <BottomTab.Navigator>
              <BottomTab.Screen
                name="CharacterListTab"
                component={DefaultCharacterNavigation}
                options={{ headerShown: false }}
              />

              <BottomTab.Screen
                name="CharacterFavoriteTab"
                component={CharacterListFavoriteScreen}
              />
            </BottomTab.Navigator>
          </NavigationContainer>

          <StatusBar style="auto" />
        </FavoriteContextProvider>
      </ApiProvider>
    </GestureHandlerRootView>
  );
};

export default App;
