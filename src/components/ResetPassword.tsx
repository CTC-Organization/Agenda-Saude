import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { showToast } from "@/components/Toast";
import { colors } from "@/styles/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

// Definição do schema para validação do e-mail
const schema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
});

// Definindo o tipo de onSuccess como uma função sem retorno específico (void)
interface ResetPasswordProps {
  onSuccess: () => void;
}

export function ResetPassword({ onSuccess }: ResetPasswordProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const handleResetPassword = () => {
    showToast(
      "success",
      "Email para redefinir senha enviado",
      "Foi enviado o código para seu email"
    );
    onSuccess(); // Chama a função de sucesso passada por props
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
          onPress={handleSubmit(handleResetPassword)}
          backgroundColor={colors.ButtonBackground}
          color={colors.ButtonText}
          size={"h-16 w-full"}
          border="rounded-2xl"
        />
      </View>
    </View>
  );
}
