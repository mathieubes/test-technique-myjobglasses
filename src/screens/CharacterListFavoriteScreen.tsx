import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FavoriteContext } from '../contexts/FavoriteContext';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS_BY_IDS } from '../queries/character.graphql';
import { ICharactersByIdsQuery } from '../models/queries/characters-by-ids-query.model';
import { FlatList } from 'react-native-gesture-handler';
import { CharacterListItem } from '../components/character-list-screen/CharacterListItem';
import { COLORS } from '../constants/colors';
import { CharacterStackParamList } from '../navigation/DefaultCharacterNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const CharacterListFavoriteScreen: React.FC<
  NativeStackScreenProps<CharacterStackParamList, 'CharacterList'>
> = ({ navigation }) => {
  const { favorites } = useContext(FavoriteContext);

  const { data } = useQuery<ICharactersByIdsQuery>(GET_CHARACTERS_BY_IDS, {
    variables: {
      ids: favorites,
    },
  });

  if (favorites?.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No favorites !</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={data?.charactersByIds}
        renderItem={({ item }) => (
          <CharacterListItem
            {...item}
            navigationCallback={() =>
              navigation.navigate('CharacterDetail', { character: item })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
});
