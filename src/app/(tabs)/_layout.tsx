import { colors } from "@/styles/colors";
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
        name="AppointmentsScreen"
        options={{
          title: "Marcações",
          headerTitleAlign: "center",
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
        name="ProfileScreen"
        options={{
          title: "Perfil",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/perfil.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="DetailsScreen"
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
