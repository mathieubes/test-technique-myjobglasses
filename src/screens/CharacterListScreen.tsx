import { useQuery } from '@apollo/client';
import {
  View,
  FlatList,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { GET_CHARACTERS } from '../queries/character.graphql';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ICharactersQuery } from '../models/queries/characters-query.model';
import { CharacterListItem } from '../components/character-list-screen/CharacterListItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterStackParamList } from '../../App';
import { ICharacter } from '../models/character.model';
import { COLORS } from '../constants/colors';
import { FiltersButton } from '../components/FiltersButton';
import BottomSheet from '@gorhom/bottom-sheet';
import { CharacterListFilterModal } from './CharacterListFilterModal';
import { FilterContext } from '../contexts/FilterContext';
import { Badge } from '../components/badges/Badge';
import { Button } from '../components/Button';

const INITIAL_CHARACTERS_PAGE = 1;

export const CharacterListScreen: React.FC<
  NativeStackScreenProps<CharacterStackParamList, 'CharacterList'>
> = ({ navigation }) => {
  const { nameFilter, genderFilter, statusFilter } = useContext(FilterContext);
  const { data, fetchMore } = useQuery<ICharactersQuery>(GET_CHARACTERS, {
    variables: {
      page: INITIAL_CHARACTERS_PAGE,
      name: nameFilter,
      gender: genderFilter,
      status: statusFilter,
    },
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

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
      style={{ flex: 1, backgroundColor: COLORS.offWhite }}
      behavior="position"
    >
      <FlatList
        style={{ height: '100%' }}
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

      {isBottomSheetOpen &&
        (Platform.OS !== 'web' ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onChange={(index) => index === -1 && setBottomSheetOpen(false)}
            enablePanDownToClose
          >
            <CharacterListFilterModal />
          </BottomSheet>
        ) : (
          <Modal style={styles.modal}>
            <CharacterListFilterModal />

            <Button
              style={styles.modal__done}
              iconName="checkmark"
              text="Done"
              onPress={() => setBottomSheetOpen(false)}
            />
          </Modal>
        ))}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: `${COLORS.offWhite}aa`,
  },
  modal__done: {
    margin: 16,
    marginBottom: 32,
  },
});
