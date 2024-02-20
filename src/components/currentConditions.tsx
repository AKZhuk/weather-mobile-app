import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MyTheme } from '../theme';
export interface Condition {
  title: string;
  value: string;
}

const ConditionCard = ({ title, value }: Condition) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function CurrentConditions({ data }: { data: Condition[] }) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {data.map((item: Condition) => (
        <ConditionCard
          key={item.title}
          title={item.title}
          value={item.value}
        ></ConditionCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 15,
  },
  text: {
    fontSize: 42,
  },
  row: {
    justifyContent: 'space-between',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 5,
  },

  item: {
    width: '48%',
    padding: 15,
    backgroundColor: MyTheme.colors.secondaryBackground,
    marginVertical: 8,
    borderRadius: 15,
    opacity: 0.6,
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: MyTheme.colors.text,
    opacity: 1,
  },
  title: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: MyTheme.colors.textSecondary,
  },
  justifyContent: { justifyContent: 'space-between', flex: 1 },
});
