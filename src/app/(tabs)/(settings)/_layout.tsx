import { Stack } from "expo-router/stack";
import { useWindowDimensions } from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="SettingsScreen"
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: width > 390 ? 20 : 16,
            },
          }}
        />
        <Stack.Screen
          name="EditAccountScreen"
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: width > 390 ? 20 : 16,
            },
          }}
        />
      </Stack>
    </>
  );
}
