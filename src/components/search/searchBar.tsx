import React, { Dispatch, SetStateAction, useState } from 'react';
import { StyleSheet, TextInput, View, Button, Keyboard } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { fetchLocation } from '../../api/weather';
import { debounce } from 'lodash';
import { MyTheme } from '../../theme';
import Settings from '../settings/settings';
import { City, Location, Units } from '../../types';
import AutoComplete from './autoComplete';

const SearchBar = ({
  onSearch,
  units,
  setUnits,
}: {
  onSearch: (city: City) => void;
  units: Units;
  setUnits: Dispatch<SetStateAction<Units>>;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [clicked, setClicked] = useState(false);

  const search = async (text: string) => {
    const data = await fetchLocation(text);
    setLocations(data);
  };

  const onSelectLocation = (city: City) => {
    onSearch(city);
    setLocations([]);
    setClicked(false);
  };

  const debouncedSearch = debounce(search, 500);
  const clearSearch = () => {
    setInputValue('');
    setLocations([]);
  };

  return (
    <View style={clicked ? styles.wrapper__clicked : {}}>
      <View style={styles.container}>
        <View
          style={
            clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
          }
        >
          <Feather
            name="search"
            size={20}
            color="gray"
            style={{ marginLeft: 1 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search for a city"
            placeholderTextColor="gray"
            value={inputValue}
            onChangeText={(text: string) => {
              setInputValue(text);
              debouncedSearch(text);
            }}
            onFocus={() => {
              setClicked(true);
            }}
          />
          {clicked && (
            <Entypo
              name="cross"
              size={20}
              color="gray"
              style={{ padding: 1 }}
              onPress={clearSearch}
            />
          )}
        </View>
        {clicked ? (
          <Button
            title="Cancel"
            color="#FFF"
            onPress={() => {
              setClicked(false);
              Keyboard.dismiss();
              clearSearch();
            }}
          ></Button>
        ) : (
          <Settings units={units} setUnits={setUnits}></Settings>
        )}
      </View>
      <AutoComplete
        inputValue={inputValue}
        locations={locations}
        onSelect={onSelectLocation}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrapper__clicked: {
    zIndex: 5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: MyTheme.colors.secondaryBackground,
    opacity: 0.8,
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#212121',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '80%',
    color: MyTheme.colors.text,
  },
});
