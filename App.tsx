import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApiProvider } from './src/Api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultCharacterNavigation } from './src/navigation/DefaultCharacterNavigation';
import { CharacterListFavoriteScreen } from './src/screens/CharacterListFavoriteScreen';
import { FavoriteContextProvider } from './src/contexts/FavoriteContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/constants/colors';

const BottomTab = createBottomTabNavigator();

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApiProvider>
        <FavoriteContextProvider>
          <NavigationContainer>
            <BottomTab.Navigator
              screenOptions={({ route }) => ({
                tabBarActiveTintColor: COLORS.primaryDarker,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: keyof typeof Ionicons.glyphMap = 'help-outline';

                  switch (route.name) {
                    case 'CharacterListTab':
                      iconName = focused ? 'people' : 'people-outline';
                      break;
                    case 'CharacterFavoriteTab':
                      iconName = focused ? 'heart' : 'heart-outline';
                      break;
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <BottomTab.Screen
                name="CharacterListTab"
                component={DefaultCharacterNavigation}
                options={{ headerShown: false, title: 'Characters' }}
              />

              <BottomTab.Screen
                name="CharacterFavoriteTab"
                component={CharacterListFavoriteScreen}
                options={{ title: 'Favorites' }}
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
