import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { CharacterStackParamList } from '../../App';
import { COLORS } from '../constants/colors';
import { GenderBadge } from '../components/badges/GenderBadge';
import { useQuery } from '@apollo/client';
import { ICharacter } from '../models/character.model';
import { GET_FULL_CHARACTER } from '../queries/character.graphql';
import { ISingleCharacterQuery } from '../models/queries/single-character-query.model';
import { useEffect, useState } from 'react';
import { Badge } from '../components/badges/Badge';
import { generateRandomPhoneNumberForRick } from '../utils/string.utils';

export const CharacterDetailScreen: React.FC<
  NativeStackScreenProps<CharacterStackParamList, 'CharacterDetail'>
> = ({ route }) => {
  const [character, setCharacter] = useState(route.params.character);

  const { data } = useQuery<ISingleCharacterQuery>(GET_FULL_CHARACTER, {
    variables: { id: character.id },
  });

  useEffect(() => {
    if (!data) return;
    console.log(data);
    setCharacter({
      ...character,
      ...data.character,
    });
  }, [data]);

  const { id, image, gender, status, species, location } = character;

  console.log(id);

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
    padding: 32,
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
});
