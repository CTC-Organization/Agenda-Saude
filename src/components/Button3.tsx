import { Pressable, Text } from "react-native";

type Button3Props = {
  title: string;
  onPress: () => void;
  className?: string;
  textClassName?: string;
};

const Button3 = ({ title, onPress, className, textClassName }: Button3Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={`me-4 ms-4 items-center justify-center ${className}`}
    >
      <Text className={textClassName}>{title}</Text>
    </Pressable>
  );
};

export default Button3;
