import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { showToast } from "@/components/Toast";
import { colors } from "@/styles/colors";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";

const data = [
  {
    id: "clinico",
    Image: require("@/assets/inicio.png"),
    note: "Clínico Geral",
  },
  {
    id: "cardiologia",
    Image: require("@/assets/perfil.png"),
    note: "Cardiologia",
  },
  {
    id: "psicologo",
    Image: require("@/assets/sino-ativado.png"),
    note: "Psicólogo",
  },
  { id: "odonto", Image: require("@/assets/inicio.png"), note: "Odontologia" },
  {
    id: "ginecologia",
    Image: require("@/assets/perfil.png"),
    note: "Ginecologia",
  },
  {
    id: "proctologia",
    Image: require("@/assets/sino-ativado.png"),
    note: "Proctologia",
  },
];

export default function RequestScreen() {
  const [selectedId, setSelectedId] = useState("");

  const handleRequest = () => {
    showToast(
      "success",
      "Requisição efetuada com sucesso",
      "Adicionada a sua lista"
    );
    setTimeout(() => {
      router.replace("/HomeScreen");
    }, 1000);
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-800 items-center justify-center p-5 gap-5">
      <Text
        className="font-regular text-2xl font-medium justify-start mt-14 
      text-TextPrimary dark:text-white"
      >
        Selecione a especialidade:
      </Text>
      <View className="w-full max-h-32 my-14">
        <Picker
          selectedValue={selectedId}
          onValueChange={(itemValue) => setSelectedId(itemValue)}
          style={{
            width: "100%",
            height: 50,
            color: colors.TextPrimary,
            backgroundColor: colors.InputBackground,
            elevation: 5,
          }}
        >
          {data.map((item) => (
            <Picker.Item key={item.id} label={item.note} value={item.id} />
          ))}
        </Picker>
      </View>
      {selectedId !== "" && selectedId !== "clinico" && (
        <View className="w-full items-center justify-center">
          <Card size="w-5/6 h-[200px]">
            <View className="flex-1 justify-center items-center">
              <Image
                source={require("@/assets/requisicao.png")}
                className="size-24 mt-2 opacity-50"
                style={{ tintColor: colors.TextPrimary }}
              />
              <Text className="text-base font-normal opacity-50 text-TextPrimary">
                inserir Arquivos
              </Text>
            </View>
          </Card>
        </View>
      )}
      <View className="flex-1 w-96 items-center my-14">
        <Button
          title="Confirmar"
          onPress={handleRequest}
          backgroundColor={colors.ButtonBackground}
          color={colors.ButtonText}
          size={"h-16 w-full"}
          border="rounded-2xl border border-ButtonBorder"
        />
      </View>
    </View>
  );
}
