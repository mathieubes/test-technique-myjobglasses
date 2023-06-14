import { StyleSheet, View } from 'react-native';
import { CharacterGender } from '../../models/character.model';
import { COLORS } from '../../constants/colors';
import { getGenderIconName } from '../../utils/icons.utils';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from './Badge';

function getGenderStyle(gender: CharacterGender) {
  switch (gender) {
    case 'Male':
      return styles.gender_male;
    case 'Female':
      return styles.gender_female;
    case 'Genderless':
      return styles.gender_genderless;
  }
}

type Props = {
  gender: CharacterGender;
};

export const GenderBadge: React.FC<Props> = ({ gender }) => {
  return (
    <Badge
      iconName={getGenderIconName(gender!)}
      style={getGenderStyle(gender!)}
    />
  );
};

const styles = StyleSheet.create({
  gender_male: {
    backgroundColor: COLORS.blue,
  },
  gender_female: {
    backgroundColor: COLORS.purple,
  },
  gender_genderless: {
    backgroundColor: COLORS.primary,
  },
});
