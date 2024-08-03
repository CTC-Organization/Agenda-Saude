import { Button } from "@/components/Button";
import { DateInput } from "@/components/DateInput";
import { Input } from "@/components/Input";
import showToast from "@/components/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  date: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida, use o formato dd/mm/yyyy"),
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
  email: z.string().email("E-mail inválido"),
  age: z.number().int().positive(),
});

export default function Profile() {
  const [editable, setEditable] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      date: "",
      cpf: "",
      sus: "",
      phone: "",
      email: "",
      age: 0,
    },
    resolver: zodResolver(schema),
  });

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
        />
      </View>
    </View>
  );
}
