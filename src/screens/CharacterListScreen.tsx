import { useQuery } from '@apollo/client';
import { View, FlatList, Text } from 'react-native';
import { GET_CHARACTERS } from '../queries/character.graphql';
import { useState } from 'react';
import { ICharactersQuery } from '../models/queries/characters-query.model';
import { CharacterListItem } from '../components/character-list-screen/CharacterListItem';

const INITIAL_CHARACTERS_PAGE = 1;

export const CharacterListScreen = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_CHARACTERS_PAGE);

  const { data } = useQuery<ICharactersQuery>(GET_CHARACTERS, {
    variables: { page: currentPage },
  });

  return (
    <View>
      <FlatList
        data={data?.characters.results}
        renderItem={({ item }) => <CharacterListItem {...item} />}
        ListFooterComponent={() => <Text>FOOTER</Text>}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
};
