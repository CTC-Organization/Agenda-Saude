import { useState } from "react";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "nativewind";
import * as Notifications from "expo-notifications";

export function NotificationButton() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false); // Estado para desabilitar o botão
  const { colorScheme } = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const iconColor = isDarkTheme ? "white" : "black";

  const toggleNotification = async () => {
    if (isDisabled) return; // Impede a função de ser chamada se o botão estiver desabilitado

    setIsDisabled(true); // Desabilita o botão

    if (isNotificationOn) {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Notificação Ativada",
          body: "Notificações estão ativas.",
        },
        trigger: { seconds: 2 },
      });
    }

    setIsNotificationOn(!isNotificationOn);

    // Reabilita o botão após 2 segundos
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  return (
    <Pressable onPress={toggleNotification} disabled={isDisabled}>
      {isNotificationOn ? (
        <MaterialCommunityIcons name="bell-ring" size={24} color={iconColor} />
      ) : (
        <MaterialCommunityIcons
          name="bell-cancel"
          size={24}
          color={iconColor}
        />
      )}
    </Pressable>
  );
}
