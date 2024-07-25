import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Página Inicial",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Início.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Requisicao"
        options={{
          title: "Requisição",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Requisição.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Marcacoes"
        options={{
          title: "Marcações",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Marcações.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: "Perfil",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Perfil.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
