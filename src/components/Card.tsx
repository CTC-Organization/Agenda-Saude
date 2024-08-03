import { ReactNode } from "react";
import { Text, View } from "react-native";

type CardProps = {
  children: ReactNode;
  title?: string;
};

export function Card({ children, title }: CardProps) {
  return (
    <View
      style={{ elevation: 4 }}
      className="w-4/5 h-52 flex-shrink-0 rounded-2xl bg-blue shadow-md p-4"
    >
      {title && (
        <Text className="text-black text-base font-normal mb-6">{title}</Text>
      )}
      <View className="flex-1 size-full">{children}</View>
    </View>
  );
}
