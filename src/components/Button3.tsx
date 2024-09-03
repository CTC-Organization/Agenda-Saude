import { Pressable, Text } from "react-native";

type Button3Props = {
  title: string;
  onPress: () => void;
  style: object;
  textStyle: object;
};

const Button3 = ({ title, onPress, style, textStyle }: Button3Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="me-5 items-center justify-center"
      style={style}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

export default Button3;
