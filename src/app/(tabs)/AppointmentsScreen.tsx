import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import AccordionItem from "@/components/AccordionItem";

const data = [
  { title: "Consulta 1", status: "Aguardando" },
  { title: "Consulta 2", status: "Confirmada" },
  { title: "Consulta 3", status: "Cancelada" },
  { title: "Consulta 4", status: "Negada" },
  { title: "Consulta 5", status: "Finalizada" },
];

export default function AppointmentsScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Minhas Requisições</Text>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <AccordionItem title={item.title} status={item.status} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
}
