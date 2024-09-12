import { ResetPassword } from "@/components/ResetPassword";
import { Link, router } from "expo-router";
import { Text, View } from "react-native";

export default function ForgotPasswordScreen() {
  const handleSuccess = () => {
    router.navigate({ pathname: "/LoginScreen" });
  };

  return (
    <View className="flex-1 relative">
      <ResetPassword onSuccess={handleSuccess} />
      <View className="absolute bottom-64 left-0 right-0 items-center">
        <Link href={"/LoginScreen"}>
          <Text className="font-regular text-base font-normal text-LinkText">
            Voltar ao login
          </Text>
        </Link>
      </View>
    </View>
  );
}
