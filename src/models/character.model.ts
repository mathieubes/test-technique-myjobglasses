type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

interface ILocation {
  name: string;
  url: string;
}

export interface ICharacter {
  id?: number;
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
  origin?: ILocation;
  location?: ILocation;
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;
}
