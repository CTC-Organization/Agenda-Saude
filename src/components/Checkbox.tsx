import { colors } from "@/styles/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
  text: string;
  onPress: (isChecked: boolean) => void;
};

export function Checkbox({ text, onPress }: Props) {
  return (
    <BouncyCheckbox
      size={25}
      fillColor="green"
      unFillColor={colors.gray[95]}
      text={text}
      iconStyle={{ borderColor: "green" }}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{
        color: colors.gray[74],
        textDecorationLine: "none",
      }}
      onPress={onPress}
    />
  );
}
