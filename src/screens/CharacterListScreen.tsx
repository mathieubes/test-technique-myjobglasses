import { useQuery } from '@apollo/client';
import { View, FlatList, Text } from 'react-native';
import { GET_CHARACTERS } from '../queries/character.graphql';
import { useState } from 'react';
import { ICharactersQuery } from '../models/queries/characters-query.model';
import { CharacterListItem } from '../components/character-list-screen/CharacterListItem';

const INITIAL_CHARACTERS_PAGE = 1;

export const CharacterListScreen = () => {
  const { data, fetchMore } = useQuery<ICharactersQuery>(GET_CHARACTERS, {
    variables: { page: INITIAL_CHARACTERS_PAGE },
  });

  const onReachedFetching = () => {
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
  };

  return (
    <View>
      <FlatList
        data={data?.characters.results}
        renderItem={({ item }) => <CharacterListItem {...item} />}
        ListFooterComponent={() => <Text>FOOTER</Text>}
        contentInsetAdjustmentBehavior="automatic"
        onEndReachedThreshold={0.5}
        onEndReached={onReachedFetching}
      />
    </View>
  );
};
