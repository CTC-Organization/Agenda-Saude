import { fetchWithAuth } from "@/app/api/apiClient";
import {
  getAddressFromCoordinates,
  getMapPreviewUrl,
} from "@/app/api/geocodingService";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Loading } from "@/components/Loading";
import { showToast } from "@/components/Toast";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/styles/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function DetailsScreen() {
  const {
    specialty,
    doctorName,
    date,
    latitude,
    longitude,
    status,
    id,
    attachments,
    observation,
  } = useLocalSearchParams();
  const { user } = useUserStore();

  const paramToString = (
    param: string | string[] | null | undefined,
    fieldName?: string
  ) => {
    if (fieldName === "observation") {
      return Array.isArray(param)
        ? param[0]
        : String(param ?? "motivo desconhecido");
    }
    return Array.isArray(param) ? param[0] : String(param ?? "");
  };

  const specialtyString = paramToString(specialty);
  const doctorNameString = paramToString(doctorName);
  const dateString = paramToString(date);
  const latitudeString = paramToString(latitude);
  const longitudeString = paramToString(longitude);
  const statusString = paramToString(status);
  const idString = paramToString(id);
  const attachmentsString = paramToString(attachments);
  const observationString = paramToString(observation);

  const navigateToRequest = () => {
    router.push({
      pathname: "/RequestScreen",
      params: {
        requestId: idString,
        specialtyString,
        files: attachmentsString,
      },
    });
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["address", latitudeString, longitudeString],
    queryFn: async () => {
      const address = await getAddressFromCoordinates(
        latitudeString,
        longitudeString
      );
      const mapPreviewUrl = getMapPreviewUrl(latitudeString, longitudeString);

      return { address, mapPreviewUrl };
    },
    enabled: !!latitudeString && !!longitudeString,
  });

  const address = data?.address;
  const mapPreviewUrl = data?.mapPreviewUrl;

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    showToast("error", "Erro ao conectar com a API do Google", error.message);
  }

  const mutation = useMutation({
    mutationFn: async ({
      endpoint,
      patientId,
    }: {
      endpoint: string;
      patientId: string;
    }) => {
      const patchData = await fetchWithAuth(
        `requests/${endpoint}/${patientId}`,
        "PATCH",
        patientId
      );

      return { patchData, endpoint };
    },
    onSuccess: async ({ endpoint }) => {
      if (endpoint === "confirm") {
        showToast(
          "success",
          "Consulta confirmada",
          "Consulta confirmada com sucesso!"
        );
      } else {
        showToast(
          "success",
          "Consulta cancelada",
          "Consulta cancelada com sucesso!"
        );
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        showToast("error", "Erro ao mudar status da requisição", error.message);
      }
    },
  });

  const handleRequest = async (endpoint: string) => {
    if (!user?.id) {
      throw new Error("Usuário não autenticado ou ID não disponível.");
    }
    await mutation.mutateAsync({
      endpoint,
      patientId: user.id,
    });
  };

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
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
              {specialtyString}
            </Text>
          </View>
        </View>

        {(statusString === "ACCEPTED" || statusString === "CONFIRMED") && (
          <>
            <View className="w-full mt-24 px-6 ms-2">
              <Text
                className="font-regular text-2xl font-normal text-black 
        dark:text-white text-justify"
              >
                {doctorNameString}
              </Text>
            </View>

            <View className="w-full px-6 ms-2">
              <Text
                className="font-regular text-xl font-normal text-black 
        dark:text-white text-justify"
              >
                {dateString}
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
                {address}
              </Text>
              <Pressable onPress={openMaps} className="mt-2">
                <Image
                  source={{ uri: mapPreviewUrl }}
                  className="w-[331px] h-[186px] rounded-[10px] bg-lightgray"
                />
              </Pressable>
            </View>
          </>
        )}

        {statusString === "PENDING" && (
          <View className="w-11/12 mt-48 px-6 ms-2">
            <Text
              className="font-regular text-xl font-normal text-black 
      dark:text-white text-justify"
            >
              Sua Requisição foi enviada e está aguardando aceitação
            </Text>
          </View>
        )}

        {statusString === "DENIED" && (
          <View className="w-11/12 mt-48 px-6 ms-2">
            <Text
              className="font-regular text-xl font-normal text-black 
        dark:text-white text-justify"
            >
              Sua Requisição foi rejeitada por {observationString}. Clique em
              editar para tentar novamente:
            </Text>
          </View>
        )}

        {statusString === "ACCEPTED" && (
          <View className="flex-1 items-center justify-center gap-5 px-10">
            <View className="w-full flex-row items-center justify-between">
              <Button
                title="Aceitar"
                onPress={() => handleRequest("confirm")}
                isLoading={mutation.isPending}
                backgroundColor={colors.ButtonBackground}
                color={colors.ButtonText}
                size={"h-[56%] w-6/12"}
                border={"rounded-2xl border border-ButtonBorder"}
              />
              <Button
                title="Cancelar"
                onPress={() => console.log("Cancelar")}
                isLoading={mutation.isPending}
                backgroundColor={colors.SecondaryButtonBackground}
                color={colors.TextSecondary}
                size={"h-[56%] w-5/12"}
                border={"rounded-2xl border border-SecondaryButtonBorder"}
              />
            </View>
          </View>
        )}
        {statusString === "DENIED" && (
          <View className="flex-1 items-center justify-center gap-5 px-10">
            <View className="w-full items-center justify-start">
              <Button
                title="Editar"
                onPress={navigateToRequest}
                isLoading={mutation.isPending}
                backgroundColor={colors.ButtonBackground}
                color={colors.ButtonText}
                size={"h-[45%] w-9/12"}
                border={"rounded-2xl border border-SecondaryButtonBorder"}
              />
            </View>
          </View>
        )}
        {statusString === "PENDING" && (
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
        {statusString === "CONFIRMED" && (
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
