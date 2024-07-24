import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { View, TextInput, TextInputProps } from "react-native";

function Input({ children }: { children: ReactNode }) {
  return (
    <View className="w-full h-12 flex-row items-center gap-3 p-3 border border-gray-91 bg-gray-95 rounded-md">
      {children}
    </View>
  );
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 white text-base font-normal outline-gray-95"
      placeholderTextColor={colors.gray[74]}
      {...rest}
    />
  );
}

Input.Field = Field;
export { Input };
