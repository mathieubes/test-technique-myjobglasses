import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../constants/colors';
import { GenderBadge } from '../components/badges/GenderBadge';
import { useQuery } from '@apollo/client';
import { GET_FULL_CHARACTER } from '../queries/character.graphql';
import { ISingleCharacterQuery } from '../models/queries/single-character-query.model';
import { useContext, useEffect, useState } from 'react';
import { Badge } from '../components/badges/Badge';
import { generateRandomPhoneNumberForRick } from '../utils/string.utils';
import { Episode } from '../components/character-detail-screen/Episode';
import { CharacterStackParamList } from '../navigation/DefaultCharacterNavigation';
import { Button } from '../components/Button';
import { FavoriteContext } from '../contexts/FavoriteContext';

export const CharacterDetailScreen: React.FC<
  NativeStackScreenProps<CharacterStackParamList, 'CharacterDetail'>
> = ({ route }) => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoriteContext);
  const [character, setCharacter] = useState(route.params.character);

  const { data } = useQuery<ISingleCharacterQuery>(GET_FULL_CHARACTER, {
    variables: { id: character.id },
  });

  useEffect(() => {
    if (!data) return;
    setCharacter({
      ...character,
      ...data.character,
    });
  }, [data]);

  const { id, image, gender, status, species, location } = character;

  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Image style={styles.screen__avatar} source={{ uri: image }} />

      <View style={styles.screen__moreInfos}>
        <View style={styles.screen__moreInfos__row}>
          <GenderBadge gender="Genderless" />
          <Text style={styles.screen__moreInfos__row__text}>{gender}</Text>
        </View>
        <View style={styles.screen__moreInfos__row}>
          <Badge
            iconName="heart-half-outline"
            style={styles.screen__moreInfos__row__status}
          />
          <Text style={styles.screen__moreInfos__row__text}>{status}</Text>
        </View>
        <View style={styles.screen__moreInfos__row}>
          <Badge
            iconName="finger-print-outline"
            style={styles.screen__moreInfos__row__species}
          />
          <Text style={styles.screen__moreInfos__row__text}>{species}</Text>
        </View>
        <View style={styles.screen__moreInfos__row}>
          <Badge iconName="compass-outline" />
          <Text style={styles.screen__moreInfos__row__text}>
            {location?.name}
          </Text>
        </View>

        {id == 1 && (
          <View style={styles.screen__moreInfos__row}>
            <Badge
              iconName="call-outline"
              style={styles.screen__moreInfos__row__phone}
            />
            <Text style={styles.screen__moreInfos__row__text}>
              {generateRandomPhoneNumberForRick()}
            </Text>
          </View>
        )}
      </View>

      <Button
        iconName="heart-outline"
        text={`${isFavorite!(id!) ? 'Remove from' : 'Add to'} favorite`}
        style={isFavorite!(id!) && { backgroundColor: COLORS.red }}
        onPress={() =>
          isFavorite!(id!) ? removeFavorite!(id!) : addFavorite!(id!)
        }
      />

      <Text style={styles.screen__episodes}>Episodes</Text>
      {character.episode?.map((episode) => {
        return <Episode key={episode.episode} {...episode} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    backgroundColor: COLORS.offWhite,
  },
  screen__avatar: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  screen__moreInfos: {
    paddingVertical: 32,
    paddingHorizontal: 8,
    rowGap: 16,
  },
  screen__moreInfos__row: {
    flexDirection: 'row',
    columnGap: 16,
    alignItems: 'center',
  },
  screen__moreInfos__row__text: {
    fontSize: 20,
    color: COLORS.dark,
  },
  screen__moreInfos__row__status: {
    backgroundColor: COLORS.red,
  },
  screen__moreInfos__row__species: {
    backgroundColor: COLORS.beige,
  },
  screen__moreInfos__row__phone: {
    backgroundColor: COLORS.pink,
  },
  screen__episodes: {
    marginVertical: 16,
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
});
