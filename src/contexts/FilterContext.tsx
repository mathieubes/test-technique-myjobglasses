import { PropsWithChildren, createContext, useCallback, useState } from 'react';
import { CharacterGender, CharacterStatus } from '../models/character.model';

interface IFilterContext {
  nameFilter?: string;
  genderFilter?: CharacterGender;
  statusFilter?: CharacterStatus;

  setNameFilter?: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateGenderFilter?: (gender: CharacterGender) => void;
  updateStatusFilter?: (status: CharacterStatus) => void;
}

export const FilterContext = createContext<IFilterContext>({});

export const FilterContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [nameFilter, setNameFilter] = useState<string>();
  const [genderFilter, setGenderFilter] = useState<CharacterGender>();
  const [statusFilter, setStatusFilter] = useState<CharacterStatus>();

  const updateGenderFilter = useCallback(
    (gender: CharacterGender) => {
      setGenderFilter((prevGender) =>
        prevGender !== gender ? gender : undefined
      );
    },
    [genderFilter]
  );

  const updateStatusFilter = useCallback(
    (status: CharacterStatus) => {
      setStatusFilter((prevStatus) =>
        prevStatus !== status ? status : undefined
      );
    },
    [genderFilter]
  );

  return (
    <FilterContext.Provider
      value={{
        nameFilter,
        genderFilter,
        statusFilter,
        setNameFilter,
        updateGenderFilter,
        updateStatusFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
