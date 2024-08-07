import { ReactNode } from "react";
import { Text, View, Pressable } from "react-native";

type StatusCardProps = {
  status: string;
  children?: ReactNode;
};

export function StatusCard({ status, children }: StatusCardProps) {
  const renderButtons = () => {
    if (status === "Aguardando") {
      return (
        <View className="flex-row justify-center space-x-4 mt-4">
          <Pressable
            className="bg-red-500 flex-1 px-3 py-2 rounded-lg mx-1"
            onPress={() => console.log("Cancelar")}
          >
            <Text className="text-white font-medium text-center">Cancelar</Text>
          </Pressable>
        </View>
      );
    } else if (status === "Negada") {
      return (
        <View className="flex-row justify-center space-x-4 mt-4">
          <Pressable
            className="bg-blue-dark flex-1 px-3 py-2 rounded-lg mx-1"
            onPress={() => console.log("Editar Requisição")}
          >
            <Text className="text-white font-medium text-center">Editar</Text>
          </Pressable>
          <Pressable
            className="bg-red-500 flex-1 px-3 py-2 rounded-lg mx-1"
            onPress={() => console.log("Cancelar")}
          >
            <Text className="text-white font-medium text-center">Cancelar</Text>
          </Pressable>
        </View>
      );
    } else if (status === "Confirmada") {
      return (
        <View className="flex-row justify-center space-x-4 mt-4">
          <Pressable
            className="bg-green-500 flex-1 px-3 py-2 rounded-lg mx-1"
            onPress={() => console.log("Confirmar")}
          >
            <Text className="text-white font-medium text-center">Confirmar</Text>
          </Pressable>
          <Pressable
            className="bg-red-500 flex-1 px-3 py-2 rounded-lg mx-1"
            onPress={() => console.log("Cancelar")}
          >
            <Text className="text-white font-medium text-center">Cancelar</Text>
          </Pressable>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View className="w-4/5 flex-shrink-0 rounded-2xl bg-green-200 shadow-md p-4 items-center">
      <Text className="text- text-lg font-semibold text-center mb-4">Status: {status}</Text>
      {renderButtons()}
      {children}
    </View>
  );
}
