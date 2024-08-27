import { Card } from "@/components/Card";
import { LocationButton2 } from "@/components/LocationButton2";
import { StatusCard } from "@/components/StatusCard";
import { useUserStore } from "@/store/userStore";
import { Linking, Text, View } from "react-native";

export default function DetailsScreen() {
  const { user } = useUserStore();

  const username = user?.name || "Usuário";
  const requestName = "Nome da Consulta";
  const status = "Negada";

  const openMaps = () => {
    const url = "https://www.google.com/maps";
    Linking.openURL(url).catch((err: Error) =>
      console.error("Erro ao abrir o mapa", err)
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="w-full h-12 flex-row justify-center items-center opacity-100 mt-10">
        <Text className="text-black text-xl font-normal">
          Bem Vind@, {username}
        </Text>
      </View>
      <View className="w-full items-center mt-4">
        <Text className="text-lg font-semibold text-center">{requestName}</Text>
        <View className="border-b-black border-b w-4/5 mt-2" />
      </View>
      <View className="items-center mt-4">
        <Card title="Ficha">
          <View className="items-center">
            <Text>Conteúdo da Ficha</Text>
          </View>
        </Card>
      </View>
      <View className="items-center mt-4">
        <StatusCard status={status}></StatusCard>
      </View>
      <View className="items-center">
        <LocationButton2 title="Localização" onPress={openMaps} />
      </View>
    </View>
  );
}
