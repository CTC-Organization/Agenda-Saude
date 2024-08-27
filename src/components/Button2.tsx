import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
  title: string;
  isLoading?: boolean;
};

export function Button2({ title, isLoading = false, ...rest }: Props) {
  return (
    <Pressable
      style={{ elevation: 4 }}
      disabled={isLoading}
      className="w-[287.338px] h-[39px] bg-green-newlight items-center justify-center 
      rounded-full flex-shrink-0"
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-black text-base font-normal">{title}</Text>
      )}
    </Pressable>
  );
}
