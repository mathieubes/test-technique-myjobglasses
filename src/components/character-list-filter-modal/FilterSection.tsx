import { PropsWithChildren } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../../constants/colors';

type Props = PropsWithChildren & {
  title: string;
};

export const FilterSection: React.FC<Props> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.section__title}>{title}</Text>

      <View style={styles.section__content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    rowGap: 8,
  },
  section__title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.dark,
  },
  section__content: {
    flexDirection: 'row',
    columnGap: 16,
  },
});
