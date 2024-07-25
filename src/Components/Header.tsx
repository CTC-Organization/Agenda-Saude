import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

export function Header() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  const toggleNotification = () => {
    setIsNotificationOn(!isNotificationOn);
  };

  return (
    <View
      className="w-full h-12 flex-row shrink-0 justify-between items-center 
    opacity-100 px-2.5"
    >
      <Text className="text-black text-base font-normal ms-5">
        Olá, Claúdia
      </Text>
      <View className="mx-6" />
      <TouchableOpacity
        className="w-full h-2/5 justify-center items-center"
        onPress={toggleNotification}
      >
        <Image
          source={
            isNotificationOn
              ? require("@/assets/Sino ativado.png")
              : require("@/assets/Sino desativado.png")
          }
          className="size-full"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
