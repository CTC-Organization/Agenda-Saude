import { Banner } from "@/components/Banner";
import { Card } from "@/components/Card";
import { InfoBox } from "@/components/InfoBox";
import { useUserStore } from "@/store/userStore";
import { Text, View } from "react-native";
import { LocationButton } from "@/components/LocationButton";
import { Button2 } from "@/components/Button2";
import { router } from "expo-router";

import PhoneIcon from "@/assets/telefone.svg";
import MailIcon from "@/assets/correspondencia.svg";
import CalendarIcon from "@/assets/calendario.svg";
import ClockIcon from "@/assets/relogio.svg";

export default function Home() {
  const { user } = useUserStore();
  const username = user?.name || "Usuário";

  const clinicName = "Posto Pedro R. Filho";
  const clinicDistance = "1.2km";
  const phone = "98765 4321";
  const email = "Posto_principal@gmail.com";
  
  const appointmentDate01 = "Sábado, 12 de outubro";
  const appointmentTime01 = "11:00 - 12:00 Manhã";
  const appointmentDate02 = "Segunda, 25 de novembro";
  const appointmentTime02 = "08:00 - 10:00 Manhã";

  return (
    <View className="flex-1 justify-start items-center bg-white">
      <View className="w-full mt-8 justify-center items-center">
        <Text className="text-black text-xl font-medium">
          Olá, {username}
        </Text>
      </View>

      <View className="h-8" />
      <Banner imageSource={require("@/assets/banner.png")}>
        <View className="items-start ms-2">
          <Text className="ms-24 text-black font-medium mt-0">
            Posto próximo
          </Text>
          <View className="mt-2">
            <InfoBox>
              <Text>{clinicName} {clinicDistance}</Text>
            </InfoBox>
          </View>
          <View className="ms-1 flex-row items-center mt-0">
            <PhoneIcon width={16} height={16} />
            <Text className="text-black text-base font-normal ms-2">
              {phone}
            </Text>
          </View>
          <View className="ms-1 flex-row items-center mt-0">
            <MailIcon width={16} height={16} />
            <Text className="text-black text-base font-normal ms-2">
              {email}
            </Text>
          </View>
        </View>
        <View className="absolute right-0 bottom-0">
          <LocationButton />
        </View>
      </Banner>
      <View className="h-10" />

      <Card title="Fichas marcadas">
        <View className="flex-row justify-between w-full px-0">
          <View className="flex-row items-center">
            <CalendarIcon width={16} height={16} />
            <Text className="text-black text-xs font-normal ms-1">
              {appointmentDate01}
            </Text>
          </View>

          <View className="flex-row items-center">
            <ClockIcon width={16} height={16} />
            <Text className="text-black text-xs font-normal ms-1">
              {appointmentTime01}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between w-full px-0 mt-2">
          <View className="flex-row items-center">
            <CalendarIcon width={16} height={16} />
            <Text className="text-black text-xs font-normal ms-1">
              {appointmentDate02}
            </Text>
          </View>

          <View className="flex-row items-center">
            <ClockIcon width={16} height={16} />
            <Text className="text-black text-xs font-normal ms-1">
              {appointmentTime02}
            </Text>
          </View>
        </View>

        <View className="mt-10 w-full items-center">
          <Button2 title="Visualizar Marcações"
           onPress={() => router.push("/(appointments)/AppointmentsScreen")}
           />
        </View>
      </Card>
    </View>
  );
}
