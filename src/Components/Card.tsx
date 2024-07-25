// src/Components/Card.tsx

import { colors } from "@/styles/colors";
import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
  title?: string; // Adicionado para permitir o título do card
};

export function Card({ children, title }: Props) {
  return (
    <View style={styles.card}>
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 261,
    height: 200,
    flexShrink: 0,
    borderRadius: 16,
    backgroundColor: colors.blue,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
  },
  cardTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 24, // Adicionado para o espaçamento entre o título e o primeiro InfoBox
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    width: 232,
    height: 19,
    flexShrink: 0,
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 19,
  },
});
