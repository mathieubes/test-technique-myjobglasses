import { CharacterGender } from '../models/character.model';
import { getGenderIconName } from '../utils/icons.utils';
import { generateRandomPhoneNumberForRick } from '../utils/string.utils';

describe('StringUtils tests', () => {
  describe('generateRandomPhoneNumberForRick function', () => {
    const phoneNumberRegex = /^\+33 6(?: \d{2}){4}$/;

    it('should return a number that has French format', () => {
      expect(phoneNumberRegex.test(generateRandomPhoneNumberForRick())).toBe(
        true
      );
    });
  });
});
