import { Card } from "@/components/Card";
import { InfoBox } from "@/components/InfoBox";
import { NotificationButton } from "@/components/NotificationButton";
import React from "react";
import { Text, View } from "react-native";

export default function Home() {
  const username = "Claúdia";
  return (
    <View className="flex-1 justify-start items-center bg-white">
      <View
        className="w-full h-12 flex-row shrink-0 justify-between items-center 
    opacity-100 px-2.5"
      >
        <Text className="text-black text-base font-normal ms-5">
          Olá, {username}
        </Text>
        <View className="mx-6" />
        <NotificationButton />
      </View>
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
