import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CharacterGender, ICharacter } from '../../models/character.model';
import { COLORS } from '../../constants/colors';
import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { getGenderIconName } from '../../utils/icons.utils';
import { GenderBadge } from '../badges/GenderBadge';

type Props = ICharacter & {
  navigationCallback?: (character: ICharacter) => void;
};

export const CharacterListItem: React.FC<Props> = ({
  navigationCallback,
  ...character
}) => {
  const { image, name, gender } = character;
  const [firstName, ...rest] = name!.split(' ');

  return (
    <TouchableOpacity
      style={styles.characterCard}
      onPress={navigationCallback && (() => navigationCallback(character))}
    >
      <Image style={styles.characterCard__avatar} source={{ uri: image }} />
      <View style={styles.characterCard__content}>
        <View>
          <Text style={styles.characterCard__content__firstName}>
            {firstName}
          </Text>
          <Text style={styles.characterCard__content__lastName}>
            {rest.join(' ')}
          </Text>
        </View>

        <GenderBadge gender={gender!} />
      </View>

      {navigationCallback && (
        <Ionicons
          style={styles.characterCard__chevronRight}
          name="chevron-forward"
          size={18}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  characterCard: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  characterCard__avatar: {
    flex: 1,
    height: 156,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  characterCard__content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  characterCard__content__firstName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  characterCard__content__lastName: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  characterCard__chevronRight: {
    alignSelf: 'center',
    marginRight: 8,
  },
});
