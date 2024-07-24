import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Início.png")}
              className="size-fit"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="requisicao"
        options={{
          title: "Requisição",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Requisição.png")}
              className="size-fit"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="marcacoes"
        options={{
          title: "Marcações",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Marcações.png")}
              className="size-fit"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Perfil.png")}
              className="size-fit"
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
