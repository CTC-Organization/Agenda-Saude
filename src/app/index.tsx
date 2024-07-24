import { Input } from "@/Components/input";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Button } from "@/Components/button";
import Checkbox from "@/Components/checkbox";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (cpf.trim() === "" || password.trim() === "") {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    router.replace("(tabs)");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-8">
      <View className="w-full gap-3">
        <Input>
          <Input.Field placeholder="CPF" value={cpf} onChangeText={setCpf} />
        </Input>
        <Input>
          <Input.Field
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <Pressable onPress={togglePasswordVisibility}>
            <Text className="text-green-light">
              {passwordVisible ? "Esconder" : "Mostrar"}
            </Text>
          </Pressable>
        </Input>
        <View className="w-full items-center justify-center">
          <Checkbox text="Conectar Automaticamente" />
        </View>
      </View>
      <View className="mt-36"></View>
      <View className="flex-1 w-96 items-center mt-12">
        <Button title="Fazer Login" onPress={handleLogin} />
      </View>
    </View>
  );
}
