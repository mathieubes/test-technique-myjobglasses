import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CharacterStackParamList } from '../../App';

export const CharacterDetailScreen: React.FC<
  NativeStackScreenProps<CharacterStackParamList, 'CharacterDetail'>
> = ({ route }) => {
  const { character } = route.params;

  return (
    <View>
      <Image style={styles.avatar} source={{ uri: character.image }} />
      <Text>{character.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: 300,
  },
});
