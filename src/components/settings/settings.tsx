import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Units } from '../../types';
import { settingsOptions } from '../../constant';
import { SettingButton } from './settingButton';

export default function Settings({
  units,
  setUnits,
}: {
  units: Units;
  setUnits: Dispatch<SetStateAction<Units>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Feather
        name="settings"
        size={24}
        color="white"
        onPress={() => setIsOpen(!isOpen)}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <View style={styles.rightCornerView}>
          <View style={styles.modalView}>
            {settingsOptions.map((option) => (
              <SettingButton
                isActive={units === option.value}
                key={option.name}
                option={option}
                onPress={(text: Units) => {
                  setIsOpen(!isOpen);
                  setUnits(text);
                }}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  rightCornerView: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 120,
  },

  modalView: {
    backgroundColor: '#212121',
    borderRadius: 15,
    width: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
