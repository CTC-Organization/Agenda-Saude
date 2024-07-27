import { useState } from "react";
import { Image, Pressable } from "react-native";

export function NotificationButton() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  const toggleNotification = () => {
    setIsNotificationOn(!isNotificationOn);
  };

  return (
    <Pressable
      className="w-full h-2/5 justify-center items-center"
      onPress={toggleNotification}
    >
      <Image
        source={
          isNotificationOn
            ? require("@/assets/sino-ativado.png")
            : require("@/assets/sino-desativado.png")
        }
        className="size-full"
        resizeMode="contain"
      />
    </Pressable>
  );
}
