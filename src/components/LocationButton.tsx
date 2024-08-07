import { Pressable, Text, PressableProps } from "react-native";

type Props = PressableProps & {
  title: string;
};

export function LocationButton({ title, ...rest }: Props) {
  return (
    <Pressable
      style={{ elevation: 5 }}
      className="w-4/5 h-14 bg-green-500 items-center justify-center rounded-3xl border-2 border-black my-4"
      {...rest}
    >
      <Text className="text-white text-lg font-normal">{title}</Text>
    </Pressable>
  );
}
