import { useState } from "react";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "nativewind";

export function NotificationButton() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const { colorScheme } = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const iconColor = isDarkTheme ? "white" : "black";

  const toggleNotification = () => {
    setIsNotificationOn(!isNotificationOn);
  };

  return (
    <Pressable onPress={toggleNotification}>
      {isNotificationOn ? (
        <MaterialCommunityIcons name="bell-ring" size={24} color={iconColor} />
      ) : (
        <MaterialCommunityIcons name="bell-cancel" size={24} color={iconColor} />
      )}
    </Pressable>
  );
}
