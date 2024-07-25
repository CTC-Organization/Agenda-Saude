import { ReactNode } from "react";
import { View, Text } from "react-native";

type Props = {
  children: ReactNode;
};

export function InfoBox({ children }: Props) {
  return (
    <View
      style={{ elevation: 4 }}
      className="w-52 h-7 shrink-0 rounded-lg bg-white_mod shadow-md 
      justify-center items-center mb-6"
    >
      <Text className="text-black text-xs font-normal leading-5">
        {children}
      </Text>
    </View>
  );
}
