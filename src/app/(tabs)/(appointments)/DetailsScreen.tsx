import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { colors } from "@/styles/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function DetailsScreen() {
  const specialty = "Oftalmologista";
  const doctorName = "Doutor John Wayne Gacy";
  const date = "12 jan 2024, 12 horas - 13 horas";
  const location = "R. Manoel Cabral, 29 - Jatobá, Patos - PB, 58707-280";
  const [status, setStatus] = useState("Rejeitado");

  const openMaps = () => {
    const url = "https://www.google.com/maps";
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir o mapa", err)
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View className="flex-1 bg-white dark:bg-gray-800">
        <View className="w-full">
          <Image
            source={require("@/assets/topo.png")}
            className="w-full h-[300px] flex-shrink-0 absolute -top-[70px]"
          />
          <View className="w-full justify-center items-center mt-16">
            <FontAwesome6 name="user-doctor" size={70} color="black" />
            <Text className="text-white text-center text-2xl font-bold mt-4">
              {specialty}
            </Text>
          </View>
        </View>

        {(status === "Aceito" || status === "Confirmado") && (
          <>
            <View className="w-full mt-24 px-6 ms-2">
              <Text
                className="font-regular text-2xl font-normal text-black 
        dark:text-white text-justify"
              >
                {doctorName}
              </Text>
            </View>

            <View className="w-full px-6 ms-2">
              <Text
                className="font-regular text-xl font-normal text-black 
        dark:text-white text-justify"
              >
                {date}
              </Text>
            </View>

            <View className="w-full mt-6 px-6 ms-2">
              <Text
                className="font-regular text-sm font-semibold text-black 
        dark:text-white"
              >
                Localização:
              </Text>
              <Text
                className="font-regular font-normal text-xs text-TextSecondary 
        dark:text-SecondaryButtonBorder mt-1"
              >
                {location}
              </Text>
              <Pressable onPress={openMaps} className="mt-2">
                <Image
                  source={require("@/assets/mapa.png")}
                  className="w-[331px] h-[186px] rounded-[10px] bg-lightgray"
                />
              </Pressable>
            </View>
          </>
        )}

        {status === "Aguardando" && (
          <View className="w-11/12 mt-48 px-6 ms-2">
            <Text
              className="font-regular text-xl font-normal text-black 
      dark:text-white text-justify"
            >
              Sua Requisição foi enviada e está aguardando aceitação
            </Text>
          </View>
        )}

        {status === "Rejeitado" && (
          <View className="w-11/12 mt-48 px-6 ms-2">
            <Text
              className="font-regular text-xl font-normal text-black 
        dark:text-white text-justify"
            >
              Sua Requisição foi rejeitada, clique em editar para tentar
              novamente:
            </Text>
          </View>
        )}

        {status === "Aceito" && (
          <View className="flex-1 items-center justify-center gap-5 px-10">
            <View className="w-full flex-row items-center justify-between">
              <Button
                title="Aceitar"
                onPress={() => console.log("Aceitar")}
                backgroundColor={colors.ButtonBackground}
                color={colors.ButtonText}
                size={"h-[56%] w-6/12"}
                border={"rounded-2xl border border-ButtonBorder"}
              />
              <Button
                title="Cancelar"
                onPress={() => console.log("Cancelar")}
                backgroundColor={colors.SecondaryButtonBackground}
                color={colors.TextSecondary}
                size={"h-[56%] w-5/12"}
                border={"rounded-2xl border border-SecondaryButtonBorder"}
              />
            </View>
          </View>
        )}
        {status === "Rejeitado" && (
          <View className="flex-1 items-center justify-center gap-5 px-10">
            <View className="w-full items-center justify-start">
              <Button
                title="Editar"
                onPress={() => console.log("Editar")}
                backgroundColor={colors.ButtonBackground}
                color={colors.ButtonText}
                size={"h-[45%] w-9/12"}
                border={"rounded-2xl border border-SecondaryButtonBorder"}
              />
            </View>
          </View>
        )}
        {status === "Aguardando" && (
          <View className="w-full items-center justify-center">
            <Card size="h-[30%] w-9/12">
              <View className="flex-row justify-center items-center gap-5 mt-2">
                <AntDesign
                  name="clockcircleo"
                  size={24}
                  className="opacity-50"
                  color={colors.TextPrimary}
                />
                <Text className="text-base font-normal opacity-50 text-TextPrimary">
                  Aguardando
                </Text>
              </View>
            </Card>
          </View>
        )}
        {status === "Confirmado" && (
          <View className="w-full items-center justify-center">
            <Card size="h-[30%] w-9/12">
              <View className="flex-row justify-center items-center gap-5 mt-2">
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  className="opacity-50"
                  color={colors.TextPrimary}
                />
                <Text className="text-base font-normal opacity-50 text-TextPrimary">
                  Confirmado
                </Text>
              </View>
            </Card>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
