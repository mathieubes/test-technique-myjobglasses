import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  style?: object;
};

export const Badge: React.FC<Props> = ({ iconName, style }) => {
  return (
    <View style={[styles.badge, style]}>
      <Ionicons name={iconName} size={24} color={COLORS.offWhite} />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    padding: 8,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.dark,
    borderRadius: 8,
  },
});
