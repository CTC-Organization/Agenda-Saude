import { showToast } from "@/components/Toast";
import { ToggleTheme } from "@/components/ToggleTheme";
import { useUserStore } from "@/store/userStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Profile() {
  const [notifications, setNotifications] = useState(false);
  const [darkmodeenabled, setDarkmodeenabled] = useState(false);

  const { user, clearStore } = useUserStore();

  const username = user?.name || "Usuário";
  const userId = user?.userId;

  const handleLogout = async () => {
    await clearStore();
    showToast("success", "Até logo!", "Você saiu com sucesso. Volte sempre!");

    setTimeout(() => {
      router.replace("/");
    }, 1000);
  };

  return (
    <View className="flex-1 bg-white items-start p-8">
      <View className="w-full flex-row items-center justify-start gap-6 bg-slate-100 rounded-2xl p-3">
        <FontAwesome name="user-circle" size={50} color="green" />
        <View className="flex-col">
          <Text className="text-black font-bold text-xl">{username}</Text>
          <Link href={"/(settings)/EditAccountScreen"}>
            <Text className="text-sky-500">Editar Conta</Text>
          </Link>
        </View>
      </View>
      <View className="w-full flex-col items-center justify-center gap-6 p-3">
        <Link
          href={"/(settings)/EditAccountScreen"}
          className="flex-row items-center gap-9"
        >
          <MaterialIcons name="password" size={24} color="black" />
          <Text>Mudar Senha</Text>
        </Link>
        <Link
          href={"/(settings)/EditAccountScreen"}
          className="flex-row items-center gap-9"
        >
          {notifications ? (
            <MaterialIcons name="notifications" size={24} color="black" />
          ) : (
            <MaterialIcons name="notifications-off" size={24} color="black" />
          )}
          <Text>Notificações</Text>
        </Link>
        <View className="w-full items-center justify-center ">
          <ToggleTheme />
        </View>
        <Link href={"/SignUpScreen"} className="flex-row items-center gap-9">
          <MaterialIcons name="help" size={24} color="black" />
          <Text>FAQ</Text>
        </Link>
        <Pressable
          onPress={handleLogout}
          className="flex-row items-center gap-3"
        >
          <AntDesign name="logout" size={24} color="black" />
          <Text>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
}
