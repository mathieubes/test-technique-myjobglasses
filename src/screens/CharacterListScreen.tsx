import { useQuery } from '@apollo/client';
import { View, FlatList, Text } from 'react-native';
import { GET_CHARACTERS } from '../queries/character.graphql';
import { useCallback, useState } from 'react';
import { ICharactersQuery } from '../models/queries/characters-query.model';
import { CharacterListItem } from '../components/character-list-screen/CharacterListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterStackParamList } from '../../App';
import { ICharacter } from '../models/character.model';

const INITIAL_CHARACTERS_PAGE = 1;

export const CharacterListScreen: React.FC<
  NativeStackScreenProps<CharacterStackParamList, 'CharacterList'>
> = ({ navigation }) => {
  const { data, fetchMore } = useQuery<ICharactersQuery>(GET_CHARACTERS, {
    variables: { page: INITIAL_CHARACTERS_PAGE },
  });

  const onEndReached = useCallback(() => {
    fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.characters || !prev.characters) return data!;

        fetchMoreResult.characters.results = [
          ...prev.characters.results,
          ...fetchMoreResult.characters.results,
        ];

        return {
          ...fetchMoreResult,
        };
      },
      variables: { page: data?.characters.info.next },
    });
  }, [data]);

  const pushCharacterDetail = useCallback((character: ICharacter) => {
    navigation.push('CharacterDetail', { character });
  }, []);

  return (
    <View>
      <FlatList
        data={data?.characters.results}
        renderItem={({ item }) => (
          <CharacterListItem
            {...item}
            navigationCallback={pushCharacterDetail}
          />
        )}
        contentInsetAdjustmentBehavior="automatic"
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
      />
    </View>
  );
};
