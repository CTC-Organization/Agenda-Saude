import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Home.png")}
              className="size-fit"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="agendar"
        options={{
          title: "Agendar",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Agendar.png")}
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
        name="mais"
        options={{
          title: "Mais",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("@/assets/Mais.png")}
              className="size-fit"
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
