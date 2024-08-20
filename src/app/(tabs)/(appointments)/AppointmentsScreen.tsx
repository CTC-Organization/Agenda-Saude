import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import AccordionItem from "@/components/AccordionItem";

const data = [
  { requestName: "Consulta 1", status: "Aguardando" },
  { requestName: "Consulta 2", status: "Confirmada" },
  { requestName: "Consulta 3", status: "Cancelada" },
  { requestName: "Consulta 4", status: "Negada" },
  { requestName: "Consulta 5", status: "Finalizada" },
];

const getColorForStatus = (status: string) => {
  switch (status) {
    case "Aguardando":
      return "blue";
    case "Confirmada":
      return "green";
    case "Cancelada":
      return "yellow";
    case "Negada":
      return "red";
    case "Finalizada":
      return "rgba(0, 0, 0, 0.5)";
    default:
      return "black";
  }
};

export default function AppointmentsScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Minhas Requisições</Text>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <AccordionItem
          requestName={item.requestName}
            status={item.status}
            color={getColorForStatus(item.status)}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}
