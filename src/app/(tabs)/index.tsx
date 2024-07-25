// src/app/(tabs)/index.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "@/Components/Card";
import { InfoBox } from "@/Components/InfoBox";
import { Header } from "@/Components/Header";

export default function Inicio() {
  return (
    <View className="flex-1 justify-start items-center bg-white">
      <Header />
      <View className="h-3.5" />
      <Card title="Posto Próximo">
        <View className="items-center">
          <InfoBox>
            <Text>Posto Pedro R. Filho 1.2km</Text>
          </InfoBox>
          <InfoBox>
            <Text>Posta Bruno F. das Dores 2.4km</Text>
          </InfoBox>
        </View>
      </Card>
      <View className="h-5" />
      <Card title="Ficha">
        <Text className="text-left"></Text>
      </Card>
    </View>
  );
}
