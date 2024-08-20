import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

type Props = PressableProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <Pressable
      style={{ elevation: 5 }}
      disabled={isLoading}
      className="w-full h-14 bg-green-light items-center justify-center 
      rounded-3xl border-2 border-black"
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <Text className="text-white text-lg font-normal">{title}</Text>
      )}
    </Pressable>
  );
}
