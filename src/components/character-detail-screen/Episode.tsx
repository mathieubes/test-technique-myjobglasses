import { View, Text, StyleSheet } from 'react-native';
import { IEpisode } from '../../models/episode.model';

export const Episode: React.FC<IEpisode> = ({ episode, name, air_date }) => {
  return (
    <View style={styles.episode}>
      <Text style={styles.episode__code}>{episode}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.episode__name}>{name}</Text>
        <Text>{air_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  episode: {
    marginVertical: 8,
    flexDirection: 'row',
    columnGap: 16,
  },
  episode__code: {
    flex: 0.4,
    fontSize: 20,
    fontWeight: 'bold',
  },
  episode__name: {
    fontSize: 16,
    fontWeight: '600',
  },
});
