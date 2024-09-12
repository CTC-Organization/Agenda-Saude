import { ReactNode } from "react";
import { Text, View } from "react-native";

type CardProps = {
  children: ReactNode;
  title?: string;
  size: string;
};

export function Card({ children, title, size }: CardProps) {
  return (
    <View
      style={{ elevation: 4 }}
      className={`${size} flex-shrink-0 rounded-2xl bg-BoxBackground shadow-md p-4`}
    >
      {title && (
        <Text className="text-black text-lg font-medium text-center h-12">
          {title}
        </Text>
      )}
      <View className="flex-1 size-full">{children}</View>
    </View>
  );
}
