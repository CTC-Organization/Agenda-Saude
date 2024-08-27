import { ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
  children: ReactNode;
};

export function InfoBox({ children }: Props) {
  return (
    <View
      style={{ elevation: 4 }}
      className="w-[272px] h-[28px] flex-shrink-0 rounded-lg bg-white_mod shadow-md 
      justify-center items-start pl-4 mb-2"
    >
      <Text className="text-black text-xs font-normal leading-5">
        {children}
      </Text>
    </View>
  );
}

