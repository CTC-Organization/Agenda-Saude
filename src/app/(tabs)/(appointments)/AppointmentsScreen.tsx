import { FlashList } from "@shopify/flash-list";
import { ScrollView, Text, View } from "react-native";
import AccordionItem from "@/components/AccordionItem";
import { useUserStore } from "@/store/userStore";

const data = [
  { title: "Médico Oftalmologista", date: "17 abril 2025, 13 h - 14 h" },
  { title: "Médico Cardiologista", date: "20 abril 2025, 10 h - 11 h" },
  { title: "Médico Dermatologista", date: "25 abril 2025, 09 h - 10 h" },
];

export default function AppointmentsScreen() {
  const { user } = useUserStore();
  const username = user?.name || "Usuário";

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="w-full mt-8 justify-center items-center">
        <Text className="text-black text-2xl font-bold">
          Olá, {username}
        </Text>
      </View>

      <View className="p-10">
        <Text className="text-xl font-medium text-gray-74 mb-4">Minhas Consultas:</Text>
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <AccordionItem
              title={item.title}
              date={item.date}
            />
          )}
          estimatedItemSize={200}
        />
      </View>
    </ScrollView>
  );
}
