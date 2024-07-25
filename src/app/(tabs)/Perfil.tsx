import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";
import { useState } from "react";
import { View } from "react-native";

export default function Tab() {
  const [editable, setEditable] = useState(false);

  const handleEditar = () => {
    setEditable(!editable);
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="w-11/12 gap-5 justify-center mt-8">
        <Input>
          <Input.Field placeholder="Nome" editable={editable} />
        </Input>
        <Input>
          <Input.Field placeholder="Data de Nascimento" editable={editable} />
        </Input>
        <Input>
          <Input.Field placeholder="CPF" editable={editable} />
        </Input>
        <Input>
          <Input.Field placeholder="N° do SUS" editable={editable} />
        </Input>
        <Input>
          <Input.Field placeholder="Telefone" editable={editable} />
        </Input>
        <Input>
          <Input.Field placeholder="E-mail" editable={editable} />
        </Input>
      </View>
      <View className="w-96 justify-center mt-5">
        <Button
          title={editable ? "Confirmar" : "Editar informações"}
          onPress={handleEditar}
        />
      </View>
    </View>
  );
}
