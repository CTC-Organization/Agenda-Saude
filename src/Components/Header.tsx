import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "@/styles/colors";

export function Header() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  const toggleNotification = () => {
    setIsNotificationOn(!isNotificationOn);
  };

  return (
    <View
      className="w-96 h-12 flex-row shrink-0 justify-between items-center 
    opacity-100 px-2.5"
    >
      <Text className="text-black text-base font-normal">Olá, Claúdia</Text>
      <TouchableOpacity onPress={toggleNotification}>
        <Image
          source={
            isNotificationOn
              ? require("@/assets/Sino ativado.png")
              : require("@/assets/Sino desativado.png")
          }
          className="w-3 h-3"
        />
      </TouchableOpacity>
    </View>
  );
}
