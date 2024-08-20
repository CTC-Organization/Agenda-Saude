import { useUserStore } from "@/store/userStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Profile() {
  const [notifications, setNotifications] = useState(false);
  const [darkmodeenabled, setDarkmodeenabled] = useState(false);

  const { user } = useUserStore();

  const username = user?.name || "Usuário";
  const userId = user?.userId;

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
        <Link
          href={"/(settings)/EditAccountScreen"}
          className="flex-row items-center gap-9"
        >
          {darkmodeenabled ? (
            <MaterialIcons name="dark-mode" size={24} color="black" />
          ) : (
            <MaterialIcons name="light-mode" size={24} color="black" />
          )}
          <Text>Modo Escuro</Text>
        </Link>
        <Link
          href={"/(settings)/EditAccountScreen"}
          className="flex-row items-center gap-9"
        >
          <MaterialIcons name="help" size={24} color="black" />
          <Text>FAQ</Text>
        </Link>
        <Link
          href={"/(settings)/EditAccountScreen"}
          className="flex-row items-center gap-9"
        >
          <AntDesign name="logout" size={24} color="black" />
          <Text>Sair</Text>
        </Link>
      </View>
    </View>
  );
}
