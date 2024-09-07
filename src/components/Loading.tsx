import { ActivityIndicator } from "react-native";

export function Loading({ size }: { size?: "small" | "large" | number }) {
  return <ActivityIndicator size={size} className="text-green-500" />;
}
