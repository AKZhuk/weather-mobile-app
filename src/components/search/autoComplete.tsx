import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MyTheme } from '../../theme';
import { City, Location } from '../../types';

const highlightedText = (
  name: string,
  state: string | undefined,
  inputValue: string,
) => {
  const text = state ? `${name}, ${state}` : name;

  const match = text.slice(0, inputValue.length);
  return (
    <Text style={styles.text}>
      <Text style={styles.text__highlighted}>{match}</Text>
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
        <ScrollView style={styles.container}>
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
              {highlightedText(name, state, inputValue)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    height: '100%',
  },
  text: {
    fontSize: 20,
    color: MyTheme.colors.textSecondary,
    marginBottom: 10,
  },
  text__highlighted: {
    color: MyTheme.colors.text,
    fontWeight: '700',
  },
});
