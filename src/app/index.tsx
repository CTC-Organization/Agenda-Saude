import { Input } from "@/Components/input";
import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Button } from "@/Components/button";
import Checkbox from "@/Components/checkbox";

const handleLogin = () => {
  router.replace("(tabs)");
};

export default function Login() {
  return (
    <View className="flex-1 bg-white items-center justify-center p-8">
      <View className="w-full gap-3 justify-center">
        <Input>
          <Input.Field placeholder="CPF" />
        </Input>
        <Input>
          <Input.Field placeholder="Senha" />
          <Pressable>
            <Text className="text-green-light">Mostrar</Text>
          </Pressable>
        </Input>
        <View className="w-full items-center justify-center	">
          <Checkbox text="Conectar Automaticamente" />
        </View>
      </View>
      <View className="mt-36"></View>
      <View className="flex-1 w-full mt-12">
        <Button title="Fazer Login" onPress={handleLogin} />
      </View>
    </View>
  );
}
