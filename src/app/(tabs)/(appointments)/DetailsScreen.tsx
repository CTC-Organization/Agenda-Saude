import { Text, View, Image, Pressable } from "react-native";
import { Linking } from "react-native";
import { router } from "expo-router";
import DoctorIcon from "@/assets/medico2.svg";
import Button3 from "@/components/Button3";

export default function DetailsScreen() {
  const specialty = "Oftalmologista";
  const doctorName = "Doutor John Wayne Gacy";
  const date = "12 jan 2024, 12 horas - 13 horas";
  const location = "R. Manoel Cabral, 29 - Jatobá, Patos - PB, 58707-280";

  const openMaps = () => {
    const url = "https://www.google.com/maps";
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir o mapa", err)
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Imagem de fundo topo.png */}
      <View className="w-full">
        <Image
          source={require("@/assets/topo.png")}
          className="w-full h-[300px] flex-shrink-0 absolute -top-[70px]"
        />
        <View className="w-full justify-center items-center mt-16">
          <DoctorIcon width={70} height={70} />
          <Text className="text-white text-center text-2xl font-bold mt-4">
            {specialty}
          </Text>
        </View>
      </View>

      <View className="w-full mt-24 px-6 ms-2">
        <Text className="text-black text-justify text-2xl font-normal">
          {doctorName}
        </Text>
      </View>

      <View className="w-full px-6 ms-2">
        <Text className="text-black text-justify text-xl font-normal">
          {date}
        </Text>
      </View>

      {/* Localização */}
      <View className="w-full mt-6 px-6 ms-2">
        <Text className="text-black text-sm font-semibold">Localização:</Text>
        <Text className="text-gray-74 text-[10px] font-normal mt-1">
          {location}
        </Text>
        <Pressable onPress={openMaps} className="mt-2">
          <Image
            source={require("@/assets/mapa.png")}
            className="w-[331px] h-[186px] rounded-[10px] bg-lightgray"
          />
        </Pressable>
      </View>

      <View className="w-full flex-row justify-center mt-8">
        <Button3
          title="Cancelar"
          onPress={() => console.log("Cancelar")}
          className="w-[130px] h-[35px] bg-blue-light border border-blue-border rounded-[16px]"
          textClassName="text-white text-[10px] text-center leading-[10px]"
        />
        <Button3
          title="Editar"
          onPress={() => router.push("/(tabs)/RequestScreen")}
          className="w-[130px] h-[35px] bg-gray-95 border border- rounded-[16px]"
          textClassName="text-gray-74 text-[10px] text-center leading-[10px]"
        />
      </View>
    </View>
  );
}
