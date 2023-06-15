import { StyleSheet, Text, TextInput, View } from 'react-native';
import { FilterSection } from '../components/character-list-filter-modal/FilterSection';
import { COLORS } from '../constants/colors';
import { Badge } from '../components/badges/Badge';
import { useContext } from 'react';
import { FilterContext } from '../contexts/FilterContext';
import { ScrollView } from 'react-native-gesture-handler';

export const CharacterListFilterModal = () => {
  const {
    nameFilter,
    setNameFilter,
    genderFilter,
    updateGenderFilter,
    statusFilter,
    updateStatusFilter,
  } = useContext(FilterContext);

  return (
    <ScrollView>
      <View style={styles.filters}>
        <Text style={styles.filters__title}>Filters</Text>

        <FilterSection title="Name">
          <TextInput
            style={styles.filters__textInput}
            placeholder="Rick Sanchez"
            value={nameFilter}
            onChangeText={setNameFilter}
          />
        </FilterSection>

        <FilterSection title="Gender">
          <Badge
            iconName="male-outline"
            style={[
              styles.filters__badge,
              genderFilter === 'Male' && styles.filters__badge_selected,
            ]}
            iconColor={COLORS.dark}
            onPress={() => updateGenderFilter!('Male')}
          />
          <Badge
            iconName="female-outline"
            style={[
              styles.filters__badge,
              genderFilter === 'Female' && styles.filters__badge_selected,
            ]}
            iconColor={COLORS.dark}
            onPress={() => updateGenderFilter!('Female')}
          />
          <Badge
            iconName="male-female-outline"
            style={[
              styles.filters__badge,
              genderFilter === 'Genderless' && styles.filters__badge_selected,
            ]}
            iconColor={COLORS.dark}
            onPress={() => updateGenderFilter!('Genderless')}
          />
          <Badge
            iconName="help-outline"
            style={[
              styles.filters__badge,
              genderFilter === 'unknown' && styles.filters__badge_selected,
            ]}
            iconColor={COLORS.dark}
            onPress={() => updateGenderFilter!('unknown')}
          />
        </FilterSection>

        <FilterSection title="Status">
          <Badge
            iconName="heart-outline"
            style={[
              styles.filters__badge,
              statusFilter === 'Alive' && styles.filters__badge_selected,
            ]}
            iconColor={COLORS.dark}
            onPress={() => updateStatusFilter!('Alive')}
          />
          <Badge
            iconName="skull-outline"
            style={[
              styles.filters__badge,
              statusFilter === 'Dead' && styles.filters__badge_selected,
            ]}
            iconColor={COLORS.dark}
            onPress={() => updateStatusFilter!('Dead')}
          />
          <Badge
            iconName="help-outline"
            style={[
              styles.filters__badge,
              statusFilter === 'unknown' && styles.filters__badge_selected,
            ]}
            iconColor={COLORS.dark}
            onPress={() => updateStatusFilter!('unknown')}
          />
        </FilterSection>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filters: {
    padding: 16,
    rowGap: 32,
  },
  filters__title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  filters__textInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.offWhite,
    borderRadius: 8,
    fontSize: 16,
  },
  filters__badge: {
    backgroundColor: COLORS.offWhite,
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  filters__badge_selected: {
    borderColor: COLORS.primary,
  },
});
