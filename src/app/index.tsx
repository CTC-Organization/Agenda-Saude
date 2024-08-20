import { fetchWithAuth } from "@/app/api/apiClient";
import { login } from "@/app/api/auth";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { showToast } from "@/components/Toast";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as z from "zod";

const schema = z.object({
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .length(11, "CPF deve ter exatamente 11 caracteres"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { setUser, setTokens, setSaveTokens, loadStore } = useUserStore();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      cpf: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async ({
      cpf,
      password,
    }: {
      cpf: string;
      password: string;
    }) => {
      const loginData = await login(cpf, password);
      const { accessToken, refreshToken, id, userId } = loginData;

      await loadStore();
      setSaveTokens(isChecked);
      setTokens({ accessToken, refreshToken });

      const patientData = await fetchWithAuth(`patients/${id}`);

      return { id, userId, ...patientData };
    },
    onSuccess: async (data) => {
      const {
        id,
        userId,
        email,
        cpf,
        name,
        phoneNumber,
        susNumber,
        birthDate,
      } = data;

      setUser({
        userId,
        id,
        name,
        birthDate,
        cpf,
        susNumber,
        phoneNumber,
        email,
      });

      showToast("success", "Login efetuado com sucesso", "Seja bem-vindo!");

      setTimeout(() => {
        router.replace("/(tabs)/");
      }, 1000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        showToast("error", "Falha no login", error.message);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
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
            <View className="w-full items-start justify-start">
              <Checkbox
                text="Mantenha-me Conectado"
                onPress={(isChecked) => setIsChecked(isChecked)}
              />
            </View>
            <View className="w-full items-end justify-end">
              <Link href={"/ForgotPasswordScreen"}>
                <Text className="text-sky-500">Esqueci minha senha</Text>
              </Link>
            </View>
          </View>
          <View className="mt-36"></View>
          <View className="flex-1 w-96 items-center mt-12">
            <Button
              title="Fazer Login"
              onPress={handleSubmit(onSubmit)}
              isLoading={mutation.isPending}
            />
          </View>
          <View className="w-full flex-row flex-wrap items-center justify-center gap-2">
            <Text>Ainda não possui uma conta?</Text>
            <Link href={"/SignUpScreen"}>
              <Text className="text-sky-500">Cadastre-se</Text>
            </Link>
          </View>
          <View>
            <Link href={"/(settings)/SettingsScreen"}>
              <Text className="text-red-700">TESTE: Tela de Perfil</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
