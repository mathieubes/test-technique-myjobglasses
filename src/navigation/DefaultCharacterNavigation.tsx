import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { CharacterListScreen } from '../screens/CharacterListScreen';
import { CharacterDetailScreen } from '../screens/CharacterDetailScreen';
import { ICharacter } from '../models/character.model';
import { COLORS } from '../constants/colors';
import { FilterContextProvider } from '../contexts/FilterContext';

export type CharacterStackParamList = {
  CharacterList: undefined;
  CharacterDetail: { character: ICharacter };
};

const CharacterStack = createNativeStackNavigator<CharacterStackParamList>();

export const DefaultCharacterNavigation = () => {
  return (
    <FilterContextProvider>
      <CharacterStack.Navigator screenOptions={characterStackStyles.global}>
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
    </FilterContextProvider>
  );
};

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
