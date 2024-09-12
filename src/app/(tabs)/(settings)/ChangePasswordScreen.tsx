import { ResetPassword } from "@/components/ResetPassword";
import { router } from "expo-router";
import { View } from "react-native";

export default function ChangePasswordScreen() {
  const handleSuccess = () => {
    router.navigate({ pathname: "/" });
  };

  return (
    <View className="flex-1 justify-center">
      <ResetPassword onSuccess={handleSuccess} />
    </View>
  );
}
