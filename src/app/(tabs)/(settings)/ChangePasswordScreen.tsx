import { ResetPassword } from "@/components/ResetPassword";
import { router } from "expo-router";
import { View } from "react-native";

export default function ChangePasswordScreen() {
  const handleSuccess = () => {
    setTimeout(() => {
      router.navigate({ pathname: "/" });
    }, 2000);
  };

  return (
    <View className="flex-1 justify-center">
      <ResetPassword onSuccess={handleSuccess} />
    </View>
  );
}
