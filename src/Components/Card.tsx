import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
  title?: string;
};

export function Card({ children, title }: Props) {
  return (
    <View
      style={{ elevation: 4 }}
      className="w-64 h-48 flex-shrink-0 rounded-2xl bg-blue shadow-md p-4"
    >
      {title && (
        <Text className="text-black text-base font-normal mb-6">{title}</Text>
      )}
      <View className="flex-1">{children}</View>
    </View>
  );
}
