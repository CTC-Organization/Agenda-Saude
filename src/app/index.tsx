import { Input } from "@/Components/input";
import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const handleLogin = () => {
  router.replace("(tabs)");
};

export default function Login() {
  return (
    <View className="flex-1 bg-white items-center p-8">
      <View className="w-full gap-3">
        <Input>
          <Input.Field placeholder="CPF" />
        </Input>
        <Input>
          <Input.Field placeholder="CPF" />
          <Text>Mostrar</Text>
        </Input>
      </View>
      <View className="mt-12">
        <Button title="vá para tabs" onPress={handleLogin} />
      </View>
    </View>
  );
}
