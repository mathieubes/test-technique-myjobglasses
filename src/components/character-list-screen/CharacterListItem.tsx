import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ICharacter } from '../../models/character.model';
import { COLORS } from '../../constants/colors';
import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = ICharacter & {
  navigationCallback: (character: ICharacter) => void;
};

export const CharacterListItem: React.FC<Props> = ({
  navigationCallback,
  ...character
}) => {
  const { image, name, gender } = character;
  const [firstName, ...rest] = name!.split(' ');

  const getGenderStyle = useCallback(() => {
    switch (gender) {
      case 'Male':
        return styles.characterCard__content__gender_male;
      case 'Female':
        return styles.characterCard__content__gender_female;
      case 'Genderless':
        return styles.characterCard__content__gender_genderless;
      default:
        return null;
    }
  }, [gender]);

  return (
    <TouchableOpacity
      style={styles.characterCard}
      onPress={() => navigationCallback(character)}
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

        <View style={[styles.characterCard__content__gender, getGenderStyle()]}>
          <Text style={styles.characterCard__content__gender__text}>
            {gender}
          </Text>
        </View>
      </View>

      <Ionicons
        style={styles.characterCard__chevronRight}
        name="chevron-forward"
        size={18}
      />
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
  characterCard__content__gender: {
    padding: 8,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
  },
  characterCard__content__gender_male: {
    backgroundColor: COLORS.green,
  },
  characterCard__content__gender_female: {
    backgroundColor: COLORS.red,
  },
  characterCard__content__gender_genderless: {
    backgroundColor: COLORS.blue,
  },
  characterCard__content__gender__text: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  characterCard__chevronRight: {
    alignSelf: 'center',
    marginRight: 8,
  },
});
