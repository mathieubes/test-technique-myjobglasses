import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

type Props = TouchableOpacityProps & {
  iconName?: keyof typeof Ionicons.glyphMap;
  text: string;
};

export const Button: React.FC<Props> = ({
  iconName,
  text,
  style,
  ...restProps
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...restProps}>
      {iconName && <Ionicons name={iconName} size={24} color={COLORS.white} />}
      <Text style={styles.button__text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    flexDirection: 'row',
    columnGap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarker,
    borderRadius: 10,
  },
  button__text: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});
