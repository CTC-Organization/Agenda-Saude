import "@/styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router/stack";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

const queryCLient = new QueryClient();

export default function Layout() {
  const { width } = useWindowDimensions();

  return (
    <>
      <QueryClientProvider client={queryCLient}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Agenda Saúde",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: width > 390 ? 20 : 16,
              },
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            options={{
              title: "Cadastro",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: width > 390 ? 20 : 16,
              },
            }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            options={{
              title: "Esqueci minha senha",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: width > 390 ? 20 : 16,
              },
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </QueryClientProvider>
    </>
  );
}
