import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
};

export function InfoBox({ children }: Props) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    width: 215,
    height: 30,
    flexShrink: 0,
    borderRadius: 9,
    backgroundColor: colors.white_mod,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  text: {
    color: "#000",
    // fontFamily: "Inter",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 19,
  },
});
