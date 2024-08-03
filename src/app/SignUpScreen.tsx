import { Button } from "@/components/Button";
import { DateInput } from "@/components/DateInput";
import { Input } from "@/components/Input";
import { showToast } from "@/components/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import * as z from "zod";

const schema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    date: z
      .string()
      .min(1, "Data de Nascimento é obrigatória")
      .regex(
        /^\d{2}\/\d{2}\/\d{4}$/,
        "Data inválida, use o formato dd/mm/yyyy"
      ),
    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .regex(/^\d+$/, "CPF deve conter apenas números")
      .length(11, "CPF deve ter exatamente 11 caracteres"),
    sus: z
      .string()
      .regex(/^\d+$/, "N° do SUS deve conter apenas números")
      .length(15, "N° do SUS deve ter exatamente 15 caracteres"),
    phone: z
      .string()
      .regex(/^\d{2}9\d{8}$/, "Telefone inválido, use o formato dd9seunúmero")
      .length(11, "N° do SUS deve ter exatamente 15 caracteres"),
    email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
    age: z.number().int().positive().min(1, "Idade é obrigatória"),
    password: z.string().min(1, "Senha é obrigatória"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function Profile() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      date: "",
      cpf: "",
      sus: "",
      phone: "",
      email: "",
      age: 0,
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = () => {
    showToast("success", "Cadastro efetuado com sucesso", "Seja bem-vindo!");
    setTimeout(() => {
      router.replace({ pathname: "/(tabs)" });
    }, 1000);
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="w-11/12 gap-5 justify-center mt-8">
        <Input>
          <Input.Field control={control} name="name" placeholder="Nome" />
        </Input>
        <Input>
          <DateInput
            name="date"
            placeholder="Data de Nascimento"
            editable={true}
            control={control}
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="cpf"
            placeholder="CPF"
            keyboardType="numeric"
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="sus"
            placeholder="N° do SUS"
            keyboardType="numeric"
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="phone"
            placeholder="Telefone"
            keyboardType="number-pad"
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="email"
            placeholder="E-mail"
            keyboardType="email-address"
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
        <Input>
          <Input.Field
            control={control}
            name="confirmPassword"
            placeholder="Confirme sua senha"
            secureTextEntry={!passwordVisible}
          />
          <Pressable onPress={togglePasswordVisibility}>
            <Text className="text-green-light">
              {passwordVisible ? "Esconder" : "Mostrar"}
            </Text>
          </Pressable>
        </Input>
      </View>
      <View className="w-96 justify-center mt-5">
        <Button title={"Confirmar"} onPress={handleSubmit(handleLogin)} />
      </View>
    </View>
  );
}
