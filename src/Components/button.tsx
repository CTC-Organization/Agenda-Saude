import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <Pressable
      style={{ elevation: 5 }}
      className="w-full h-14 bg-green-light items-center justify-center 
      rounded-3xl border-2 border-black"
      {...rest}
    >
      <Text className="text-white text-lg font-normal">{title}</Text>
    </Pressable>
  );
}
