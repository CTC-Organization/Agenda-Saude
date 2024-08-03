import "@/styles/global.css";
import { Stack } from "expo-router/stack";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Agenda Saúde",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          options={{
            title: "Cadastro",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          options={{
            title: "Esqueci minha senha",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
