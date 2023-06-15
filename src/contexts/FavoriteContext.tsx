import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_LS_KEY = '@ls_favorites';

interface IFavoriteContext {
  favorites?: number[];

  addFavorite?: (id: number) => void;
  removeFavorite?: (id: number) => void;
  isFavorite?: (id: number) => boolean;
}

export const FavoriteContext = createContext<IFavoriteContext>({});

export const FavoriteContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_LS_KEY).then((value) => {
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    });
  }, []);

  const updateStorage = useCallback(
    async (favs: number[]) => {
      await AsyncStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favs));
    },
    [favorites]
  );

  const addFavorite = useCallback(
    (id: number) => {
      setFavorites((prevFavorites) => {
        const newArray = [...prevFavorites, id];
        updateStorage(newArray);
        return newArray;
      });
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    (id: number) => {
      setFavorites((prevFavorites) => {
        const newArray = prevFavorites.filter((_id) => _id !== id);
        updateStorage(newArray);
        return newArray;
      });
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
