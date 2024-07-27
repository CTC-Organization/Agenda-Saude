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
              source={require("@/assets/inicio.png")}
              className="size-full"
              resizeMode="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="RequisicaoScreen"
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
        name="MarcacoesScreen"
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
        name="PerfilScreen"
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
    </Tabs>
  );
}
