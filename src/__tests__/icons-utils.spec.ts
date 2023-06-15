import { CharacterGender } from '../models/character.model';
import { getGenderIconName } from '../utils/icons.utils';

describe('IconsUtils tests', () => {
  describe('getGenderIconName function', () => {
    type Dataset = {
      givenGender: CharacterGender;
      expectedIconName: string;
    };

    const datasets: Dataset[] = [
      { givenGender: 'Male', expectedIconName: 'male-outline' },
      { givenGender: 'Female', expectedIconName: 'female-outline' },
      { givenGender: 'Genderless', expectedIconName: 'transgender-outline' },
      { givenGender: 'unknown', expectedIconName: 'help-outline' },
    ];

    datasets.forEach(({ givenGender, expectedIconName }) => {
      it(`should return ${expectedIconName} when gender is ${givenGender}`, () => {
        expect(getGenderIconName(givenGender)).toBe(expectedIconName);
      });
    });
  });
});
