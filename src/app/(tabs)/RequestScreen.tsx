import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CarouselComponent } from "@/components/Carousel";
import { showToast } from "@/components/Toast";
import { colors } from "@/styles/colors";
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
    showToast("success", "Cadastro efetuado com sucesso", "Seja bem-vindo!");
    setTimeout(() => {
      router.replace({ pathname: "/AppointmentsScreen" });
    }, 1000);
  };

  const handleItemPress = (id: string) => {
    setSelectedId(id);
    console.log(`Item clicked with id: ${id}`);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-5 gap-5">
      <Text className="text-2xl font-medium">Selecione a especialidade:</Text>
      <View className="flex-1 items-center w-full max-h-32">
        <CarouselComponent data={data} onItemPress={handleItemPress} />
      </View>
      {selectedId !== "" && selectedId !== "clinico" && (
        <View className="w-full items-center">
          <Card>
            <View className="flex-1 justify-center items-center">
              <Image
                source={require("@/assets/requisicao.png")}
                className="size-24 mt-2"
                style={{ tintColor: colors.gray[74] }}
              />
              <Text className="text-base font-normal text-gray-74">
                inserir Arquivos
              </Text>
            </View>
          </Card>
        </View>
      )}
      <View className="flex-1 w-96 items-center mt-8">
        <Button title="Confirmar" onPress={handleRequest} />
      </View>
    </View>
  );
}
