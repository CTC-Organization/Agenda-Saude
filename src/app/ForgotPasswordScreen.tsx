import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { showToast } from "@/components/Toast";
import { colors } from "@/styles/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
});

export default function Profile() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const handleForgot = () => {
    showToast(
      "success",
      "Email para redefinir senha enviado",
      "Foi enviado o código para seu email"
    );
    setTimeout(() => {
      router.navigate({ pathname: "/" });
    }, 2000);
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-800 items-center justify-center gap-7">
      <View className="w-11/12 gap-5 justify-center mt-8">
        <Input>
          <Input.Field
            control={control}
            name="email"
            placeholder="E-mail"
            keyboardType="email-address"
          />
        </Input>
      </View>
      <View className="w-96 justify-center mt-5">
        <Button
          title={"Redefinir Senha"}
          onPress={handleSubmit(handleForgot)}
          backgroundColor={colors.ButtonBackground}
          color={colors.ButtonText}
          size={"h-16 w-full"}
          border="rounded-2xl"
        />
      </View>
      <Link href={"/"}>
        <Text className="font-regular text-base font-normal text-LinkText">
          Voltar ao login
        </Text>
      </Link>
    </View>
  );
}
