import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MyTheme } from '../../theme';
import { City, Location } from '../../types';

const highlightedText = (text: string, inputValue: string) => {
  const match = text.slice(0, inputValue.length);

  return (
    <Text style={styles.suggestText}>
      <Text style={styles.highlighted}>{match}</Text>
      {text.slice(inputValue.length)}
    </Text>
  );
};

export default function AutoComplete({
  locations,
  inputValue,
  onSelect,
}: {
  locations: Location[];
  inputValue: string;
  onSelect: (city: City) => void;
}) {
  return (
    <>
      {locations.length > 0 ? (
        <ScrollView style={styles.suggest}>
          {locations?.map(({ lon, lat, name, state }, idx) => (
            <TouchableOpacity
              key={lon + lat + idx}
              onPress={() => {
                onSelect({
                  name,
                  coordinates: { lon, lat },
                });
              }}
            >
              {highlightedText(`${name}, ${state}`, inputValue)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  suggest: {
    flex: 1,
    padding: 30,
    height: '100%',
  },
  suggestText: {
    fontSize: 20,
    color: MyTheme.colors.textSecondary,
    marginBottom: 10,
  },
  highlighted: {
    color: MyTheme.colors.text,
    fontWeight: '700',
  },
});
