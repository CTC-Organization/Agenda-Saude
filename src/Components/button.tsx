import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <Pressable
      className="w-full h-14 bg-green-light items-center justify-center rounded-xl"
      {...rest}
    >
      <Text className="text-white text-base font-normal">{title}</Text>
    </Pressable>
  );
}
