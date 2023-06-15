import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export const FiltersButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Ionicons name="filter" size={24} color={COLORS.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    bottom: 48,
    padding: 16,
    backgroundColor: COLORS.primaryDarker,
    borderRadius: 32,
  },
});
