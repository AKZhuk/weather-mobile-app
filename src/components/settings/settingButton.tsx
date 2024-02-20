import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UnitOption, Units } from '../../types';
import { MyTheme } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';

export const SettingButton = ({
  onPress,
  option,
  isActive,
}: {
  onPress: (text: Units) => void;
  option: UnitOption;
  isActive: boolean;
}) => {
  return (
    <Pressable
      onPress={() => {
        onPress(option.value);
      }}
      style={{
        ...styles.button,
        borderBottomWidth: option.value === 'metric' ? 1 : 0,
      }}
    >
      <View style={styles.row}>
        {isActive ? (
          <MaterialIcons name="check" size={18} color={MyTheme.colors.text} />
        ) : (
          <View style={styles.imgPlaceholder} />
        )}
        <Text style={styles.textStyle}>{option.name}</Text>
      </View>
      <Text style={[styles.textStyle, styles.unitsSymbol]}>
        °{option.name[0]}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  imgPlaceholder: {
    width: 18,
    height: 18,
  },
  button: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: MyTheme.colors.border,
  },
  textStyle: {
    color: '#FFF',
    fontSize: 18,
  },
  unitsSymbol: { fontWeight: '700' },
});
