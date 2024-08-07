import { Text, View, Linking } from "react-native"; 
import { Card } from "@/components/Card";
import { StatusCard } from "@/components/StatusCard";
import { LocationButton } from "@/components/LocationButton";

export default function DetailsScreen() {
  const username = "Claúdia";
  const requestName = "Nome da Consulta";
  const status = "Negada";

  const openMaps = () => {
    const url = "https://www.google.com/maps";
    Linking.openURL(url).catch((err: Error) => console.error("Erro ao abrir o mapa", err)); // Especificamos o tipo do erro
  };

  return (
    <View className="flex-1 bg-white">
      <View
        className="w-full h-12 flex-row justify-center items-center opacity-100"
        style={{ marginTop: 40 }}
      >
        <Text className="text-black text-xl font-normal">Bem Vind@, {username}</Text>
      </View>
      <View className="w-full items-center mt-4">
        <Text className="text-lg font-semibold text-center">{requestName}</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            width: "80%",
            marginVertical: 8,
          }}
        />
      </View>
      <View className="items-center mt-4">
        <Card title="Ficha">
          <View className="items-center">
            <Text>Conteúdo da Ficha</Text>
          </View>
        </Card>
      </View>
      <View className="items-center mt-4">
        <StatusCard status={status}>
          {/* Se necessário, inclua conteúdo adicional aqui */}
        </StatusCard>
      </View>
      <View className="items-center">
        <LocationButton title="Localização" onPress={openMaps} />
      </View>
    </View>
  );
}
