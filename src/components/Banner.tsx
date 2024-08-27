import { ReactNode } from "react";
import { Image, View } from "react-native";

type BannerProps = {
  children: ReactNode;
  imageSource: any;
};

export function Banner({ children, imageSource }: BannerProps) {
  return (
    <View
      style={{ elevation: 4 }}
      className="w-[300px] h-[311px] flex-shrink-0 rounded-2xl bg-blue-light shadow-md"
    >
      <Image
        source={imageSource}
        className="w-full h-[165px] rounded-t-2xl rounded-br-[50px]"
        resizeMode="cover"
      />
      <View className="flex-1 p-2">{children}</View>
    </View>
  );
}