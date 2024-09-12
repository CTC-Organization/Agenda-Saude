import { fetchWithAuth } from "@/app/api/apiClient";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FileThumbnail } from "@/components/FileThumbnail";
import { showToast } from "@/components/Toast";
import { UploadModal } from "@/components/UploadModal";
import { useUserStore } from "@/store/userStore";
import { colors } from "@/styles/colors";
import { CustomFile } from "@/types/AppointmentTypes";
import { FontAwesome6 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const data = [
  { id: "clinico", note: "Clínico Geral" },
  { id: "cardiologia", note: "Cardiologia" },
  { id: "psicologo", note: "Psicólogo" },
  { id: "odonto", note: "Odontologia" },
  { id: "ginecologia", note: "Ginecologia" },
  { id: "proctologia", note: "Proctologia" },
];

export default function RequestScreen() {
  const {
    requestId: initialRequestId,
    speciality: initialSpeciality,
    files: initialFiles,
  } = useLocalSearchParams();

  const parsedFiles = initialFiles ? JSON.parse(initialFiles as string) : [];
  const initialSpecialityValue = Array.isArray(initialSpeciality)
    ? initialSpeciality[0]
    : initialSpeciality || "";
  const initialRequestIdValue = Array.isArray(initialRequestId)
    ? initialRequestId[0]
    : initialRequestId || "";

  const [speciality, setSpeciality] = useState(initialSpecialityValue);
  const [files, setFiles] = useState<CustomFile[]>(parsedFiles);
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useUserStore();

  useFocusEffect(
    useCallback(() => {
      setSpeciality("");
      setFiles([]);
    }, [])
  );

  const mutation = useMutation({
    mutationFn: async ({
      speciality,
      patientId,
      files,
      requestId,
    }: {
      speciality: string;
      patientId: string;
      files: CustomFile[];
      requestId?: string;
    }) => {
      const formData = new FormData();
      formData.append("specialty", speciality);
      formData.append("patientId", patientId);

      if (requestId) {
        formData.append("requestId", requestId);
      }

      if (speciality !== "clinico" && files.length > 0) {
        files.forEach((file) => {
          formData.append("files", {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any);
        });
      }

      const endpoint = requestId
        ? "requests/resend" // Endpoint com requestId
        : "requests/request-without-service-token"; // Endpoint sem requestId

      const request = await fetchWithAuth(
        endpoint,
        "POST",
        formData,
        "multipart/form-data"
      );
      return request;
    },
    onSuccess: async () => {
      showToast(
        "success",
        "Requisição efetuada com sucesso",
        "Adicionada a sua lista"
      );
      router.replace("/HomeScreen");
    },
    onError: (error) => {
      if (error instanceof Error) {
        showToast("error", "Erro ao efetuar requisição", error.message);
      }
    },
  });

  const createFileObject = (
    uri: string,
    name: string,
    type: string
  ): CustomFile => {
    const cleanName = name.split(".").slice(0, -1).join(".") || name;
    return {
      uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
      name: cleanName,
      type,
    };
  };

  const pickImage = async (mode: "camera" | "galeria") => {
    try {
      let result;
      if (mode === "galeria") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        const file = createFileObject(
          result.assets[0].uri,
          result.assets[0].fileName || "image.jpg",
          result.assets[0].mimeType || "image/jpeg"
        );
        setFiles((prevFiles) => [...prevFiles, file]);
        setModalVisible(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast("error", "Erro ao selecionar arquivo", error.message);
      } else {
        showToast("error", "Erro desconhecido", "Ocorreu um erro inesperado.");
      }
      setModalVisible(false);
    }
  };

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled) {
        const file = await createFileObject(
          result.assets[0].uri,
          result.assets[0].name || "document.pdf",
          result.assets[0].mimeType || "application/pdf"
        );
        setFiles((prevFiles) => [...prevFiles, file]);
        setModalVisible(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast("error", "Erro ao selecionar imagem", error.message);
      } else {
        showToast("error", "Erro desconhecido", "Ocorreu um erro inesperado.");
      }
      setModalVisible(false);
    }
  };

  const handleRequest = async () => {
    if (speciality && user?.id) {
      await mutation.mutateAsync({
        speciality,
        patientId: user.id,
        files,
        requestId: initialRequestIdValue || undefined,
      });
    } else {
      showToast(
        "error",
        "Dados incompletos",
        "Por favor, complete todos os campos."
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View className="flex-1 bg-white dark:bg-gray-800 items-center justify-center p-5 gap-5">
        <Text
          className="font-regular text-2xl font-medium justify-start mt-5 
      text-TextPrimary dark:text-white"
        >
          Selecione a especialidade:
        </Text>
        <View className="w-full max-h-32 my-14">
          <Picker
            selectedValue={speciality}
            onValueChange={(itemValue) => setSpeciality(itemValue)}
            style={{
              width: "100%",
              height: 50,
              color: colors.TextPrimary,
              backgroundColor: colors.InputBackground,
              elevation: 5,
            }}
          >
            <Picker.Item label="" value="" />
            {data.map((item) => (
              <Picker.Item key={item.id} label={item.note} value={item.id} />
            ))}
          </Picker>
        </View>
        {files.length > 0 && (
          <View className="w-full flex-row flex-wrap justify-center">
            {files.map((file, index) => (
              <FileThumbnail
                key={index}
                file={file}
                onRemove={() => setFiles(files.filter((_, i) => i !== index))}
              />
            ))}
          </View>
        )}
        {speciality !== "" && speciality !== "clinico" && (
          <View className="w-full items-center justify-center">
            <Card size="w-5/6 h-[200px]">
              <Pressable onPress={() => setModalVisible(true)}>
                <View className="size-full justify-center items-center">
                  <Image
                    source={require("@/assets/requisicao.png")}
                    className="size-24 opacity-50"
                    style={{ tintColor: colors.TextPrimary }}
                  />
                  <Text className="text-base font-normal opacity-50 text-TextPrimary">
                    Inserir Arquivo
                  </Text>
                </View>
              </Pressable>
            </Card>
          </View>
        )}

        <View className="flex-1 w-96 items-center my-14">
          <Button
            title="Confirmar"
            onPress={handleRequest}
            isLoading={mutation.isPending}
            backgroundColor={colors.ButtonBackground}
            color={colors.ButtonText}
            size={"h-16 w-full"}
            border="rounded-2xl border border-ButtonBorder"
          />
        </View>
        <UploadModal
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          options={[
            {
              children: (
                <FontAwesome6
                  name="camera"
                  size={24}
                  color={colors.TextPrimary}
                />
              ),
              text: "Câmera",
              onPress: () => pickImage("camera"),
            },
            {
              children: (
                <FontAwesome6
                  name="image"
                  size={24}
                  color={colors.TextPrimary}
                />
              ),
              text: "Galeria",
              onPress: () => pickImage("galeria"),
            },
            {
              children: (
                <FontAwesome6
                  name="file-pdf"
                  size={24}
                  color={colors.TextPrimary}
                />
              ),
              text: "Documento",
              onPress: pickDocument,
            },
          ]}
        />
      </View>
    </ScrollView>
  );
}
