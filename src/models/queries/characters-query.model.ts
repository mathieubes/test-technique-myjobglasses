import { ICharacter } from '../character.model';

export interface ICharactersQuery {
  characters: {
    __typename: string;
    results: ICharacter[];
  };
}
