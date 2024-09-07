import AccordionItem from "@/components/AccordionItem";
import { useUserStore } from "@/store/userStore";
import { FlashList } from "@shopify/flash-list";
import { ScrollView, Text, View } from "react-native";

const data = [
  { title: "Oftalmologista", date: "17 abril 2025, 13 h - 14 h" },
  { title: "Cardiologista", date: "20 abril 2025, 10 h - 11 h" },
  { title: "Dermatologista", date: "25 abril 2025, 09 h - 10 h" },
  { title: "Cardiologista", date: "29 fevereiro 2025, 23 h - 00 h" },
];

export default function AppointmentsScreen() {
  const { user } = useUserStore();
  const username = user?.name || "Usuário";

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-800">
      <View className="w-full mt-8 justify-center items-center">
        <Text className="font-regular text-black text-2xl font-bold dark:text-white">
          Olá, {username}
        </Text>
      </View>

      <View className="p-10">
        <Text className="font-regular text-xl font-medium text-black dark:text-white mb-4">
          Minhas Consultas:
        </Text>
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <AccordionItem title={item.title} date={item.date} />
          )}
          estimatedItemSize={200}
        />
      </View>
    </ScrollView>
  );
}
