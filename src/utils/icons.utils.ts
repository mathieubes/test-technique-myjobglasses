import { CharacterGender } from '../models/character.model';

export function getGenderIconName(gender: CharacterGender) {
  switch (gender) {
    case 'Male':
      return 'male-outline';
    case 'Female':
      return 'female-outline';
    case 'Genderless':
      return 'transgender-outline';
    default:
      return 'help-outline';
  }
}
