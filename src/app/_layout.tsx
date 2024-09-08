import { Loading } from "@/components/Loading";
import "@/styles/global.css";
import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router/stack";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { ImageBackground, useWindowDimensions, View } from "react-native";
import Toast from "react-native-toast-message";

const queryCLient = new QueryClient();

export default function Layout() {
  const { width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({ Inter_400Regular });
  const [loading, setLoading] = useState(true);
  const { colorScheme } = useColorScheme();

  const titleColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";
  const headerBackgroundColor = colorScheme === "dark" ? "#1F2937" : "#FFFFFF";

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  if (!fontsLoaded || loading) {
    return (
      <>
        <ImageBackground
          source={require("../../assets/images/splash.png")}
          resizeMode="cover"
          className="flex-1 items-center bg-cover"
        ></ImageBackground>
        <View
          className="flex-1 absolute top-80 bottom-0 inset-x-0 items-center justify-center"
          style={{ zIndex: 999 }}
        >
          <Loading />
        </View>
      </>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryCLient}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Agenda Saúde",
              headerStyle: { backgroundColor: headerBackgroundColor },
              headerTintColor: titleColor,
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: width > 390 ? 20 : 16,
                fontFamily: "Inter_400Regular",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            options={{
              title: "Cadastro",
              headerStyle: { backgroundColor: headerBackgroundColor },
              headerTintColor: titleColor,
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: width > 390 ? 20 : 16,
                fontFamily: "Inter_400Regular",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            options={{
              title: "Esqueci minha senha",
              headerStyle: { backgroundColor: headerBackgroundColor },
              headerTintColor: titleColor,
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: width > 390 ? 20 : 16,
                fontFamily: "Inter_400Regular",
                fontWeight: "bold",
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
