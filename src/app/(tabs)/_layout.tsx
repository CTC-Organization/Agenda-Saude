import { colors } from "@/styles/colors";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.green.light }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Página Inicial",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/inicio.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="RequestScreen"
        options={{
          title: "Requisição",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/requisicao.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(appointments)"
        options={{
          title: "Marcações",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/marcacoes.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Configurações",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather
              name="settings"
              color={color}
              size={30}
              iconStyle={{
                flex: 1,
                aspectRatio: 1,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
