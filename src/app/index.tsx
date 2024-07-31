import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import showToast from "@/components/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import * as z from "zod";

const schema = z.object({
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .length(11, "CPF deve ter exatamente 11 caracteres"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      cpf: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const handleLogin = () => {
    showToast("success", "Login efetuado com sucesso", "Seja bem-vindo!");
    setTimeout(() => {
      router.replace({ pathname: "/(tabs)" });
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-8">
      <View className="w-full gap-3">
        <Input>
          <Input.Field
            control={control}
            name="cpf"
            placeholder="Digite seu CPF"
            keyboardType="numeric"
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="password"
            placeholder="Digite sua senha"
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
        <Button title="Fazer Login" onPress={handleSubmit(handleLogin)} />
      </View>
    </View>
  );
}
