import { Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  style?: object;
  iconColor?: string;
  onPress?: () => void;
};

export const Badge: React.FC<Props> = ({
  iconName,
  style,
  iconColor,
  onPress,
}) => {
  return (
    <Pressable
      style={[styles.badge, style]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={iconColor || COLORS.offWhite}
      />
    </Pressable>
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
