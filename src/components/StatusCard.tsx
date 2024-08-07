import { ReactNode } from "react";
import { Text, View, Pressable } from "react-native";

type StatusCardProps = {
  status: string;
  children?: ReactNode;
};

export function StatusCard({ status, children }: StatusCardProps) {
  const getConfirmButtonColor = (status: string) => {
    return status === "Aguardando" || status === "Finalizada" || status === "Negada" || status === "Cancelada"
      ? "bg-gray-400"
      : "bg-green-500";
  };

  const getCancelButtonColor = (status: string) => {
    return status === "Finalizada" || status === "Cancelada" ? "bg-gray-400" : "bg-red-500";
  };

  const getEditButtonColor = (status: string) => {
    return status === "Negada" ? "bg-[#0000FF]" : "bg-transparent"; // Usando um valor hexadecimal para azul
  };

  const renderButtons = () => {
    return (
      <View className="flex-row justify-center space-x-4 mt-4">
        <Pressable
          className={`${getConfirmButtonColor(status)} flex-1 px-3 py-2 rounded-lg mx-1`}
          onPress={() =>
            status !== "Aguardando" &&
            status !== "Finalizada" &&
            status !== "Negada" &&
            status !== "Cancelada" &&
            console.log("Confirmar")
          }
        >
          <Text className="text-white font-medium text-center">Confirmar</Text>
        </Pressable>
        <Pressable
          className={`${getCancelButtonColor(status)} flex-1 px-3 py-2 rounded-lg mx-1`}
          onPress={() => status !== "Finalizada" && status !== "Cancelada" && console.log("Cancelar")}
        >
          <Text className="text-white font-medium text-center">Cancelar</Text>
        </Pressable>
        {status === "Negada" && (
          <Pressable
            className={`${getEditButtonColor(status)} flex-1 px-3 py-2 rounded-lg mx-1`}
            onPress={() => console.log("Editar Requisição")}
          >
            <Text className="text-white font-medium text-center">Editar</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View className="w-4/5 flex-shrink-0 rounded-2xl bg-green-300 shadow-md p-4 items-center">
      <Text className="text-black text-lg font-semibold text-center mb-4">Status: {status}</Text>
      {renderButtons()}
      {children}
    </View>
  );
}
