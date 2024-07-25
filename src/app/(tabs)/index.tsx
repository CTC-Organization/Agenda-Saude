// src/app/(tabs)/index.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/Components/Card';
import { InfoBox } from '@/Components/InfoBox';
import { Header } from '@/Components/Header';

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spacing} />
      <Card title="Posto Próximo">
        <View style={styles.infoBoxContainer}>
          <InfoBox>
            <Text>Posto Pedro R. Filho 1.2km</Text>
          </InfoBox>
          <InfoBox>
            <Text>Posta Bruno F. das Dores 2.4km</Text>
          </InfoBox>
        </View>
      </Card>
      <View style={styles.cardSpacing} />
      <Card title="Ficha">
        <Text style={styles.cardText}></Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  spacing: {
    height: 14,
  },
  infoBoxContainer: {
    alignItems: "center",
  },
  cardSpacing: {
    height: 20,
  },
  cardText: {
    textAlign: "left",
  },
});
