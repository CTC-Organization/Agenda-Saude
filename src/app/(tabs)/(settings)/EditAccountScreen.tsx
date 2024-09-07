import { Button } from "@/components/Button";
import { DateInput } from "@/components/DateInput";
import { Input } from "@/components/Input";
import { showToast } from "@/components/Toast";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/styles/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  birthDate: z
    .string()
    .min(1, "Data de Nascimento é obrigatória")
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      "Data inválida, use o formato yyyy-MM-ddTHH:mm:ss.sssZ"
    ),
  susNumber: z
    .string()
    .regex(/^\d+$/, "N° do SUS deve conter apenas números")
    .length(15, "N° do SUS deve ter exatamente 15 caracteres"),
  phoneNumber: z
    .string()
    .regex(/^\d{2}9\d{8}$/, "Telefone inválido, use o formato dd9seunúmero")
    .length(11, "N° do SUS deve ter exatamente 15 caracteres"),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function Profile() {
  const [editable, setEditable] = useState(false);
  const { user } = useUserStore();
  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  setValue("name", user?.name || "");
  setValue("birthDate", user?.birthDate || "");
  setValue("susNumber", user?.susNumber || "");
  setValue("phoneNumber", user?.phoneNumber || "");
  setValue("email", user?.email || "");

  const handleEdit = () => {
    if (editable) {
      handleSubmit(onSubmit)();
    } else {
      setEditable(true);
    }
  };

  const onSubmit = (data: any) => {
    showToast(
      "success",
      "Informações atualizadas",
      "Suas informações foram atualizadas com sucesso"
    );
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="w-11/12 gap-5 justify-center mt-8">
        <Input>
          <Input.Field
            control={control}
            name="name"
            placeholder="Nome"
            editable={editable}
          />
        </Input>
        <Input>
          <DateInput
            control={control}
            name="date"
            placeholder="Data de Nascimento"
            editable={editable}
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="cpf"
            placeholder="CPF"
            editable={editable}
            keyboardType="numeric"
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="sus"
            placeholder="N° do SUS"
            editable={editable}
            keyboardType="numeric"
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="phone"
            placeholder="Telefone"
            editable={editable}
            keyboardType="number-pad"
          />
        </Input>
        <Input>
          <Input.Field
            control={control}
            name="email"
            placeholder="E-mail"
            editable={editable}
            keyboardType="email-address"
          />
        </Input>
      </View>
      <View className="w-96 justify-center mt-5">
        <Button
          title={editable ? "Confirmar" : "Editar informações"}
          onPress={handleEdit}
          backgroundColor={colors.ButtonBackground}
          color={colors.ButtonText}
          size={"h-16 w-full"}
          border="rounded-2xl"
        />
      </View>
    </View>
  );
}
