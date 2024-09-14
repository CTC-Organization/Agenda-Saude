import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { refreshToken } from "@/app/api/tokenService";
import { useUserStore } from "@/store/userStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}
async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;

      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`erro d: ${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export async function mobileDeviceCheckIn(patientId: string) {
  const expoToken = await registerForPushNotificationsAsync();
  console.log(expoToken);
  await fetchWithAuthNotification(
    `mobile-devices/${patientId}`,
    "POST",
    { expoToken },
    "application/json"
  );
}

const fetchWithAuthNotification = async (
  endpoint: string,
  method: string = "GET",
  body: any = null,
  contentType: string = "application/json"
) => {
  const { tokens } = useUserStore.getState();

  const headers: HeadersInit = {
    "Content-Type": contentType,
  };

  if (tokens?.accessToken) {
    headers["Authorization"] = `Bearer ${tokens.accessToken}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: body
      ? contentType === "application/json"
        ? JSON.stringify(body)
        : body
      : undefined,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    // Se a resposta for 401 (não autorizado), tenta atualizar o token
    if (response.status === 401) {
      if (!tokens?.refreshToken) {
        throw new Error("Refresh token não disponível");
      }

      // Atualiza o token
      const newTokens = await refreshToken(tokens.refreshToken);
      useUserStore.getState().setTokens(newTokens);

      // Reenvia a requisição com o novo token
      headers["Authorization"] = `Bearer ${newTokens.accessToken}`;
      const retryResponse = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      // Checa se o conteúdo não é nulo
      const retryResponseText = await retryResponse.text();
      if (retryResponseText && retryResponseText?.length > 0) {
        const result = JSON.parse(retryResponseText);
        return result;
      }
      return null; // Retorna null se não houver conteúdo
    }

    // Checa se o conteúdo não é nulo
    const responseText = await response.text();
    if (responseText && responseText?.length > 0) {
      const result = JSON.parse(responseText);
      return result;
    }

    return null; // Retorna null se não houver conteúdo
  } catch (error) {
    console.error("Erro ao realizar requisição:", error);
    throw error;
  }
};
