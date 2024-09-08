import { showToast } from "@/components/Toast";
import { ToggleTheme } from "@/components/ToggleTheme";
import { useUserStore } from "@/store/userStore";
import { NotificationButton } from "@/components/NotificationButton";
import { Pressable, Text, View, ScrollView, Image } from "react-native";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useColorScheme } from "nativewind";

const UserImage = () => {
  return (
    <View className="w-[122px] h-[122px] rounded-full border-[0px] border-white dark:border-gray-800 bg-[#F6F6F6] dark:bg-gray-700 overflow-hidden relative -top-[61px]">
      <Image
        source={require("@/assets/foto.png")}
        className="w-full h-full object-cover"
      />
    </View>
  );
};

export default function Profile() {
  const { clearStore } = useUserStore();
  const { colorScheme } = useColorScheme();
  const isDarkTheme = colorScheme === "dark";

  const handleLogout = async () => {
    await clearStore();
    showToast("success", "Até logo!", "Você saiu com sucesso. Volte sempre!");
    setTimeout(() => {
      router.replace("/");
    }, 1000);
  };

  const iconColor = isDarkTheme ? "white" : "black";

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} className="bg-white dark:bg-gray-800">
      <View className="flex-1 items-center">
        <Image
          source={require("@/assets/topo2.png")}
          className="w-full h-[90px] object-cover"
        />
        <UserImage />
        <View className="mt-[-40px]">
          <Button
            title="Editar perfil"
            backgroundColor="#5DB075"
            color="#FFF"
            size="h-10 w-28"
            border="rounded-2xl"
            onPress={() => router.push("/(settings)/EditAccountScreen")}
          />
        </View>
      </View>

      <View className="flex-col gap-8 mb-36 w-full px-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Entypo name="bell" size={24} color={iconColor} />
            <Text className="text-xl text-black dark:text-white">Notificações</Text>
          </View>
          <View className="me-5">
            <NotificationButton />
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <FontAwesome6 name="people-group" size={20} color={iconColor} />
            <Text className="text-xl text-black dark:text-white">Sobre nós</Text>
          </View>
          <View className="me-5">
            <Entypo name="chevron-thin-right" size={24} color={iconColor} />
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <MaterialIcons name="call" size={24} color={iconColor} />
            <Text className="text-xl text-black dark:text-white">Fale conosco</Text>
          </View>
          <View className="me-5">
            <Entypo name="chevron-thin-right" size={24} color={iconColor} />
          </View>
        </View>

        <Pressable onPress={() => router.push("/(settings)/ChangePasswordScreen")}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <FontAwesome6 name="key" size={24} color={iconColor} />
              <Text className="text-xl text-black dark:text-white">Alterar Senha</Text>
            </View>
            <View className="me-5">
              <Entypo name="chevron-thin-right" size={24} color={iconColor} />
            </View>
          </View>
        </Pressable>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons name="theme-light-dark" size={24} color={iconColor} />
            <Text className="text-xl text-black dark:text-white">Alterar o tema</Text>
          </View>
          <View className="me-0.5">
            <ToggleTheme />
          </View>
        </View>

        <Pressable onPress={handleLogout}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <SimpleLineIcons name="logout" size={24} color={iconColor} />
              <Text className="text-xl text-black dark:text-white">Sair da conta</Text>
            </View>
            <View className="me-5">
              <Entypo name="chevron-thin-right" size={24} color={iconColor} />
            </View>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
