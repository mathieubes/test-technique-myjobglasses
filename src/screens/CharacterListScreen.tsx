import { useQuery } from '@apollo/client';
import {
  View,
  FlatList,
  Text,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { GET_CHARACTERS } from '../queries/character.graphql';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ICharactersQuery } from '../models/queries/characters-query.model';
import { CharacterListItem } from '../components/character-list-screen/CharacterListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterStackParamList } from '../../App';
import { ICharacter } from '../models/character.model';
import { COLORS } from '../constants/colors';
import { FiltersButton } from '../components/FiltersButton';
import BottomSheet from '@gorhom/bottom-sheet';
import { CharacterListFilterModal } from './CharacterListFilterModal';

const INITIAL_CHARACTERS_PAGE = 1;

export const CharacterListScreen: React.FC<
  NativeStackScreenProps<CharacterStackParamList, 'CharacterList'>
> = ({ navigation }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '40%'], []);

  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  const { data, fetchMore, refetch } = useQuery<ICharactersQuery>(
    GET_CHARACTERS,
    {
      variables: { page: INITIAL_CHARACTERS_PAGE },
    }
  );

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
    <KeyboardAvoidingView
      style={{ backgroundColor: COLORS.offWhite }}
      behavior="position"
    >
      <FlatList
        data={data?.characters.results}
        renderItem={({ item }) => (
          <CharacterListItem
            {...item}
            navigationCallback={pushCharacterDetail}
          />
        )}
        contentInsetAdjustmentBehavior="automatic"
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
      />
      <FiltersButton onPress={() => setBottomSheetOpen(true)} />

      {isBottomSheetOpen && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={(index) => index === -1 && setBottomSheetOpen(false)}
          enablePanDownToClose
        >
          <CharacterListFilterModal />
        </BottomSheet>
      )}
    </KeyboardAvoidingView>
  );
};
